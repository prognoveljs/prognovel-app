<script lang="ts">
  import { browser } from "$app/environment";

  import { backend } from "$lib/utils/backend";
  import GoogleSignin from "./buttons/google-signin.png";

  let user;
  let methods = [];
  $: methodData = methods.reduce((prev, cur) => {
    console.log(cur);
    prev[cur.name] = {
      code: cur.codeChallenge,
      verifier: cur.codeVerifier,
    };
    return prev;
  }, {});
  const SIGIN_BUTTONS = {
    google: GoogleSignin,
  };

  $: if (!methods.length && $backend) {
    $backend.users.listAuthMethods().then((m) => {
      methods = [...(m?.authProviders || [])];
    });
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<article>
  <section class="auth2">
    {#each methods as method}
      <a
        class="auth"
        href="{method.authUrl}{location.origin}/login/redirect"
        on:click={() => {
          if (!browser) return;
          localStorage.setItem("authProvider", JSON.stringify(method));
        }}
      >
        <img src={GoogleSignin} alt="{method.name} login" />
      </a>
    {/each}
  </section>
</article>

<style lang="scss">
  article {
    width: 450px;
    max-width: 100vw;
    padding: 24px;
    position: relative;
    top: 14%;
    margin: 0 auto;

    .auth {
      cursor: pointer;
    }
  }
</style>
