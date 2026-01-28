import { useEffect, useState } from "react";
import styles from "./Bai1.less";

const GuessNumberGame: React.FC = () => {
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

  const getMessageClass = () => {
    if (message.includes("Chúc mừng")) return styles.success;
    if (message.includes("hết lượt")) return styles.error;
    return styles.info;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎯 Trò chơi đoán số</h1>
        <p className={styles.description}>Đoán số từ <span>1 đến 100</span></p>

        <div className={styles.turnsContainer}>
          <p className={styles.turnsLabel}>Lượt còn lại:</p>
          <div className={styles.turnsDisplay}>
            {Array.from({ length: turnsLeft }).map((_, i) => (
              <div key={i} className={styles.turn}></div>
            ))}
          </div>
          <p className={styles.turnsCount}>{turnsLeft}/10</p>
        </div>

        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
          placeholder="Nhập số bạn đoán"
          className={styles.input}
          onKeyPress={(e) => e.key === "Enter" && handleGuess()}
        />

        <div className={styles.buttonGroup}>
          <button 
            onClick={handleGuess} 
            disabled={gameOver}
            className={styles.btnGuess}
          >
            Đoán
          </button>

          <button 
            onClick={resetGame}
            className={styles.btnReset}
          >
            Chơi lại
          </button>
        </div>

        {message && (
          <p className={`${styles.message} ${getMessageClass()}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default GuessNumberGame;