import { ChapterState } from "./vars";
import type { Chapter } from "typings";

export const offlineText: Chapter = {
  title: "Cannot reach server.",
  html: `
      <p>Are you offline? If so, consider to enable offline reading so you don\'t
      have to see this friendly dinosaur again in the future.</p>
    `,
  meta: {
    error: "internet-is-offline.",
    status: ChapterState.Error,
  },
};

export const invalidChapter: Chapter = {
  title: "Invalid chapter.",
  html: `
      <p>Oops, invalid chapter! Please check if the URL you entered is correct.</p>
    `,
  meta: {
    error: "invalid-chapter",
    status: ChapterState.Error,
  },
};

export const connectionErrorPlaceholder: Chapter = {
  title: "Connection error!!1",
  html: `<p>We cannot reach the server. Very sad. Please check your internet connection.</p>
  `,
  meta: {
    error: "connection-to-server-error",
    status: ChapterState.Error,
  },
};
