import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { usePointsCounter } from '../hooks/usePointsCounter';
import { useMusicStore } from '../stores/musicStore';
import { THEME } from '../constants/theme';
import { GlassCard } from '../components/ui/GlassCard';
import { PointsCounter } from '../components/ui/PointsCounter';
import { GlassButton } from '../components/ui/GlassButton';

export default function PlayerModal() {
  const router = useRouter();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const challenges = useMusicStore((s) => s.challenges);
  const challenge = challenges.find((c) => c.id === challengeId);

  const { play, pause, resume, isPlaying, currentPosition, duration, loading, error } =
    useMusicPlayer();
  const { currentPoints, progress, startCounting, stopCounting } = usePointsCounter();

  useEffect(() => {
    if (challenge && !hasStarted) {
      console.log('Auto-playing challenge:', challenge.id);
      play(challenge);
      startCounting({
        totalPoints: challenge.points,
        durationSeconds: challenge.duration,
        challengeId: challenge.id,
      });
      setHasStarted(true);
    }
  }, [challenge, hasStarted, play, startCounting]);

  const handleClose = () => {
    console.log('Closing player');
    pause();
    stopCounting();
    router.back();
  };

  const handlePlayPause = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!challenge) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.errorText}>Challenge not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#7553DB', '#1a1a1a', '#0a0a0a']}
        style={StyleSheet.absoluteFillObject}
      />
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X color={THEME.colors.text.primary} size={32} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.albumArt}>
            <LinearGradient
              colors={[THEME.colors.primary, THEME.colors.secondary]}
              style={styles.albumGradient}
            >
              <Text style={styles.albumText}>♪</Text>
            </LinearGradient>
          </View>

          <View style={styles.trackInfo}>
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.artist}>{challenge.artist}</Text>
          </View>

          <GlassCard style={styles.pointsCard}>
            <View style={styles.pointsContainer}>
              <PointsCounter points={currentPoints} label="Points Earned" size="large" />
              {challenge.completed && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓ Completed</Text>
                </View>
              )}
            </View>
          </GlassCard>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.controls}>
            {loading ? (
              <ActivityIndicator size="large" color={THEME.colors.primary} />
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <GlassButton
                  title="Retry"
                  onPress={() => play(challenge)}
                  variant="primary"
                />
              </View>
            ) : (
              <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
                <LinearGradient
                  colors={[THEME.colors.primary, THEME.colors.secondary]}
                  style={styles.playButtonGradient}
                >
                  {isPlaying ? (
                    <Pause color={THEME.colors.text.primary} size={48} fill={THEME.colors.text.primary} />
                  ) : (
                    <Play color={THEME.colors.text.primary} size={48} fill={THEME.colors.text.primary} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: THEME.spacing.lg,
    justifyContent: 'space-around',
  },
  albumArt: {
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  albumGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumText: {
    fontSize: 120,
    color: THEME.colors.text.primary,
    opacity: 0.8,
  },
  trackInfo: {
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  title: {
    fontSize: THEME.fontSizes.xxl,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
    textAlign: 'center',
  },
  artist: {
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.text.secondary,
    textAlign: 'center',
  },
  pointsCard: {
    alignSelf: 'stretch',
  },
  pointsContainer: {
    padding: THEME.spacing.lg,
    alignItems: 'center',
    gap: THEME.spacing.md,
  },
  completedBadge: {
    backgroundColor: THEME.colors.success,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.full,
  },
  completedText: {
    fontSize: THEME.fontSizes.md,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  progressSection: {
    gap: THEME.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: THEME.colors.glassDark,
    borderRadius: THEME.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.text.secondary,
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: THEME.borderRadius.full,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    gap: THEME.spacing.md,
  },
  errorText: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.error,
    textAlign: 'center',
  },
});