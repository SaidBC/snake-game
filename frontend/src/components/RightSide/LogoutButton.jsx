import { useContext } from "react";
import { GameContext } from "../../App";

function LogoutButton() {
  const { setGameStatus, setIsUserLogged } = useContext(GameContext);

  function handleLogout() {
    window.localStorage.removeItem("token");
    setGameStatus({
      score: 0,
      isGameOver: false,
      isGameStarted: false,
      gamePlayed: 0,
    });
    setIsUserLogged(false);
  }
  return (
    <button onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i>
    </button>
  );
}
export default LogoutButton;
