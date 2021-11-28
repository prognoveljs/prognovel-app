const MIN_WIDTH = 200; // pixel unit
const MAX_WIDTH = 320; // pixel unit
const WIDTH = 36; // percentage unit

const style = `
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
      min-width: ${MIN_WIDTH}px;
      max-width: ${MAX_WIDTH}px;
      width: ${WIDTH}%;
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

const html = (label) => `
  ${style}
  <article>
  <div class="wrapper">
    <strong>${label}</strong>
    <slot></slot>
  </div>
  </article>
`;

class NovelTrivia extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const label = this.getAttribute("label") || "trivia";
    this.shadowRoot.innerHTML = html(label);
  }
}

export default () => {
  window.customElements.define("novel-trivia", NovelTrivia);
};
