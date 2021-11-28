<section>
  <div><span /> Classic mode</div>
  <div><span /> Infinite reading</div>
</section>

<style lang="scss">
  section {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(2, minmax(10px, 1fr));
    font-size: 14px;
    margin-bottom: 12px;

    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      line-height: 1.8;
      cursor: pointer;
      user-select: none;
      span {
        display: block;
        height: 60px;
        border-radius: 4px;
        background-color: #fff3;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
