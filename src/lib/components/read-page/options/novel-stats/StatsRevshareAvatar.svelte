<script lang="ts">
  import Avatar from "$lib/components/user/Avatar.svelte";

  export let name = "";
  export let email = "";
  export let chance = "";
  // export let address = "";
</script>

<section>
  <div class="grid">
    <Avatar {name} {email} />
    <span style="">{chance}%</span>
    <strong>
      {name}
    </strong>
  </div>
  <div class="bar" style="--width: {chance}%;" />
</section>

<style lang="scss">
  section {
    --margin: 1em;
    --height: 32px;
    background-color: #009432;
    margin-left: calc(var(--margin) * 2);
    height: var(--height);
    position: relative;
    border-radius: 0 2px 2px 0;

    .grid {
      display: grid;
      align-items: center;
      justify-content: baseline;
      grid-template-columns: 48px 4.5em auto;
      position: relative;
      z-index: 2;

      :global {
        .avatar {
          transform: scale(1.2) translateX(calc(var(--margin) * -1.3));
        }
      }
    }

    .bar {
      --margin: 1em;
      position: absolute;
      height: var(--height);
      background-color: #fff4;
      left: 0;
      top: 0;
      // margin-left: calc(var(--margin) * 2);
      width: calc(var(--width));
      z-index: 1;
    }
  }
</style>
