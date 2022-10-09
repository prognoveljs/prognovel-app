import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import purgeCSS from "@fullhuman/postcss-purgecss";
import { optimizeImports } from "carbon-preprocess-svelte";
import { readFileSync } from "fs";

let siteMetadata;
try {
  siteMetadata = JSON.parse(readFileSync("./.cache/assets/publish/sitemetadata.json", "utf-8"));
} catch (error) {
  console.error(error);
}

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: [".svelte", ".svx"],
  preprocess: [
    // optimizeImports(),
    mdsvex({
      layout: {
        help_child: "./src/routes/help/_child_layout.svelte",
      },
    }),
    preprocess({
      scss: {
        prependData: `
@use "sass:math";
@import "style/scss/global.scss";`,
      },
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
      fallback: "200.html",
    }),
    prerender: {
      entries: ["*", ...(siteMetadata?.novels || []).map((novel) => `/novel/${novel}/`)],
    },
    trailingSlash: "always",
    // vite: {

    // },
    files: {
      serviceWorker: "src/service-worker.ts",
    },
  },
};
