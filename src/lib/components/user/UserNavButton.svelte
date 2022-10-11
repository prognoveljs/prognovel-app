<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { userData, avatarUrl } from "$lib/store/user";
  import { LogInIcon } from "svelte-feather-icons";
  import LoginModal from "./login/LoginModal.svelte";
  import UserNavModal from "./UserNavModal.svelte";

  let showLoginModal = false;
</script>

<section class:loggedIn={Boolean($userData)} tabindex="0">
  {#if $userData}
    <Avatar url={$avatarUrl} size={36} />
    <UserNavModal />
  {:else if import.meta.env.POCKETBASE_URL}
    <a href="/login" on:click|preventDefault={() => (showLoginModal = true)}>
      <LogInIcon />
    </a>
  {/if}
</section>

{#if showLoginModal}
  <LoginModal isModal={true} on:close={() => (showLoginModal = false)} />
{/if}

<style lang="scss">
  section {
    --outline-color: transparent;
    // margin-right: 1em;
    display: flex;
    align-items: center;
    width: 36px;
    height: 100%;

    :global {
      .avatar {
        outline: 2px solid var(--outline-color);
      }
    }
    &:hover {
      :global {
        .avatar {
          --outline-color: hsla(#{$hsl}, 0.6);
        }
      }
    }

    &:focus-within,
    &:focus {
      :global {
        .avatar {
          --outline-color: var(--primary-color);
        }
        .user-modal {
          --opacity: 1;
          transform: translateY(0);
        }
      }
    }

    a {
      display: flex;
      align-items: center;
    }
  }
</style>
