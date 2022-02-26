import { writable, get as getStore } from "svelte/store";
import { set, get } from "idb-keyval";

export const activeColor = writable("");

export function setColor(hue, saturate, light, button) {
  const name = button.dataset.colorName;

  if (name !== getStore(activeColor)) {
    updateColorDOM(hue, saturate, light);
    set("primary-color", { hue, saturate, light });
    set("theme-active-color", name);
    activeColor.set(name);
    console.log("Changing color theme to", name);
  }
}

function updateColorDOM(hue, saturate, light) {
  document.querySelector("html").style.setProperty("--primary-color-h", hue);
  document.querySelector("html").style.setProperty("--primary-color-s", saturate + "%");
  document.querySelector("html").style.setProperty("--primary-color-l", light + "%");
}
