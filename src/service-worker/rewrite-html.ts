import { DEFAULT_PRIMARY_COLOR, colorRegex } from "utils/color/_vars";
import { get } from "idb-keyval";
import type { Color } from "typings";

export const rewriteHTML = async (response: Response, preload = {}) => {
  try {
    let darkMode: boolean | undefined = (await get("darkMode")) ?? true;
    let primaryColor: Color | undefined = await get("primary-color");
    if (primaryColor === undefined) primaryColor = DEFAULT_PRIMARY_COLOR;
    const carbonCSS = darkMode ? "carbon-css/g90.css" : "carbon-css/g10.css";

    // TODO - process HTML prerender in stream

    let html = new Response(
      (await response.text())
        .replace(`<html`, `<html` + isDarkMode(darkMode))
        .replace(colorRegex.hue, primaryColor.hue)
        .replace("carbon-css/g90.css", carbonCSS)
        .replace(colorRegex.saturate, primaryColor.saturate)
        .replace(colorRegex.light, primaryColor.light)
        .replace("</head>", `${appendPreload(preload)}</head>`),
      {
        headers: { "Content-Type": "text/html" },
      },
    );
    console.timeEnd("Service worker HTML prerender");
    return html;
  } catch (err) {
    console.error("Error when rewriting HTML in the service worker.");
    return response;
  }
};

function isDarkMode(darkMode: boolean | undefined): string {
  if (darkMode === undefined) darkMode = true;
  return darkMode === false ? ' class="light"' : "";
}

function appendPreload(preload): string {
  let urls = "";

  // TODO append preload scripts based on url path
  for (const i in preload) {
    urls += `<link rel="preload" href="${preload[i]}" as="script">`;
  }

  return urls;
}
