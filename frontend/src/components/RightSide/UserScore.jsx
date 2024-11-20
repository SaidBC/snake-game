import { useContext, useEffect, useState } from "react";
import appleImage from "../../assets/apple_00.png";
import trophyImage from "../../assets/trophy_00.png";
import { GameContext } from "../../App";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL =
  "https://snake-game-production-9f17.up.railway.app/snakegame/api/v1";

function UserScore() {
  const {
    gameStatus: { score, gamePlayed },
  } = useContext(GameContext);
  const [highscore, setHighscore] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = jwtDecode(token);
      fetch(`${API_BASE_URL}/${payload.username}`, {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setHighscore(data.data.score);
        });
    }
  }, []);
  useEffect(() => {
    if (highscore < score) {
      const token = localStorage.getItem("token");
      setHighscore(score);
      if (token) {
        const payload = jwtDecode(token);
        fetch(`${API_BASE_URL}/users/${payload.username}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("UPDATED");
            console.log(data);
          });
      }
    }
  }, [score]);
  return (
    <div className="userscore-container">
      <div className="score">
        <img src={appleImage} alt="" />
        <h2>SCORE </h2>
        <span>{score}</span>
      </div>
      <div className="highscore">
        <img src={trophyImage} alt="" />
        <h2>HIGHSCORE </h2>
        <span>{highscore}</span>
      </div>
    </div>
  );
}

export default UserScore;
