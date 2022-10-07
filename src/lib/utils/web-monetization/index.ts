import { derived, writable, readable, Readable, Writable, get as getStore } from "svelte/store";
import { currentNovel, novelsData, siteMetadata } from "$lib/store/states";
import {
  getCurrentPointerPool,
  getPaymentPointerSharePercentage,
  WebMonetization,
} from "webfunding";
import { verifyWebMonetizationReceipt } from "./verify-receipt";
import { WEB_MONETIZATION_VERIFY } from "$lib/_setting";
import { getPoolWeightSum } from "webfunding/src/fund/utils";
import { FORBIDDEN_NOVEL_ID } from "$lib/store/novel-page";
import type { NovelMetadata, NovelsMetadata } from "$typings";
import type { RevShareProfile, RevShareUser } from "$typings/novel";
import { browser } from "$app/environment";

interface WMPointer {
  address: string;
  weight: number | string;
}

type RevShareStats = {
  [address: string]: { chance: number };
};
export let webMonetization;
export const webfundingPool: Writable<RevShareProfile[]> = writable([]);

export const isWebMonetizationActive: Writable<boolean | undefined> = writable(undefined);
export const isReceiptVerified: Writable<boolean | undefined> = writable(!WEB_MONETIZATION_VERIFY);
export const isWebMonetizationLoading: Readable<boolean> = derived(
  [isReceiptVerified],
  ([receipt]) => {
    return !!((document as any)?.monetization && receipt === undefined);
  },
);
export const enablePremiumContent: Readable<boolean> = derived(
  [isWebMonetizationActive, isReceiptVerified],
  ([webMonetization, receipt]) => {
    return !!(webMonetization && receipt);
  },
);

export const supportMonetization: Readable<boolean> = readable<boolean | undefined>(
  undefined,
  (set) => {
    if (!browser) return;

    if ((document as any).monetization) {
      set(true);
    } else {
      set(false);
    }
  },
);

// export const isCurrentChapterLocked: Readable<boolean> = derived(
//   [enablePremiumContent],
//   ([hasPremiumContent]) => {
//     return !hasPremiumContent && Boolean(true);
//   },
// );
export const isCurrentChapterMonetized: Writable<boolean> = writable(false);
export const isCurrentChapterLocked: Readable<boolean> = derived(
  [enablePremiumContent, isCurrentChapterMonetized],
  ([hasPremiumContent, isChapterMonetized]) => {
    return !hasPremiumContent && Boolean(isChapterMonetized);
  },
);

export const revShareStats: Readable<RevShareStats> = derived([webfundingPool], ([pool]) => {
  if (!pool.length) return {};

  return pool.reduce((prev: RevShareStats, cur: RevShareProfile) => {
    const name = cur.name;
    const calculatedPool = getCurrentPointerPool();
    try {
      prev[name] = {
        chance: getPaymentPointerSharePercentage({ name: cur.name }, { calculatedPool }),
      };
    } catch (err) {
      console.warn("Error calculating revshare stats.");
      console.error(err);
    }
    return prev;
  }, {});
});

export const revShareUsersLite: Readable<RevShareUser[]> = derived(
  [webfundingPool, revShareStats],
  ([pool, stats]) => {
    if (!pool.length || JSON.stringify(stats) === "{}") return [];
    const poolWithChance: RevShareUser[] = pool.map((p) => {
      const chance = ((stats?.[p?.name]?.chance || 0) * 100).toFixed(2);
      return {
        ...p,
        chance,
      };
    });

    return poolWithChance.sort((a, b) => {
      return stats[b.name]?.chance - stats[a.name]?.chance;
    });
  },
);

let currentPool;
export async function updatePaymentPointers(novel: string = "") {
  if (FORBIDDEN_NOVEL_ID.includes(novel)) novel = "";
  let novelStore = getStore(novelsData)[novel];
  let global_payment_pointers = getStore(siteMetadata).global_payment_pointers;
  await new Promise((resolve) => {
    if ((!novel || novelStore) && global_payment_pointers) {
      resolve("");
    } else {
      let timer = setInterval(() => {
        if (novel) novelStore = getStore(novelsData)[novel];
        global_payment_pointers = getStore(siteMetadata).global_payment_pointers;
        if ((!novel || novelStore) && global_payment_pointers) {
          clearInterval(timer);
          resolve("");
        }
      }, 300);
    }
  });
  if (getStore(currentNovel) !== novel) return;

  const websiteStaffBias =
    getStore(siteMetadata).limit_global_payment_pointers_share_in_novel || "15%";
  const novelStaffRevshare = (novelStore?.rev_share || []).map((data) => {
    return {
      ...data,
    };
  });
  const siteStaffRevshare = global_payment_pointers.map((pointer) => {
    return {
      ...pointer,
      biasGroup: "website staff",
    };
  });

  const novelStaffPaymentPointers: Array<[string, RevShareProfile]> = novelStaffRevshare.map(
    (data: RevShareProfile) => {
      return [data.webfundingPaymentPointer, data];
    },
  );

  const websiteStaffPaymentPointers: Array<[string, RevShareProfile]> = siteStaffRevshare.map(
    (data: RevShareProfile) => {
      return [data.webfundingPaymentPointer, data];
    },
  );

  webMonetization = new WebMonetization()
    .registerPaymentPointers([...novelStaffPaymentPointers, ...websiteStaffPaymentPointers])
    .registerDynamicRevshare(novel, "10%")
    .setBiasGroup({
      "website staff": websiteStaffBias,
    })
    .removeAdsOnStream(".ads")
    .start();

  await webMonetization.queue;

  webfundingPool.set(getCurrentPointerPool());
}

export function webMonetizationInit(): void {
  runWebMonetization();

  function runWebMonetization(): void {
    const monetization = (document as any)?.monetization;
    if (!(browser && monetization)) return;
    console.log("💰 Web monetization initialized.");

    monetization.addEventListener("monetizationstart", (e) => {
      console.log("💰 Web monetization started.", e);
      isWebMonetizationActive.set(true);
    });

    monetization.addEventListener("monetizationstopped", (e) => {
      console.log("💰 Web monetization stopped.", e);
      isWebMonetizationActive.set(false);
    });

    if (WEB_MONETIZATION_VERIFY) {
      monetization.addEventListener(
        "monetizationprogress",
        (event) => {
          verifyWebMonetizationReceipt(event.detail.receipt);
        },
        { once: true },
      );
    }

    isWebMonetizationActive.set(
      monetization.state === "started"
        ? true
        : monetization.state === "stopped"
        ? false
        : undefined,
    );
  }
}
