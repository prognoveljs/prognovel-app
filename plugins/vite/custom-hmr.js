export default function CustomHmr() {
  return {
    name: "custom-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.includes("style/build-plugin")) {
        console.log("reloading scss file...", file);

        server.ws.send({
          type: "full-build",
          path: "*",
        });
      }
    },
  };
}
