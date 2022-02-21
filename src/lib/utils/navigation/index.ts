import { isBrowser } from "$lib/store/states";

export {
  getBreadcrumbParentLabel,
  getBreadcrumbSegments,
  getPreviousBreadcrumbLink,
  getPreviousPageOnMobile,
} from "./breadcrumb";

export function gotoPage(page: string) {
  if (!page || !isBrowser) return;
  const a = document.createElement("a");
  a.href = page;
  a.click();
  a.remove();
}
