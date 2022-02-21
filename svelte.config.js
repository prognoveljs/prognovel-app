import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import ProgNovelCSS from "./plugins/build/themes/css-global.js";
import { join, resolve } from "path";
import { dynamicImport } from "vite-plugin-dynamic-import";
import { mdsvex } from "mdsvex";
import { searchForWorkspaceRoot } from "vite";

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: [".svelte", ".svx"],
  preprocess: [
    mdsvex(),
    preprocess({
      scss: { prependData: `@import "style/scss/global.scss";` },
      // scss: {},
    }),
  ],
  kit: {
    adapter: adapter(),
    // extensions: ['.svelte', '.svx']
    vite: {
      plugins: [dynamicImport(), ProgNovelCSS()],
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
