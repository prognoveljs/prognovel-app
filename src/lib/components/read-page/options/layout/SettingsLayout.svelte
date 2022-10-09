<script lang="ts">
  import { infiniteLoading } from "$lib/store/read-page/navigation";

  function setInfiniteLoading(bool: boolean) {
    $infiniteLoading = bool;
  }
</script>

<section>
  <div class:active={!$infiniteLoading} on:click={() => setInfiniteLoading(false)}>
    <span /> Classic mode
  </div>
  <div class:active={$infiniteLoading} on:click={() => setInfiniteLoading(true)}>
    <span /> Infinite reading
  </div>
</section>

<style lang="scss">
  section {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(2, minmax(10px, 1fr));
    font-size: 14px;
    margin-bottom: 12px;

    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      line-height: 1.8;
      cursor: pointer;
      user-select: none;
      span {
        display: block;
        height: 60px;
        border-radius: 4px;
        background-color: #fff3;
      }

      &:hover {
        text-decoration: underline;
      }

      &.active {
        color: var(--primary-color);
        font-weight: 700;
      }
    }
  }
</style>
