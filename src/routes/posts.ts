const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.get("/postList", async (req: Request, res: Response) => {
  let post = await prisma.post.findMany();
  res.status(200).json({ post });
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
  });
  res.status(200).json({ post });
});

router.get("/getPostWithComment/:id", async (req: Request, res: Response) => {
  let post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      comments: {
        select: {
          id: true,
          message: true,
          user: true,
        },
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

router.delete("/deletePost/:id", async (req: Request, res: Response) => {
  try {
    let post = await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
