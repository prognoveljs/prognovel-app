<script lang="ts">
  import { registeredPlugins } from "$lib/store/read-page";
  import { isBrowser } from "$lib/store/states";
  import { onMount } from "svelte";

  onMount(() => {
    registerNativePlugins();
  });

  const registerNativePlugins = async () => {
    const tag = "native";
    if ($registeredPlugins.has(tag)) return;
    const { AuthorsNote, NovelTrivia } = await import(
      "../../../../plugins/web-components/prognovel-native-plugins"
    );
    window.customElements.define("novel-trivia", NovelTrivia);
    window.customElements.define("authors-note", AuthorsNote);
    $registeredPlugins.add(tag);
  };
</script>
