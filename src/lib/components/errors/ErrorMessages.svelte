<script lang="ts">
  import { errorMessages } from "$lib/store/states";
  import { ToastNotification } from "carbon-components-svelte";
</script>

<section>
  {#each $errorMessages as err}
    <ToastNotification
      title={err?.title || "Error"}
      subtitle={err?.message.toString() || "An internal server error occurred."}
      caption={new Date().toLocaleString()}
      on:close={() => {
        $errorMessages = $errorMessages.filter((e) => e?.id !== err?.id);
      }}
    />
  {/each}
</section>

<style lang="scss">
  section {
    position: fixed;
    right: 2em;
    bottom: 1em;
    z-index: 99999999999999999;
  }
</style>
