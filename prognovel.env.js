import { readFileSync } from "fs";
import { join } from "path";
import EnvironmentPlugin from "vite-plugin-environment";

export default () => {
  const metadata = JSON.parse(
    readFileSync(join(".cache/assets/publish/sitemetadata.json"), "utf-8"),
  );

  return EnvironmentPlugin(
    {
      BASE_PATH: process.cwd(),
      CACHE_PATH: join(process.cwd(), ".cache"),
      SITE_TITLE: metadata?.site_title || "ProgNovel App",
      IMAGE_RESIZER_SERVICE: metadata?.image_resizer_service || "http://localhost",
      BACKEND_API: process.env.BACKEND_API || "http://localhost",
    },
    {
      defineOn: "import.meta.env",
    },
  );
};
