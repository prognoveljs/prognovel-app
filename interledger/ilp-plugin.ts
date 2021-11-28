import crypto from "crypto";
import url_1 from "url";
import Plugin from "ilp-plugin-btp";
const generateCredentials = (opts) => {
  if (process.env.ILP_CREDENTIALS) {
    return JSON.parse(process.env.ILP_CREDENTIALS);
  }
  const secret = crypto.randomBytes(16).toString("hex");
  const name = opts && opts.name ? `${opts.name}` : "";
  if (process.env.BTP_SERVER) {
    const url = new url_1.URL(process.env.BTP_SERVER);
    // return { server: `${url.protocol}//${name}:${secret}@${url.host}` };
    return { server: process.env.BTP_SERVER };
  }
  return { server: `btp+ws://${name}:${secret}@localhost:7768` };
};
export default function (opts = {}) {
  const credentials = generateCredentials(opts);
  return new Plugin(credentials);
}
