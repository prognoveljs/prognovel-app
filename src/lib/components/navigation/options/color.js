import { writable, get } from "svelte/store";
import { set as setIDB } from "idb-keyval";

export const activeColor = writable("");

export function setColor(hue, saturate, light, button) {
  const name = button.dataset.colorName;

  if (name !== get(activeColor)) {
    updateColorDOM(hue, saturate, light);
    setIDB("primary-color", { hue, saturate, light });
    setIDB("theme-active-color", name);
    activeColor.set(name);
    console.log("Changing color theme to", name);
  }
}

function updateColorDOM(hue, saturate, light) {
  document.querySelector("html").style.setProperty("--primary-color-h", hue);
  document.querySelector("html").style.setProperty("--primary-color-s", saturate + "%");
  document.querySelector("html").style.setProperty("--primary-color-l", light + "%");
}
