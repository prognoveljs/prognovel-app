<script>
  import Card from "./_RoadmapCard.svelte";
</script>

<Card type="feature" title="Implement dev logs and roadmap pages (CANCELED)">
  Because I feel I need a place to say something, lest people coming here would think it's a dead
  project. (This roadmap page is handcrafted from scratch btw 👀)<br /><br />Devlog still need to
  implement its own banner image and author avatar.
</Card>

<Card type="improvement" title="Responsive design for smartphones, tablets, and HD monitors">
  ProgNovel is built as a Progressive Web App, so eventually I have to provide decent (if not
  better) views on all kind of screens and devices.
</Card>

<Card type="feature" title="Font and layout settings in read page">
  In addition to setting font size, ProgNovel will also have font customizable font weight (thanks
  to variable fonts) and layout settings. Different reading mode (with option for infinite loading)
  also will be developed in the future.
</Card>

<Card type="plugin" title="Customizable themes and components">
  ProgNovel at the current state has no modular style customization except for dark mode and color
  picker buttons. Lots of work and refactor needed to be done for ProgNovel capable of accepting
  custom made styles and layouts, as well as third party components.<br /><br />
  <strong>NOTE:</strong><br />
  Custom components for ProgNovel can be partially injected from project folder, though only working
  for home page right now.
</Card>

<Card
  type="feature"
  title="Enable webpack/netlify build plugin to outsource assets to IPFS pinning services"
>
  IPFS is P2P protocol for storing files. Think it as Torrent, but for websites, which eventually
  enable everyone to host websites without paying any money (not including domain billing, of
  course). There's no urgency to implement it right now, since our current hosting (Netlify) already
  provide very generous free-tier hosting with no performance limitation whatsoever.
  <br /><br />
  <strong>Update:</strong><br />Cloudflare announces their new Jamstack platform Cloudflare Pages
  that provide unlimited bandwidth and unlimited requests, so plans on exploring IPFS is currently
  onhold since we don't really need it as much as before.
</Card>
<Card type="feature" title="Implement and Explore Web Monetization based Affiliate Marketing">
  Social testimony with context is the best alternatives compared to big platforms algorithm-backed
  recommendation system. Word of mouths and book reviews work the best, but with thousands of
  contents for selections, relying on vocal community members alone won't be enough for community to
  curate its content collection if we're not to rely on big data.<br /><br />
  Affiliate marketing in ProgNovel is the first step to explore the possibility of sustainable community
  content curation through Web Monetization. There's a possibility to expand it to other collaboration-based
  scheme to promote contents, for example: novel guest post (hosting early novel chapters on another
  websites while sharing revenue to their website owners).
</Card>

<Card type="feature" title="Implement & Enhance Web Monetization Rev Share">
  Along with cool charts and stuff.
</Card>

<Card type="feature" title="Comment system and chat room">
  With in-house or DIY emojies, GIFs, VIP memberships, and more!<br />
  <br />(Using Discord and Disqus as for now due to resource restrain)
</Card>

<Card type="feature" title="Implement Web Monetization API">
  Web Monetization API is cool. Chances are it will be a major monetization feature for ProgNovel
  due to its ability to share subscription among many websites, which is going to work well for
  small websites that rely on referrers like NovelUpdates.
</Card>

<Card type="improvement" title="Alpha V2 API and ProgNovel CLI">
  The previous API for ProgNovel doesn't separate volumes, which leaves hole for some novel chapters
  indexing choice and alienating potential ebook authors (Amazon Kindle, etc) from using ProgNovel
  in the future. That has been solved in API version 2 for the ProgNovel alpha, as well as improved
  performance and cost-effectiveness of the API significantly (due to Cloudflare Workers recently
  made KV Workers available for free and the new merging chapters design for allowing more
  aggressive chapter preloading), along with the introduction of ProgNovel CLI that uses the new
  WebAssembly backed build engine and built-in contributors revenue sharing with WebMonetization
  API.
</Card>

<Card type="improvement" title="Custom markdown build engine ⚙⚙">
  ProgNovel is designed to scale with webnovels in mind, so relying on JavaScript Jamstack
  frameworks won't scale too much with potentially ten thousands of chapters to be published.
  Because of this, I rewrote build engine to parse markdown files for ProgNovel that will use
  WebAssembly for some serious build performance benefits.
</Card>

