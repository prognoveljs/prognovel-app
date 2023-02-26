export async function loadHomepageLazyComponents() {
  try {
    const load = await import("$lib/components/home-page/ComponentsLazy.svelte");
    return load.default;
  } catch (err) {
    console.error("Error downloading HomeWarning module.", err);
    return;
  }
}
