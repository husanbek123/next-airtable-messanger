import React, { useEffect, useState } from "react";
import Chats, { Users } from "@/lib/airtable";

type Props = {
  users: any;
  chats: any;
};

export default function Test({ users, chats }: Props) {
  let [data, setData] = useState<any>([]);
  useEffect(() => {
    if (users) {
    }
  }, []);
  return (
    <div>
      <div>
        {chats.map((chat: { createdAt: string; message_text: string }) => {
          console.log(chat.createdAt);

          return (
            <h3 style={{ display: "flex" }}>
              {chat.message_text}{" "}
              <h6>
                {
                  chat.createdAt
                    .slice(0, chat.createdAt.length - 5)
                    .replace("T", "")
                  // .slice(1, Infinity)
                }
              </h6>
            </h3>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let res = await Users.select().firstPage();
  let users = res.map((record) => ({
    ...record.fields,
  }));

  let chatsRes = await Chats.select({
    filterByFormula: "isChat='false'",

    sort: [
      {
        field: "createdAt",
      },
    ],
  }).firstPage();
  let chats = chatsRes.map((record) => ({ ...record.fields }));

  return {
    props: { users, chats },
  };
}
