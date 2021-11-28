<script>
  import { credentialMode } from "store/states";
  import { setCredentialMode } from "utils/users";
  import { onMount, onDestroy, tick } from "svelte";
  const mode = {
    prompt: "credential-mode-prompt",
    silent: "credential-mode-silent",
    none: "credential-mode-none",
  };

  let cred;
  let prompt;
  let silent;

  $: if (cred !== undefined) setCredentialMode(cred);

  onMount(async () => {
    await tick();
    prompt.addEventListener("change", (ev) => setCredentialMode("prompt"));
    silent.addEventListener("change", (ev) => setCredentialMode("silent"));
  });

  onDestroy(() => {
    prompt.removeEventListener("change", (ev) => setCredentialMode("prompt"));
    silent.removeEventListener("change", (ev) => setCredentialMode("silent"));
  });
</script>

<div>
  <h5>Sign-In mode</h5>
  <section>
    <input
      type="radio"
      bind:this={prompt}
      name="signin-credential-mode"
      id={mode.prompt}
      checked={$credentialMode === "prompt"}
    />
    <label for={mode.prompt}>Prompt</label>

    <input
      bind:this={silent}
      type="radio"
      name="signin-credential-mode"
      id={mode.silent}
      checked={$credentialMode === "silent"}
    />
    <label for={mode.silent}>Auto</label>
  </section>
</div>

<style lang="scss">
  @import "_vars.scss";

  input:not(:first-of-type) {
    margin-left: 12px;
  }

  section {
    padding: 0 $paddingSide;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;

    label {
      font-size: 12px;
      font-weight: 400px;
      margin-left: 4px;
      line-height: 0;
    }
  }
</style>
