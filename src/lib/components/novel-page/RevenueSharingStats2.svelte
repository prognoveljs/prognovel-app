<script lang="ts">
  import { showRevshareStats } from "$lib/store/novel-page";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { browser } from "$app/environment";

  let body;
  let showContributorThumbnail = 0;

  showRevshareStats.subscribe((show: boolean) => {
    if (!browser) return;
    if (show) {
      windowLock(body);
    } else {
      windowUnlock();
    }
  });
</script>

<article>
  <div class="info">
    <h2>Revenue sharing stats</h2>
  </div>
  <div class="stats">hmm</div>
</article>

<style lang="scss">
  h2 {
  }
</style>
