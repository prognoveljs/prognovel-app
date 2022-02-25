<strong><slot /></strong>
<hr />

<style lang="scss">
  strong {
    display: block;

    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }

  hr {
    margin: 4px 0 12px;
    border-color: var(--text-body-color);
    border-width: 0.125px;
    opacity: 0.125;
  }
</style>
