<script lang="ts">
  import {
    CompassIcon,
    DollarSignIcon,
    Edit2Icon,
    PieChartIcon,
    SettingsIcon,
    StarIcon,
    UsersIcon,
  } from "svelte-feather-icons";
  import { backend } from "$lib/store/backend";
  import { page } from "$app/stores";
  import { userData } from "$lib/store/user";
  import WriteSidebarNovelList from "./WriteSidebarNovelList.svelte";
  import { Edit } from "carbon-icons-svelte";
  // import Button from "../buttons/Button.svelte";
</script>

<section>
  <a href="/write" class="overview">Writer dashboard</a>
  <strong>Global configuration</strong>
  <a href="/write/" class:selected={$page.routeId == "write"}>
    <CompassIcon />
    Overview
  </a>
  <a href="/write/my-posts/" class:selected={$page.routeId == "write/my-posts"}>
    <Edit2Icon />
    My posts</a
  >
  <a href="/write/my-teams/" class:selected={$page.routeId == "write/my-teams"}>
    <UsersIcon />
    My teams</a
  >
  <a href="/write/analytics/" class:selected={$page.routeId == "write/analytics"}>
    <PieChartIcon />
    Data and analytics</a
  >
  <a href="/write/subscriptions/" class:selected={$page.routeId == "write/subscriptions"}>
    <StarIcon />
    Subscriptions and patrons</a
  >
  <a href="/write/payout/" class:selected={$page.routeId == "write/payout"}>
    <DollarSignIcon />
    Payouts</a
  >
  <a href="/write/config/" class:selected={$page.routeId == "write/config"}>
    <SettingsIcon />
    Configurations</a
  >

  <WriteSidebarNovelList />
</section>

<style lang="scss">
  section {
    strong,
    a {
      display: block;
    }
    @import "shared";
    background-color: #0002;
    min-height: 100%;
    padding: 2em;

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
  }
</style>
