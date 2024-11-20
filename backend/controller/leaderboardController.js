const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

const getLeaderboard = asyncHandler(async function name(req, res) {
  const ranks = await prisma.user.findMany({
    select: { username: true, score: true },
    orderBy: { score: "desc" },
  });
  res.json({ status: "SUCCESS", data: ranks });
});

module.exports = { getLeaderboard };
