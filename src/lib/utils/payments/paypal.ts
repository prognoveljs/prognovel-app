import { browser } from "$app/environment";
import { loadScript, PayPalNamespace } from "@paypal/paypal-js";
import { get, writable, Writable } from "svelte/store";

const CLIENT_ID: string = import.meta.env.PAYPAL_CLIENT_ID;
export const paypalClient: Writable<PayPalNamespace> = writable(null);

export function initializePaypal() {
  console.log(CLIENT_ID);
  if (CLIENT_ID) {
    loadScript({
      "client-id": CLIENT_ID,
    }).then((paypal) => {
      paypalClient.set(paypal);
      console.log(paypal);
    });
  }
}
