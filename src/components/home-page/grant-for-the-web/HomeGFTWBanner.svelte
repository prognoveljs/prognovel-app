<section>
  <picture>
    <source srcset="/img/third-party-logos/gftw.jpg" type="image/jpeg" />
    <img src="/img/third-party-logos/gftw.jpg" alt="Grant for the Web spark grantee" />
  </picture>
  <div class="text">
    As a spark grantee of <a
      class="gftw"
      href="https://www.grantfortheweb.org"
      rel="noreferrer"
      target="_blank"
    >
      Grant for the Web</a
    >, ProgNovel is proud to join pioneers and inovators at the frontline to reinvent payments,
    tippings, and ads monetization with a more fair and open payment solutions, opening ways for
    creator to create works that directly answer for their fans inteads of big platforms or
    advertisers.
    <div class="cta">
      <a
        class="read-announcement"
        href="https://www.grantfortheweb.org/blog/announcing-our-second-grantee-cohort"
        >Grant for the Web Announcement</a
      >
      <a class="learn-more" href="help/monetization"
        >Learn how we innovate on webnovel monetization</a
      >
    </div>
  </div>
</section>

<style lang="scss">
  section {
    --minImgSize: 200px;
    display: grid;
    grid-template-columns: minmax(var(--minImgSize), 1fr) 2fr;
    gap: 48px;
    padding: {
      top: 8em;
      bottom: 5em;
    }
    font-size: 1.25em;
    line-height: 1.2;
    align-items: center;

    img {
      border-radius: 50%;
      width: 100%;
      height: auto;
      min-height: var(--minImgSize);
    }
    @include screen("mobile") {
      gap: 24px;
      grid-template-columns: 100%;
      grid-template-rows: minmax(var(--minImgSize), 60%) auto;
      padding: {
        top: 2em;
        bottom: 1em;
      }

      img {
        width: 60%;
      }
    }

    a.gftw {
      color: var(--primary-color);
      font-weight: 700;
    }

    .cta {
      margin-top: 1em;
      display: grid;
      grid-template-columns: 2fr 3fr;
      justify-content: left;
      grid-gap: 8px;
      gap: 8px;

      @include screen("mobile") {
        grid-template-columns: 100%;
        grid-template-rows: repeat(2, 1fr);
      }

      a {
        --alpha: 0.1425;
        --saturate: var(--primary-color-s);
        --light: var(--primary-color-l);
        text-decoration: none;
        border-radius: 4px;
        background-color: hsla(var(--primary-color-h), var(--saturate), var(--light), var(--alpha));
        color: #fffe;
        padding: 0.2em 1em 0.5em;
        display: inline-flex;
        align-items: center;

        &:hover {
          --alpha: 0.2;
          --shadow-color: #0005;
        }
      }

      .read-announcement {
        --alpha: 1;
        --light: 41%;
        box-shadow: 0 2px 6px #0002;

        &:hover {
          --alpha: 1;
          --saturate: 87%;
          --light: 53%;
          box-shadow: 0 2px 8px #0005;
        }
      }

      .learn-more {
        --text-lightness: 76%;
        font-weight: 300;
        text-decoration: underline;
        color: hsl(var(--primary-color-h), var(--primary-color-s), var(--text-lightness));
        text-underline-offset: 2px;
        text-decoration-thickness: 0.5px;

        &:hover {
          --shadow-color: #0002;
          --text-lightness: 82%;
          --alpha: 0.1;
        }
      }
    }
  }
</style>
