export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

export function log(color: string, message: string) {
  console.log(`${color}${message}${colors.reset}`);
}

export let currentLang: "en" | "zh" = "en";

export function setLang(lang: string) {
  currentLang = lang === "zh" ? "zh" : "en";
}
