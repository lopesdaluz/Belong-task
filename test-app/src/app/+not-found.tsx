import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a']}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: THEME.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.colors.text.primary,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: THEME.colors.primary,
  },
});