import globby from "globby";
import fm from "front-matter";
import { readFileSync } from "fs";
import { join, resolve } from "path";

const thisDir = (slug: string) => "src/routes/help/" + slug;

const thisSlug = (slug: string) => thisDir(slug).split("routes/")[1] + "/";

const pages = (slug: string) =>
  globby
    .sync(thisDir(slug) + "/*.svx")
    .map((s) => s.split(thisSlug(slug))[1])
    .filter((page) => page.endsWith(".svx") && !page.startsWith("index."));

export function get(req, res) {
  const { slug } = req.params;
  const result = pages(slug).reduce((prev: any, cur: string) => {
    const id = cur.slice(0, -4);
    prev[id] = {
      href: `${thisSlug(slug) + id}`,
      title:
        (fm(readFileSync(resolve(process.env.BASEPATH, thisDir(slug), cur), "utf-8")).attributes as any)
          .title || id,
    };
    return prev;
  }, {});
  res.end(JSON.stringify(result));
}
