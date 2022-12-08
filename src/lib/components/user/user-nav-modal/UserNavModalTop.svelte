<script lang="ts">
  import coinSVG from "$lib/assets/svg/coin-1.svg";
  import { profile, userData } from "$lib/store/user";
  import { coin } from "$lib/store/user-data/coin";
  import CoinButton from "$lib/components/user/coin/CoinButton.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const DEFAULT_WELCOME_TEXT = "Howdy";

  function getWelcomeText() {
    if (!browser) return DEFAULT_WELCOME_TEXT;
    let curHr = new Date().getHours();

    if (curHr < 10) {
      return "Good morning";
    } else if (curHr < 18) {
      return DEFAULT_WELCOME_TEXT;
    } else if (curHr < 22) {
      return "Good evening";
    }

    return DEFAULT_WELCOME_TEXT;
  }
</script>

<section>
  <div class="name">
    {getWelcomeText()},
    {$profile?.username || "..."}
  </div>
  <div class="coin">
    <span class="label">
      <img src={coinSVG} width="auto" height="24" alt="Coin" />
      My coin
    </span>
    <span class="value">
      {$coin ?? "--"}
    </span>
    <CoinButton />
  </div>
</section>

<style lang="scss">
  section {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background: linear-gradient(
      120deg,
      var(--primary-color-darken-2) 0%,
      var(--primary-color-darken-1) 75%,
      var(--primary-color-lighten-2) 100%
    );

    margin: {
      top: calc(-1 * var(--padding-top));
      right: calc(-1 * var(--padding-side));
      left: calc(-1 * var(--padding-side));
    }
    padding: {
      top: var(--padding-top);
      right: var(--padding-side);
      left: var(--padding-side);
      bottom: 1em;
    }

    .coin {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 0.5em;

      .label {
        flex-grow: 1;
        position: relative;
        display: flex;
        align-items: center;
        font-weight: 500;

        img {
          margin-right: 8px;
        }
      }

      .value {
        font-weight: 700;
        margin-right: 0.5em;
      }
    }
  }
</style>
