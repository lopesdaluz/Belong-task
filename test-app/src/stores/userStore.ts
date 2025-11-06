import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  totalPoints: number;
  completedChallenges: string[];
  currentStreak: number;
  lastPlayedAt?: string;
  addPoints: (points: number) => void;
  completeChallenge: (challengeId: string, points: number) => void;
  resetProgress: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      completedChallenges: [],
      currentStreak: 0,
      lastPlayedAt: undefined,

      addPoints: (points) => {
        set((state) => ({
          totalPoints: state.totalPoints + points,
        }));
      },

      completeChallenge: (challengeId, points) => {
        const state = get();
        if (!state.completedChallenges.includes(challengeId)) {
          set({
            completedChallenges: [...state.completedChallenges, challengeId],
            totalPoints: state.totalPoints + points,
            currentStreak: state.currentStreak + 1,
            lastPlayedAt: new Date().toISOString(),
          });
        }
      },

      resetProgress: () => {
        set({
          totalPoints: 0,
          completedChallenges: [],
          currentStreak: 0,
          lastPlayedAt: undefined,
        });
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);