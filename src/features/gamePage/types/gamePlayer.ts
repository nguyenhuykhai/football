export interface Player {
    id: string;
    name: string;
    number: number;
    defenseRating: number;
    skills: Skill[];
    score: number;
    firstPenaltyOrder: number | null;
  }
  
  export interface Skill {
    name: string;
    difficulty: number;
  }
  
  export const AVAILABLE_SKILLS: Skill[] = [
    { name: "Neymar Rainbow Flick", difficulty: 6 },
    { name: "El Tornado", difficulty: 6 },
    { name: "Waka Waka", difficulty: 5 },
    { name: "Sombrero Flick", difficulty: 5 },
    { name: "Okocha Sombrero Flick", difficulty: 4 },
    { name: "Bolasie Flick", difficulty: 4 },
    { name: "Fake Pass", difficulty: 3 },
    { name: "Ball Roll Chop", difficulty: 3 },
    { name: "Ball Roll Cut", difficulty: 3 },
    { name: "Ball Hop", difficulty: 2 },
    { name: "Simple Rainbow", difficulty: 2 },
  ];