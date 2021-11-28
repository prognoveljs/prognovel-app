const style = `
  <style>
    article {
      margin: 48px auto 32px;
      max-width: var(--contentMaxWidth);
      width: 100%;
      padding: 24px;
      background-color: #0002;
      border-radius: 4px;
      overflow: auto;
    }

    .wrapper {
      max-width: 70%;
    }

    strong {
      display: block;
    }
  </style>
`;

const html = (id) => `
  ${style}
  <article>
    <div class="wrapper">
      <strong>${id} <span style="font-weight: 400;">says</span></strong>
      <slot>
    </div>
  </article>
`;

class AuthorsNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const id = this.getAttribute("id");
    this.shadowRoot.innerHTML = html(id);
  }
}

export default () => {
  window.customElements.define("authors-note", AuthorsNote);
};
