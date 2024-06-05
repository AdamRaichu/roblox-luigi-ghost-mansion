math.randomseed(os.time());

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.size() - 1; i > 0; i--) {
    const j = math.floor(math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
