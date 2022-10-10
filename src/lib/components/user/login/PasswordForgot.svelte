<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { PasswordInput, TextInput } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  let email = "";
  let loading = false;
  let errorMessage = "";
  let container: HTMLElement;

  const dispatch = createEventDispatcher();
  $: emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  $: disabled = !email.length || !emailCheck || loading;
  async function createAccount() {
    errorMessage = "";
    try {
      loading = true;
    } catch (err) {
      errorMessage = err;
      console.error(err);
    } finally {
      loading = false;
    }

    // send verification email
  }
</script>

<div
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 500 }}
  class="overlay"
  on:click={() => dispatch("newuserclose")}
/>
<section
  bind:this={container}
  in:fly={{
    duration: 300,
    opacity: 1,
    y: container?.clientHeight || 0,
  }}
  out:fly={{
    duration: 600,
    opacity: 1,
    y: container?.clientHeight || 0,
  }}
>
  <h1>🔮 Password reset</h1>
  <TextInput bind:value={email} labelText="Your email" placeholder="Enter your email..." />
  <div style="margin-top: 1.25em;" />
  <button {disabled} on:click={createAccount}> Reset password </button>
  {#if errorMessage}
    <div class="error">Error resetting account.</div>
  {/if}
</section>

<style lang="scss">
  section {
    width: 100%;
    height: calc(100% - 5em);
    position: absolute;
    background-color: var(--foreground-color);
    z-index: 5;
    bottom: 0;
    left: 0;
    padding: 1em;
    box-shadow: 0 -2px 8px #0002;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0006;
    backdrop-filter: blur(8px);
  }

  button {
    padding: 1em;
    width: 100%;
    background-color: var(--primary-color-darken-2);
    outline: none;
    border: none;
    font-weight: 500;
    color: #fffd;
    cursor: pointer;
    filter: brightness(120%);

    &:hover {
      filter: brightness(140%);
    }

    &:disabled {
      cursor: auto;
      filter: contrast(80%) brightness(100%) grayscale(20%);
      pointer-events: none;
    }
  }

  .error {
    margin-top: 1em;
    color: red;
    filter: contrast(70%);
    font-weight: 500;
  }
</style>
