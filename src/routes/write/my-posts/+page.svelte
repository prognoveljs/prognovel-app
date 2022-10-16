<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import AnnouncementPosts from "./_AnnouncementPosts.svelte";
  import CommunityPosts from "./_CommunityPosts.svelte";
  import PostSettings from "./_PostSettings.svelte";
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
  <Tab id="community_posts" {tab}>
    <CommunityPosts />
  </Tab>
  <Tab id="announcement_posts" {tab}>
    <AnnouncementPosts />
  </Tab>
  <Tab id="posts_settings" {tab}>
    <PostSettings />
  </Tab>
</Tabs>

<style lang="scss">
</style>
