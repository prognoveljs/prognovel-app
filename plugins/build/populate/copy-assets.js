const { ncp } = require("ncp");
const { assetsFolder } = require("./_shared");

const destinationFolder = "static";

ncp(assetsFolder, destinationFolder, () => {});
require("./compile-novels-placeholder").start();
