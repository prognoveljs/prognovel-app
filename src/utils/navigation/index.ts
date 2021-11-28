export {
  getBreadcrumbParentLabel,
  getBreadcrumbSegments,
  getPreviousBreadcrumbLink,
  getPreviousPageOnMobile,
} from "./breadcrumb";

export function gotoPage(page: string) {
  if (!page || !(process as any).browser) return;
  const a = document.createElement("a");
  a.href = page;
  a.click();
  a.remove();
}
