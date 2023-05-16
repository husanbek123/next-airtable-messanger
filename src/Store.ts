import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  isLoggedIn: boolean;
  chats: string[];
  userID: string;
  user: {
    username: string;
    user_image: string;
    user_id: string;
    chats: string[];
  };
  setChats: (data: string[]) => void;
  setIsLoggedIn: (data: boolean) => void;
  setUserID: (data: string) => void;
  setUser: (data: any) => void;
}

let store = (set: Function): Store => ({
  isLoggedIn: false,
  setIsLoggedIn: (boolean: boolean) =>
    set({
      isLoggedIn: boolean,
    }),
  chats: [],
  setChats: (chats: string[]) =>
    set({
      chats: chats,
    }),
  userID: "",
  setUserID: (data: string) =>
    set({
      userID: data,
    }),
  user: {
    chats: [],
    user_id: "",
    user_image: "",
    username: "",
  },
  setUser: (data: any) =>
    set({
      user: data,
    }),
});

let useStore = create(
  persist(store, {
    name: "MyStore",
  })
);
export default useStore;
