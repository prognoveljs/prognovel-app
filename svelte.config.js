import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import ProgNovelCSS from "./plugins/onbuild/themes/css-global.js";
import { join, resolve } from "path";
import { dynamicImport } from "vite-plugin-dynamic-import";
import { mdsvex } from "mdsvex";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { optimizeCss, optimizeImports } from "carbon-preprocess-svelte";
import ProgNovelENV from "./prognovel.env.js";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import purgeCSS from "@fullhuman/postcss-purgecss";
import { readFileSync } from "fs";

const siteMetadata = JSON.parse(readFileSync("./.cache/assets/publish/sitemetadata.json", "utf-8"));

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
    }),
    postcss([
      autoprefixer(),
      purgeCSS({
        content: ["./build/**/*.html", "./build/**/*.js", "./build/**/*.css"],
      }),
    ]),
  ],
  kit: {
    adapter: adapter({
      onError: ({ status, path, referrer, referenceType }) => {
        if (path.startsWith("/blog")) throw new Error("Missing a blog page!");
        console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ""}`);
      },
    }),
    prerender: {
      default: true,
      entries: ["*", ...siteMetadata.novels.map((novel) => `/novel/${novel}/`)],
    },
    trailingSlash: "always",
    vite: {
      build: {
        rollupOptions: {
          external: ["@beyonk/async-script-loader"],
        },
      },
      plugins: [
        ProgNovelENV(),
        dynamicImport(),
        ProgNovelCSS(),
        optimizeImports(),
        dynamicImport(),
        // process.env.NODE_ENV === "production" && optimizeCss(),
      ],
      optimizeDeps: {
        include: [],
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
    },
    files: {
      serviceWorker: "src/service-worker.ts",
    },
  },
};
