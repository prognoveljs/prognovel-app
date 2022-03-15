import { MD5 } from "crypto-es/lib/md5.js";
import type { GravatarProfile } from "$typings";

export function getGravatarURL(email: string, size?: number): string {
  return `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
}

export function getUser(email?: string) {
  return {
    name: "",
    avatar: email
      ? getGravatarURL(email)
      : `https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg`,
    getData: function (): Promise<GravatarProfile> {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`https://gravatar-proxy.b-cdn.net/${MD5(email)}.json`);
          const data = (await response.json()) as any;

          resolve(data.entry[0]);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
