export function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
