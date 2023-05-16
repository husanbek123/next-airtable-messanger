import Chats, { Users } from "@/lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import Message from "@/components/message";
import useStore from "@/Store";
import { useRouter } from "next/router";
type Props = {
  messages: any;
  chatsRes: any;
};

export default function ChatDetailed({ messages }: Props) {
  console.log(messages);
  let { userID, user, setUserID } = useStore((state) => state);
  let { query } = useRouter();

  let InputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(InputRef.current?.value);

    let res = await fetch(
      `http://localhost:3000/api/createMessage?id=${
        query.id
      }&owner_id=${userID}&owner_image=${
        user.user_image
      }&text=${InputRef.current?.value.toString()}`
    );
    let data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    setUserID(userID);
  }, [userID]);

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <div className={styles.messages}>
          {messages?.map((message: any) => {
            if (message.message_text) {
              return <Message {...message} id={userID} />;
            }
          })}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" ref={InputRef} />
          <button type="submit">📤</button>
        </form>
      </div>
    </div>
  );
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  //   let res1 = await Users.select().firstPage();
  //   let users = res1.map((record) => ({
  //     ...record.fields,
  //   }));

  let chatsRes = await Chats.select({
    // filterByFormula: `AND(chat_id='${params?.id}', isChat='false')`,
    filterByFormula: `AND({chat_id} = "${params.id}", {isChat}="false")`,
    sort: [
      {
        field: "createdAt",
      },
    ],
  }).firstPage();
  console.log(chatsRes);

  let messages = chatsRes.map((record) => ({
    ...record.fields,
    recordID: record.id,
  }));

  return {
    props: { messages },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  return {
    paths: ["/chat/info"],
    fallback: true,
  };
}
