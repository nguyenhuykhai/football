// types/Game.ts
import { Player } from "./Player";

export type Game = {
  round: number; // Số vòng hiện tại
  currentPlayer: Player | null; // Cầu thủ hiện đang giữ bóng
  targetPlayer: Player | null; // Cầu thủ nhận bóng
  failedPlayer: Player | null; // Cầu thủ bị phạt trong lượt
  isFinished: boolean; // Trạng thái kết thúc trò chơi
};
