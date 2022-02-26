<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let duration = 5;
  let timer = setInterval(() => {
    duration--;
    if (!duration) clearInterval(timer);
  }, 1000);

  $: isTimerDone = duration <= 0;

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<section>
  <div class="ads-container">
    <div class="ads-square">Ads</div>
    <button on:click disabled={!isTimerDone}>Skip ads{duration ? ` (${duration})` : ""}</button>
  </div>
  <div class="pwa-promotion">
    <h2>Want to disable this ads? Sure you can!</h2>
    Here's the deal: we only show ads that brings money but slightly annoying to our guests. We don't
    want to do this. But creating content needs money. So how about you stop being guest, and become
    our friend instead?
    <br />
    Install our app! There's nothing to download, we promise. Just
    <strong>click this here to install</strong>, and click that prompt that showing--we're done!

    <ul>
      perks for friends who install our app:
      <li>Lift lots of chapter limitations for offline read</li>
      <li>
        Periodic syncing in the background to make sure our app be ready to serve you whenever
        wherever you want!
      </li>
      <li>
        Do you know, starting from Chrome 81 and Edge 84, you can receive chapter updates
        notifications if you pin our app to your taskbar?
      </li>
    </ul>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 48px;
    display: grid;
    grid-gap: 48px;
    grid-template-columns: minmax(250px, 1fr) 3fr;
  }

  .ads-container {
    .ads-square {
      width: 250px;
      height: 250px;
      background: #fff2;
      color: #000a;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      padding: 8px 16px;
      margin: 8px auto;
      display: block;
    }
  }

  .pwa-promotion {
    font-size: 15px;

    h2 {
      font-size: 2em;
      margin-top: 0;
    }

    strong {
      text-decoration: underline;
      color: var(--primary-color);
      cursor: pointer;
    }

    ul {
      margin-top: 16px;
    }
  }
</style>
