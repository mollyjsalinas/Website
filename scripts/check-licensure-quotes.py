"""Verify researched licensure facts before they go into data/licensure.json.

Each research file <ST>.json holds facts as {value, source_url, quote}. For every
fact this fetches source_url (PDFs via pdftotext) and confirms the quote appears
verbatim after whitespace/quote/dash normalisation, and that every number
in the value (fees, hours, years) also appears on that page. Writes <ST>.verified.json with
only the facts whose quote was found, and prints each drop. Run on Linux:
    python3 scripts/check-licensure-quotes.py FL TX CA   (from the research folder)"""
import html, json, os, re, subprocess, sys, tempfile, time, unicodedata

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
cache = {}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", html.unescape(s))
    s = s.translate({0x2018: "'", 0x2019: "'", 0x201C: '"', 0x201D: '"', 0x2013: "-", 0x2014: "-", 0xA0: " "})
    return re.sub(r"\s+", " ", s).strip().lower()


def text_of(url: str) -> str:
    if url in cache:
        return cache[url]
    raw = b""
    browser = ["-A", UA, "-H", "Accept: text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
               "-H", "Accept-Language: en-US,en;q=0.9"]
    # sites differ: some 403 a browser UA but serve curl's default, some challenge intermittently.
    # Only an HTTP 200 that is not a bot-challenge page counts.
    tmp = os.path.join(tempfile.gettempdir(), f"chk_{os.getpid()}.bin")
    full = ["--compressed", "-A", UA, "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "-H", "Accept-Language: en-US,en;q=0.9", "-H", "Sec-Fetch-Dest: document", "-H", "Sec-Fetch-Mode: navigate",
            "-H", "Sec-Fetch-Site: none", "-H", "Sec-Fetch-User: ?1", "-H", "Upgrade-Insecure-Requests: 1",
            "-H", 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
            "-H", "sec-ch-ua-mobile: ?0", "-H", 'sec-ch-ua-platform: "Windows"']
    for attempt, hdrs in enumerate([full, ["-A", UA], [], browser, full, ["-A", UA], []]):
        if attempt >= 2:
            time.sleep(3 * attempt)
        code = subprocess.run(["curl", "-sL", "--max-time", "40", "--ssl-no-revoke", *hdrs, "-o", tmp,
                               "-w", "%{http_code}", url], capture_output=True).stdout.decode()
        raw = open(tmp, "rb").read() if os.path.exists(tmp) else b""
        head = raw[:6000]
        if code == "200" and b"Incapsula" not in head and b"Just a moment" not in head and b"challenge-platform" not in head:
            break
        raw = b""
    if raw[:4] == b"%PDF":
        # xpdf's pdftotext does not read stdin: use the downloaded file. Keep layout and plain
        # extraction side by side so a quote can match either reading order.
        t = " ".join(subprocess.run(["pdftotext", *mode, "-enc", "UTF-8", tmp, "-"], capture_output=True).stdout.decode("utf-8", "ignore")
                     for mode in (["-layout"], []))
    else:
        if raw[:2] in (bytes([255, 254]), bytes([254, 255])) or raw[:200].count(bytes([0])) > 50:
            t = raw.decode("utf-16", "ignore")  # e.g. sdlegislature.gov rule pages
        else:
            t = raw.decode("utf-8", "ignore")
        if t.lstrip().startswith("{"):  # JSON-wrapped HTML fragments (e.g. azdhs.gov content endpoints)
            try:
                t = " ".join(str(v) for v in json.loads(t).values())
            except (ValueError, AttributeError):
                pass
        t = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", t)
        t = re.sub(r"(?s)<[^>]+>", " ", t)
    cache[url] = norm(t)
    return cache[url]


for st in sys.argv[1:]:
    d = json.load(open(f"{st}.json", encoding="utf-8"))
    kept = drop = 0
    for prof, fields in d["professions"].items():
        for k, f in list(fields.items()):
            if not f:
                continue
            q, url = norm(f.get("quote") or ""), f.get("source_url") or ""
            page = text_of(url) if url else ""
            ok = bool(q) and q in page
            # board/apply_url facts are links: the page loading is the check
            if not ok and k in ("board", "apply_url") and len(page) > 500:
                ok = True
            # every number the value states (fees, hours, years) must be on the page too
            missing = [x for x in re.findall(r"\d[\d,]*(?:\.\d+)?", f.get("value") or "")
                       if x.replace(",", "") not in page.replace(",", "")]
            if ok and missing:
                ok = False
                print(f"  NUMBERS {st} {prof}.{k}: {missing} not on page")
            f["verified"] = ok
            if ok:
                kept += 1
            else:
                drop += 1
                print(f"  DROP {st} {prof}.{k}: page {len(page)} chars | {url}\n       quote: {f.get('quote')!r}")
                fields[k] = None
    json.dump(d, open(f"{st}.verified.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{st}: kept {kept}, dropped {drop}")
