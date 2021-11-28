import { BACKEND_API } from "settings";
import { isReceiptVerified } from ".";

const RECEIPT_VERIFIER_SERVER: string = `${new URL(BACKEND_API).href}verify`;

export async function verifyWebMonetizationReceipt(receipt: any): Promise<boolean> {
  const res = await fetch(RECEIPT_VERIFIER_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: receipt,
  });
  const data = await res.json();
  const isVerified = Boolean((data as any)?.amount);
  isReceiptVerified.set(isVerified);

  return isVerified;
}
