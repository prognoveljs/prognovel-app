# ProgNovel Changelog

# 0.7.1

- ui(homepage): novel list hover animation now works as intended
- fix(service worker): fix crashing due to SvelteKit new breaking update

# 0.7.0

- ui(homepage): rework UI for homepage hero
- ui(homepage): new alternative novel list as default
- fix(mobile): fix bug where back button on reading page not working on mobile
- fix: fatal issue where build not generating HTML due to new sveltekit adapter breaking update

## 0.6.5

- ui: loading skeleton shell now has wave animation
- ui(homepage): lazy components below hero section now use new skeleton shell instead of just "Loading..."
- performance(homepage): improve perceived loading speed by adding small static image placeholder to HTML
- fix(ui/homepage): novel highlight slider and news layout fix on mobile
- fix: reading page plugins such as `novel-trivia` and `authors-note` (Web Component) not loading

## 0.6.4

- **BREAKING**: requires ProgNovel CLI v0.6.4
- **BREAKING**: requires ProgNovel Workers Backend v0.6.4
- feat: early version of news pages
- feat: text-to-speech synthesis feature
- ui: new novel highlight slider component in homepage hero
- fix: reading page and discussions page page redirect not working
- fix: revshare gravatar profile not working
- fix(ui/readpage): adjust max-width for checkbox options in settings tab

## 0.6.3

- **BREAKING**: requires ProgNovel CLI v0.6.2
- build: migrate from webpack to vite
- migrate from sapper to sveltekit
- perf: disable google analytic script if tracking id not provided
- perf: lazy loads carbon-component-css
- chore: remove unnecessary packages from old build

## 0.6.2

- perf: deliver AVIF images for novel cover for supported browser
- fix(ui/read page): remove gap below comment section when enabling colorized background
- fix(ui/read page): corrected reading page colorized background

## 0.6.1

- feat(ux): enable navigating with keyboard arrow left and arrow right (previously disabled due to bugs)
- feat(ui): "adjust background contrast", new settings in chapter reading page
- feat(ui): "adjust background hue", new settings in chapter page (noticable in low contrast)
- feat(ui): allow dragging width of options/settings sidebar in chapter page
- fix(ui): fix bug on tablet where chapter settings not interactable
- breaking/minor: change IndexedDB keys of font-weight and font-size in chapter reading page settings (this purge previously saved of users' font size and weight preferences)

## 0.6.0

Very early support of admin dashboard.

## 0.5.1

- improve(ui): novel covers and fonts now properly cached so that it loads much faster and no longer disabled when offline.
- improve(ui): novel "Read now" button will disabled if link is not ready.
- improve(ui): shortcut for history tab now uses smaller webp files for novel cover whenever possible
- fix(ui): in novel page, fix awkward header pushing synopsis and other infos.
- fix(ui): Fix flash of wrong site title (in tab title and h1 header in homepage) upon first visit and reloading.
- fix(ui): novel banner images only partially cover the container on mobile.

## 0.5.0

ProgNovel first became public.
