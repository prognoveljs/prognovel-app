import { get as getIDB } from "idb-keyval";

export function themeInit() {
  getIDB("darkMode").then((dark: boolean) => {
    if (dark === false) {
      document.querySelector("html").classList.add("light");
      // (document.querySelector("#carbon-css") as HTMLLinkElement).href = "/style/carbon-css/g10.css";
    }
  });

  getIDB("primary-color").then((color: { hue: string; saturate: string; light: string }) => {
    if (!color) return;
    const { hue, saturate, light } = color;
    document.querySelector("html").style.setProperty("--primary-color-h", hue);
    document.querySelector("html").style.setProperty("--primary-color-s", saturate + "%");
    document.querySelector("html").style.setProperty("--primary-color-l", light + "%");
  });
}
