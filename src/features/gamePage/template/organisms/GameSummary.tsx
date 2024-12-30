import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const GameSummary: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const players = useSelector((state: RootState) => state.team.players);

  return (
    <div>
      <h1>Kết quả</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}: {player.score}</li>
        ))}
      </ul>
      <button onClick={onReset}>Chơi lại</button>
    </div>
  );
};

export default GameSummary;
