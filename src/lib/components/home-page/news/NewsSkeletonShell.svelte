<script lang="ts">
  export let horizontalLine = true;
</script>

<section>
  <div class="title" />
  <div class="flex">
    <div class="author">
      <span class="avatar" />
      <span class="author-name" />
    </div>
    <div class="date" />
  </div>
  {#if horizontalLine}
    <div class="horizontal-line" />
  {/if}
</section>

<style lang="scss">
  @import "shared";
  $color: #fff5;

  section {
    // padding: 8px;
    // width: 100%;
    position: relative;
    padding: 0.75em $news-bleed-padding 0.5em;
    margin: 0 #{$news-bleed-padding * -1} 0 #{$news-bleed-padding * -1};
  }
  .title {
    height: 1.3em;
    width: var(--width, 40%);
    border-radius: 2px;
    background-color: $color;
    margin-bottom: 12px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .author {
      display: flex;
      align-items: center;
      .avatar {
        $size: 32px;
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: $color;
        margin-right: 6px;
      }
      .author-name {
        height: 1.1em;
        width: 72px;
        border-radius: 2px;
        background-color: $color;
      }
    }

    .date {
      height: 0.75em;
      width: 100px;
      border-radius: 2px;
      background-color: $color;
    }
  }
</style>
