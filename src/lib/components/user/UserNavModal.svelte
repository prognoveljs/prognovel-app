<script lang="ts">
  import coinSVG from "$lib/assets/svg/coin-1.svg";
  import { profile, user } from "$lib/store/user";
  import { backend, refreshUser, updateProfile } from "$lib/utils/backend";
  import { Button } from "carbon-components-svelte";
  import { tick } from "svelte";
  import type { UserProfile } from "$typings/user";

  // $: profile = ($user?.user?.profile || {}) as UserProfile;
  // $: profileId = profile?.id;
  profile;
  async function getDailyCoin() {
    await refreshUser();
    await tick();
    // if (!$profile.id) return;
    const result: unknown = await $backend.records.update("profiles", $profile.id, {
      coin: ($profile.coin || 0) + 40,
    });
    user.update((u) => {
      u.user.profile = result as UserProfile;
      return u;
    });
  }

  $: console.log({ user: $user });
</script>

<section class="user-modal">
  <div class="coin">
    <span class="label">
      <img src={coinSVG} width="auto" height="24" alt="Coin" />
      My coin
    </span>
    <span class="value">
      {$user?.user?.profile?.coin ?? "--"}
    </span>
    <Button size="small" on:click={getDailyCoin}>Get more</Button>
  </div>
  {$profile.id}
</section>

<style lang="scss">
  section {
    --opacity: 0;
    display: flex;
    position: fixed;
    right: 0.5em;
    top: calc(var(--header-height) - 4px);
    width: 20em;
    background-color: var(--foreground-color);
    padding: 12px;
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

    :global {
      .bx--btn--sm {
        flex-shrink: 0;
        padding-right: 1.6em;
      }
    }
  }
</style>
