export { fontSize } from "./font-size";
export { fontWeight } from "./font-weight";

import { fontSizeInit } from "./font-size";
import { fontWeightInit } from "./font-weight";

export function readPageFontSettingsInit() {
  fontSizeInit();
  fontWeightInit();
}
