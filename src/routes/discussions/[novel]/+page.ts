export const prerender = false;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  const { novel } = params;
  return { novel };
}
