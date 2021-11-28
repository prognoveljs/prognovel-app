const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const path = require("path");

module.exports = {
  optimization: { minimize: false },
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false,
  },
  plugins: [
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, ".cache/build-cache/functions/[confighash]"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?(ts|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheCompression: false,
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: true,
                  },
                },
              ],
            ],
            plugins: [],
          },
        },
      },
    ],
  },
};
