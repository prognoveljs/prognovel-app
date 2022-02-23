class BuildStart {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("BuildStart", (params, callback) => {});
  }
}

module.exports = BuildStart;
