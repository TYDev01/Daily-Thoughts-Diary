import { create } from "zustand";

export type UserState = {
  address: string | null;
  isAuthenticated: boolean;
  premium: boolean;
  freeImageUploadsUsed: number;
  lastRewardTimestamp: number;
};

type AppState = {
  user: UserState;
  setUser: (update: Partial<UserState>) => void;
  resetUser: () => void;
};

const defaultUser: UserState = {
  address: null,
  isAuthenticated: false,
  premium: false,
  freeImageUploadsUsed: 0,
  lastRewardTimestamp: 0,
};

export const useAppStore = create<AppState>((set) => ({
  user: defaultUser,
  setUser: (update) =>
    set((state) => ({
      user: { ...state.user, ...update },
    })),
  resetUser: () => set({ user: defaultUser }),
}));
