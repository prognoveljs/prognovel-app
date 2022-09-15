<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { user, avatarUrl } from "$lib/store/user";
  import { DollarSignIcon, LogInIcon } from "svelte-feather-icons";
  $: console.log($user);
</script>

<section class:loggedIn={Boolean($user)}>
  {#if $user}
    <Avatar url={$avatarUrl} size={36} />
    <div class="user-hover">
      <div class="coin">
        <span class="label">
          <DollarSignIcon size="18" />
          Coin
        </span>
        <span>
          {$user?.user?.profile?.coin ?? "--"}
        </span>
        <button>get more</button>
      </div>
    </div>
  {:else if import.meta.env.POCKETBASE_URL}
    <a href="/login">
      <LogInIcon />
    </a>
  {/if}
</section>

<style lang="scss">
  section {
    // margin-right: 1em;
    display: flex;
    align-items: center;
    width: 36px;
    height: 100%;

    .user-hover {
      --opacity: 0;
      display: flex;
      position: fixed;
      right: 0.5em;
      top: calc(var(--header-height) - 4px);
      width: 20em;
      background-color: var(--foreground-color);
      padding: 12px;
      transform: translateY(-100%) translateZ(0);
      z-index: -1;
      opacity: var(--opacity);
      transition: all 0.4s ease-in-out;
      font-weight: 400;

      .coin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 0.5em;

        .label {
          flex-grow: 1;
        }

        button {
          flex-shrink: 0;
        }
      }
    }

    &:hover {
      .user-hover {
        --opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
