import type { APIGatewayEvent, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context) {
  const { name } = event.queryStringParameters;

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "My name is " + name + "." }),
  };
}
