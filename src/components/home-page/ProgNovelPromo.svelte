<script lang="ts">
  import Section from "./HomeHighlightSection.svelte";
  import GFTW from "./grant-for-the-web/HomeGFTWBanner.svelte";
</script>

<article>
  <section class="contain">
    <GFTW />
  </section>
  <section class="contain grid">
    <h2 style="grid-area: title; grid-row: auto;">
      👋👋👋<br />ProgNovel is the best open-source platform to publish webnovel<small
        >here's why</small
      >
    </h2>
    <Section title="Open and Diverse monetization" grid="monetization">
      <img
        slot="banner"
        loading="lazy"
        src="img/home-highlight/monetization.svg"
        alt="ProgNovel monetization."
      />
      Thanks to the emerging technology Web Monetization API and Interledger protocol, it is possible
      now to provide frictionless shared monthly subscription across all ProgNovel websites (and any
      other Web Monetization websites like Imgur!), paying authors and any other content creators fairly
      based on how much time subscribers spend time enjoying their contents. The frictionless design
      of Web Monetization API inspired us to create affiliate marketing network based on its technology,
      directly baked into browsers without having to rely on big tech backed platforms to do marketing
      heavy lifting for authors! This new approach also can entice influencers and generate a new wave
      of "professional" reviewers to promote the works of fiction authors; long term can help flourishing
      more contents for the community outside the scope of pure fiction writings for the community.
      <br /><br />With the increased efficiency of these new payment technologies soon there will be
      no longer a need for the website owner to act as the gatekeeper for revenues commonly seen
      when using ads network or some subscription options, as reader will be paying directly to
      authors and contributors without unncessarily compex setup on the website's backend, allowing
      more healthy collaborations to flourish that based on trust.
    </Section>
    <Section title="Installable as Progressive Web App (PWA)" grid="pwa">
      <img
        slot="banner"
        loading="lazy"
        src="img/home-highlight/pwa.svg"
        alt="ProgNovel PWA install."
      />
      ProgNovel joins the ranks of pioneers of modern web app by providing fully installable experience
      on mobile and desktop. By default, ProgNovel works offline even if readers haven't been installing
      it, while providing an easy way to store content offline with a single click of download button.
      <br /><br />
      Installed ProgNovel apps can be easily accessed by the desktop and homescreen. And in addition
      to this, ProgNovel site owners can configure UX benefits for readers with installed ProgNovel apps,
      such as cutting ads waiting time (if any) and chapters update notify badge both in mobile and windows
      desktop. These can ultimately improve engagement and user loyalty in the long run.
    </Section>
    <Section title="Blazing fast performance" grid="performance">
      <img
        slot="banner"
        loading="lazy"
        src="img/home-highlight/perf.svg"
        alt="ProgNovel performance."
      />
      By implementing JAMstack architecture, ProgNovel beats industry leaders on term of website loading
      speed by a large margin. Additionally, by integrating Service Worker deeply into our build, we're
      able to create the best, fully offline-first Progressive Web App that no other novel platform websites
      have yet able to deliver. With the simplicity of its architecture design and further optimization
      along the road, your free-to-host ProgNovel sites will be much faster than sites that cost $10k
      a month hosted on cloud providers!
    </Section>
    <Section title="Extendable features with plugins" grid="plugins">
      <img
        slot="banner"
        loading="lazy"
        src="img/home-highlight/plugins.svg"
        alt="ProgNovel plugins."
      />
      Bookmarking and storing reading history locally in the browser is our basic features that readers
      can enjoy immediately without having to sign up. Interactive, pre-built pluggable features to enrich
      users' reading experience will landed to support modern webnovel contents such as LitRPG and other
      contemporary online novel form depending on authors' needs. JavaScript developers will have the
      opportunity to develop ProgNovel plugins through standarized Web Components, supported on vanilla
      JS and in many frontend frameworks such as React, Vue, Angular and Svelte.
    </Section>
    <Section title="Efficient hosting" grid="scale">
      <img
        slot="banner"
        loading="lazy"
        src="img/home-highlight/efficient.svg"
        alt="ProgNovel efficient hosting."
      />
      ProgNovel built with custom made build engine to benefit modern web infastructure offerings, in
      many ways optimize for website loading performance and hosting cost efficiency in mind. These optimizations
      ensure free-tier plans to serve high-quality website hosting that scales far better than traditional
      hosting offerings, allowing authors and content creators to set up a blazing fast ProgNovel sites
      and apps with only $0 for a long, long time.
    </Section>
  </section>
</article>

<style lang="scss">
  article {
    --section-grid-width: 250px;
    --section-grid-height: 400px;
    --section-bg-color: var(--foreground-color);
    --bg-color: #0004;
    background: linear-gradient(to top, var(--bg-color) 70%, var(--bg-color), transparent);
    padding: 32px;
    width: 100%;
    margin-top: 3em;

    @include screen("tablet") {
      padding: 20px;
    }

    @include screen("mobile") {
      padding: 12px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(var(--section-grid-width), 1fr));
      grid-template-rows: auto repeat(2, var(--section-grid-height));
      grid-gap: 12px;
      gap: 12px;
      justify-content: space-around;
      grid-template-areas: "title title title" "monetization monetization performance" "pwa plugins scale";

      @include screen("mobile") {
        grid-template-columns: 100%;
        grid-template-rows: repeat(6, minmax(200px, 1fr));
        grid-template-areas: "title" "monetization" "performance" "pwa" "plugins" "scale";
      }
    }

    h2 {
      font-weight: 700;
      font-size: 2.3em;

      small {
        font-size: 0.7em;
        font-weight: 300;
        margin-left: 0.45em;
      }
    }
  }
</style>
