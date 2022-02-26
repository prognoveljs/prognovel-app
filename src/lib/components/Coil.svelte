<script>
  import { onMount } from "svelte";

  let hide = true;
  let headerHeight = 43.2;
  let STARTUP_DELAY = 1750;

  onMount(async () => {
    await new Promise((resolve) => setTimeout(resolve, STARTUP_DELAY));
    hide = document.monetization !== undefined;
  });
</script>

<div class="coil" class:hide>
  <h4 on:click={() => (hide = !hide)} class:outline={!hide}>Subscribe to Coil (COOMING SOON)</h4>
  <p>
    ✅
    <span class="space" />
    No ads
  </p>
  <p>
    ✅
    <span class="space" />
    Advanced chapters
  </p>
  <p>
    ✅
    <span class="space" />
    Advanced site customizations
  </p>
  <p>
    ✅
    <span class="space" />
    Pay once, works across ProgNovel sites.
  </p>
</div>

<style>
  .coil {
    position: fixed;
    bottom: 0;
    right: 10%;
    width: 400px;
    height: 173.2px;
    background: var(--foreground-color);
    box-shadow: 0 2px 12px #0004;
    z-index: 70;
    display: none;

    transition: transform 0.425s ease-in-out;
  }
  @media only screen and (min-width: 1024px) {
    .hide {
      transform: translateY(130px);
    }

    .coil {
      display: block;
    }
  }

  h4 {
    font-weight: 700;
    color: hsl(var(--primary-color-h), var(--primary-color-s), 65%);
    background: #3336;
    padding: 12px 18px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 18px;
    outline: 1px solid
      hsla(var(--primary-color-h), var(--primary-color-s), var(--primary-color-l), 0.35);
  }
  .hide > h4 {
    outline-color: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--primary-color-l),
      0.65
    );
  }
  h4:hover {
    outline-color: var(--primary-color);
  }
  p {
    padding: 0 18px;
    margin: 4px 0;
    line-height: 1.2;
  }
  .space {
    margin-left: 8px;
  }
</style>
