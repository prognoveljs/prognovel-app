<script>
  import { onMount } from "svelte";

  export let affiliate;
  export let affiliateName;
  export let title;

  onMount(async () => {});
</script>

{#if affiliate}
  <section>
    <h2><strong>{affiliateName || "A reader"}</strong> has refer you to this novel...</h2>
    <p>And will earn ~10% of {title}'s revenue from Coil subscribers he refers.</p>
    <article class="payment-pointer"><strong>Payment address</strong> <br /> <em>{affiliate}</em></article>
  </section>
{/if}

<style lang="scss">
  $margin: 48px;

  section {
    $bg-alpha: 0.125;
    position: relative;
    max-width: 600px;
    padding: 12px 32px;
    padding-bottom: 28px;
    margin: $margin auto #{$margin * 2} auto;
    border-radius: 4px;
    border: 2px solid hsl(#{$h}, #{$s}, #{$l});
    background-color: hsla(#{$h}, #{$s}, #{$l}, #{$bg-alpha});

    .payment-pointer {
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-size: 80%;
      line-height: 1.25;
      opacity: 0.85;
      text-align: right;

      em {
        font-weight: 300;
      }
    }
  }

  h2 {
    $header-padding: 12px;
    text-align: center;
    padding: 0 $header-padding;

    strong {
      color: var(--primary-color);
    }
  }
</style>
