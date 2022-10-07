import { browser } from "$app/environment";

export {
  getBreadcrumbParentLabel,
  getBreadcrumbSegments,
  getPreviousBreadcrumbLink,
  getPreviousPageOnMobile,
} from "./breadcrumb";

export function gotoPage(page: string) {
  if (!page || !browser) return;
  const a = document.createElement("a");
  a.href = page;
  a.click();
  a.remove();
}
