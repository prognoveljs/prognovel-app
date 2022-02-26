<script>
  import Item from "./HelpItem.svelte";
</script>

<article>
  <Item link="help/get-started-with-prognovel-features">How to use ProgNovel features</Item>
  <Item link="help/themes-and-performance-settings"
    >Configuring styles and tweak performance options</Item
  >
  <Item link="help/how-to-host-prognovel">Host your own ProgNovel web app for free</Item>
  <Item link="help/monetization"
    >See how authors, readers, and contributors can get money from ProgNovel</Item
  >
  <Item link="help/prognovel-plugins-and-mods">
    Using, contribute and create custom plugins/mods for ProgNovel
  </Item>
</article>

<style lang="scss">
  article {
    margin: 8px;
    margin-top: 0;
    display: flex;
    flex-direction: column;

    @include screen("large-desktop") {
      padding: 0 8px;
    }
    @include screen("wide-desktop") {
      padding: 0 12px;
    }
  }
</style>
