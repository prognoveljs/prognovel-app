import { performanceMonitor } from "$lib/utils/performance-monitor/perf-init";
import { initImageTypeSupport } from "$lib/utils/images/index";
// import "service-worker/_on-update";

export async function appStart() {
  await Promise.all([
    initImageTypeSupport(),
    // await promise all
  ]);

  (await import("/src/_app-init")).default();
}

// performanceMonitor();

// console.log("%cProgNovel app started!", "background-color: hsla(26,100%,50%,0.44);");
