const { duplicateAssetsToIPFS } = require("./ipfs/pinata");
const { checkPinataAPIKey, ipfsLogPrefix } = require("./ipfs/utils");
const { checkCacheFolderExist } = require("./_shared");

class IPFSPlugin {
  novelsToBeDuplicated = [];
  connectionError = false;

  constructor(
    opts = {
      prefix: "",
      unpinOldAssets: true,
    },
  ) {
    this.unpinOldAssets = opts.unpinOldAssets ? opts.unpinOldAssets : true;

    if (opts.prefix) {
      this.prefixInitial = opts.prefix;
    }

    checkCacheFolderExist();
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("IPFSDuplicatePlugin", (params, callback) => {
      if (checkPinataAPIKey() && process.env.NODE_ENV !== "development") {
        duplicateAssetsToIPFS(this)
          .then((result) => {
            callback();
          })
          .catch((err) => {
            console.log(ipfsLogPrefix, "Failed to connect to Pinata server. Check your internet connection.");
            console.log(ipfsLogPrefix, "Build will continue without outsourcing assets to IPFS.");
            this.connectionError = true;
          });
      } else {
        callback();
      }
    });

    // move this logic below to very end of build, possibly even after netlify
    // finished building site on their system.
    compiler.hooks.done.tap("IPFSDuplicatePlugin", (assets) => {
      if (this.novelsToBeDuplicated.length && this.unpinOldAssets && !this.connectionError) {
        // unpinOldIPFSAssets(this.novelsToBeDuplicated);
      }
    });
  }
}

module.exports = IPFSPlugin;
// module.exports.unpinOldAssets = unpinOldIPFSAssets;
