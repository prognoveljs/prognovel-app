export const isReadPage = "/read/";
export const isDiscussionPage = "/discussions/";

export async function redirect(path: string) {
  return Response.redirect("/" + path.slice(1).replace("/", "?load="));
}
