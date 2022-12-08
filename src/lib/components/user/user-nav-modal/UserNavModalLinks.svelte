<script lang="ts">
  import { profile } from "$lib/store/user";
  import { Edit3Icon, UserIcon } from "svelte-feather-icons";
</script>

<div class="links">
  <a href="/write/"><Edit3Icon /> Writer dashboard</a>
  <div class="horizontal-line" />
  <a href="/profile/{$profile?.id}/"><UserIcon /> Profile page</a>
</div>

<style lang="scss">
  .links {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5em;

    a {
      --line-opacity: 0.4;
      position: relative;
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

      // bottom horizontal line
      $line-bleed-padding: 0.5em;
      &::after {
        content: "";
        position: absolute;
        width: calc(100% - #{$line-bleed-padding * -2});
        left: 0;
        bottom: 0;
        height: 2px;
        background: linear-gradient(to right, #fff0 0%, #fff7 10%, #fff0);
        opacity: var(--line-opacity);
        transition: all 0.4s ease-in-out;
      }

      &:hover {
        color: var(--primary-color-lighten-3);
        background-color: hsla(#{$hsl}, 0.1);
        // font-weight: 700;

        // bottom horizontal line on hover
        &::after {
          --line-opacity: 0.7;
          transform: translateX(-0.4em);
        }
      }
    }
  }
</style>
