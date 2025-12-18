import { devtools, persist } from "zustand/middleware";
import { create, type StateCreator } from "zustand";
import type { Session } from "./types";
import { queryClient } from "../libs/react-query";

const middleware = (f: StateCreator<SessionStore, [], []>) =>
  devtools(persist(f, { name: "session" }));

interface SessionStore {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  middleware((set) => ({
    session: null,
    setSession: (session: Session) => set({ session }),
    clearSession: () => {
      queryClient.clear();
      set({ session: null });
    },
  }))
);
