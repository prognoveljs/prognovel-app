export function adsInit(usingCookies = true) {
  if (usingCookies) {
    console.log("Ads with cookies has been fired!");
  } else {
    console.log("Privacy aware ads has been fired!");
  }
}
