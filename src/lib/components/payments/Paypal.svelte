<script lang="ts">
  import { getContext, tick } from "svelte";
  import { paypalClient } from "$lib/utils/payments/paypal";
  import { browser } from "$app/environment";

  let paypalLoaded;
  $: if (browser && $paypalClient && !paypalLoaded) {
    console.log($paypalClient);
    paypalLoaded = true;
    tick().then((_) => {
      $paypalClient.Buttons().render("#paypal").then(console.log);
    });
  }
</script>

<div id="paypal" />

<!-- email: {userData?.email || ""} -->
