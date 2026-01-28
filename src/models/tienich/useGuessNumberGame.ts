import { useEffect, useState } from "react";

export const useGuessNumberGame = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [turnsLeft, setTurnsLeft] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Sinh số ngẫu nhiên khi bắt đầu game
  useEffect(() => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  }, []);

  const handleGuess = () => {
    if (gameOver) return;

    const userGuess = Number(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Vui lòng nhập số từ 1 đến 100!");
      return;
    }

    if (userGuess === randomNumber) {
      setMessage("🎉 Chúc mừng! Bạn đã đoán đúng!");
      setGameOver(true);
    } else {
      const newTurns = turnsLeft - 1;
      setTurnsLeft(newTurns);

      if (userGuess < randomNumber) {
        setMessage("⬇️ Bạn đoán quá thấp!");
      } else {
        setMessage("⬆️ Bạn đoán quá cao!");
      }

      if (newTurns === 0) {
        setMessage(`❌ Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
        setGameOver(true);
      }
    }

    setGuess("");
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setTurnsLeft(10);
    setGameOver(false);
  };

  const getMessageClass = (message: string) => {
    if (message.includes("Chúc mừng")) return "success";
    if (message.includes("hết lượt")) return "error";
    return "info";
  };

  return {
    randomNumber,
    guess,
    setGuess,
    message,
    turnsLeft,
    gameOver,
    handleGuess,
    resetGame,
    getMessageClass,
  };
};
