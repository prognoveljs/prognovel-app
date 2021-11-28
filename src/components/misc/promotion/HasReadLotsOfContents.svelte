<script lang="ts">
  import { onMount } from "svelte";
  import { SITE_TITLE } from "settings";
  import { novelsData, currentNovel } from "store/states";
  import { parseContributorsNames } from "utils/string";

  const WORDS_COUNT_THRESHOLD: number = 15_000;
  let wordsCount: number = 20000;

  $: revshareData = ($novelsData?.[$currentNovel]?.rev_share || []).sort((a, b) => {
    return ((b.weight as number) || 0) - ((a.weight as number) || 0);
  });

  $: contributors = revshareData.reduce((prev: string[], cur) => {
    const name = cur.name;
    if (name) prev.push(name);
    return prev;
  }, []);

  $: authorsAndContributorsNames = parseContributorsNames(contributors);

  $: hasOrHave = contributors.length === 1 ? "has" : "have";
  $: pluralS = contributors.length === 1 ? "s" : "";

  $: showThisPromotion = (wordsCount || 0) >= WORDS_COUNT_THRESHOLD;

  onMount(() => {
    //
  });
</script>

{#if showThisPromotion}
  <article class="grid">
    <h3>You have read more than one hour worth of content from {SITE_TITLE}.</h3>
    <p>
      Did you know, it takes 4 hours or more to write and edit a chapter worth 4 minutes of reading
      time? {authorsAndContributorsNames()}
      {hasOrHave} work{pluralS} very hard to bring you joy reading this content. Consider to subscribe
      or tip them to show your support in exchange of their hardwork!
    </p>
    <div class="cta">
      <a href="https://coil.com">Subscribe to Coil</a>
      <a href="https://coil.com">Become a Patron</a>
      <div class="or">or</div>
      <a href="https://coil.com">Tip with Interledger</a>
    </div>
  </article>
{/if}

<style lang="scss">
  article {
    --bg-opacity: 0.33;
    max-width: var(--contentMaxWidth, 100%);
    margin: 0 auto;
    padding: 24px;

    border-radius: 8px;
    background-color: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--primary-color-l),
      var(--bg-opacity)
    );
    border: 2px solid var(--primary-color);

    h3 {
      font-weight: 700;
    }

    .cta {
      text-align: center;
    }
  }
</style>
