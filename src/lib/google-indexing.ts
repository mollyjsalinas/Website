import { GoogleAuth } from "google-auth-library";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

type ServiceAccount = {
  client_email?: string;
  private_key?: string;
};

function serviceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON is not configured.");

  let credentials: ServiceAccount;
  try {
    credentials = JSON.parse(raw) as ServiceAccount;
  } catch {
    throw new Error("GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Google service-account credentials are incomplete.");
  }

  return credentials;
}

export async function notifyGoogleOfUpdatedUrl(url: string): Promise<void> {
  const auth = new GoogleAuth({ credentials: serviceAccount(), scopes: [INDEXING_SCOPE] });
  const client = await auth.getClient();

  await client.request({
    url: PUBLISH_URL,
    method: "POST",
    data: { url, type: "URL_UPDATED" },
  });
}
