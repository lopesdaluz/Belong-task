export interface MusicChallenge {
  id: string;
  title: string;
  artist: string;
  duration: number;
  points: number;
  audioUrl: string;
  imageUrl?: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
  completedAt?: string;
}

export interface UserProgress {
  totalPoints: number;
  completedChallenges: string[];
  currentStreak: number;
  lastPlayedAt?: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentPosition: number;
  duration: number;
  isLoading: boolean;
}

export interface PointsCounterConfig {
  totalPoints: number;
  durationSeconds: number;
  challengeId: string;
}

export const DIFFICULTY_COLORS = {
  easy: '#34CB76',
  medium: '#FCBE25',
  hard: '#FF5252',
} as const;

export const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;