<script lang="ts">
  import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { saveDataForFile } from "$lib/utils/admin/data";
  import { adminPageErrors } from "$lib/utils/admin/_store";
  import { deepEqual } from "$lib/utils/misc";
  import { fly } from "svelte/transition";

  const popperOptions = {
    modifiers: [{ name: "offset", options: { offset: [8, 2] } }],
  };

  let showAccountIDTooltip = false;

  $: error = $adminPageErrors.find(
    (error) => error.type === "COMMANDERROR" && error.task === "publish",
  );
  $: showAlert = Boolean(error);

  function closeError() {
    $adminPageErrors = $adminPageErrors.filter(
      (error) => !(error.type === "COMMANDERROR" && error.task === "publish"),
    );
  }

  function submit() {
    saveDataForFile(
      "env",
      `CF_ACCOUNT_ID=${document.getElementById("account-id").value}
CF_NAMESPACE_ID=${document.getElementById("namespace-id").value}
CF_API_TOKEN=${document.getElementById("api-token").value}`,
    );
    closeError();
  }
</script>

<Modal showModal={showAlert} on:close={closeError}>
  <div class="reminder">
    To publish to Cloudflare network, ProgNovel need sensitive information and your credential to be
    used as key to access your Cloudflare account remotely as environment secrets. Learn how to set
    environment secrets at <a href="/https://github.com/prognoveljs/prognovel-cli"
      >https://github.com/prognoveljs/prognovel-cli</a
    >
  </div>
  <div class="flex">
    <label for="account-id">Account ID: </label>
    <input value={error.env.CF_ACCOUNT_ID} type="text" name="account-id" id="account-id" />
    <label for="namespace-id">Cloudflare Workers KV Namespace ID:</label>
    <input value={error.env.CF_NAMESPACE_ID} type="text" name="namespace-id" id="namespace-id" />
    <label for="api-token">Cloudflare API Token:</label>
    <input value={error.env.CF_API_TOKEN} type="text" name="api-token" id="api-token" />
    <button class="submit" on:click={submit}>Submit</button>

    <div class="warning">
      <strong>❗ WARNING ❗ </strong>
      <p>
        ProgNovel will upload your content once you submit valid credential and correct IDs, and
        above sensitive environment secrets will be stored in a hidden file <code>.env</code> in the
        root of your project folder. Protect this <code>.env</code> as API token inside can be used
        by anyone to access your Cloudflare account - never move or upload your entire project
        folder before you secure your <code>.env</code> first!
      </p>
      <p>
        If you believe your credentials have been compromised, you can protect access to your
        account by following this guide: <a
          href="/https://developers.cloudflare.com/api/tokens/create#roll-api-token"
          >https://developers.cloudflare.com/api/tokens/create#roll-api-token</a
        >
      </p>
    </div>
  </div>
</Modal>

<style lang="scss">
  .reminder {
    line-height: 1.24;
    margin-bottom: 1em;
  }
  .flex {
    display: flex;
    flex-direction: column;

    .submit {
      align-self: flex-end;
      padding: 2px 4px;
      margin-top: 4px;
    }
    label {
      display: block;
      margin-top: 4px;
    }
  }

  .warning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    strong {
      text-align: center;
      margin-top: 1em;
    }

    p {
      line-height: 1.24;
      margin: {
        top: 4px;
        left: 5%;
        right: 5%;
        bottom: 8px;
      }
    }
  }

  // .tooltip {
  //   background-color: var(--foreground-color);
  //   padding: 5px 10px;
  //   border-radius: 4px;
  // }
</style>
