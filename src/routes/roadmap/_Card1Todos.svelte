<script>
  import Card from "./_RoadmapCard.svelte";
</script>

<Card type="improvement" title="Better error messages">
  Currently error messages shown to users still provided by framework I'm using for development,
  Sapper (and Svelte 3). I'm planning to spend my effort on making it better, using emojies and such
  to provide better user experiences if things went wrong.
</Card>

<Card type="plugin" title="Chapter Event">
  Internal capability that can be used by plugin developers/modders to enhance their web component
  capability, such as access to chapter events (next chapter, user scroll, etc). THIS IS CURRENTLY
  ONLY A CONCEPT since there are many security issues to consider before implementing.
</Card>

<Card
  type="improvement"
  title="Testing ProgNovel on many types of devices, mobile phones, macOS, browsers"
>
  ProgNovel uses a lot of modern browser features that some are still in experimental phase, while
  is hasn't been tested enough on real world uses yet. Because of that, there are chances that
  ProgNovel's features might break on other devices or browsers that I'm not using or can't using
  currently. (I'm using 4gb AMD A9 laptop on Windows 10 for development, with 86+ version MS Edge,
  85+ version of Chrome, and Firefox Quantum Dev version 79.0b8 for development. I also has a $100
  Chinese android phone bought last year if I need some testing on mobile, but for iPhone or other
  devices, currently there's nothing I can do if issues occurws.)
</Card>
