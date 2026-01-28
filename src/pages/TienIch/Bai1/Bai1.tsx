import styles from "./Bai1.less";
import { useGuessNumberGame } from "@/models/tienich/useGuessNumberGame";

const GuessNumberGame: React.FC = () => {
  const {
    guess,
    setGuess,
    message,
    turnsLeft,
    gameOver,
    handleGuess,
    resetGame,
    getMessageClass,
  } = useGuessNumberGame();

  const getMessageClassWithStyle = () => {
    const messageType = getMessageClass(message);
    if (messageType === "success") return styles.success;
    if (messageType === "error") return styles.error;
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
          <p className={`${styles.message} ${getMessageClassWithStyle()}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default GuessNumberGame;