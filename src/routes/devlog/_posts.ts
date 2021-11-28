// import globby from "globby";
import { sync as globby } from "globby";
import fm from "front-matter";
import md from "marked";
import { writeFileSync, readFileSync } from "fs";
import type { Post, PostAttributes } from "./_post-attributes";

export function fetchPosts(): Post[] {
  const markdowns = globby("devlog/*.md").filter((file) => !file.includes("/!"));
  const posts = markdowns.map((markdown) => {
    let mdFilePath = process.env.BASEPATH + "/" + markdown;
    let frontmatter: {
      body: string;
      attributes: PostAttributes;
    } = fm(readFileSync(mdFilePath).toString());
    if (!frontmatter.attributes.createdAt) frontmatter = stampCreatedAt(frontmatter, markdown);
    return {
      title: frontmatter.attributes.title,
      attributes: frontmatter.attributes,
      slug: markdown.slice(7, -3),
      html: md(frontmatter.body) as string,
    };
  });

  return posts;
}

function stampCreatedAt(frontmatter, markdown) {
  const date = new Date();
  let mdFilePath = process.env.BASEPATH + "/" + markdown;
  let mdFile = readFileSync(mdFilePath).toString();
  // TODO look for second occurance regEx
  writeFileSync(mdFilePath, mdFile.replace(/(---)[1]/, `createdAt: ${date}\n---`));

  frontmatter.attributes.createdAt = date;
  return frontmatter;
}
