import Leaderboard from "./Leaderboard";
import UserScore from "./UserScore";

function RightSide() {
  return (
    <div className="right-side">
      <UserScore />
      <Leaderboard />
    </div>
  );
}

export default RightSide;
