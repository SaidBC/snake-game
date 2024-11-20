import { useContext, useEffect, useState } from "react";
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

function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/snakegame/api/v1/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setTopPlayers(data.data);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>LEADERBOARD</h1>
        {token && <LogoutButton />}
      </div>
      <div className="leaderboard-list">
        <table>
          <thead>
            <tr>
              <th>RANK</th>
              <th>USERNAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((p, i) => {
              return (
                <tr key={p.username}>
                  <td>{i + 1}</td>
                  <td>{p.username}</td>
                  <td>{p.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
