<script lang="ts">
  import { faMoneyBillAlt, faTools } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";

  let novels = ["yashura-legacy"];
</script>

<section>
  <strong>Global configuration</strong>
  <a href="admin/site-configuration">
    <Icon icon={faTools} />
    Site Configurations</a
  >
  <a href="admin/revenue-share"
    ><Icon icon={faMoneyBillAlt} />
    Revenue Share</a
  >
  <strong>Novels</strong>
  {#each novels as novel}
    <a href="admin/novel/{novel}">{novel}</a>
  {/each}
</section>

<style lang="scss">
  section {
    background-color: #0002;
    min-height: 100%;
    padding: 2em;

    strong,
    a {
      display: block;
    }

    strong {
      margin-top: 1.5em;
      font-size: 1.15em;
      position: relative;

      &::before {
        $size: 0.7em;
        position: absolute;
        content: "";
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: var(--primary-color);
        opacity: 0.6;
        top: -0.05em;
        left: -0.5em;
        z-index: -1;
      }
    }

    a {
      $side-padding: 0.5em;
      padding: 0.25em $side-padding;
      margin-left: -1 * $side-padding;
      text-decoration: none;
      margin-bottom: 0.2em;
      font-weight: 300;
      border-radius: 2px;

      :global(svg) {
        font-size: 1.5em;
        margin-right: 0.2em !important;
        padding-bottom: 3px !important;
        opacity: 0.7 !important;
      }

      &:hover {
        background-color: #fff2;
        box-shadow: 0 2px 12px #0002;

        :global(svg) {
          opacity: 0.825 !important;
        }
      }
    }
  }
</style>
