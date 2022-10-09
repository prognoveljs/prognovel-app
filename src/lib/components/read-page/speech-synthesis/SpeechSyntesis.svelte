<script lang="ts">
  import { path } from "$lib/store/states";
  import { faPause, faPlay, faStop, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
  import { onDestroy, onMount } from "svelte";
  import SpeechSynthesisButton from "./SpeechSynthesisButton.svelte";

  export let volumeAndChapter: string;

  let speech: SpeechSynthesis;
  let utterance: SpeechSynthesisUtterance;
  let speechState: "playing" | "pause" | "stop" = "stop";
  onMount(() => {
    speech = speechSynthesis;
  });

  $: if ($path && speech) stop();

  function play(index: string) {
    let text = "";
    speechState = "playing";
    document
      .querySelectorAll(`#chapter-state-success-${index} > p`)
      .forEach((para: HTMLParagraphElement) => {
        text += para.innerText + "\n";
      });
    console.log(text);
    if (!text) return;
    text =
      `${document.querySelector(`#chapter-index-${index}`).textContent}. ${
        document.querySelector(`#chapter-title-${index}`).textContent
      }\n\n\n` + text;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.75;
    utterance.rate = 0.9;
    speech.speak(utterance);
    utterance.addEventListener("end", onSpeechEnd, { once: true });
  }

  async function onSpeechEnd(e: SpeechSynthesisEvent) {
    console.log(e);

    // stop();
    // const nextChapter: HTMLAnchorElement = document.querySelector("a#next-chapter");
    // if (!nextChapter) return;
    // goto(nextChapter.href);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // play();
  }

  function pause() {
    speechState = "pause";
    speech.pause();
  }

  function stop() {
    speechState = "stop";
    speech.cancel();
  }
  function resume() {
    speechState = "playing";
    speech.resume();
  }

  onDestroy(() => {
    if (speech) stop();
  });
</script>

<div class="flex">
  {#if speechState === "stop"}
    <SpeechSynthesisButton icon={faVolumeUp} on:click={() => play(volumeAndChapter)}
      >Play audio</SpeechSynthesisButton
    >
  {:else}
    <SpeechSynthesisButton icon={faStop} on:click={stop} />
    {#if speechState === "pause"}
      <SpeechSynthesisButton icon={faPlay} on:click={resume}>Resume</SpeechSynthesisButton>
    {:else}
      <SpeechSynthesisButton icon={faPause} on:click={pause}>Pause</SpeechSynthesisButton>
    {/if}
  {/if}
</div>

<style lang="scss">
  .flex {
    display: flex;
  }
</style>
