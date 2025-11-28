import { devtools, persist } from "zustand/middleware";
import { create, type StateCreator } from "zustand";
import type { ISession, UserType } from "./types";
import { queryClient } from "../libs/react-query";

const middleware = (f: StateCreator<ISessionStore, [], []>) =>
  devtools(persist(f, { name: "session" }));

interface ISessionStore {
  session: ISession | null;
  setSession: (session: ISession) => void;
  clearSession: () => void;
  returnUserType: () => UserType | null;
}

export const useSessionStore = create<ISessionStore>()(
  middleware((set, get) => ({
    session: null,
    setSession: (session: ISession) => set({ session }),
    clearSession: () => {
      queryClient.clear();
      set({ session: null });
    },
    returnUserType: () => {
      const user = get().session?.user;
      return user ?? null;
    },
  }))
);
