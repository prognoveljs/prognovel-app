import { createServer, DataAndMoneyStream } from "ilp-protocol-stream";
import ilp from "./ilp-plugin";
import polka from "polka";

const port = 8000;

export default () => {
  polka()
    .get("/", async (req, res) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(await initiateIlpStream());
    })
    .listen(port, (err) => {
      console.log("Interledger STREAM is started.");
      if (err) console.log("error", err);
    });
};

async function initiateIlpStream() {
  let server = await createServer({
    plugin: ilp(),
  });

  server.on("connection", (connection: DataAndMoneyStream) => {
    console.log("server got connection");

    connection.on("stream", (stream) => {
      console.log(`server got a new stream: ${stream.id}`);

      // Set the maximum amount of money this stream can receive
      stream.setReceiveMax(Infinity);

      // Handle incoming money
      stream.on("money", (amount: number) => {
        console.log(`server stream ${stream.id} got incoming payment for: ${amount}`);
      });

      // Handle incoming data
      stream.on("data", (chunk: Buffer) => {
        console.log(`server stream ${stream.id} got data: ${chunk.toString("utf-8")}`);
      });
    });
  });

  // These would need to be passed from the server to the client using
  // some encrypted communication channel (not provided by STREAM)
  const { destinationAccount, sharedSecret } = server.generateAddressAndSecret();
  return JSON.stringify({ destinationAccount, sharedSecret });
}
