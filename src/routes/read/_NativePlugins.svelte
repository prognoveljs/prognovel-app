<script lang="ts">
  import { registeredPlugins } from "$lib/store/read-page";
  import { isBrowser } from "$lib/store/states";
  import { onMount } from "svelte";

  onMount(() => {
    if (!isBrowser) return;

    registerNativePlugins();
  });

  const registerNativePlugins = () => {
    const tag = "native";
    if ($registeredPlugins.has(tag)) return;
    import("../../../plugins/web-components/prognovel-native-plugins.ts")
      .then((plugin) => plugin.register())
      .catch((err) => {
        console.error("Error on establishing plugin authors-note");
        console.error(err);
      });

    $registeredPlugins.add(tag);
  };
</script>
