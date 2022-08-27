import { isBrowser } from "$lib/store/states";
/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({}) {
  return { load: isBrowser ? new URL(location.href).searchParams.get("load") : "" };
}
