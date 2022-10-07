import { browser } from "$app/environment";
/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  const { novel } = params;
  return { novel, load: browser ? new URL(location.href).searchParams.get("load") : "" };
}
