import { Router } from "express";
import prisma from "@prisma/client";

const { user } = new prisma.PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const users = await user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  const userExists = await user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (userExists) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }
  const newUser = await user.create({
    data: {
      username,
    },
  });
  res.json(newUser);
});

export { router as userRouter };
