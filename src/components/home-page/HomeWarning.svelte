<script>
  import { SITE_TITLE } from "settings";
</script>

<div class="container contain">
  <h2>&#128736; Warning &#128736;</h2>
  <p>
    <strong>{SITE_TITLE}</strong>
    currently is in early development and unwanted bugs might occur. Design, features, and functionality
    are not final. This site should be treated as a demo.
  </p>
</div>

<style lang="scss">
  .container {
    text-align: center;
    margin-top: 48px;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
    // content-visibility: auto;
    // contain-intrinsic-size: 640px;
  }
  p {
    margin: 24px auto;
    max-width: 460px;
  }

  h2 {
    font-size: 2.25em;
    font-weight: 700;
    color: hsl(var(--primary-color-h), var(--primary-color-s), 46%);
  }

  p {
    opacity: 0.92;
  }
</style>
