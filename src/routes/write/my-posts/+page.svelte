<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
</script>

<Tabs
  tabs={[
    {
      label: "Community posts",
    },
    {
      label: "Announcement posts",
    },
    {
      label: "Posts settings",
    },
  ]}
  let:tab
  selected="community_posts"
>
  <Tab id="community_posts" {tab}>community posts</Tab>
  <Tab id="announcement_posts" {tab}>announcement</Tab>
  <Tab id="posts_settings" {tab}>post settings</Tab>
</Tabs>

<style lang="scss">
</style>
