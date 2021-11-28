<script>
  import Avatar from "components/user/Avatar.svelte";
</script>

<section>
  <textarea placeholder="tell us what you think!" />
  <button>Send</button>
</section>

<style lang="scss">
  $margin: 12px;
  section {
    grid-area: head;
    padding-left: $margin;

    textarea {
      width: 100%;
      min-height: 200px;
      padding: 12px;
      font-size: 24px;
      box-sizing: border-box;
      overflow-y: scroll;
    }

    button {
      padding: 4px 16px;
      float: right;

      &::after {
        clear: both;
      }
    }
  }
</style>
