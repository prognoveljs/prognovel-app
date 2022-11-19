<script lang="ts">
  import { browser } from "$app/environment";
  import { backend } from "$lib/store/backend";
  import Icon from "$lib/components/Icon.svelte";
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
  import { mapOrder } from "$lib/utils/misc";

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
    $backend
      .collection("users")
      .listAuthMethods()
      .then((m) => {
        methods = [...(m?.authProviders || [])];
      });
  }

  const PROVIDER_SORT = ["google", "discord", "facebook", "twitter", "github", "gitlab"];

  function oauthLogin(name: string) {
    if (!browser) return;
    localStorage.setItem("authProvider", JSON.stringify(methods.find((m) => m.name === name)));
  }
</script>

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

<style lang="scss">
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
</style>
