import { globbySync } from "globby";
import fm from "front-matter";
import { readFileSync } from "fs";
import { join, resolve } from "path";

export const prerender = true;

const thisDir = (slug: string) => "src/routes/help/" + slug;

const thisSlug = (slug: string) => thisDir(slug).split("routes/")[1] + "/";

const pages = (slug: string) =>
  globbySync(thisDir(slug) + "/*.svx")
    .map((s) => s.split(thisSlug(slug))[1])
    .filter((page) => page.endsWith(".svx") && !page.startsWith("+page."));

export function GET(req, res) {
  const { slug } = req.params;
  const result = pages(slug).reduce((prev: any, cur: string) => {
    const id = cur.replace(".svx", "").replace("+page", "");
    prev[id] = {
      href: `${thisSlug(slug) + id}`,
      title:
        (
          fm(readFileSync(resolve(import.meta.env.BASEPATH, thisDir(slug), cur), "utf-8"))
            .attributes as any
        ).title || id,
    };
    return prev;
  }, {});

  return new Response(JSON.stringify(result));
}
