class AuthorsNote extends HTMLElement {
  componentStyle = `
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

  html = (id) => `
  ${this.componentStyle}
  <article>
    <div class="wrapper">
      <strong>${id} <span style="font-weight: 400;">says</span></strong>
      <slot>
    </div>
  </article>
`;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const id = this.getAttribute("id");
    this.shadowRoot.innerHTML = this.html(id);
  }
}

class NovelAbbr extends HTMLElement {
  componentStyle() {
    return `
      <style>
        span {
          position: relative;
        }

        .explanation {
          display: none;
          position: absolute;
          max-width: 200px;
          min-width: 100px;
          padding: 8px 16px;
          background-color: #0004;
          border-radius: 4px;
          border: 1px solid hsla(
            var(--primary-color-h),
            var(--primary-color-s),
            var(--primary-color-l),
            0.44
          );
        }
      </style>
    `;
  }

  html() {
    return `
      ${this.componentStyle()}
      <span>
        <slot></slot>
        <div class="explanation">
  
        </div>
      </span>
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.html();
  }
}

class NovelTrivia extends HTMLElement {
  MIN_WIDTH = 200; // pixel unit
  MAX_WIDTH = 320; // pixel unit
  WIDTH = 36; // percentage unit

  componentStyle = `
    <style>
      article {
        --right: calc(100px + 2vw);
        --transform: 0px;
        --border: 2px;
        display: inline-block;
        float: right;
        margin: 12px;
        margin-right: calc(var(--right) * -1);
        transform: translate3d(0, 0, 0);
        background-color: var(--foreground-color);
        color: var(--text-body-color);
        border-radius: 4px 0 0 4px;
        padding: 8px 16px;
        min-width: ${this.MIN_WIDTH}px;
        max-width: ${this.MAX_WIDTH}px;
        width: ${this.WIDTH}%;
        font-weight: 300;
        border: var(--border) solid transparent;
        border-right: 0 solid transparent;
        transition: transform 0.325s ease-out;
      }
  
      .wrapper {
        opacity: 0.48; 
      }
      
      article:hover {
        border-color: hsla(
          var(--primary-color-h),
          var(--primary-color-s),
          var(--primary-color-l),
          0.66
          );
        transform: translate3d(calc(
          (var(--right) + var(--transform) - var(--border)) * -1
        ), 0, 0);
      }
      
      strong {
        font-size: 1.4em;
        display: block;
        padding-top: 12px;
        color: var(--primary-color);
      }
  
      .wrapper strong {
        text-decoration: underline;
      }
  
      .wrapper:hover {
        opacity: 1;
      }
    </style>
  `;

  html = (label) => `
    ${this.componentStyle}
    <article>
    <div class="wrapper">
      <strong>${label}</strong>
      <slot></slot>
    </div>
    </article>
  `;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const label = this.getAttribute("label") || "trivia";
    this.shadowRoot.innerHTML = this.html(label);
  }
}

export const register = () => {
  window.customElements.define("novel-trivia", NovelTrivia);
  window.customElements.define("authors-note", AuthorsNote);
};
