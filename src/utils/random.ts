// utils/random.ts
export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
