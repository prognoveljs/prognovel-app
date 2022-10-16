/**
 *  Import this module with shorthand "init"
 *  For example:
 *
 *      import "init"
 *        or
 *      import("init").then(module => module.default())
 *
 */

import { webMonetizationInit } from "$lib/utils/web-monetization";
import { themeInit } from "$lib/utils/themes";
import { storagePersist } from "$lib/utils/storage";
import { mobileInit } from "$lib/utils/mobile";
import { saveDataInit } from "$lib/utils/save-data";
import { fetchSiteMetadata } from "$lib/utils/fetch-metadata";
import { signInCredentialModeInit } from "$lib/utils/users";
import { bookmarkInit } from "$lib/utils/bookmark";
import "$lib/utils/navigation/app-preload";
import { loadWorklet } from "$lib/utils/animation";
import { connectDatabase } from "$lib/utils/backend";
import { initializePaypal } from "$lib/utils/payments/paypal";

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
  loadWorklet();
  connectDatabase();
  initializePaypal();
};
