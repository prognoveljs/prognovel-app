<script lang="ts">
  import Modal from "components/Modal.svelte";
  import { getUser } from "utils/users/avatar";
  import { revShareDetails } from "./_shared";
  import Tooltip from "components/ui/Tooltip.svelte";
  import { GravatarProfile } from "typings";

  $: user = $revShareDetails;
  $: data = async function fetchData(): Promise<GravatarProfile> {
    if (user && !user.email)
      return Promise.resolve({
        aboutMe: "nothing to see here.",
        isAboutMeEmpty: true,
      });
    if (user && user.email) {
      return getUser(user.email).getData();
    }

    return new Promise(() => {});
  };
</script>

<Modal
  padding="12px"
  opacity={0.66}
  showModal={$revShareDetails !== null}
  on:close={() => ($revShareDetails = null)}
  style={"overflow: visible !important; border: 2px solid hsla(var(--primary-color-h), var(--primary-color-s), var(--primary-color-l), 0.4);"}
>
  <section class="head">
    <img class="avatar" src={getUser(user.email).avatar} alt={user.name} />
    <div class="name-and-roles">
      <h1>{user.name} <small>({user.roles})</small></h1>
    </div>
    <span class="ilp-address">
      {user.paymentPointer}
    </span>
    <!-- <span class="email">
      <Icon icon={faAddressCard} size="1em" />
      {user.email}
    </span> -->
  </section>
  <div class="about-me">
    {#await data()}
      <p>...</p>
    {:then gravatar}
      <p class:empty={gravatar.isAboutMeEmpty}>{gravatar.aboutMe}</p>
    {:catch error}
      <!-- promise was rejected -->
    {/await}
    {#if (user.roles || "").includes("Affiliate referrer")}
      <em class="affiliate-note"
        >* This user refer you to this novel and should have the chance to receive {user.chance}% of
        your future Web Monetization payments. (NOTE: payment rate noted above not including
        payments from other users)</em
      >
    {/if}
  </div>
  <div class="chance">
    <Tooltip
      width="13.5em"
      position="top"
      text={`${user.name} has contribute in delivering 
      you this novel and will receive ${user.chance}% revenue 
      from Web Monetization API.`}
      style="right: calc(50% - 6.75em)"
    >
      {user.chance}%
    </Tooltip>
  </div>
</Modal>

<style lang="scss">
  .head {
    top: -42px;
    position: absolute;
    display: grid;
    grid-template-columns: 72px 2fr 1fr;
    grid-template-rows: 44px 28px;
    grid-template-areas: "avatar name name" "avatar ilp-address email";
    align-items: start;
    //fix width
    width: calc(100% - 12px);

    img.avatar {
      border-radius: 50%;
      background-color: #fff;
      width: 100%;
      height: 100%;
      grid-area: avatar;
    }

    .name-and-roles {
      position: absolute;
      bottom: 8px;
      left: 16px;
      grid-area: name;
      h1 {
        margin: 0;
        line-height: 1;
        font-weight: 700;
        // display: flex;
        // align-items: center;

        small {
          font-weight: 300;
          font-size: 0.5em;
          margin-left: 0.25em;
          display: block;
          line-height: 1.3;
          margin-left: -2px;
        }
      }
    }

    .ilp-address {
      grid-area: ilp-address;
      text-decoration: dotted;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: "Courier New", Courier, monospace;
      position: absolute;
      width: 95%;

      &:hover {
        width: auto;
        overflow: visible;

        // & + .email {
        //   opacity: 0;
        //   transform: translateX(2px);
        // }
      }
    }

    h1,
    .ilp-address {
      margin-left: 16px;
    }

    // .email {
    //   grid-area: email;
    //   display: flex;
    //   align-items: center;
    //   transition: all 0.425s ease-in-out;
    //   // overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    //   text-align: left;
    //   justify-self: left;

    //   :global(.fa-svelte) {
    //     margin-right: 4px !important;
    //   }

    //   // &:hover {
    //   //   overflow: visible;
    //   // }
    // }
  }

  .about-me {
    font-size: 1.1em;
    padding: 1em 0.5em;

    .empty {
      opacity: 0.6;
      font-style: italic;
      font-weight: 300;
    }
  }

  .chance {
    position: absolute;
    top: -1.75em;
    right: -0.2em;
    font-size: 1.4em;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: underline dashed;
    text-decoration-color: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--primary-color-l),
      0.6
    );
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .affiliate-note {
    font-weight: 300;
    font-size: 0.9em;
    color: hsla(var(--primary-color-h), var(--primary-color-s), 65%, 0.82);
  }
</style>
