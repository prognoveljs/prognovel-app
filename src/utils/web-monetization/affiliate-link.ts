export function generateAffiliateLink(address: string): string {
  const thisPage = new URL(window.location.href);
  thisPage.search = "";
  thisPage.searchParams.set("affiliate", encodeURI(address));
  return thisPage.href;
}
