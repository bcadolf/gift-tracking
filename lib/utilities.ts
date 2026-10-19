export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function capitalizeFirstLetter(word: string) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
