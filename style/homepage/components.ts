// @ts-nocheck
//
// make sure to edit "_grid.scss" if you need
// to make changes to the layout
const lazyLoadComponents = {
  HomeShortcut: {
    src: "home/HomeShortcut.svelte",
    gridArea: "shortcut",
  },
  HomeWarning: {
    src: "home/HomeWarning.svelte",
    gridArea: "warning",
  },
  HomeSubscribe: {
    src: "home/HomeSubscribe.svelte",
    gridArea: "subscribe",
  },
  Ads: {
    src: "ads/SquareAds.svelte",
    gridArea: "ads",
  },
  LongAds: {
    src: "ads/LongAds.svelte",
    gridArea: "longAds",
  },
};

/***************************************************************************
 *                                                                         *
 *  ProgNovel will only automatically supports lazyLoadComponents          *
 *  If you need loading components statically, you need to make changes    *
 *  to "routes/index.svelte" and place your own components in it.          *
 *                                                                         *
 ***************************************************************************/

import Hero from "home/HomeNovels.svelte";
import Shortcut from "home/HomeShortcut.svelte";

const HomeHero: SvelteComponent = Hero;
const HomeShortcut: SvelteComponent = Shortcut;

export { HomeHero, HomeShortcut, lazyLoadComponents };
import { SvelteComponent } from "svelte";
