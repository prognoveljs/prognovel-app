<script>
  import { fly } from "svelte/transition";
  import { cubicIn } from "svelte/easing";
  import { set } from "idb-keyval";
  import { onMount } from "svelte";

  let blobCookieImg;
  let laserEyesImg;
  let show;
  let state = "explain";

  onMount(async () => {
    const [blob, laser] = await Promise.all([
      fetch("/network/blobnomcookie.webp"),
      fetch("/network/laser-eyes.webp"),
    ]);
    blobCookieImg = blob.url;
    laserEyesImg = laser.url;

    // show the promt!
    show = true;
  });

  const cookieYes = async () => {
    show = false;
    // load analytic here
    await set("cookies-accept", true);
  };
  const cookieNo = async () => {
    show = false;
    await set("cookies-accept", false);
  };
</script>

{#if show}
  <div class="cookies" transition:fly={{ duration: 625, y: 100, ease: cubicIn }}>
    <div>
      <div class:angry={state === "cookie-no"} class="blob">
        <img src={blobCookieImg} alt="Cookie Blob" />
        <!-- {#if state === 'cookie-no'}
          <img src={laserEyesImg} alt="Laser Eyes!!1" />
        {/if} -->
      </div>
      {#if state === "explain"}
        <p>
          Want some internet cookies? We're using cookie magic to gather your basic data like visit stats and
          time spent so we can calculate stuff in our analytics. We do this because make better website and
          send you personalized ads.
        </p>
      {:else if state === "cookie-yes"}
        <p>
          Don't worry, we promise we're gonna take a good care of your data and not to use it irresponsible
          like selling to third party entities and other shady stuff.
        </p>
      {:else if state === "cookie-no"}
        <p>
          Et tu, anonymous reader?
          <span style="display: block;">
            Did you found out my cookies isn't necesserary to show you stuff?
          </span>
          <span style="font-weight: 700; display: block;"> Y U NO WANT MY COOKIES?! </span>
        </p>
      {/if}
    </div>
    <section on:mouseleave={() => (state = "explain")}>
      <button on:mouseover={() => (state = "cookie-no")} class="cookies__no" on:click={cookieNo}>
        {state === "cookie-no" ? "Bcz privacy is my hooman right." : "No, please don't track me."}
      </button>
      <button on:mouseover={() => (state = "cookie-yes")} on:click={cookieYes}>
        {state === "cookie-yes" ? "Cool! Now buzz off and let me read." : "Okay sure, whatever."}
      </button>
    </section>
  </div>
  <div class="overlay" transition:fly={{ delay: 125, y: 50, duration: 1255, easing: cubicIn }} />
{/if}

<style>
  .cookies {
    --width: 600px;
    width: var(--width);
    min-height: 260px;
    padding: 24px;
    background-color: hsl(var(--primary-color-h), var(--primary-color-s), 44%);
    border-radius: 6px;
    box-shadow: 0 8px 12px #0002, 0 12px 24px #0001;
    color: #fff;
    position: fixed;
    bottom: 24px;
    left: calc(50% - var(--width) / 2);
    z-index: 99999;
    display: grid;
    grid-template-rows: 1fr 45px;
  }
  .cookies p {
    padding: 24px;
    margin: 0 auto;
  }

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    padding: 0 24px;
  }

  button {
    padding: 12px;
  }
  .blob {
    position: absolute;
    right: calc(20% + 100px);
    top: -86px;
  }
  .blob img {
    position: absolute;
  }
  .angry {
    transform: scale(1.2);
    animation: 0.2s angry;
    animation-iteration-count: infinite;
  }
  @keyframes angry {
    0% {
      transform: translate(4px, 2px);
    }
    10% {
      transform: translate(-4px, -4px);
    }
    30% {
      transform: translate(-2px, 4px);
    }
    68%,
    72% {
      transform: translate(1px, 1px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  :global(blob:not(.angry)) {
    transform: translate(0, 0);
  }

  .overlay {
    position: fixed;
    z-index: 99998;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    background: linear-gradient(0deg, #000a, #0005 60%, #0000);
  }
</style>
