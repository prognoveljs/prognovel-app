export function renderEmojis(text: string, emojiList: string[]): string {
  return text.replace(/:[4]:/, "");
}
