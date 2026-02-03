/**
 * Retourne l'élément le plus fréquent d'un tableau
 * @param items - Tableau d'éléments à analyser
 * @returns L'élément le plus fréquent ou null si le tableau est vide
 */
export function getMostFrequent<T>(items: T[]): T | null {
  if (!items || items.length === 0) {
    return null;
  }

  const frequencyMap = new Map<T, number>();
  
  for (const item of items) {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
  }

  let mostFrequent: T | null = null;
  let maxCount = 0;

  for (const [item, count] of frequencyMap.entries()) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = item;
    }
  }

  return mostFrequent;
}
