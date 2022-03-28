import fs from "fs";
import { CACHE_FOLDER } from "../_shared.js";
import chalk from "chalk";
import { join } from "path";
import sharp from "sharp";

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
  siteMeta.novels.forEach((novel) => {
    sharp(join(CACHE_FOLDER, `/assets/publish/${novel}/cover-64.webp`))
      .resize(32, 32)
      .jpeg({ quality: 30 })
      .toFile(join(CACHE_FOLDER, `/assets/publish/${novel}/placeholder.jpeg`));
  });
}
