<script>
  import { createConnection } from "ilp-protocol-stream";
  import TippingButton from "./tipping/TippingButton.svelte";
  import { onMount } from "svelte";
  import plugin from "interledger/ilp-plugin";

  const ILP_STREAM_MOCK_SERVER = "http://localhost:8000/";
  let connection, stream, error;

  onMount(async () => {
    const res = await fetch(ILP_STREAM_MOCK_SERVER);
    const { destinationAccount, sharedSecret } = await res.json();
    const opts = {
      plugin: plugin(),
      destinationAccount,
      sharedSecret,
    };
    connection = await createConnection(opts);
    stream = connection.createStream();
    stream.setSendMax(Infinity);
    if (stream === undefined) error = "STREAM IS NOT DEFINED";
  });

  async function send() {
    console.log(stream);

    stream.sendTotal(100);
  }
</script>

<article>
  {#if stream}
    <!-- content here -->
    <TippingButton on:click={send} />
  {/if}
  {#if error}
    <h1>STREAM IS NOT DEFINED</h1>
  {/if}
</article>

<style lang="scss">
  article {
    display: grid;
    width: 100%;
    padding: 12px 24px;
    background-color: #0002;
  }
</style>