<Card type="improvement" title="Merge chapters processing on Cloudflare Workers">
  Cloudflare Workers uses per HTTP request call for its pricing model, about 100K/day on free-tier
  users. For fetching chapters alone, it can go on about 3 millions page views per month under
  normal condition. This, however, can be optimized further, since it's possible to load 2 or more
  chapters in a single request (imagine having 10 millions page views per month without having to
  pay for hosting a single cent &#x1F92F;).
  <br /><br />But since Cloudflare Workers imposes limitation on CPU cycle, designing a new fetching
  strategy is needed before I'm messing with this.
</Card>

<Card type="improvement" title="Refactoring data/chapter loading">
  Previously data loading was done using too much vanilla JavaScript. But for composability and
  utility, relying Svelte's internal reactive feature is better than this, especially when to
  compose side effects on loading data (showing loading bar, prefetching chapters, updating UI on
  other components, etc).<br /><br />
  <strong>Status:</strong>
  Partially implemented.
</Card>

<Card type="feature" title="Prototyping assets pinning on IPFS services">
  It's too soon to use IPFS entirely for now, but I think outsourcing some of ProgNovel assets is
  fine, especially when they were to be fetched by service worker, since things that out of control,
  like assets' cache control header, are less relevant in service worker.<br /><br />
  <strong>Update:</strong><br />Onhold due to Cloudflare Page.
</Card>
<Card type="improvement" title="Enhance breadcrumb section">
  Previously I don't bother on making breadcrumb section. But some UX gurus recommended it so here I
  am.
</Card>
<Card type="feature" title="Preload images and stream them into memory">
  Browsers fetch images by streaming by default. But their capabilities in handling fetched images
  are usually limited, that is why some websites load them using spinner first before showing the
  whole images after the downloading done.
  <br /><br />Here in ProgNovel, I find browser's native asset preloading feature isn't to
  satisfactionary (although the technique is recommended by experts). Instead, I'm writing my own
  image preloading feature that will downloaded needed banner image for novels (which already
  cropped and converted for optimum performance), fetched as soon as users hover the novel page's
  link (even before clicking the link), then stream it into device's memory for ultra fast
  performance.
</Card>
<Card type="feature" title="Top page loading bar">
  To clearly tell people that ProgNovel is an webapp (like Youtube and others) I need to implement
  custom top page loading bar. It's already working nicely so far, but still buggy in between pages
  that load instantly. Also, the animation doesn't feel quite right yet.
</Card>
<Card type="feature" title="Offline mode">
  Service worker implementation has worked quite well in modern browsers. And I haven't had any
  issues currently when tested on novel download feature, although sometimes Chrome still erases
  data and sometimes later on I need to figure out how to make offline data more persistent.
</Card>
<Card type="feature" title="Theme selector"
  >Theme selector is live and worked quite well as intended!</Card
>
<Card type="feature" title="Bookmark and recent history">
  Bookmark and recenty history features are live! Though there are still many improvements need to
  be done.
</Card>
<Card type="feature" title="Image Resizing CDN">
  Used to crop banner images in novel pages depending on device screen size, then automatically
  covert to better image format before the image shipped to browser (to save users' bandwidth and
  faster loading time!). It combines Cloudflare Workers and Fly.io instances to create free
  on-the-fly image resizing CDN. This is usually paid features that some companies sell for their
  main product, like Cloudinary and Imgix. Though they often provides free-tier for some degree, I
  think it's better to create in-house image resizing services to keep things stay nice and free
  (note that Fly.io hinted they'll stop their free-tier services, so I reckon this feature might be
  restarted as I'd have to look for another alternative that works well with Cloudflare Workers).
</Card>
<Card type="improvement" title="Chapter loading prefetching">
  Preload next chapters when idle. This improve latency down to 0ms when clicking "Next Chapter"
  button on reasonable internet and when not spamming the next chapter button.
</Card>
<Card
  type="improvement"
  title="Outsource dark mode and themes to service worker for HTML prerendering"
>
  ProgNovel uses JAMstack. And JAMstack sites can only rely on JavaScript to make the site
  interactive. Normally, doing dark mode on JavaScript will create a CSS style glitch (known as
  Flash of Unstyled Content aka FOUC), or forcing dark mode before the page rendering can cause
  significant loading speed issues since JavaScript is parsed much later than HTML and CSS.
  <br /><br />
  I fixed these issues with almost no overhead by moving the Dark Mode and Theme picked logic to Service
  Worker, prerendering HTML with correct CSS style before the browser renders the HTML, thus eliminating
  any JavaScript based disadvantages when doing dark mode on JAMstack. (I think I'm one of earliest if
  not the first who doing this, since google result on "dark mode inside service worker" absolutely yield
  no relevant result whatsoever. I think it's a really cool technique and JAMstack sites should do more
  prerendering on Service Worker!)
</Card>
