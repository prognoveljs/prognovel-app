import { tick } from "svelte";
import { isMobileScreen } from "$lib/utils/mobile";
import { get as getStore } from "svelte/store";
import { customBreadcrubChildren } from "./custom-title";

export function getBreadcrumbSegments(path) {
  if (path.startsWith === "/read") {
    const slug = path.slice(5, 0);
    if (!slug) return [];
    return [slug.split("-chapter-")[0], slug];
  } else if (path) {
    return path ? path.split("/").filter((s) => !!s) : [];
  }
  return [];
}

const stopWords = ["of", "for", "the", "and", "to", "with"];
export function getBreadcrumbParentLabel(segment) {
  const custom = getStore(customBreadcrubChildren);
  if (custom?.[segment]) return custom?.[segment]?.label;
  switch (segment) {
    case "discussions":
      return "Return back";
    case "novel":
      return "All Novels";
    case "devlog":
      return "Dev Logs";
    case "user":
      return "Users";
    default:
      return segment
        .split("-")
        .map((s) => {
          return stopWords.includes(s) ? s : s.substring(0, 1).toUpperCase() + s.substring(1);
        })
        .join(" ");
  }
}

export function getPreviousPageOnMobile(): void {
  if (!history.length || !isMobileScreen()) return;

  history.back();
}

export async function getPreviousBreadcrumbLink(): Promise<string> {
  if (isMobileScreen()) return "";
  await tick();
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) {
    const current = breadcrumb.querySelector("span");
    if (current) {
      const dest = current.previousElementSibling as HTMLAnchorElement;
      if (dest && dest.href && dest.id !== "back-button") {
        return dest.href;
      }
    }
  }
  return "/";
}
