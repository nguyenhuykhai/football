import { Technique } from "src/features/gamePage/types/Technique";
import { TECHNIQUES } from "./constants";

// utils/random.ts
export const getRandomInt = (min: number, max: number): number => {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}
  

export const getRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const getRandomTechniques = (): Technique[] => {
  const techniques: Technique[] = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * TECHNIQUES.length);
    techniques.push(TECHNIQUES[randomIndex]);
  }
  return techniques;
}

