import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../App";
import LogoutButton from "./LogoutButton";
const API_BASE_URL =
  "https://snake-game-production-9f17.up.railway.app/snakegame/api/v1";

function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState([]);
  const token = localStorage.getItem("token");
  const {
    gameStatus: { gamePlayed },
  } = useContext(GameContext);
  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        setTopPlayers(data.data);
      });
  }, [gamePlayed]);

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
