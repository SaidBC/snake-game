import { useContext } from "react";
import appleImage from "../assets/apple_00.png";
import { GameContext } from "../App";
function PlayAgainPopup() {
  const { gameStatus, setGameStatus } = useContext(GameContext);
  function handleClick() {
    setGameStatus((prev) => {
      return {
        ...prev,
        isGameOver: false,
        isGameStarted: true,
        gamePlayed: prev.gamePlayed + 1,
      };
    });
  }
  return (
    <div className="popup ">
      <div className="play-again-container">
        <h1>GAME OVER</h1>
        <div>
          <img src={appleImage} alt="" />
          <span>SCORE : {gameStatus.score}</span>
        </div>
        <button onClick={handleClick}>PLAY AGAIN</button>
      </div>
    </div>
  );
}

export default PlayAgainPopup;
