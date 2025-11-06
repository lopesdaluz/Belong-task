import { useState, useEffect, useCallback, useRef } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { useUserStore } from '../stores/userStore';
import { PointsCounterConfig } from '../types';

export interface UsePointsCounterReturn {
  currentPoints: number;
  pointsEarned: number;
  progress: number;
  isActive: boolean;
  startCounting: (config: PointsCounterConfig) => void;
  stopCounting: () => void;
  resetProgress: () => void;
}

export const usePointsCounter = (): UsePointsCounterReturn => {
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [config, setConfig] = useState<PointsCounterConfig | null>(null);

  const currentPosition = useMusicStore((s) => s.currentPosition);
  const duration = useMusicStore((s) => s.duration);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const updateProgress = useMusicStore((s) => s.updateProgress);
  const markChallengeComplete = useMusicStore((s) => s.markChallengeComplete);
  const completeChallenge = useUserStore((s) => s.completeChallenge);

  const hasCompletedRef = useRef<boolean>(false);

  const startCounting = useCallback((newConfig: PointsCounterConfig) => {
    console.log('Starting points counter with config:', newConfig);
    setConfig(newConfig);
    setIsActive(true);
    setCurrentPoints(0);
    setPointsEarned(0);
    hasCompletedRef.current = false;
  }, []);

  const stopCounting = useCallback(() => {
    console.log('Stopping points counter');
    setIsActive(false);
    setConfig(null);
  }, []);

  const resetProgress = useCallback(() => {
    setCurrentPoints(0);
    setPointsEarned(0);
    hasCompletedRef.current = false;
  }, []);

  useEffect(() => {
    if (!isActive || !config || !isPlaying || duration === 0) {
      return;
    }

    const progressPercentage = Math.min((currentPosition / duration) * 100, 100);
    const earnedPoints = Math.floor((progressPercentage / 100) * config.totalPoints);

    if (earnedPoints > pointsEarned) {
      console.log(`Points earned: ${earnedPoints} (${progressPercentage.toFixed(1)}%)`);
      setPointsEarned(earnedPoints);
      setCurrentPoints(earnedPoints);
      updateProgress(config.challengeId, progressPercentage);
    }

    if (progressPercentage >= 95 && !hasCompletedRef.current) {
      console.log('Challenge completed!');
      hasCompletedRef.current = true;
      markChallengeComplete(config.challengeId);
      completeChallenge(config.challengeId, config.totalPoints);
    }
  }, [
    currentPosition,
    duration,
    isActive,
    isPlaying,
    config,
    pointsEarned,
    updateProgress,
    markChallengeComplete,
    completeChallenge,
  ]);

  const progress = config && duration > 0 ? (currentPosition / duration) * 100 : 0;

  return {
    currentPoints,
    pointsEarned,
    progress,
    isActive,
    startCounting,
    stopCounting,
    resetProgress,
  };
};