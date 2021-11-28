const overlay = `
  <div style="position: fixed; bottom: 0; left: 0; width: 100%; height: 200px;
    background: linear-gradient(to top, transparent, #000);
    display: flex; text-align: center; align-items: flex-end; padding-bottom: 24px;
    font-size: 2em;
  ">
    Loading...
  </div>
`;

// WIP, this isn't yet to be implemented
navigator.serviceWorker.controller.addEventListener("message", (event) => {
  if (event.name === "update") {
    document.body.innerHTML += overlay;
  }
});
