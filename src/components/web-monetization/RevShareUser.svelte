<script lang="ts">
  import ProgressCircle from "components/misc/ProgressCircle.svelte";
  import { revShareStats } from "utils/web-monetization";
  import { getGravatarURL } from "utils/users";
  import { revShareDetails } from "./_shared";
  import { getUser } from "utils/users/avatar";
  import { onMount } from "svelte";

  export let name: string = "Anonymous";
  export let roles: string[] = [];
  export let paymentPointer: string = "";
  export let avatarSize: number = 96;
  export let email: string = "";

  $: gravatarURL = getUser(email).avatar;
  $: chance = (($revShareStats[name]?.chance || 0) * 100).toFixed(2);
  $: rolesText = roles.map((role) => role.slice(0, 1).toUpperCase() + role.slice(1)).join(", ");
  let el: HTMLElement;
  function onClick() {
    $revShareDetails = {
      name,
      roles: rolesText,
      paymentPointer,
      email,
      chance,
    };
  }
</script>

<div bind:this={el} class="user-box" on:click={onClick}>
  <ProgressCircle max={100} size={avatarSize} value={chance} img={gravatarURL} />
  <strong class="name">{name}</strong>
  <em>{rolesText}{rolesText.includes("Affiliate referrer") ? "*" : ""}</em>
</div>

<style lang="scss">
  .user-box {
    --progress-fill: transparent;
    --progress-linecap: round;
    // inactive track progress
    --progress-trackcolor: gray;
    --progress-trackwidth: 4px;
    // active progress
    --progress-width: 6px;
    --progress-color: lightgreen;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    padding: 1.5em 1em;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 0;
    cursor: pointer;

    .name {
      align-self: flex-start;
      margin: 0.7em auto 0.25em;
      text-align: center;
      flex: 1;
      min-width: 0;
      width: 100%;
      display: block;
      flex: 1;
      text-overflow: ellipsis;
      overflow-x: clip;
    }

    em {
      text-align: center;
      align-self: start;
      display: block;
      width: 100%;
      line-height: 1;
      opacity: 0.85;
      flex: 2;
    }

    strong {
      display: block;
    }

    &:hover {
      --image-opacity: 1;
      --image-grayscale: 0;
      background-color: #0002;
      overflow: auto;
    }
  }
</style>
