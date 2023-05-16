import type { NextApiRequest, NextApiResponse } from "next";
import Chats from "@/lib/airtable";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let createMessage = await Chats.create([
    {
      fields: {
        owner_id: req.query.owner_id,
        owner_image: req.query.owner_image,
        message_text: req.query.text,
        isChat: "false",
        chat_id: req.query.id
      },
    },
  ]);

  let records = createMessage.map((message) => ({ ...message }));

  res.status(200).json(records);
}
