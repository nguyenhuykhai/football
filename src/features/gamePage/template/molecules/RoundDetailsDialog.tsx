import { GameLog } from "../../types/GameLog";

interface RoundDetailsDialogProps {
  round: number;
  logs: GameLog[];
  onClose: () => void;
}

const RoundDetailsDialog: React.FC<RoundDetailsDialogProps> = ({
  round,
  logs,
  onClose,
}) => {
  const roundLogs = logs.filter((log) => log.round === round);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Chi tiết lượt {round}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {roundLogs.map((log, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {index + 1}. {log.playerFrom.name}
                <span className="mx-2 text-gray-600 dark:text-gray-400">→</span>
                {log.playerTo.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Kỹ năng: {log.techniqueUsed.name}{" "}
                <span className="text-gray-500 dark:text-gray-500">
                  (Độ khó: {log.techniqueUsed.difficulty})
                </span>
              </p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-sm font-medium rounded-full ${
                  log.isSuccessful
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
                }`}
              >
                {log.isSuccessful ? "✓ Thành công" : "✗ Thất bại"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoundDetailsDialog;
