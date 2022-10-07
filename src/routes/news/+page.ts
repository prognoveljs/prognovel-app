import { browser } from "$app/environment";
/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  return { load: browser ? new URL(location.href).searchParams.get("load") : "" };
}
