<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { userData, avatarUrl } from "$lib/store/user";
  import { LogInIcon } from "svelte-feather-icons";
  import LoginModal from "./login/LoginModal.svelte";
  import UserNavModal from "./UserNavModalContainer.svelte";

  let showLoginModal = false;
  let showUserNavModal = false;
  const NAV_MODAL_ID = "user-nav-modal";
  let avatarBtnEl: HTMLElement;

  console.log(showUserNavModal);
  function onMouseClick(e: MouseEvent) {
    // console.log(e);
    const el = e.target as HTMLElement;
    if (el.id === NAV_MODAL_ID) return;
    if (el === avatarBtnEl) return;
    if (document.getElementById(NAV_MODAL_ID).contains(el)) return;

    showUserNavModal = false;
  }
</script>

<svelte:window on:click|capture={onMouseClick} />

<section
  bind:this={avatarBtnEl}
  class:loggedIn={Boolean($userData)}
  tabindex="0"
  on:click={() => {
    showUserNavModal = true;
  }}
>
  {#if $userData}
    <Avatar elClass={showUserNavModal ? "active" : ""} url={$avatarUrl} size={36} />
    {#if showUserNavModal}
      <UserNavModal id={NAV_MODAL_ID} />
    {/if}
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

        &:hover {
          --outline-color: hsla(#{$hsl}, 0.6);
        }

        &.active {
          --outline-color: var(--primary-color);
        }
      }
    }

    a {
      display: flex;
      align-items: center;
    }
  }
</style>
