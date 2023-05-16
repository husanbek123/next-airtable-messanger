import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
type Props = {
  data: any;
};

export default function Chat({ data }: Props) {
  console.log(data);

  return (
    <Link href={`/chat/${data.chat_id}`}>
      <div className={styles.chat}>
        <h3>{data.chat_title}</h3>
      </div>
    </Link>
  );
}
