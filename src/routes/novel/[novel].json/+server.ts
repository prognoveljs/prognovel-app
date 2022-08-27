import { readFileSync } from "fs";
import { join, resolve } from "path";

/** @type {import('./[id]').RequestHandler} */
export function get({ params }) {
  const { novel } = params;
  let url;
  let novelMetadata = {};
  let status = 200;
  let message = "";

  url = `.cache/assets/publish/${novel}/metadata.json`;
  try {
    novelMetadata = JSON.parse(readFileSync(url, "utf-8"));
    status = 200;
  } catch (error) {
    status = 500;
    message = "Error when reading " + novel + " metadata from build cache.";
    console.error(error);
  }

  return {
    status,
    message,
    body: novelMetadata,
  };
}
