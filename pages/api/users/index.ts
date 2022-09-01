import { NextApiRequest, NextApiResponse } from "next";
import { sampleUserData } from "../../../utils/sample-data";

import prisma from "../../../adapters/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const posts = await prisma.order.create({
        data: {
          ...req.body,
        },
      });
      res.status(200).json(posts);
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
