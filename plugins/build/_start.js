class BuildStart {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("BuildStart", (params, callback) => {
      console.log("Build is starting.");
      const { ipfsCache, assetsCache } = require("./ipfs/init");
      params["ipfs-cache"] = ipfsCache;
      params["assets-cache-js"] = assetsCache;
      callback();
    });
  }
}

module.exports = BuildStart;
