<script lang="ts">
  import SectionHeader from "./body/SectionHeader.svelte";
  import StatsRevshare from "./novel-stats/StatsRevshare.svelte";
  import StatsStaff from "./novel-stats/StatsStaff.svelte";
</script>

<SectionHeader>This chapter brought to you by</SectionHeader>
<StatsStaff />
<SectionHeader>How revenue from Web Monetization API will be shared</SectionHeader>
<StatsRevshare />

<style lang="scss">
  @import "option-body.scss";
</style>
