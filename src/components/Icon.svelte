<script lang="ts">
  export let icon: any;

  export let color = "var(--text-head-color)";
  export let size = "1em";
  export let marginLeft = "0";
  export let marginRight = "0";
  export let marginTop = "0";
  export let marginBottom = "0";
  export let paddingBottom = "0";

  // let path: string[] = [];
  let classes = "";
  let viewBox = "";

  $: viewBox = "0 0 " + icon.icon[0] + " " + icon.icon[1];

  $: classes = "fa-svelte " + ($$props.class ? $$props.class : "");

  $: path = icon.icon[4] as string;
</script>

<svg
  aria-hidden="true"
  class={classes}
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  {viewBox}
  style="color: {color}; width: {size}; height: {size}; margin: {marginTop}
  {marginRight}
  {marginBottom}
  {marginLeft}; padding-bottom: {paddingBottom};"
>
  <path fill="currentColor" d={path} />
</svg>

<style>
  .fa-svelte {
    overflow: visible;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
  }
</style>
