export function formatDate(d: DOMHighResTimeStamp) {
  return new Date(d).toDateString();
}
