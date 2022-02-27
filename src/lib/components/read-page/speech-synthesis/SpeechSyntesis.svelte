<script lang="ts">
  import { currentContent } from "$lib/store/read-page";
  import { path } from "$lib/store/states";
  import {
    faAudioDescription,
    faFileAudio,
    faPause,
    faPlay,
    faStop,
    faVolumeUp,
  } from "@fortawesome/free-solid-svg-icons";
  import { onDestroy, onMount } from "svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { faAudible } from "@fortawesome/free-brands-svg-icons";

  let speech: SpeechSynthesis;
  let speechState: "playing" | "pause" | "stop" = "stop";
  onMount(() => {
    speech = speechSynthesis;
  });

  $: if ($path && speech) cancel();

  function play() {
    speechState = "playing";
    let text = "";
    document
      .querySelectorAll("#chapter-state-success > p")
      .forEach((para: HTMLParagraphElement) => {
        text += para.innerText + "\n";
      });

    console.log(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.75;
    utterance.rate = 0.9;
    speech.speak(utterance);
  }

  function pause() {
    speechState = "pause";
    speech.pause();
  }

  function cancel() {
    speechState = "stop";
    speech.cancel();
  }
  function resume() {
    speechState = "playing";
    speech.resume();
  }

  onDestroy(() => {
    if (speech) cancel();
  });
</script>

<div class="flex">
  {#if speechState === "stop"}
    <div class="btn" on:click={play}><Icon paddingBottom="3px" icon={faVolumeUp} /> Play audio</div>
  {:else}
    <div class="btn" on:click={cancel}><Icon paddingBottom="3px" icon={faStop} /></div>
    {#if speechState === "pause"}
      <div class="btn" on:click={resume}><Icon paddingBottom="3px" icon={faPlay} /> Resume</div>
    {:else}
      <div class="btn" on:click={pause}><Icon paddingBottom="3px" icon={faPause} /> Pause</div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .flex {
    .btn {
      padding: 4px 8px;
      border-radius: 1em;
      border: 1px solid var(--primary-color);
      display: inline-block;

      &:active {
        outline: none;
      }

      :globl(path) {
        color: #0005;
      }
    }
  }
</style>
