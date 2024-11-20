const passport = require("../passport_configs/passport");

const auth = function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ status: "FAILED", error: info.message });
    }
    const { username } = req.params;
    if (username != user.username)
      return res.json({
        status: "FAILED",
        data: null,
        error: "not authorized",
      });
    next();
  })(req, res, next);
};

module.exports = auth;
