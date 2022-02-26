<script lang="ts">
  export let imgSize: string = "170";
</script>

<div class="overlay" />
<div class="chapter-locked">
  <div class="container">
    <img width={imgSize} height={imgSize} src="img/svg/lock.svg" alt="Chapter locked." />
    <h2>This Chapter is Locked</h2>
    <p>Support the team to unlock.</p>
  </div>
</div>

<style lang="scss">
  .chapter-locked {
    position: absolute;
    width: 100%;
    bottom: 100px;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;

    .container {
      padding: 3em 1em;
      border-radius: 8px;
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-items: center;
      flex-direction: column;
      box-shadow: 0 12px 16px #0003, 0 32px 64px #0001;
      border: 2px dashed var(--primary-color);
    }

    img {
      margin-bottom: 2em;
    }

    h2,
    p {
      padding: 0 24px;
      max-width: 500px;
      margin: 0;
    }

    h2 {
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 8px;
    }
  }

  .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: calc(var(--locked-height) * 1.5);
    background: linear-gradient(to top, var(--background-color), transparent);
  }
</style>
