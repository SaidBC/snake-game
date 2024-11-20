const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { validateUser, updateUserValidate } = require("../utils/validator");
const { hash, genSalt } = require("bcrypt");
const prisma = new PrismaClient();

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, score: true },
  });
  res.json({ status: "SUCCESS", data: users });
});

const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, score: true },
  });
  res.json({ status: "SUCCESS", data: user });
});

const addUser = asyncHandler(async (req, res) => {
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
  res.json({ status: "SUCCESS", data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.delete({ where: { username } });
  res.json({ status: "SUCCESS", data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "FAILED", error: errors.array() });
  }
  const { username } = req.params;
  let { password, ...data } = req.body;
  if (password !== undefined) {
    const salt = await genSalt(10);
    password = await hash(password, salt);
  }
  console.log(req.body);
  const user = await prisma.user.update({
    where: { username },
    data: (() => (password === undefined ? data : { ...data, password }))(),
  });
  res.json({ status: "SUCCESS", data: user });
});

module.exports = {
  getAllUsers,
  getUser,
  addUser: [validateUser, addUser],
  deleteUser,
  updateUser: [updateUserValidate, updateUser],
};
