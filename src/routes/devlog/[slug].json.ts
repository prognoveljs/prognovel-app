import { fetchPosts } from "./_posts";
import { readFileSync } from "fs";
import { createHash } from "crypto";

const authors = JSON.parse(readFileSync("devlog/profiles/authors.json", "utf-8"));
const lookup = new Map();

fetchPosts().forEach((post) => {
  lookup.set(
    post.slug,
    JSON.stringify({
      post,
      allAuthors: Object.keys(authors).reduce((prev, cur) => {
        prev[cur] = createHash("md5").update(authors[cur]).digest("hex");
        return prev;
      }, {}),
    }),
  );
});

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      }),
    );
  }
}
