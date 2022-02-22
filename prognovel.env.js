import { readFileSync } from "fs";
import { join } from "path";

export default () => {
  import.meta.env.BASEPATH = process.cwd();
  import.meta.env.CACHEPATH = ".cache";
  const metadata = JSON.parse(
    readFileSync(join(import.meta.env.CACHEPATH, "assets/publish/sitemetadata.json"), "utf-8"),
  );
  import.meta.env.SITE_TITLE = metadata?.title;
};
