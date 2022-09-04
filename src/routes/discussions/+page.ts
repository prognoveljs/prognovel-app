import { isBrowser } from "$lib/store/states";
/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  const { novel } = params;
  return { novel, load: isBrowser ? new URL(location.href).searchParams.get("load") : "" };
}
