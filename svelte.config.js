const sveltePreprocess = require("svelte-preprocess");
const { mdsvex } = require("mdsvex");
const { join } = require("path");

module.exports.preprocess = [
  sveltePreprocess({
    postcss: {
      plugins: [require("autoprefixer")],
    },
    scss: { prependData: `@import "${join(__dirname, "./style/scss/global.scss")}";` },
  }),
  mdsvex({
    layout: {
      help_child: join(__dirname, "./src/routes/help/_child_layout.svelte"),
    },
  }),
];
