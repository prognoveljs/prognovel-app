export const CACHE_EXPIRE = 360 * 24 * 30 * 12 * 3; // 3 years
const MAX_AGE = 60;

export function getMaxAge() {
  return MAX_AGE;
}

export function isKVEnabled(): boolean {
  return false;
}

export function getCache() {
  // @ts-ignore
  return caches.default;
}

export function getCacheKey(event: FetchEvent, url: string): Request {
  const init = {
    headers: event.request.headers,
    method: 'GET',
  };

  return new Request(url, init);
}
