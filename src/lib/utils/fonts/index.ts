export { fontSize } from "./font-size";
export { fontWeight } from "./font-weight";

import { colorContrastInit } from "./background-contrast";
import { colorHueInit } from "./background-hue";
import { fontSizeInit } from "./font-size";
import { fontWeightInit } from "./font-weight";

export function readPageSettingsInit() {
  fontSizeInit();
  fontWeightInit();
  colorContrastInit();
  colorHueInit();
}
