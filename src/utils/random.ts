import { Technique } from "src/features/gamePage/types/Technique";
import { TECHNIQUES } from "./constants";

export const getRandomInt = (min: number, max: number): number => {
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomInt;
}
  
export const getRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const getRandomTechniques = (): Technique[] => {
  const randomTechniques = TECHNIQUES.sort(() => Math.random() - 0.5).slice(0, 5);
  return randomTechniques;
}

