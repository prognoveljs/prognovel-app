import sass from "sass";
import chalk from "chalk";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { minify } from "html-minifier";

const raw = {
  cssVariables: readFileSync(resolve("./style/build-plugin/cssVariables.scss")).toString(),
  cssMiscs: readFileSync(resolve("./style/build-plugin/cssMiscs.scss")).toString(),
  cssLazy: readFileSync(resolve("./plugins/onbuild/themes/css-plugin-lazy.scss")).toString(),
};

let htmlTemplate = readFileSync(resolve("./src/_@raw-template.html")).toString();

let targetTemplatePath = resolve("./src/app.html");
const cssPluginLogPrefix = chalk.bold.yellow("[CSS Plugin]:");

export default function ProgNovelCSSPlugin() {
  const virtualModuleId = "prognovel-css-plugin";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "prognovel-css", // required, will show up in warnings and errors
    buildStart() {
      htmlTemplate = `<!-- THIS IS GENERATED FROM FILE _@raw-template.html 
- DO NOT EDIT THIS FILE DIRECTLY! -->
${htmlTemplate}`;

      const result = Object.keys(raw).reduce((prev, cur) => {
        const process = sass.renderSync({ data: raw[cur] }).css.toString("utf-8");
        prev[cur] = minify(process, {
          minifiyCSS: true,
          collapseWhitespace: true,
        }).toString();
        return prev;
      }, {});

      // const cssVariables = sass.renderSync({ data: raw.cssVariables }).css.toString("utf-8");
      // const cssVariablesResult = minify(cssVariables, {
      //   minifiyCSS: true,
      //   collapseWhitespace: true,
      // }).toString();
      // const cssMiscs = sass.renderSync({ data: raw.cssMiscs }).css.toString("utf-8");
      // const cssMiscsResult = minify(cssMiscs, { minifiyCSS: true, collapseWhitespace: true }).toString();

      writeFileSync(
        targetTemplatePath,
        htmlTemplate
          .replace("%css%", `<style>${result.cssVariables + result.cssMiscs}</style>`)
          .replace("%css.lazy%", `<style>${result.cssLazy}</style>`),
      );

      if (process.env.NODE_ENV !== "development") {
        console.log(cssPluginLogPrefix, "Done rewriting template.html with custom global CSS.");
      }
    },
  };
}
