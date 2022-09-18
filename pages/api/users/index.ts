import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../adapters/prisma";

import { Post } from "../../../interfaces";
import { isPost } from "../../../utils/guards";

import { sampleUserData } from "../../../utils/sample-data";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const post: Post = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,
      };

      if (!isPost(post)) {
        return res.status(400).json({ error: "Invalid post data" });
      }

      const createdPost = await prisma.order.create({
        data: {
          ...post,
        },
      });
      res.status(200).json(createdPost);
    } catch (e) {
      console.error("Request error", e);
      res
        .status(500)
        .json({ error: "Error fetching posts", message: e.message });
    }
  }

  if (req.method === "GET") {
    try {
      if (!Array.isArray(sampleUserData)) {
        throw new Error("Cannot find user data");
      }

      res.status(200).json(sampleUserData);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

export default handler;
