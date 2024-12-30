import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { GameViewModel } from '../viewmodels/GameViewModel2';

interface GameViewProps {
  viewModel: GameViewModel;
}

const GameTemplate: React.FC<GameViewProps> = observer(({ viewModel }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName && playerNumber) {
      viewModel.initializePlayers([{ 
        name: playerName, 
        number: parseInt(playerNumber) 
      }]);
      setPlayerName('');
      setPlayerNumber('');
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-3">Thêm cầu thủ</h2>
        <form onSubmit={handleAddPlayer} className="flex gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Tên cầu thủ"
            className="p-2 border rounded text-gray-900"
          />
          <input
            type="number"
            value={playerNumber}
            onChange={(e) => setPlayerNumber(e.target.value)}
            placeholder="Số áo"
            className="p-2 border rounded text-gray-900"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Thêm
          </button>
        </form>
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-bold mb-3">Danh sách cầu thủ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {viewModel.players.map(player => (
            <div key={player.id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-semibold">{player.name} - #{player.number}</h3>
              <p className="mt-2">Chỉ số phòng thủ: {player.defenseRating}</p>
              <p className="mt-2">Kỹ năng:</p>
              <ul className="list-disc pl-5">
                {player.skills.map(skill => (
                  <li key={skill.name}>{skill.name} (Độ khó: {skill.difficulty})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="my-5">
        <button 
          onClick={() => viewModel.startNewRound()}
          disabled={viewModel.currentRound >= 10}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Bắt đầu lượt mới
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Top 3 cầu thủ</h2>
        {viewModel.getTopPlayers().map((player, index) => (
          <div 
            key={player.id} 
            className={`p-3 mb-2 rounded ${
              index === 0 ? 'bg-yellow-300' : 
              index === 1 ? 'bg-gray-300' : 
              'bg-yellow-600'
            }`}
          >
            <h3 className="font-semibold">{player.name}</h3>
            <p>Điểm: {viewModel.calculateScore(player)}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default GameTemplate;