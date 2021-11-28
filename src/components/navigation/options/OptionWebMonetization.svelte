<script lang="ts">
  import { enablePremiumContent } from "utils/web-monetization";
</script>

<div class="coil-promo">
  <img class="illustration" src="img/svg/wm.svg" alt="Web Monetization premium content." />
  <img class="doodles" src="img/svg/doodles.svg" alt="Doodles." />
  {#if $enablePremiumContent}
    <div class="subscribed">You have subscribed via Web Monetization - many thanks!</div>
    <div>
      <small
        >your paid subscription will be streamed directly across website staffs and content creators</small
      >
    </div>
  {:else}
    <div class="please-subscribe">
      Subscribe $5/month on Coil to unlock color themes and other goodies!
      <a target="_blank" href="https://coil.com">Subscribe now!</a>
    </div>
  {/if}
</div>

<style lang="scss">
  .coil-promo {
    font-size: 14px;
    padding: 36px 24px;
    padding-bottom: 4px;
    text-align: center;
    position: relative;

    img {
      --size: 150%;
      position: absolute;
      width: var(--size);
      height: auto;
      left: calc(var(--size) * -0.4);
      top: calc(var(--size) * -0.1);
      z-index: -1;

      &.doodles {
        left: calc(var(--size) * 0.4);
        top: -4em;
        --size: 85%;
        z-index: -2;
      }
    }

    .subscribed {
      font-size: 1.6em;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 0.5em;
      text-shadow: 2px 2px #0005;
    }

    small {
      display: inline;
      font-style: italic;
      opacity: 0.8;
      background-color: hsla(#{$hsl}, 0.35);
      line-height: 1.2;
      padding: 2px;
    }

    .please-subscribe {
      transform: translateY(50px);
      text-shadow: 2px 2px 2px #0005;
      font-weight: 500;

      img {
        opacity: 0.45;
      }

      a {
        --padding: 8px;
        --height: 40px;
        font-weight: 700;
        width: 200px;
        text-decoration: none;
        display: block;
        color: #fffe;
        background-color: var(--primary-color-darken-1);
        padding: var(--padding) calc(var(--padding) * 2);
        margin: 0 auto;
        margin-top: calc(var(--padding) * 2);
        border-radius: calc(var(--height) / 2);

        &:hover {
          color: #fff;
          background-color: var(--primary-color-darken-2);
        }
      }
    }
  }
</style>
