<script lang="ts">
  import coinSVG from "$lib/assets/svg/coin-1.svg";
  import { profile, userData } from "$lib/store/user";
  import { coin } from "$lib/store/user-data/coin";
  import { Edit3Icon, UserIcon } from "svelte-feather-icons";
  import CoinButton from "./coin/CoinButton.svelte";
  import LogoutButton from "./logout/LogoutButton.svelte";
</script>

<section class="user-modal">
  <div class="name">
    Welcome {$profile?.username || "..."}
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
  <div class="links">
    <a href="/write/"><Edit3Icon /> Writer dashboard</a>
    <a href="/profile/{$profile?.id}/"><UserIcon /> Profile page</a>
  </div>
  <div class="opts">
    <LogoutButton />
  </div>
</section>

<style lang="scss">
  section {
    --padding-side: 12px;
    --opacity: 0;
    display: flex;
    position: fixed;
    right: 0.5em;
    top: calc(var(--header-height) - 4px);
    width: 20em;
    background-color: var(--foreground-color);
    padding: 12px var(--padding-side);
    padding-top: 1.5em;
    transform: translateY(-100%) translateZ(0);
    z-index: -1;
    opacity: var(--opacity);
    transition: all 0.4s ease-in-out;
    font-weight: 400;
    flex-direction: column;

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

    .links {
      display: flex;
      flex-direction: column;
      margin: 1em 0 1em;
      a {
        display: flex;
        align-items: center;
        padding: var(--padding-side);
        margin: 0 calc(-1 * var(--padding-side));
        background-color: #0002;
        gap: 1em;

        :global {
          svg {
            opacity: 0.75;
          }
        }

        &:hover {
          color: var(--primary-color-lighten-2);
        }
      }
    }

    :global {
      .bx--btn--sm {
        flex-shrink: 0;
        padding-right: 1.6em;
      }
    }
  }
</style>
