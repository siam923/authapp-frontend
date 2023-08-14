import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'

type State = {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  setUser: (user: State['user']) => void;
};

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)