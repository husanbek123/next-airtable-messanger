import React from "react";
import styles from "./index.module.scss";

import { Inter } from "next/font/google";

type Props = {
  message_text: string;
  createdAt: string;
  id: string;
  owner_id: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function Message({
  createdAt,
  message_text,
  id,
  owner_id,
}: Props) {
  console.log(id, owner_id);

  return (
    <div
      className={[
        styles.message_box,
        owner_id === id && styles.right_message,
      ].join(" ")}
    >
      <div className={styles.message}>
        <p>{message_text}</p>
        <span>
          {createdAt
            .slice(0, createdAt.length - 5)
            .replace("T", "")
            .slice(10, 18)}
        </span>
      </div>
    </div>
  );
}
