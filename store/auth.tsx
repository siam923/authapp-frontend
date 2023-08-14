import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools(
      persist(
        (set) => ({
          isAuthenticated: false,
          login: () => set((state) => ({ isAuthenticated: true })),
          logout: () => set((state) => ({ isAuthenticated: false })),
        }),
        {
          name: 'bear-storage',
        }
      )
    )
  )

export default useAuthStore;
