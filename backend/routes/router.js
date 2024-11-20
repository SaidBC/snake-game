const express = require("express");
const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/usersController");
const { loginUser, registerUser } = require("../controller/authController");
const { getLeaderboard } = require("../controller/leaderboardController");
const auth = require("../middlewares/auth");
const isFound = require("../middlewares/isFound");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.use(errorHandler);
router.use("/users/:username", isFound);
router.route("/users").get(getAllUsers).post(addUser);
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router
  .route("/users/:username")
  .get(auth, getUser)
  .delete(deleteUser)
  .patch(updateUser);

router.get("/leaderboard", getLeaderboard);

module.exports = router;
