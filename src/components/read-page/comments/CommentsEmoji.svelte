<script>
  let groups = ["blob", "blobanimation", "people", "hand"];
  let emojis = ["hand", "ewe"];

  const EMOJI_DEFAULT_SIZE = 32;

  function getEmojiUrl(group, emoji, size = `${EMOJI_DEFAULT_SIZE}`) {
    return `https://cdn.prognovel.org/${group}/${emoji}?h=${size}`;
  }
</script>

<section style="--emoji-size: {EMOJI_DEFAULT_SIZE}px;">
  {#each groups as group}
    <figure>
      <caption>{group}</caption>
      <div class="emoji-container">
        {#each emojis as emoji}
          <span title=":{emoji}:">
            <img src={getEmojiUrl(group, emoji)} alt={emoji} />
          </span>
        {/each}
      </div>
    </figure>
  {/each}
</section>

<style lang="scss">
  section {
    grid-area: emoji;
    contain: strict;

    .emoji-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, var(--emoji-size, 32px));

      span {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 2px;
        user-select: none;
        cursor: pointer;

        &:hover {
          background-color: #0002;
        }
        img {
          height: 100%;
          width: auto;
        }
      }
    }
  }
</style>
