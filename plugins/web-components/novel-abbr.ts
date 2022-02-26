class NovelAbbr extends HTMLElement {
  style() {
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
      ${this.style()}
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
