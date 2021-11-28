<script>
  import { onMount } from "svelte";
  import { user, credentialMode } from "store/states";

  let auth;
  $: isLogin = $user.accessToken !== undefined;

  onMount(async () => {
    await import(/* webpackChunkName: "auth-login" */ "@pwabuilder/pwaauth");
    auth.addEventListener("signin-completed", signIn);
  });

  function signIn(event) {
    console.log("Signing in...");
    if (event.detail.error) {
      console.error("Sign in error!");
      return;
    }

    $user = event.detail;
    auth.removeEventListener("signin-completed", signIn);
  }

  function signOut(event) {
    $user = {};
    auth.addEventListener("signin-completed", signIn);
  }
</script>

{#if $user.accessToken}
  <article on:click={signOut}>
    <img src={$user.imageUrl} alt={$user.name} />
    <div>
      <span class="name">{$user.name}</span>
      <span class="logout">logout?</span>
    </div>
  </article>
{/if}

<pwa-auth
  style="display: {isLogin ? 'none' : 'block'};"
  bind:this={auth}
  menuplacement="end"
  appearance="button"
  credentialmode={$credentialMode}
  googlekey="171720639415-uolrl319dkqbq0fo5k1au484h5t7q8i7.apps.googleusercontent.com"
/>

<style lang="scss">
  pwa-auth {
    position: relative;
  }

  article {
    display: grid;
    width: 150px;
    height: var(--header-height);
    overflow: hidden;
    grid-gap: 4px;
    grid-template-columns: 32px 1fr;
    align-items: center;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    padding: 4px;

    .logout {
      display: none;
      font-weight: 700;
      color: var(--primary-color);
      text-align: center;
    }

    .name {
      display: block;
      font-weight: 500;
    }

    img {
      $size: 32px;
      border-radius: 50%;
      width: $size;
      height: $size;
    }

    &:hover {
      background-color: #0002;
    }

    &:hover .logout {
      display: block;
    }

    &:hover .name {
      display: none;
    }

    &:hover img {
      filter: saturate(60%) grayscale(20%);
    }
  }

  pwa-auth::part(signInButton) {
    background: none;
    font-weight: 700;
    padding: 8px 16px;
    padding-bottom: 12px;
    margin-right: 12px;
    border: none;
    border-radius: 2px;
    color: var(--text-body-color);
    text-decoration: underline;
    text-decoration-skip-ink: initial;
    text-decoration-thickness: 2px;
    line-height: 1.2;

    &:hover,
    &:active,
    &:focus {
      background-color: #0002;
    }
  }
</style>
