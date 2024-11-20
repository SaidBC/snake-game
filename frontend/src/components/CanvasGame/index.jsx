import { useContext, useEffect, useRef } from "react";
import { Game } from "./snake-game/index.js";
import { gameControls } from "./snake-game/utils/gameControls.js";
import { GameContext } from "../../App.jsx";
function GameCanvas() {
  const {
    gameStatus: { gamePlayed, isGameStarted },
    setGameStatus,
  } = useContext(GameContext);
  const canvas = useRef(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    const CANVAS_WIDTH = (canvas.current.width = 600);
    const CANVAS_HEIGHT = (canvas.current.height = 600);
    const ctx = canvas.current.getContext("2d");
    const game = new Game({ ctx, CANVAS_WIDTH, CANVAS_HEIGHT });
    let animationRequest;
    function handleKeyDown(e) {
      if (!game.isGameOver && isGameStarted) {
        gameControls(e, game);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    function animate(timestamp) {
      if (!game.isGameOver) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.resetTransform();
        game.draw();
        game.update(timestamp);
        if (game.score != scoreRef.current) {
          setGameStatus((prev) => {
            return { ...prev, score: game.score };
          });
          scoreRef.current = game.score;
        }
        animationRequest = requestAnimationFrame(animate);
      } else {
        setGameStatus((prev) => {
          return { ...prev, isGameOver: true, isGameStarted: false };
        });
      }
    }
    animate(0);
    return () => {
      cancelAnimationFrame(animationRequest);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gamePlayed]);
  return (
    <>
      <canvas ref={canvas} id="canvas"></canvas>
    </>
  );
}

export default GameCanvas;
