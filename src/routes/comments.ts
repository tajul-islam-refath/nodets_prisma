const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.post("/createComment", async (req: Request, res: Response) => {
  let comment = await prisma.comment.create({
    data: req.body,
  });
  res.status(200).json({ comment });
});

router.get("/getCommentByPost/:postId", async (req: Request, res: Response) => {
  let postId = req.params.postId;
  let comment = await prisma.comment.findMany({
    where: { postId: Number(postId) },
  });
  res.status(200).json({ comment });
});

module.exports = router;
