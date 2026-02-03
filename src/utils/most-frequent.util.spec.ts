import { getMostFrequent } from './most-frequent.util';

describe('getMostFrequent', () => {
  it('devrait retourner "pomme" pour la liste ["pomme","poivre","pomme"]', async () => {
    const input = ["pomme", "poivre", "pomme"];
    const result = getMostFrequent(input);
    
    expect(result).toBe("pomme");
  });

  it('devrait retourner null pour un tableau vide', () => {
    const input: string[] = [];
    const result = getMostFrequent(input);
    
    expect(result).toBeNull();
  });

  it('devrait retourner null pour null ou undefined', () => {
    expect(getMostFrequent(null as any)).toBeNull();
    expect(getMostFrequent(undefined as any)).toBeNull();
  });

  it('devrait retourner le premier élément le plus fréquent en cas d\'égalité', () => {
    const input = ["pomme", "poivre"];
    const result = getMostFrequent(input);
    
    expect(["pomme", "poivre"]).toContain(result);
  });

  it('devrait retourner "pomme" pour la liste ["pomme","pomme","pomme","poivre","poivre"]', () => {
    const input = ["pomme", "pomme", "pomme", "poivre", "poivre"];
    const result = getMostFrequent(input);
    
    expect(result).toBe("pomme");
  });
});
