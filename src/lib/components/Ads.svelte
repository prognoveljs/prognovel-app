<script>
  export let width = "100%";
  export let height = "190px";
  export let grid = "";
</script>

<div class="ads" style="width: {width}; height: {height}; grid-area: {grid}">
  <span>Ads</span>
</div>

<style>
  .ads {
    display: flex;
    background: #666a;
  }

  span {
    margin: auto;
    font-size: 24px;
    font-weight: 700;
  }
</style>
