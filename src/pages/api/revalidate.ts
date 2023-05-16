// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    res.status(401).json({ message: "Error occured" });
  }

  try {
    console.log(req.query);

    res.revalidate(`/chat/${req.query.id}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
