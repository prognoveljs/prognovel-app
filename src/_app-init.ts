/**
 *  Import this module with shorthand "init"
 *  For example:
 *
 *      import "init"
 *        or
 *      import("init").then(module => module.default())
 *
 */

import { webMonetizationInit } from "utils/web-monetization";
import { themeInit } from "utils/themes";
import { storagePersist } from "utils/storage";
import { mobileInit } from "utils/mobile";
import { saveDataInit } from "utils/save-data";
import { fetchSiteMetadata } from "utils/fetch-metadata";
import { signInCredentialModeInit } from "utils/users";
import { bookmarkInit } from "utils/bookmark";
import "utils/navigation/app-preload";

async function init() {
  const url = new URL(window.location.href);

  if (url.pathname !== "/") {
    try {
      fetchSiteMetadata();
    } catch (err) {
      if (typeof err === "string") console.error(err);
    }
  }
}

export default async () => {
  init();
  saveDataInit();
  webMonetizationInit();
  themeInit();
  storagePersist();
  mobileInit();
  signInCredentialModeInit();
  bookmarkInit();
};
