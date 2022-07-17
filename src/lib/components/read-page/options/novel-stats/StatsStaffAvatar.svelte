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

  function getFontSize(name: string) {
    const length = (name || "").length;
    const optimalLength = 8;
    const maxLength = 25;
    const optimalFontSize = 1;
    const minFontSize = 0.65;
    if (length <= optimalLength) return optimalFontSize;
    if (length >= maxLength) return minFontSize;
    const formula = optimalFontSize - (optimalFontSize - minFontSize) * (length / maxLength);

    return formula;
  }
</script>

<section>
  <div class="grid-container" style="--border-color: {getBorderColor()};">
    <img width="90" height="90" src={avatar} alt={name} />
    <div class="name-wrapper">
      <div class="name" style="--hovered-font-size: {getFontSize(name)}em;">
        <!-- {getFontSize(name)} -->
        {name}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  $innerWidth: 90px;
  section {
    position: relative;
    width: $innerWidth;
    height: 120px;
    .grid-container {
      position: absolute;
      display: grid;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
        border: 4px solid var(--border-color);
      }

      .name-wrapper {
        position: relative;
        width: $innerWidth;
        .name {
          text-align: center;
          font-weight: 700;
          margin-top: 8px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 1.1;
        }
      }

      &:hover {
        height: auto;
        .name-wrapper {
          .name {
            overflow: visible;
            white-space: normal;
            word-wrap: break-word;
            font-size: var(--hovered-font-size, 1em);
          }
        }
      }
    }
  }
</style>
