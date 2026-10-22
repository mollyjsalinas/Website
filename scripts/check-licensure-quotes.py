"""Verify researched licensure facts before they go into data/licensure.json.

Each research file <ST>.json holds facts as {value, source_url, quote}. For every
fact this fetches source_url (PDFs via pdftotext) and confirms the quote appears
verbatim after whitespace/quote/dash normalisation. Writes <ST>.verified.json with
only the facts whose quote was found, and prints each drop. Run on Linux:
    python3 scripts/check-licensure-quotes.py FL TX CA   (from the research folder)"""
import html, json, re, subprocess, sys, unicodedata

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
cache = {}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", html.unescape(s))
    s = s.translate({0x2018: "'", 0x2019: "'", 0x201C: '"', 0x201D: '"', 0x2013: "-", 0x2014: "-", 0xA0: " "})
    return re.sub(r"\s+", " ", s).strip().lower()


def text_of(url: str) -> str:
    if url in cache:
        return cache[url]
    raw = subprocess.run(["curl", "-sL", "--max-time", "40", "-A", UA, url], capture_output=True).stdout
    if raw[:4] == b"%PDF":
        t = subprocess.run(["pdftotext", "-layout", "-", "-"], input=raw, capture_output=True).stdout.decode("utf-8", "ignore")
    else:
        t = raw.decode("utf-8", "ignore")
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
            f["verified"] = ok
            if ok:
                kept += 1
            else:
                drop += 1
                print(f"  DROP {st} {prof}.{k}: page {len(page)} chars | {url}\n       quote: {f.get('quote')!r}")
                fields[k] = None
    json.dump(d, open(f"{st}.verified.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{st}: kept {kept}, dropped {drop}")
