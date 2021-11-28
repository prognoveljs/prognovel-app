export const authorsMock = ["Radhy"];

export function getAuthorAvatar(authorsPool, author: string): string {
  return authorsPool[author]
    ? `https://www.gravatar.com/avatar/${authorsPool[author]}`
    : "/img/svg/avatar-male.svg";
}

export function getAuthorsName(authors = authorsMock): string {
  if (typeof authors === "string") return authors;
  if (!Array.isArray(authors)) return JSON.stringify(authors);
  return authors.length === 1
    ? authors[0]
    : authors.length === 2
    ? authors[0] + " and " + authors[1]
    : authors.slice(0, -1).join(", ") + ", and " + authors[authors.length - 1];
}

export function getAuthors(post): string[] {
  const authors = post?.attributes?.authors;
  if (authors && typeof authors === "string") {
    return authors
      .split(",")
      .map((s) => s.trim())
      .filter((s) => !!s);
  }
  return post?.attributes?.authors || authorsMock;
}
