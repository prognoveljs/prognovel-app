import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import ProgNovelCSS from "./plugins/build/themes/css-global.js";
import { join, resolve } from "path";
import { dynamicImport } from "vite-plugin-dynamic-import";
import { mdsvex } from "mdsvex";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { optimizeCss, optimizeImports } from "carbon-preprocess-svelte";
import ProgNovelENV from "./prognovel.env.js";

// ProgNovelENV();

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: [".svelte", ".svx"],
  preprocess: [
    mdsvex({
      layout: {
        help_child: "./src/routes/help/_child_layout.svelte",
      },
    }),
    preprocess({
      scss: { prependData: `@import "style/scss/global.scss";` },
      // scss: {},
    }),
  ],
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        ProgNovelENV(),
        dynamicImport(),
        ProgNovelCSS(),
        optimizeImports(),
        // process.env.NODE_ENV === "production" && optimizeCss(),
      ],
      optimizeDeps: {
        include: [
          "flatpickr",
          "flatpickr/dist/l10n/index.js",
          "flatpickr/dist/plugins/rangePlugin",
          "crypto-js/md5.js",
        ],
        esbuildOptions: {
          plugins: [esbuildCommonjs(["cypto-js/md5.js"])],
        },
      },
      build: {
        commonjsOptions: {
          include: [
            "flatpickr",
            "flatpickr/dist/l10n/index.js",
            "flatpickr/dist/plugins/rangePlugin",
            "crypto-js/md5.js",
          ],
        },
      },
      ssr: {
        noExternal: ["plugins/web-components/prognovel-native-plugins.ts"],
      },
      resolve: {
        alias: {
          $src: "src/",
          "$style/": "style/",
          "$cache/": "./.cache/",
          "$routes/": "src/routes/",
          "$novel/": "src/routes/novel/",
          "$plugins/": "plugins/",
          $typings: "typings",
        },
      },
      server: {
        fs: {
          allow: [
            // your custom rules
            ".cache",
          ],
        },
      },
    },
  },
};
