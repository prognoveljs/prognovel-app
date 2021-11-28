<script>
  import { faHands } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
</script>

<button on:click>
  <Icon icon={faHands} />
</button>

<style lang="scss">
  $size: 32px;

  button {
    display: flex;
    margin: auto;
    height: $size;
    width: $size;
    border-radius: 50%;
  }
</style>
