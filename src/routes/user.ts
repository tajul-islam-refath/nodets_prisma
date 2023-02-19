const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  let user = await prisma.user.findMany();
  res.status(200).json({ user });
});

router.get("/getUserWithPosts/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  let user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { posts: true },
  });
  res.status(200).json({ user });
});

router.post("/user", async (req: Request, res: Response) => {
  let user = await prisma.user.create({
    data: req.body,
  });
  res.status(200).json({ user });
});

router.put("/updateUser/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  let user = await prisma.user.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.status(200).json({ user });
});

module.exports = router;
