import ncpModule from "ncp";
import { assetsFolder } from "./_shared.js";
import { start } from "./compile-novels-placeholder.js";

const destinationFolder = "static";

ncpModule.ncp(assetsFolder, destinationFolder, () => {});
start();
