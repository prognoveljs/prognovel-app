import { assets } from "./_vars";

export function validCacheKey(key: string): boolean {
  return key === assets.name || key === "fonts";
}
