# ProgNovel Changelog

# 0.8.0

🎨 UI/UX IMPROVEMENTS:
- (read page) rework botton chapter navigation to uses new navigation UI from novel page
- (internal) refactor chapter navigation to its own component and rework its dependency store accordingly

# 0.7.9

I'll try to make this version changelog to be more readable with some commentary about the changes, rather than some random logs than I directly copy-paste'd from codebase commits. I hope the changes more readable from now on.

In this version, there some fixes to search result as well greatly enhance its UX on mobile device. I haven't been testing ProgNovel on mobile recently and wasn't aware the UX on mobile for searchbar is abysmal - and this patch should fixes most of the issues for mobile users.

Other changes also includes some adjustment to UI like for read page's option section headers, and "READ NOW" button on novel page has been reworked to include some hover animation, adding icon and changing the label to "Begin reading" or "Continue reading" (if reader has read the novel). There also minor enhancement where at the bottom of button, title of the novel chapter is being displayed to give readers some idea where the button will direct them to.

## Changelogs:

🎨 UI/UX IMPROVEMENTS:
- (novel page) rework read now button, change label to "Begin reading", add "fetch info..." label when loading, new subtle animations and show destination chapter title
- (novel page) Allow to continue reading from novel page, based on reader's last chapter read
- (read page) adjust color and add icons for section headers in read page option tab
- (searchbar) now has close button both on desktop and mobile versions
- (searchbar) on mobile, scrolling/swipping down the search result will lose the focus on searchbar, disabling the mobile keyboard and thus giving the search result larger view of the screen
- (search result) on mobile, tapping search result will focus on the novel and reveal its full title, while tap the second time will make direct the page to the novel's page like it originally behaves

🐞 BUG FIXES:
- (fix - searchbar) search result not being able to scroll on mobile
- (fix - searchbar) active search unintendedly closing when clicking search result container
- (fix - search result) randomly blur images and texts on scrolling
- (fix - read page) fix missing (404 error) for chapter lock SVG

# 0.7.8

- ui(read page): show skeleton shell animation for novel stats when loading
- ui(read page): prevent much of unintended layout shift for novel stats section
- ux: add mouseover threshold to search result, preventing to lose search bar focus if mouse accidentally touch some search results when they appear

# 0.7.7

- upgrade SvelteKit and Vite version
- BREAKING: now requires Nodejs v16 and up (correct version for cloud build should be automatically chosen by Jamstack platforms - if not, refer to your hosting documentation how to choose Node version)
- ui(read page): rework novel stats UI
- ux(read page): add more information for revenue sharing on novel stats
- ui(novel page): fix "undefined" revenue share contributors profile if their about me is empty
- ui: novel cover header now loads image with better resolution on top of low res placeholder
- ui(read page): fix stuck floating menu bar container when it supposed to be hidden
- ui(read page): center floating chapter navigation on tablet
- ui(read page): fix "undefined" label on floating chapter navigation when loading chapter

# 0.7.6

- fix: Fix endless loop on reload / redirect

# 0.7.5

- ui: light theme fix colors being broken on home page

# 0.7.4

- ui: enable opt-in new header for installed PWA
- ui: slight adjustment to search placeholder
- ui: new Service Worker update UI for future releases

# 0.7.3

- ux: allow blur nav search on Esc key when no value entered
- ui: animate nav search on focus
- ui: change search font-family, add style to key
- ui: improve nav search width on responsively across devices
- ui: add bookmark page for mobile and tablet
- ui: adjust bookmark item responsive width and height
- perf: prefetch highlighted novel in home page
- perf: prefetch selected/hovered search result
- perf: improve percieved performance for search result by using low resolution image placeholder
- ui: add skelethon shell to news page
- ui: add min-height to news page content before inserting comments
- fix: bookmark link directing to 404 page
- fix: 404 api fetch on novel page
- fix: fix discussions and news page 404 on Netlify and Cloudflare Pages
- fix: breadcrumb links error due to previous patch
- fix: discussions page error/locked in undefined thread

# 0.7.2

- perf: allow completely free hosting (not including domain and others) on CDN with hosting backend as static JSON on Cloudflare Pages platform
- security: static API allow significant security increase against attacks like DDoS since there's no actual server or database attackers need to target
- ui: remove site title on home page hero, and apply it to header and document title instead
- ui: rework search bar UI and UX, now can completely navigable with keyboard only
- ui(home page): adjust browse novel styling on mobile and tablet
- ui(home page/updates): rework styling on novel updates components to prevent overflow on mobile
- ui(home page): adjust width for Grant for the Web and Web Monetization banner on mobile
- ui(home page): give more height on feature highlight on mobile and tablet
- ui(novel page): clamp affiliate link width on tablet
- perf: allow hosting static API for backend by connecting a repo that contains ProgNovel project folder to CLoudflare Pages
- fix(ui): back button on discussions page error
- fix(ui): issue where tablet doesn't have navigation bar
- fix(ui): CSS error where back button on header missing on tablet
- fix(ui/read page): issue where sometimes read page menu closed when adjusting font size on mobile
- fix(build): novel pages not being prerendered

# 0.7.1

- ui(homepage): remember novel list display preference
- ui(homepage): add slight gap for novel cover and subtitle in homepage slider
- ui(homepage): novel list hover animation now works as intended
- ui(options): slightly add black gradient in the bottom of option modal
- a11y: adjust news more link tap target size for better mobile accessibility
- fix(service worker): fix crashing due to SvelteKit new breaking update
- fix(ui/homepage): prevent avatar in news item shrinking
- lock SvelteKit and its adapter version in ProgNovel's dependency package to prevent installing updates with breaking changes (at least until SvelteKit version 1.0.0)

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
