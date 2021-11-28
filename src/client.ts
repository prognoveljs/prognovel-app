import { start } from "@sapper/app";
import { performanceMonitor } from "utils/performance-monitor/perf-init";
import { initImageTypeSupport } from "utils/images/index";
// import "service-worker/_on-update";

async function appStart() {
  await Promise.all([
    start({ target: document.querySelector("#sapper") }),
    initImageTypeSupport(),
    // await promise all
  ]);

  (await import(/* webpackChunkName: "app-init" */ "init")).default();
}

appStart();
performanceMonitor();

// console.log("%cProgNovel app started!", "background-color: hsla(26,100%,50%,0.44);");
