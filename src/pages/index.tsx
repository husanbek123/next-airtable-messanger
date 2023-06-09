import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Chats, { Users } from "@/lib/airtable";
import Chat from "@/components/chat-card";
import useStore from "@/Store";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ chats, users }: { chats: any; users: any }) {
  let { chats: cha, setChats, setUserID, setUser} = useStore((state) => state);

  useEffect(() => {
    setChats(chats[0].chats);
    setUserID(users[0].user_id);
    setUser(users[0])
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome to world chat!</h1>
        <div>
          {chats.map((chat: any) => (
            <Chat data={chat} />
          ))}
        </div>
        <Link href={"/test"}>Test page</Link>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let res = await Users.select({
    filterByFormula: 'username="Hasan555"',
  }).firstPage();
  let users = res.map((record) => ({
    ...record.fields,
  }));

  let user = users[0].username as string;
  let str = user[0].toUpperCase();
  let user_id = str + user.slice(1, Infinity);

  console.log(user_id);

  let chatsRes = await Chats.select({
    filterByFormula: `AND({isChat} = 'true', {chat_members}="${user_id}")`,

    sort: [
      {
        field: "createdAt",
      },
    ],
  }).firstPage();

  let chats = chatsRes.map((record) => ({ ...record.fields }));
  return {
    props: {
      chats,
      users,
    },
  };
}
