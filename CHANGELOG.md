# ProgNovel Changelog

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
