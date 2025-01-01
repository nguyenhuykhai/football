// utils/calculation.ts
export const calculatePassSuccess = (
    defenseScore: number,
    techniqueScore: number
  ): boolean => {
    const defensiveRatio = defenseScore / (techniqueScore + defenseScore);
    return Math.random() < defensiveRatio ? true : false;
  };
  