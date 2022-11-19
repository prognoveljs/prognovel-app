import { browser } from "$app/environment";
import { backend } from "$lib/store/backend";
import { backendReady } from "$lib/utils/backend";
import { get as getStore } from "svelte/store";

// export let prerender = false;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  // if (browser) await backendReady;
  // const apiBackend = getStore(backend);
  // try {
  //   if (!apiBackend) throw "Backend has not yet established.";
  //   let novelData = await getStore(backend)?.collection('novels')?.getOne(params.dashboardNovelID);
  //   return {
  //     status: 200,
  //     novelData,
  //     id: params.dashboardNovelID,
  //   };
  // } catch (error) {
  //   return {
  //     status: 500,
  //     message: error || "Error with database connection.",
  //   };
  // }

  //
  return {};
}
