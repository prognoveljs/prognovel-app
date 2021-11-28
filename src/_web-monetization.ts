/**
 *  Import this module with shorthand "monetization"
 *  For example:
 *
 *      import { revenueShare } from "monetization"
 *
 */

interface PaymentPointer {
  address: string;
  weight: string | number;
}

const contributors: PaymentPointer[] = [
  {
    address: "$twitter.xrp.com/test",
    weight: 10,
  },
  {
    address: "$twitter.xrp.com/most-frequent",
    weight: 30,
  },
  {
    address: "$twitter.xrp.com/platform",
    weight: "10%",
  },
];

export const revenueShare = `
  <script webfunding type="application/json">
    ${JSON.stringify(contributors)}
  </script>
  `;
