import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../App";
import ShowError from "./utils/ShowError";

function NewAccountPopup() {
  const { setGameStatus, setIsUserLogged } = useContext(GameContext);
  const [error, setError] = useState({ isError: false, error: null });
  const formRef = useRef(null);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setGameStatus((prev) => ({
        ...prev,
        isGameStarted: true,
        gamePlayed: prev.gamePlayed + 1,
      }));
      setIsUserLogged(true);
    }
  }, []);
  function handleGuest(e) {
    e.preventDefault();
    setGameStatus((prev) => ({
      ...prev,
      isGameStarted: true,
      gamePlayed: prev.gamePlayed + 1,
    }));
    setIsUserLogged(true);
  }
  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    fetch("http://localhost:8000/snakegame/api/v1/user/login", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status != "SUCCESS") {
          return setError({ isError: true, error: data.error });
        }
        localStorage.setItem("token", data.data);
        setIsUserLogged(true);
        setGameStatus((prev) => ({
          ...prev,
          gamePlayed: prev.gamePlayed + 1,
          isGameStarted: true,
        }));
      });
  }
  function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    fetch("http://localhost:8000/snakegame/api/v1/user/register", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status != "SUCCESS") {
          return setError({ isError: true, error: data.error });
        }
        localStorage.setItem("token", data.data);
        setIsUserLogged(true);
        setGameStatus((prev) => ({
          ...prev,
          gamePlayed: prev.gamePlayed + 1,
          isGameStarted: true,
        }));
      });
  }
  return (
    <div className="popup ">
      <div className="new-account-container">
        <h1>WELCOME</h1>
        <form ref={formRef}>
          <label htmlFor="username">USERNAME :</label>
          <input type="text" name="username" id="username" />
          {error.isError && <ShowError path={"username"} error={error.error} />}
          <label htmlFor="password">PASSWORD :</label>
          <input type="password" name="password" id="password" />
          {error.isError && <ShowError path={"password"} error={error.error} />}
          <div>
            <button onClick={handleLogin}>LOGIN</button>
            <button onClick={handleRegister}>REGISTER</button>
            <button onClick={handleGuest}>GUEST</button>
          </div>
        </form>
        <ul>
          <li>
            If you don&lsquo;t have an account just fill form and click login
          </li>
          <li>
            If you already have an account just do same and click register
          </li>
          <li>If you don&lsquo;t want to create account just click guest</li>
        </ul>
      </div>
    </div>
  );
}

export default NewAccountPopup;
