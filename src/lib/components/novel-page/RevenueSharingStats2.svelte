<script lang="ts">
  import { revShareUsersLite } from "$lib/utils/web-monetization";
  import RevShareUser from "$lib/components/web-monetization/RevShareUser.svelte";
  import RevShareUserDetails from "$lib/components/web-monetization/RevShareUserDetails.svelte";
  import { showRevshareStats } from "$lib/store/novel-page";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { fade } from "svelte/transition";
  import { isBrowser } from "$lib/store/states";

  let body;
  let showContributorThumbnail = 0;

  showRevshareStats.subscribe((show: boolean) => {
    if (!isBrowser) return;
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
