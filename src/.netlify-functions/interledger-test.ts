// import bigInt from "big-integer";
// import { IlpClient, PaymentRequest } from "xpring-js";
import type { APIGatewayEvent, Context } from "aws-lambda";

// const USER_ID = JSON.stringify(process.env.XRP_USER_ID);
// const TOKEN = JSON.stringify(process.env.XRP_TOKEN);

export async function handler(event: APIGatewayEvent, context: Context) {
  const { name } = event.queryStringParameters;

  // if (!USER_ID || !TOKEN)
  //   return {
  //     status: 500,
  //     body: "XRP USER ID or XRP TOKEN not found.",
  //   };

  // const ilpClient = new IlpClient("rxprod.grpcng.wallet.ripplex.io:443");
  // const balance = await ilpClient.getBalance(USER_ID, TOKEN);
  // const scale = JSON.parse("1e" + balance.assetScale);

  // const paymentRequest = new PaymentRequest({
  //   amount: bigInt(5 * scale),
  //   destinationPaymentPointer: "$rafiki.money/p/radhy.nodix@gmail.com",
  //   senderAccountId: USER_ID,
  // });
  // const paymentResult = await ilpClient.sendPayment(paymentRequest, TOKEN);

  return {
    status: 200,
    // body: `Current money is: ${balance.netBalance / scale} XRP.`,
  };
}
