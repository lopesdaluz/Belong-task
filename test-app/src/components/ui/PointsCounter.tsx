import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { THEME } from '../../constants/theme';

interface PointsCounterProps {
  points: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export const PointsCounter: React.FC<PointsCounterProps> = ({
  points,
  label = 'Points',
  size = 'medium',
  animated = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevPointsRef = useRef(points);

  useEffect(() => {
    if (animated && points > prevPointsRef.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevPointsRef.current = points;
  }, [points, animated, scaleAnim]);

  const fontSize = {
    small: THEME.fontSizes.xl,
    medium: THEME.fontSizes.xxl,
    large: THEME.fontSizes.xxxl,
  }[size];

  const labelFontSize = {
    small: THEME.fontSizes.sm,
    medium: THEME.fontSizes.md,
    large: THEME.fontSizes.lg,
  }[size];

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.points,
          {
            fontSize,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {points.toLocaleString()}
      </Animated.Text>
      <Text style={[styles.label, { fontSize: labelFontSize }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  points: {
    color: THEME.colors.accent,
    fontWeight: THEME.fontWeights.bold,
    textShadowColor: 'rgba(252, 190, 37, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  label: {
    color: THEME.colors.text.secondary,
    fontWeight: THEME.fontWeights.medium,
    marginTop: THEME.spacing.xs,
  },
});