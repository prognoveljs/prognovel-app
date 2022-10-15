export function capsFirstLetter(text: string): string {
  return text.slice(0, 1).toLocaleUpperCase() + text.slice(1);
}

interface ParseChapterIndexOptions {
  useSeparator?: boolean;
}
export function parseChapterIndex(index: string, opts?: ParseChapterIndexOptions): string {
  const separator = opts?.useSeparator ? " - " : " ";
  let [book, chapter] = index.split("/");
  if (book === "vol") book += ".";

  return `${capsFirstLetter(book).replace(/-/g, " ")}${separator}${capsFirstLetter(chapter)
    .replace("-", " ")
    .replace("-", ".")}`;
}

export function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}

export function parseContributorsNames(contributors: Array<string>): string {
  switch (contributors.length) {
    case 0:
      return "";
    case 1:
      return contributors[0];
    case 2:
      return `${contributors[0]} and ${contributors[1]}`;
    default:
      const lastContributor: string = contributors.slice(-1)[0];
      const restContributors: string[] = contributors.slice(0, -1);
      return `${restContributors.join(", ")}, and ${lastContributor}`;
  }
}

export function stringSearch(string: string, pattern: string): number {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== string[i + j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  return count;
}

export function camelCase(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function snakeCase(str: string): string {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");
}
