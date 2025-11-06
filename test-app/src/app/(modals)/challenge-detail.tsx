// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { useChallenges } from '../../hooks/useChallenges';
// import { GlassCard } from '../../components/ui/GlassCard';
// import { THEME } from '../../constants/theme';

// export default function ChallengeDetailScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const { challenges } = useChallenges();
//   const challenge = challenges.find((c) => c.id === id);

//   if (!challenge) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Challenge not found.</Text>
//       </View>
//     );
//   }

//   const formatDuration = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <GlassCard style={styles.card}>
//         <Text style={styles.title}>{challenge.title}</Text>
//         <Text style={styles.artist}>{challenge.artist}</Text>
//         <Text style={styles.description}>{challenge.description}</Text>

//         <View style={styles.infoRow}>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoLabel}>Difficulty</Text>
//             <Text style={styles.infoValue}>{challenge.difficulty}</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoLabel}>Duration</Text>
//             <Text style={styles.infoValue}>{formatDuration(challenge.duration)}</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoLabel}>Points</Text>
//             <Text style={[styles.infoValue, { color: THEME.colors.accent }]}>
//               {challenge.points}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.progressContainer}>
//           <Text style={styles.progressLabel}>Progress</Text>
//           <View style={styles.progressTrack}>
//             <View
//               style={[
//                 styles.progressFill,
//                 { width: `${challenge.progress}%` },
//               ]}
//             />
//           </View>
//           <Text style={styles.progressText}>{Math.round(challenge.progress)}%</Text>
//         </View>

//         <View style={styles.statusContainer}>
//             <Text style={styles.statusLabel}>Status</Text>
//             <Text style={[styles.statusValue, {color: challenge.completed ? THEME.colors.secondary : THEME.colors.text.secondary}]}>
//                 {challenge.completed ? 'Completed' : 'Not Completed'}
//             </Text>
//         </View>

//       </GlassCard>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: THEME.colors.background,
//         padding: THEME.spacing.md,
//     },
//     card: {
//         padding: THEME.spacing.lg,
//     },
//     title: {
//         fontSize: THEME.fonts.sizes.xxl,
//         fontWeight: 'bold',
//         color: THEME.colors.text.primary,
//         marginBottom: THEME.spacing.xs,
//     },
//     artist: {
//         fontSize: THEME.fonts.sizes.lg,
//         color: THEME.colors.text.secondary,
//         marginBottom: THEME.spacing.md,
//     },
//     description: {
//         fontSize: THEME.fonts.sizes.md,
//         color: THEME.colors.text.tertiary,
//         marginBottom: THEME.spacing.lg,
//     },
//     infoRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: THEME.spacing.lg,
//     },
//     infoItem: {
//         alignItems: 'center',
//     },
//     infoLabel: {
//         fontSize: THEME.fonts.sizes.sm,
//         color: THEME.colors.text.secondary,
//         marginBottom: THEME.spacing.xs,
//     },
//     infoValue: {
//         fontSize: THEME.fonts.sizes.md,
//         fontWeight: '600',
//         color: THEME.colors.text.primary,
//     },
//     progressContainer: {
//         marginBottom: THEME.spacing.lg,
//     },
//     progressLabel: {
//         fontSize: THEME.fonts.sizes.md,
//         color: THEME.colors.text.primary,
//         marginBottom: THEME.spacing.sm,
//     },
//     progressTrack: {
//         height: 8,
//         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         borderRadius: 4,
//         overflow: 'hidden',
//     },
//     progressFill: {
//         height: '100%',
//         backgroundColor: THEME.colors.accent,
//     },
//     progressText: {
//         fontSize: THEME.fonts.sizes.sm,
//         color: THEME.colors.text.secondary,
//         marginTop: THEME.spacing.xs,
//         textAlign: 'right',
//     },
//     statusContainer: {
//         alignItems: 'center',
//     },
//     statusLabel: {
//         fontSize: THEME.fonts.sizes.md,
//         color: THEME.colors.text.secondary,
//         marginBottom: THEME.spacing.xs,
//     },
//     statusValue: {
//         fontSize: THEME.fonts.sizes.lg,
//         fontWeight: 'bold',
//     },
//     errorText: {
//         color: 'red',
//         textAlign: 'center',
//         marginTop: 20,
//     },
// });
