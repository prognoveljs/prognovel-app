<script lang="ts">
  import { currentContent } from "$lib/store/read-page";
  import { path } from "$lib/store/states";

  import { onDestroy, onMount } from "svelte";

  let speech: SpeechSynthesis;
  onMount(() => {
    speech = speechSynthesis;
  });

  $: if ($path && speech) speech.cancel();

  function play() {
    let text = "";
    document
      .querySelectorAll("#chapter-state-success > p")
      .forEach((para: HTMLParagraphElement) => {
        text += para.innerText + "\n";
      });

    console.log(text);

    const utterance = new SpeechSynthesisUtterance(text);
    speech.speak(utterance);
  }

  function pause() {
    speech.pause();
  }

  onDestroy(() => {
    speech.cancel();
  });
</script>

<button on:click={play}>play</button>
<button on:click={pause}>pause</button>
