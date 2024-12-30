// types/Player.ts
import { Technique } from "./Technique";

export type Player = {
  id: number; // ID duy nhất của cầu thủ
  name: string; // Tên cầu thủ
  jerseyNumber: number; // Số áo
  defenseScore: number; // Chỉ số phòng thủ (1-5)
  techniques: Technique[]; // Danh sách kỹ thuật chuyền bóng
  isEliminated: boolean; // Trạng thái bị loại
  orderOfPenalty: number | null; // Thứ tự bị phạt (null nếu chưa bị phạt)
  score: number; // Điểm tổng kết
};
