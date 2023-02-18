const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  let user = await prisma.user.findMany();
  res.status(200).json({ user });
});

router.post("/user", async (req: Request, res: Response) => {
  let user = await prisma.user.create({
    data: req.body,
  });
  res.status(200).json({ user });
});

router.get("/post/:id", async (req: Request, res: Response) => {
  let post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.status(200).json({ post });
});

router.get("/getPostWithAuthor/:id", async (req: Request, res: Response) => {
  let post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true },
  });
  res.status(200).json({ post });
});

router.get("/getPostByAuthor/:id", async (req: Request, res: Response) => {
  let post = await prisma.post.findMany({
    where: { authorId: Number(req.params.id) },
    select: {
      title: true,
      content: true,
      author: {
        select: { name: true },
      },
    },
  });
  res.status(200).json({ post });
});

router.post("/post", async (req: Request, res: Response) => {
  let post = await prisma.post.create({
    data: req.body,
  });
  res.status(200).json({ post });
});

module.exports = router;
