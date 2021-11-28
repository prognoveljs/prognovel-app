import globby from "globby";
import fm from "front-matter";
import { readFileSync } from "fs";
import { join, resolve } from "path";

const thisDir = "src/routes/help";
const thisDirSlug = (slug: string) => "src/routes/help/" + slug;
const folders = globby.sync(thisDirSlug("") + "*", { onlyDirectories: true });
let pages = globby
  .sync(thisDir + "/*.svx")
  .map((s) => s.split("/help/")[1])
  .filter((page) => page.endsWith(".svx") && !page.startsWith("index."));

const pagesOrder = pages.map((page: string): number => {
  const frontmatter = fm(readFileSync(resolve(process.env.BASEPATH, thisDir, page), "utf-8"));

  return (frontmatter.attributes as any)?.order ?? 99999;
});

pages = pages.sort((a: string, b: string): number => {
  const a_order = pagesOrder[pages.findIndex((s) => s === a)];
  const b_order = pagesOrder[pages.findIndex((s) => s === b)];
  return a_order - b_order;
});

export function get(req, res) {
  const result = pages.reduce(
    (prev: any, cur: string) => {
      // get id by slicing the .svx format
      const id = cur.slice(0, -4);
      prev.parent[id] = {
        href: `help/${id}`,
        title:
          (fm(readFileSync(resolve(process.env.BASEPATH, thisDir, cur), "utf-8")).attributes as any).title ||
          id,
      };
      return prev;
    },
    {
      parent: {},
      children: {},
    },
  );
  result.children = folders.reduce((prev, cur) => {
    const childMarkdowns = globby.sync(cur + "/*.svx");
    const slug = cur.split("help/")[1];
    prev[slug] = {};
    childMarkdowns.forEach((child) => {
      const childSlug = child.split("routes/")[1].split(".svx")[0];
      prev[slug][childSlug.split("/").slice(-1)] = {
        title:
          (fm(readFileSync(resolve(process.env.BASEPATH, child), "utf-8")).attributes as any).title ||
          childSlug.split("/").slice(-1),
        href: childSlug,
      };
    });
    return prev;
  }, {});
  res.end(JSON.stringify(result));
}
