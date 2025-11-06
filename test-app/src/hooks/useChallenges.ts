import { useEffect, useMemo } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { useUserStore } from '../stores/userStore';
import { MusicChallenge } from '../types';

export interface UseChallengesReturn {
  challenges: MusicChallenge[];
  completedChallenges: string[];
  activeChallenges: MusicChallenge[];
  completedChallengesList: MusicChallenge[];
  totalPoints: number;
  refreshChallenges: () => void;
}

export const useChallenges = (): UseChallengesReturn => {
  const challenges = useMusicStore((s) => s.challenges);
  const loadChallenges = useMusicStore((s) => s.loadChallenges);
  const completedChallenges = useUserStore((s) => s.completedChallenges);
  const totalPoints = useUserStore((s) => s.totalPoints);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const activeChallenges = useMemo(() => {
    return challenges.filter((challenge) => !challenge.completed);
  }, [challenges]);

  const completedChallengesList = useMemo(() => {
    return challenges.filter((challenge) => challenge.completed);
  }, [challenges]);

  const refreshChallenges = () => {
    loadChallenges();
  };

  return {
    challenges,
    completedChallenges,
    activeChallenges,
    completedChallengesList,
    totalPoints,
    refreshChallenges,
  };
};