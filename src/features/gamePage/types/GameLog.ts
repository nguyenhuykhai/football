// types/GameLog.ts
import { Player } from "./Player";
import { Technique } from "./Technique";

export type GameLog = {
  round: number; // Số vòng
  playerFrom: Player; // Cầu thủ thực hiện chuyền bóng
  playerTo: Player; // Cầu thủ nhận bóng
  techniqueUsed: Technique; // Kỹ thuật sử dụng
  isSuccessful: boolean; // Trạng thái chuyền bóng thành công
};
