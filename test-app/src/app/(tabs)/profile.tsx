import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trophy, Target, Zap, Award } from 'lucide-react-native';
import { GlassCard } from '../../components/ui/GlassCard';
import { PointsCounter } from '../../components/ui/PointsCounter';
import { GlassButton } from '../../components/ui/GlassButton';
import { useChallenges } from '../../hooks/useChallenges';
import { useUserStore } from '../../stores/userStore';
import { THEME } from '../../constants/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { completedChallenges, totalPoints } = useChallenges();
  const currentStreak = useUserStore((s) => s.currentStreak);
  const resetProgress = useUserStore((s) => s.resetProgress);

  const handleReset = () => {
    console.log('Resetting user progress');
    resetProgress();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
        style={StyleSheet.absoluteFillObject}
      />
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Trophy color={THEME.colors.accent} size={48} />
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>Keep up the great work!</Text>
        </View>

        <View style={styles.pointsSection}>
          <PointsCounter points={totalPoints} label="Total Points Earned" size="large" />
        </View>

        <View style={styles.statsGrid}>
          <GlassCard style={styles.statCard}>
            <View style={styles.statContent}>
              <Target color={THEME.colors.primary} size={32} />
              <Text style={styles.statValue}>{completedChallenges.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </GlassCard>

          <GlassCard style={styles.statCard}>
            <View style={styles.statContent}>
              <Zap color={THEME.colors.secondary} size={32} />
              <Text style={styles.statValue}>{currentStreak}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </GlassCard>
        </View>

        <GlassCard style={styles.achievementsCard}>
          <View style={styles.achievementsHeader}>
            <Award color={THEME.colors.accent} size={24} />
            <Text style={styles.achievementsTitle}>Achievements</Text>
          </View>
          <View style={styles.achievementsList}>
            {completedChallenges.length > 0 ? (
              <>
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementText}>🎵 First Challenge Complete</Text>
                </View>
                {completedChallenges.length >= 3 && (
                  <View style={styles.achievementItem}>
                    <Text style={styles.achievementText}>🔥 Triple Threat</Text>
                  </View>
                )}
                {totalPoints >= 500 && (
                  <View style={styles.achievementItem}>
                    <Text style={styles.achievementText}>💎 Points Master</Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.emptyText}>Complete challenges to unlock achievements</Text>
            )}
          </View>
        </GlassCard>

        <View style={styles.actions}>
          <GlassButton
            title="Reset Progress"
            onPress={handleReset}
            variant="secondary"
            style={styles.resetButton}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: THEME.spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingTop: THEME.spacing.xl,
    marginBottom: THEME.spacing.xl,
  },
  headerTitle: {
    fontSize: THEME.fontSizes.xxl,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
    marginTop: THEME.spacing.md,
  },
  headerSubtitle: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.text.secondary,
    marginTop: THEME.spacing.xs,
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    padding: THEME.spacing.lg,
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  statValue: {
    fontSize: THEME.fontSizes.xxl,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  statLabel: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.text.secondary,
  },
  achievementsCard: {
    marginBottom: THEME.spacing.lg,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
    padding: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  achievementsTitle: {
    fontSize: THEME.fontSizes.lg,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  achievementsList: {
    padding: THEME.spacing.md,
    gap: THEME.spacing.sm,
  },
  achievementItem: {
    paddingVertical: THEME.spacing.sm,
  },
  achievementText: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.text.primary,
  },
  emptyText: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.text.tertiary,
    textAlign: 'center',
    paddingVertical: THEME.spacing.lg,
  },
  actions: {
    marginBottom: THEME.spacing.lg,
  },
  resetButton: {
    width: '100%',
  },
  bottomPadding: {
    height: THEME.spacing.xl,
  },
});