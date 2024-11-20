const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const { validateUser, validateLogin } = require("../utils/validator");
const { compare } = require("bcrypt");
const { hash, genSalt } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const registerUser = asyncHandler(async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "FAILED", error: errors.array() });
  }

  let { username, password } = req.body;
  const salt = await genSalt(10);
  password = await hash(password, salt);
  const user = await prisma.user.create({
    data: { username, password },
  });
  const token = sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  res.json({ status: "SUCCESS", data: token });
});

const loginUser = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: "FAILED", error: errors.array() });
  }
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  const match = compare(password, user.password);
  if (!match)
    return res.json({
      status: "FAILED",
      error: { message: "Incorrect password", path: "password" },
    });
  const token = sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return res.json({ status: "SUCCESS", data: token });
};

module.exports = {
  loginUser: [validateLogin, loginUser],
  registerUser: [validateUser, registerUser],
};
