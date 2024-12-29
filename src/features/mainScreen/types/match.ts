export interface MatchEvent {
  id: string;
  homeScore: Score;
  tournament: Tournament;
  homeTeam: TeamBasic;
  awayScore: Score;
  awayTeam: TeamBasic;
  status: Status;
  winnerCode: number;
  startTimestamp: number;
  stage_id: string;
}

interface Score {
  current: number;
  display: number;
  period1: number;
  period2: number;
  corner: number;
  yellow_card: number;
  red_card: number;
  overTime_score: number;
  penalty_score: number;
}

interface TeamBasic {
  id: string;
  name: string;
  slug: string;
  shortName: string;
}

interface Tournament {
  id: string;
  priority: number;
  name: string;
  slug: string;
  category: Category;
}

interface Category {
  name: string;
  slug: string;
  id: string;
  flag?: string;
}

interface Status {
  code: number;
  description: string;
  type: string;
}
