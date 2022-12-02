import { sveltekit } from "@sveltejs/kit/vite";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { optimizeCss, optimizeImports } from "carbon-preprocess-svelte";
import ProgNovelENV from "./prognovel.env.js";
import ProgNovelCSS from "./plugins/onbuild/themes/css-global.js";
import { join, resolve } from "path";
import { dynamicImport } from "vite-plugin-dynamic-import";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import CustomHmr from "./plugins/vite/custom-hmr.js";

export default {
  build: {
    rollupOptions: {
      external: ["@beyonk/async-script-loader"],
    },
  },
  plugins: [
    viteCommonjs(),
    sveltekit(),
    ProgNovelENV(),
    dynamicImport(),
    ProgNovelCSS(),
    optimizeImports(),
    dynamicImport(),
    CustomHmr(),
    // process.env.NODE_ENV === "production" && optimizeCss(),
  ],
  optimizeDeps: {
    include: [],
    // exclude: ["@paypal/paypal-js"],
    esbuildOptions: {},
  },
  ssr: {
    noExternal: ["plugins/web-components/prognovel-native-plugins.ts"],
  },
  resolve: {
    alias: {
      $src: "src/",
      $typings: "typings",
    },
  },
  server: {
    fs: {
      allow: [
        // your custom rules
        ".cache",
        "plugins",
      ],
    },
  },
};
