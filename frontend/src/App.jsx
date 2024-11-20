import { createContext, useMemo, useState } from "react";
import GameCanvas from "./components/CanvasGame";
import RightSide from "./components/RightSide/RightSide";
import PlayAgainPopup from "./components/PlayAgainPopup";
import NewAccountPopup from "./components/NewAccountPopup";

export const GameContext = createContext({ score: 0 });
function App() {
  const [gameStatus, setGameStatus] = useState({
    score: 0,
    isGameOver: false,
    isGameStarted: false,
    gamePlayed: 0,
  });
  const [isUserLogged, setIsUserLogged] = useState(false);
  const value = useMemo(
    () => ({
      gameStatus,
      setGameStatus,
      isUserLogged,
      setIsUserLogged,
    }),
    [gameStatus, setGameStatus, isUserLogged, setIsUserLogged]
  );

  //  TRY AGAIN POPUP + LOGIN / REGISTER OR GUEST POPUP
  return (
    <GameContext.Provider value={value}>
      <div className="container">
        {isUserLogged && <GameCanvas />}
        {isUserLogged && <RightSide />}
        {gameStatus.isGameOver && <PlayAgainPopup />}
        {!isUserLogged && <NewAccountPopup />}
      </div>
    </GameContext.Provider>
  );
}

export default App;
