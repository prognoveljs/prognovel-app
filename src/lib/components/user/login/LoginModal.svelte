<script lang="ts">
  import { browser } from "$app/environment";
  import Icon from "$lib/components/Icon.svelte";
  import { backend } from "$lib/utils/backend";
  import { capsFirstLetter } from "$lib/utils/string";
  import {
    faDiscord,
    faFacebookF,
    faGithub,
    faGitlab,
    faGoogle,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import GoogleSVG from "./google.svg?raw";
  import { PasswordInput, TextInput } from "carbon-components-svelte";
  import { mapOrder } from "$lib/utils/misc";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  const dispatch = createEventDispatcher();
  export let isModal = false;
  let methods = [];
  const OAUTH_PROVIDER_LOGO = {
    google: faGoogle,
    facebook: faFacebookF,
    twitter: faTwitter,
    gitlab: faGitlab,
    github: faGithub,
    discord: faDiscord,
  };

  $: if (!methods.length && $backend) {
    $backend.users.listAuthMethods().then((m) => {
      methods = [...(m?.authProviders || [])];
    });
  }

  const PROVIDER_SORT = ["google", "discord", "facebook", "twitter", "github", "gitlab"];

  function oauthLogin(name: string) {
    if (!browser) return;
    localStorage.setItem("authProvider", JSON.stringify(methods.find((m) => m.name === name)));
  }
</script>

{#if isModal}
  <div
    in:fade={{ duration: 425, easing: cubicOut }}
    out:fade={{ duration: 600, easing: cubicIn }}
    class="overlay"
    on:click={() => dispatch("close")}
  />
{/if}

<article
  class:isModal
  in:fly={{ y: -14, duration: 225, easing: cubicOut }}
  out:fly={{ y: 27, duration: 425, easing: cubicIn }}
>
  <div class="password-login">
    <h1>👋 Welcome!</h1>
    <TextInput labelText="User name" placeholder="Enter user name..." />
    <div style="margin-top: 1.25em;" />
    <div class="password-wrap">
      <PasswordInput
        tooltipAlignment="start"
        tooltipPosition="left"
        labelText="Password"
        placeholder="Enter password..."
      />
      <div class="forgot-password">forgot password?</div>
    </div>
    <div style="margin-top: 1.25em;" />
    <button> Log in </button>
    <div class="sign-up">
      don't have an account? <span>sign up</span>
    </div>
  </div>
  <div class="separator"><em>or</em></div>
  <section class="oauth">
    {#each mapOrder(methods, PROVIDER_SORT, "name") as { name, authUrl }}
      <a
        class={name}
        href="{authUrl}{location.origin}/login/redirect"
        on:click={() => oauthLogin(name)}
      >
        {#if name === "google"}
          {@html GoogleSVG}
        {:else}
          <Icon size="1.25em" icon={OAUTH_PROVIDER_LOGO[name]} />
        {/if}
        Sign in with
        {capsFirstLetter(name)}
      </a>
    {/each}
  </section>
</article>

<style lang="scss">
  $zIndex: 9999999999;
  article {
    width: 450px;
    max-width: 100vw;
    padding: 24px;
    padding-bottom: 32px;
    top: 14%;
    margin: 0 auto;
    background-color: var(--foreground-color);
    z-index: $zIndex;
    position: relative;
    border-top: 2px solid var(--primary-color-darken-1);

    &.isModal {
      position: fixed;
      left: calc(50% - 225px);
    }

    .password-login {
      h1 {
        font-weight: 700;
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
      }

      .password-wrap {
        position: relative;

        .forgot-password {
          position: absolute;
          top: 2px;
          right: 0;
          font-size: 0.75em;
          opacity: 0.8;
          text-decoration: underline;
          cursor: pointer;

          &:hover {
            opacity: 1;
          }
        }
      }

      .sign-up {
        margin-top: 1em;
        text-align: center;
        span {
          color: var(--primary-color-lighten-2);
          font-weight: 700;
          margin-left: 0.55em;
        }
      }
    }

    .separator {
      $width: 42%;
      $offset: 2.5%;
      margin: 1.5em auto 2em;
      text-align: center;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        width: $width;
        left: $offset;
        height: 1px;
        background-color: #fff8;
      }

      &::after {
        left: auto;
        right: $offset;
      }
    }

    .oauth {
      margin-top: 1.5em;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      a {
        --brightness: 100%;
        --brightness-plus: 0%;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 1em;
        width: 100%;
        background-color: #666;
        text-decoration: none;
        font-weight: 500;
        filter: brightness(calc(var(--brightness) + var(--brightness-plus)));

        &.google {
          color: #000b;
          background-color: #fff;

          :global(svg) {
            width: 22px;
            margin-left: -2px;
            transform: translateX(1px);
          }
        }

        &.facebook {
          background-color: #4267b2;
        }

        &.twitter {
          background-color: #1da1f2;
        }
        &.discord {
          background-color: #5865f2;
        }
        &.github {
          background-color: #333;
        }
        &.gitlab {
          background-color: #fc6d27;
          --brightness: 95%;
        }

        &:hover {
          --brightness-plus: 15%;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #0006;
    backdrop-filter: blur(10px);
    z-index: $zIndex;
  }
</style>
