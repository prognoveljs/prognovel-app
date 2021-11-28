import type { Color, ColorRegex } from "typings";

export const DEFAULT_PRIMARY_COLOR: Color = {
  hue: "15",
  saturate: "100",
  light: "50",
};

export const colorRegex: ColorRegex = {
  hue: /(?<=--primary-color-h:)(.*?)(?=;)/,
  saturate: /(?<=--primary-color-s:)(.*?)(?=%;)/,
  light: /(?<=--primary-color-l:)(.*?)(?=%;)/,
};
