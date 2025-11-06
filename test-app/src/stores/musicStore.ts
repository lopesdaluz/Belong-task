import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MusicChallenge } from '../types';
import { SAMPLE_CHALLENGES } from '../constants/challenges';

interface MusicStore {
  challenges: MusicChallenge[];
  currentTrack: MusicChallenge | null;
  isPlaying: boolean;
  currentPosition: number;
  duration: number;
  loadChallenges: () => void;
  setCurrentTrack: (track: MusicChallenge | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  updateProgress: (challengeId: string, progress: number) => void;
  markChallengeComplete: (challengeId: string) => void;
  resetChallenge: (challengeId: string) => void;
}

export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      challenges: [],
      currentTrack: null,
      isPlaying: false,
      currentPosition: 0,
      duration: 0,

      loadChallenges: () => {
        const existingChallenges = get().challenges;
        if (existingChallenges.length === 0) {
          set({ challenges: SAMPLE_CHALLENGES });
        }
      },

      setCurrentTrack: (track) => {
        set({ currentTrack: track, currentPosition: 0 });
      },

      setIsPlaying: (isPlaying) => {
        set({ isPlaying });
      },

      setCurrentPosition: (position) => {
        set({ currentPosition: position });
      },

      setDuration: (duration) => {
        set({ duration });
      },

      updateProgress: (challengeId, progress) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, progress: Math.min(100, Math.max(0, progress)) }
              : challenge
          ),
        }));
      },

      markChallengeComplete: (challengeId) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.id === challengeId
              ? {
                  ...challenge,
                  completed: true,
                  progress: 100,
                  completedAt: new Date().toISOString(),
                }
              : challenge
          ),
        }));
      },

      resetChallenge: (challengeId) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.id === challengeId
              ? {
                  ...challenge,
                  completed: false,
                  progress: 0,
                  completedAt: undefined,
                }
              : challenge
          ),
        }));
      },
    }),
    {
      name: 'music-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        challenges: state.challenges,
      }),
    }
  )
);