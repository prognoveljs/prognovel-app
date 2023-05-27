import { SiteMetadata } from "$typings";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }): Promise<Response> {
  return new Response(JSON.stringify({}));
}
