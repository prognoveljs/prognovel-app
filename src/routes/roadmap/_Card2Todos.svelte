<script>
  import Card from "./_RoadmapCard.svelte";
</script>

<Card type="improvement" title="Streams chapter JSON from Cloudflare Workers">
  This is potentially bring significant latency improvements for chapter fetching and improve
  runtime rendering for chapters. As amazing as Stream API is, it is actually quite complicated to
  be implemented. So I'll need to learn a bit on this before I mess around with currently perfectly
  working chapter fetching feature.<br /><br />This potentially can be implemented together with
  merge chapters I mention below.
</Card>

<Card type="plugin" title="User State and Resource">
  Internal capability that allows plugin developers/modders to access user state (chapter readed in
  particular novel, state of other plugins/mods, numbers of chapters readed, etc), as well as
  resources (built-in coins, custom score made by other plugins, etc). THIS IS CURRENTLY ONLY A
  CONCEPT since there are many security issues to consider before implementing.
</Card>

<Card type="plugin" title="Bonus unlock plugin">
  Bonus unlock announcement plugin that can be used to engage readers. Planned to be implemented
  along with "Chapter Event" and "User Resource".
</Card>
