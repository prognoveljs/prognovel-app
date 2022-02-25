/**
 * Add emoji for designated roles. Returns empty string
 * if role is not recognized.
 * @param role
 * @returns string
 */
export function enhanceRoleWithEmoji(role: string) {
  switch (role.toLocaleLowerCase()) {
    case "author":
      return "✏️ " + role;
    case "editor":
      return "👀 " + role;
    case "proofreader":
      return "🔍 " + role;
    case "illustrator":
      return "🎨 " + role;
    case "translator":
      return "🎤 " + role;
    default:
      return "";
  }
}
