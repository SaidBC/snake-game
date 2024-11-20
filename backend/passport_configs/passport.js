const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("@prisma/client");
const { compare } = require("bcrypt");
const prisma = new PrismaClient();

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) {
        return done(null, false, { message: "user not found" });
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports = passport;
