import fs from "fs";
import { CACHE_FOLDER } from "../_shared.js";
import chalk from "chalk";
import { join } from "path";

export async function start() {
  if (process.env.NODE_ENV === "development") {
    console.log(
      chalk.bold.green("[ProgNovel]:"),
      "Compiling novel placeholders are being skipped in DEV mode.",
    );
    console.log(
      chalk.bold.green("[ProgNovel]:"),
      "In case you meet",
      chalk.bold('"novel-placeholders.js not found"'),
      "or similar issues,",
    );
    console.log(
      "             please run",
      chalk.bold.yellow("npm run build"),
      "first with your computer connected to the internet.",
    );
    console.log("");
    return;
  }
  const siteMeta = JSON.parse(
    fs.readFileSync(join(CACHE_FOLDER, "assets/publish/sitemetadata.json"), "utf-8"),
  );
  const novels = siteMeta.novels;
  let js = `export const placeholders = JSON.parse('{`;

  for (const novel of novels) {
    const metadata = JSON.parse(
      fs.readFileSync(join(CACHE_FOLDER, `assets/publish/${novel}/metadata.json`)),
    );
    const placeholder = metadata.cover.placeholder;

    js += `"${novel}": "${placeholder}"`;
    if (novels.reverse()[0] !== novel) js += ",";
  }

  js += `}');`;

  if (!fs.existsSync(CACHE_FOLDER)) fs.mkdirSync(CACHE_FOLDER);

  fs.writeFileSync(CACHE_FOLDER + "/novel-placeholders.js", js);
}
