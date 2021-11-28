import { fetchPosts } from "./_posts";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { createHash } from "crypto";
import type { Post } from "./_post-attributes";

const authors = JSON.parse(readFileSync("devlog/profiles/authors.json", "utf-8"));

let contents = {
  posts: fetchPosts().map((post: Post) => {
    let html = "";
    try {
      html = getTextPreview(post.html);
    } catch (err) {
      console.error("Error:", err);
    }
    return {
      title: post.title,
      slug: post.slug,
      date: post.attributes.createdAt,
      cover: post.attributes.cover,
      authors: post.attributes.authors || "",
      html,
    };
  }),
  authors: Object.keys(authors).reduce((prev, cur) => {
    prev[cur] = createHash("md5").update(authors[cur]).digest("hex");
    return prev;
  }, {}),
};

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(contents));
}

function getTextPreview(raw: string, maxWords = 300) {
  const { document } = new JSDOM(`<body>${raw}</body>`).window;
  let nodes = document.body.querySelectorAll("p");
  let words = 0;
  let i = 0;
  let html = "";

  while (words < maxWords && i <= nodes.length - 1) {
    words += nodes[i]?.textContent?.length || 0;
    html += `<p>${nodes[i]?.innerHTML || ""}</p>`;
    i++;
  }

  return html;
}
