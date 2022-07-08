<script lang="ts">
  import { getGravatarURL } from "$lib/utils/users";

  export let name = "";
  export let role = "";
  export let email = "";
  export let payment = "0";
  export let size: "small" | "medium" = "medium";

  $: avatar = getGravatarURL(email);
  const getBorderColor = () => {
    switch (role) {
      case "author":
        return "#e67e22";
      case "editor":
        return "#e74c3c";
      case "proofreader":
        return "#2ecc71";
      default:
        return "#bdc3c7";
    }
  };
</script>

<section style="--border-color: {getBorderColor()};">
  <img src={avatar} alt={name} />
  <div class="name">
    {name}
  </div>
</section>

<style lang="scss">
  section {
    display: grid;
    img {
      border-radius: 50%;
      border: 4px solid var(--border-color);
    }

    .name {
      text-align: center;
      font-weight: 700;
      margin-top: 8px;
    }
  }
</style>
