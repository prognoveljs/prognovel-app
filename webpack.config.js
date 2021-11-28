const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");
require("dotenv").config();
let preprocess;
try {
  preprocess = require("./svelte.config").preprocess;
} catch (error) {
  console.log("--- Svelte Preprocess Errors ---");
  console.log(error);
  // throw error;
}
const {
  alias,
  mainFields,
  extensions,
  swc,
  swc_prod,
  babel,
  getClientPlugins,
  getServiceWorkerPlugins,
  getServerPlugins,
} = require("./webpack-build.config");
const path = require("path");
const chalk = require("chalk");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

if (dev) {
  console.log("   ", chalk.bold.bgGreen.whiteBright(" ProgNovel started in DEVELOPMENT mode. "));
  console.log("");
} else {
  console.log("");
  console.log("   ", chalk.bold.bgYellow.whiteBright(" ProgNovel started in PRODUCTION mode. "));
  console.log("");
}

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: {
      extensions,
      mainFields,
      alias,
      symlinks: false
    },
    module: {
      rules: [
        babel,
        {
          test: /\.(svelte|svx|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess,
              dev,
              hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
            },
          },
        },
      ],
    },
    mode,
    plugins: getClientPlugins().filter(Boolean),
    devtool: dev && "inline-source-map",
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { extensions, mainFields, alias, symlinks: false },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    plugins: getServerPlugins(),
    module: {
      rules: [
        babel,
        {
          test: /\.(svelte|svx|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess,
              css: false,
              generate: "ssr",
              dev,
            },
          },
        },
      ],
    },
    mode,
    performance: {
      hints: false, // it doesn't matter if server.js is large
    },
  },

  serviceworker: {
    plugins: getServiceWorkerPlugins(),
    resolve: {
      extensions: [".ts", ".js", ".json"],
      alias,
      symlinks: false
    },
    module: {
      rules: [babel],
    },
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode,
  },
};
