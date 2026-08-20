/**
 * IndexNow API Protocol Integration
 * Notifies search engines (Bing, Yandex, Seznam, Naver) of content updates in real-time.
 */

const INDEXNOW_KEY = "3a8b9f1c4e7d2a5b8e1f4c7d0a3b6e9f";
const DOMAIN = "https://dswreturnrefund.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export async function notifyIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) return false;

  const absoluteUrls = urls.map((url) =>
    url.startsWith("http") ? url : `${DOMAIN}${url.startsWith("/") ? url : `/${url}`}`
  );

  const payload: IndexNowPayload = {
    host: "dswreturnrefund.com",
    key: INDEXNOW_KEY,
    keyLocation: `${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls,
  };

  try {
    // Session cache check to avoid redundant API pings during local navigation
    const cacheKey = `indexnow_${absoluteUrls.sort().join("_")}`;
    if (sessionStorage.getItem(cacheKey)) {
      return true;
    }

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      sessionStorage.setItem(cacheKey, "notified");
      console.log(`[IndexNow] Successfully notified search engines for ${urls.length} URLs`);
      return true;
    }
  } catch (err) {
    // Graceful fallback for offline / dev preview environments
    console.warn("[IndexNow] Notification deferred or pending endpoint verification:", err);
  }

  return false;
}
