const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isFound = async function (req, res, next) {
  const { username } = req.params;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.json({ status: "FAILED", error: "NOT FOUND" });
  }
  next();
};

module.exports = isFound;
