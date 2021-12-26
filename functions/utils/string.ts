export function cleanHTML(str: string): string {
  return str
    .replace(/"/gm, `\"`) // prettier-ignore
    .replace(/\n/gm, '')
    .replace(/--/gm, '&mdash;');
}
