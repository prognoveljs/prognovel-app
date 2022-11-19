import { backend } from "$lib/store/backend";
import { backendReady } from "$lib/utils/backend";
import { get as getStore } from "svelte/store";

// export let prerender = false;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  // await backendReady;
  // const apiBackend = getStore(backend);
  // try {
  //   if (!apiBackend) throw "Backend has not yet established.";
  //   let userData = await getStore(backend)?.collection("users").getOne(params.userID);
  //   return {
  //     status: 200,
  //     userData,
  //     id: params.userID,
  //   };
  // } catch (error) {
  //   return {
  //     status: 500,
  //     message: error || "Error with database connection.",
  //   };
  // }

  return {};
}
