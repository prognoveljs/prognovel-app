<script lang="ts">
  import {
    faBookmark,
    faMoneyBillAlt,
    faPalette,
    faStar,
    faTools,
  } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  import { path } from "src/store/states";

  let novels = ["wadaw"];
  let novelsData = {
    wadaw: {
      title: "Yashura Legacy",
      cover: "publish/yashura-legacy/cover-64.webp",
    },
  };

  const navLink = [
    {
      label: "Site configurations",
      icon: faTools,
      href: "admin/site-configurations",
    },
    {
      label: "Themes and layout",
      icon: faPalette,
      href: "admin/themes-and-layout",
    },
    {
      label: "Memberships and patrons",
      icon: faStar,
      href: "admin/memberships-and-patrons",
    },
    {
      label: "Revenue share",
      icon: faMoneyBillAlt,
      href: "admin/revenue-share",
    },
  ];

  const novelNavLink = [
    {
      label: "Novel Configurations",
      icon: faBookmark,
      href: "admin/novel-configurations",
    },
  ];
</script>

<section>
  <a href="admin" class="overview" class:selected={$path === "/admin"}>Overview</a>
  <strong>Global configuration</strong>
  {#each navLink as link}
    <a href={link.href} class:selected={$path.includes(link.href)}>
      <Icon icon={link.icon} />
      {link.label}</a
    >
  {/each}
  <strong>Novels</strong>
  {#each novelNavLink as link}
    <a href={link.href} class:selected={$path.includes(link.href)}>
      <Icon icon={link.icon} />
      {link.label}</a
    >
  {/each}
  <hr />
  {#each novels as novel}
    <a class:selected={$path.includes("admin/novel/" + novel)} href="admin/novel/{novel}">
      <img
        src={((novelsData || {})[novel] || {}).cover}
        alt={((novelsData || {})[novel] || {}).title}
      />
      {((novelsData || {})[novel] || {}).title || "--"}</a
    >
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
        $size: 0.9em;
        position: absolute;
        content: "";
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: var(--primary-color);
        opacity: 0.6;
        top: -0.03em;
        left: -0.4em;
        z-index: -1;
      }
    }

    a {
      $side-padding: 0.5em;
      $v-padding: 0.25em;
      padding: $v-padding $side-padding;
      margin-left: -1 * $side-padding;
      text-decoration: none;
      margin-top: 0.33em;
      font-weight: 300;
      border-radius: 2px;
      display: flex;
      align-items: center;
      overflow: hidden;

      img {
        height: 2.5em;
        width: auto;
        margin: {
          left: -1 * $side-padding;
          top: -1 * $v-padding;
          bottom: -1 * $v-padding;
          right: 1em;
        }
      }

      &:not(.selected) {
        img {
          filter: grayscale(70%);
        }
      }

      &:hover {
        img {
          filter: grayscale(30%);
        }
      }

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

      &.selected {
        background-color: var(--primary-color-darken-2);
        font-weight: 400;
        :global(svg) {
          opacity: 1 !important;
        }
      }

      &.overview {
        font-size: 1.5em;
        font-weight: 700;
      }
    }

    hr {
      width: 5em;
      border-color: #fff6;
      margin: 0.5em 0 1em;
    }
  }
</style>
