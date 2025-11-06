import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useChallenges } from '../../hooks/useChallenges';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { ChallengeCard } from './ChallengeCard';
import { MusicChallenge } from '../../types';
import { THEME } from '../../constants/theme';

interface ChallengeListProps {
  onPlay: (challenge: MusicChallenge) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ onPlay }) => {
  const { challenges, loading, error } = useChallenges();
  const { currentTrack, isPlaying } = useMusicPlayer();

  if (loading) {
    return <Text style={styles.messageText}>Loading challenges...</Text>;
  }

  if (error) {
    return <Text style={styles.messageText}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={challenges}
      renderItem={({ item }) => (
        <ChallengeCard
          challenge={item}
          onPlay={onPlay}
          isCurrentTrack={currentTrack?.id === item.id}
          isPlaying={isPlaying && currentTrack?.id === item.id}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: THEME.spacing.md,
  },
  messageText: {
    color: THEME.colors.text.primary,
    textAlign: 'center',
    marginTop: THEME.spacing.lg,
  },
});

export default ChallengeList;
