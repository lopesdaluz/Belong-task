import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  blurIntensity?: number;
  borderRadius?: number;
  style?: ViewStyle;
  gradientColors?: readonly [string, string];
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  blurIntensity = THEME.blur.medium,
  borderRadius = THEME.borderRadius.md,
  gradientColors = THEME.gradients.glass,
  style,
}) => {
  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]}>
      <BlurView intensity={blurIntensity} style={StyleSheet.absoluteFillObject} tint="dark" />
      <LinearGradient
        colors={[...gradientColors]}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          styles.border,
          {
            borderRadius: borderRadius - 1,
            borderColor: THEME.colors.border,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    margin: 1,
    borderWidth: 1,
  },
});