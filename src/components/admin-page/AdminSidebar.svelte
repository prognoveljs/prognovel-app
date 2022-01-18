<script lang="ts">
  // import { faCloudUploadAlt, faCogs, faPlus } from "@fortawesome/free-solid-svg-icons";
  // import Icon from "components/Icon.svelte";
  // import { path } from "src/store/states";
  // import { navLink, novelNavLink, runTask } from "utils/admin/utils";
  // import {
  //   activeNovels,
  //   adminNovelsData,
  //   isAdminGUIConnected,
  //   newNovelTitle,
  // } from "utils/admin/_store";
  // import AlertEnv from "./sidebar/AlertENV.svelte";
  // import CreateNewNovel from "./sidebar/CreateNewNovel.svelte";

  // $: novels = Object.keys($adminNovelsData);
  // $: novelsData = $adminNovelsData || {};
</script>

<!-- <section>
  <a href="admin" class="overview" class:selected={$path === "/admin"}>Overview</a>
  <strong>Global configuration</strong>
  {#each navLink as link}
    <a href={link.href} class:selected={$path.includes(link.href)}>
      <Icon icon={link.icon} />
      {link.label}</a
    >
  {/each}
  <div class="novel-header">
    <strong>Novels </strong>
    {#if $isAdminGUIConnected}
      <button on:click={() => ($newNovelTitle = "")}><Icon icon={faPlus} /></button>
    {/if}
  </div>

  {#each novels as novel}
    <a
      class:disabled={!$activeNovels.includes(novel)}
      class:selected={$path.includes("admin/novel/" + novel)}
      href="admin/novel/{novel}"
    >
      <img
        src={((novelsData || {})[novel] || {}).cover}
        alt={((novelsData || {})[novel] || {}).title}
      />
      {((novelsData || {})[novel] || {}).title || "--"}</a
    >
  {/each}

  <hr />

  {#if novels.length}
    <button disabled={!$activeNovels.length} class="btn-build" on:click={() => runTask("build")}>
      <Icon icon={faCogs} size="1.4em" marginRight=".75em" marginLeft=".25em" paddingBottom="2px" />
      BUILD CONTENT</button
    >
    <button
      disabled={!$activeNovels.length}
      class="btn-publish"
      on:click={() => runTask("publish")}
    >
      <Icon
        icon={faCloudUploadAlt}
        size="1.4em"
        marginRight=".75em"
        marginLeft=".25em"
        paddingBottom="4px"
      />
      PUBLISH CONTENT</button
    >
  {/if}

  <CreateNewNovel />
  <AlertEnv />
</section> -->
<style lang="scss">
  $section-header-margin-top: 1.5em;
  section {
    background-color: #0002;
    min-height: 100%;
    padding: 2em;

    strong,
    a {
      display: block;
    }

    strong {
      margin-top: $section-header-margin-top;
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

      &.disabled {
        filter: grayscale(0.4);
        opacity: 0.6;
      }

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
      margin: 1em 0 1.5em;
    }

    .novel-header {
      margin-top: $section-header-margin-top;
      display: flex;
      align-items: center;
      justify-content: space-between;
      strong {
        margin: 0;
      }
      button {
        background-color: hsla(#{$hsl}, 0.1);
        outline: none;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        user-select: none;
        padding: 4px 6px;

        &:hover {
          background-color: hsla(#{$hsl}, 0.3);
        }
      }
    }

    .btn-build,
    .btn-publish {
      display: block;
      padding: 0.5em;
      width: 100%;
      font-weight: 700;
      margin-bottom: 0.5em;
      color: #fff;
      border-radius: 4px;
      outline: none;
      border: none;
      display: flex;
      justify-content: start;
      align-items: center;
      cursor: pointer;
      user-select: none;

      &[disabled] {
        opacity: 0.6;
        filter: grayscale(0.4);
        cursor: auto;
      }
    }

    .btn-build {
      background-color: #e67e22;
    }
    .btn-publish {
      background-color: #27ae60;
    }
  }
</style>
