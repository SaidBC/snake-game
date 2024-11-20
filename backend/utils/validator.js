const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateUser = [
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .custom((val) => {
      return new Promise(async (res, rej) => {
        const user = await prisma.user.findFirst({
          where: { username: val },
        });
        if (user) {
          rej("Username already exists");
        } else {
          res();
        }
      });
    }),
  body("password")
    .isLength({ min: 4 })
    .withMessage("At least 4 character in password"),
];

const updateUserValidate = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username must not be empty")
    .custom((val) => {
      return new Promise(async (res, rej) => {
        const user = await prisma.user.findFirst({
          where: { username: val },
        });
        if (user) {
          rej("Username already exists");
        } else {
          res();
        }
      });
    }),
  body("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("At least 4 character in password"),
  body("score")
    .optional()
    .isInt()
    .withMessage("Score must be an integer value")
    .isInt({ gt: 0 })
    .withMessage("Score must be higher or equal 0"),
];

const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty")
    .custom((username) => {
      return new Promise(async (res, rej) => {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          return rej("User not found");
        }
        res();
      });
    }),
  body("password")
    .isLength({ min: 4 })
    .withMessage("At least 4 character in password"),
];

module.exports = { validateLogin, validateUser, updateUserValidate };
