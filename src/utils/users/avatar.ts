import md5 from "md5";
import { GravatarProfile } from "typings";

export function getGravatarURL(email: string, size?: number): string {
  return `https://www.gravatar.com/avatar/${md5(email)}`;
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
          const response = await fetch(`https://gravatar-proxy.b-cdn.net/${md5(email)}.json`);
          const data = await response.json();

          console.log(data);

          resolve(data.entry[0]);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
