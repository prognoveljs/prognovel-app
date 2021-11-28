<script lang="ts">
  import SectionHeader from "./body/SectionHeader.svelte";
  import StatsRevshare from "./novel-stats/StatsRevshare.svelte";
  import StatsStaff from "./novel-stats/StatsStaff.svelte";
</script>

<SectionHeader>Novel Stats</SectionHeader>
<StatsStaff />
<SectionHeader>Revenue share</SectionHeader>
<StatsRevshare />

<style lang="scss">
  @import "option-body.scss";
</style>
