const style = {
  window: `
    :host {
      position: fixed;
      padding: 48px;
      max-width: 700px;
      margin: 0 auto;
    }

    :host::before {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: #0005;
    }
  `,
  bonus: `
  :host {
    padding: 24px;
    border-radius: 8px;
  }

  :host[type=chapter] {
    background-color: var(--foreground-color);
    border: 2px solid var(--primary-color);
  }
`,
};

const html = {
  window: () => `
    <article>
      <h1>You Acquire Bonus!</h1>
    </article>
  `,
  bonus: () => `
    <article>
      Unlock!
    </article>
  `,
};

class UnlockBonus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html.bonus();
  }
}

class UnlockWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html.window();
    const children: NodeListOf<UnlockBonus> = document.querySelectorAll("bonus-unlock[on=next-chapter]");
    children.forEach((child: UnlockBonus) => {
      const el = child.cloneNode();
      this.shadowRoot.querySelector("article").appendChild(el);
    });
  }
}

export default () => {
  window.customElements.define("unlock-bonus", UnlockBonus);
  window.customElements.define("unlock-window", UnlockWindow);
};
