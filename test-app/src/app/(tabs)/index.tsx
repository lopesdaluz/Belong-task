import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Music } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChallengeCard } from '../../components/challenge/ChallengeCard';
import { PointsCounter } from '../../components/ui/PointsCounter';
import { useChallenges } from '../../hooks/useChallenges';
import { THEME } from '../../constants/theme';
import { MusicChallenge } from '../../types';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { challenges, activeChallenges, completedChallengesList, totalPoints } = useChallenges();

  const handleChallengePress = (challenge: MusicChallenge) => {
    console.log('Opening player for challenge:', challenge.id);
    router.push({
      pathname: '/player',
      params: { challengeId: challenge.id },
    });
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
            <View style={styles.headerTop}>
              <View style={styles.logoContainer}>
                <Music color={THEME.colors.primary} size={32} />
                <Text style={styles.headerTitle}>MusicRewards</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>
              Listen to music, earn rewards
            </Text>
          </View>

          <View style={styles.pointsSection}>
            <PointsCounter points={totalPoints} label="Total Points" size="large" />
          </View>

          {activeChallenges.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Active Challenges</Text>
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => handleChallengePress(challenge)}
                />
              ))}
            </View>
          )}

          {completedChallengesList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Completed</Text>
              {completedChallengesList.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => handleChallengePress(challenge)}
                />
              ))}
            </View>
          )}

          {challenges.length === 0 && (
            <View style={styles.emptyState}>
              <Music color={THEME.colors.text.tertiary} size={64} />
              <Text style={styles.emptyStateText}>No challenges available</Text>
            </View>
          )}

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
    paddingTop: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  headerTitle: {
    fontSize: THEME.fontSizes.xxl,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.text.secondary,
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  section: {
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: THEME.fontSizes.xl,
    fontWeight: THEME.fontWeights.bold,
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.xxl,
    gap: THEME.spacing.md,
  },
  emptyStateText: {
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.text.tertiary,
  },
  bottomPadding: {
    height: THEME.spacing.xl,
  },
});
