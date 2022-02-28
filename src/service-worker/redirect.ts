export const pageNotPrerendered = ["read", "discussions"];

export async function redirect(path: string) {
  return Response.redirect("/" + path.slice(1).replace("/", "?load="));
}
