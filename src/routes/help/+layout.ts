export const prerender = true;

/** @type {import('@sveltejs/kit').LayoutLoad} */
export async function load({ params, fetch }) {
  const { slug } = params;
  let res = await fetch(`/help.json`);
  // let res = await this.fetch(`${path.split("/").slice(0, -1).join("/") || path}.json`);
  let { parent, children } = await res.json();
  return { parent, children };
}
