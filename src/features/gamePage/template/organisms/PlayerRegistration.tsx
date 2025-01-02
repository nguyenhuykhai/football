import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { initializePlayers, mockPlayers } from "src/store/slices/teamSlice";
import { Player } from "src/features/gamePage/types/Player";
import { ListRegister } from "../molecules/ListRegister";

type FormValues = {
  name: string;
  jerseyNumber: number;
};

// Schema validation với yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên cầu thủ là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .test("unique-name", "Tên cầu thủ đã tồn tại", function (value) {
      const players = this.options.context?.players || [];
      return !players.some((player: Player) => player.name === value);
    }),
  jerseyNumber: yup
    .number()
    .typeError("Số áo phải là số")
    .required("Số áo là bắt buộc")
    .min(1, "Số áo phải lớn hơn 0")
    .max(99, "Số áo không được vượt quá 99")
    .test("unique-number", "Số áo đã được sử dụng", function (value) {
      const players = this.options.context?.players || [];
      return !players.some((player: Player) => player.jerseyNumber === value);
    }),
});

const PlayerRegistration: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.team.players);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    context: { players }
  });

  const playerNames: string[] = players.map((p) => p.name);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (players.length >= 10) return;

    const updatedPlayerNames = [...playerNames, {name: data.name as string, jerseyNumber: data.jerseyNumber as number}];
    dispatch(initializePlayers(updatedPlayerNames as {name: string, jerseyNumber: number}[]));
    reset();

    if (updatedPlayerNames.length === 10) {
      onNextStep();
    }
  };

  const handleMockPlayers = () => {
    dispatch(mockPlayers());
    onNextStep();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form đăng ký cầu thủ */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 transition-colors">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Đăng ký cầu thủ</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tên cầu thủ
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`mt-1 block w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:border-blue-500 dark:focus:border-blue-400`}
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="jerseyNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Số áo
              </label>
              <input
                id="jerseyNumber"
                type="number"
                {...register("jerseyNumber")}
                className={`mt-1 block w-full border ${
                  errors.jerseyNumber
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:border-blue-500 dark:focus:border-blue-400`}
              />
              {errors.jerseyNumber && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.jerseyNumber.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50
              disabled:cursor-not-allowed transition-colors"
              disabled={players.length >= 10}
            >
              {players.length < 10 ? "Thêm cầu thủ" : "Đã đủ 10 cầu thủ"}
            </button>
          </form>
          <button onClick={handleMockPlayers} className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50
              disabled:cursor-not-allowed transition-colors"
              disabled={players.length >= 10}>
            Giả lập 10 cầu thủ
          </button>
        </div>

        {/* Danh sách cầu thủ */}
        <ListRegister players={players} />
      </div>
    </div>
  );
};

export default PlayerRegistration;