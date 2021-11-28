// require("./duplicate-to-ipfs").unpinOldAssets();
// const { CACHE_FOLDER, SAPPER_EXPORT_FOLDER } = require("./_shared");
// require("fs").copyFileSync(CACHE_FOLDER + "/sitemetadata.json", SAPPER_EXPORT_FOLDER + "/sitemetadata.json");

require("../append-preload");
require("./bundle-analyzer")();
