import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, CheckCircle, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { GlassCard } from '../../components/ui/GlassCard';
import { MusicChallenge, DIFFICULTY_COLORS } from '../../types';
import { THEME } from '../../constants/theme';

interface ChallengeCardProps {
  challenge: MusicChallenge;
  onPress: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onPress }) => {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const difficultyColor = DIFFICULTY_COLORS[challenge.difficulty];

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {challenge.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {challenge.artist}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              {challenge.completed ? (
                <CheckCircle color={THEME.colors.success} size={32} />
              ) : (
                <Play color={THEME.colors.primary} size={32} fill={THEME.colors.primary} />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock color={THEME.colors.text.secondary} size={16} />
              <Text style={styles.infoText}>{formatDuration(challenge.duration)}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>{challenge.difficulty.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.pointsContainer}>
            <LinearGradient
              colors={[THEME.colors.accent, '#d9a11f']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.pointsGradient}
            >
              <Text style={styles.pointsText}>+{challenge.points} pts</Text>
            </LinearGradient>
          </View>

          {challenge.progress > 0 && !challenge.completed && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${challenge.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(challenge.progress)}%</Text>
            </View>
          )}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: THEME.spacing.md,
  },
  content: {
    padding: THEME.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: THEME.spacing.sm,
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.xs,
  },
  artist: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.text.secondary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs,
  },
  infoText: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
  },
  difficultyText: {
    fontSize: THEME.fontSizes.xs,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  pointsContainer: {
    overflow: 'hidden',
    borderRadius: THEME.borderRadius.sm,
  },
  pointsGradient: {
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: THEME.fontSizes.md,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  progressContainer: {
    marginTop: THEME.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: THEME.colors.glassDark,
    borderRadius: THEME.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
  },
  progressText: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.text.secondary,
    fontWeight: THEME.fontWeights.medium,
  },
});
