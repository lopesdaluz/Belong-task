# MusicRewards - Architecture Documentation

## 🏗️ System Architecture Overview

This application demonstrates professional React Native architecture patterns inspired by the Belong mobile app, showcasing best practices in state management, audio playback, and glass-morphic UI design.

## 📊 Architecture Decisions

### State Management - Zustand with Persistence

**Why Zustand over Redux?**
- **Simplicity**: Less boilerplate, more intuitive API
- **TypeScript Support**: Excellent type inference out of the box
- **Performance**: Selector-based updates prevent unnecessary re-renders
- **Bundle Size**: Significantly smaller than Redux
- **Persistence**: First-class AsyncStorage integration with `zustand/middleware`

**Implementation Pattern:**
```typescript
// Store with persistence
export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      // State and actions
    }),
    {
      name: 'music-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Usage with selectors (prevents re-renders)
const currentTrack = useMusicStore((s) => s.currentTrack);
const setIsPlaying = useMusicStore((s) => s.setIsPlaying);
```

### Audio Implementation - expo-av

**Why expo-av over react-native-track-player?**
- **Expo Go Compatibility**: Works out of the box without custom dev builds
- **Cross-Platform**: Full support for iOS, Android, and Web
- **Simpler API**: Easier to implement for this use case
- **Built-in Features**: Progress tracking, seek, playback controls

**Tradeoffs:**
- react-native-track-player offers better background playback
- expo-av is simpler and works everywhere without config
- For this assessment, cross-platform compatibility was prioritized

**Implementation Highlights:**
```typescript
export const useMusicPlayer = (): UseMusicPlayerReturn => {
  const soundRef = useRef<Audio.Sound | null>(null);
  
  // Audio setup for iOS silent mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  }, []);
  
  // Playback status updates
  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
    }
  }, []);
};
```

### Component Architecture - Glass Design System

**Design Philosophy:**
- **Consistency**: Reusable glass components with unified design tokens
- **Accessibility**: Proper color contrast, touch targets, and labels
- **Performance**: Memoization and optimized renders
- **Flexibility**: Props-based customization while maintaining design system

**Key Components:**
1. **GlassCard**: Base glass container with blur + gradient
2. **GlassButton**: Interactive button with haptic feedback
3. **PointsCounter**: Animated counter with scale effects
4. **ChallengeCard**: Complex card combining multiple patterns

### Business Logic - Custom Hooks

**Separation of Concerns:**
- **Hooks**: Business logic and data orchestration
- **Components**: Presentation and user interaction
- **Stores**: State persistence and mutations

**Hook Responsibilities:**

**useMusicPlayer**
- Audio lifecycle management
- Playback controls (play, pause, seek)
- Status updates and error handling
- Platform-specific audio setup

**usePointsCounter**
- Real-time points calculation based on progress
- Challenge completion detection (95% threshold)
- Integration with both music and user stores
- Automatic state sync

**useChallenges**
- Challenge data loading and caching
- Filtering (active vs completed)
- Store initialization on mount
- Memoized derived state

## 🎨 UI/UX Implementation

### Glass Design System

**Visual Hierarchy:**
1. **Background**: Dark gradient (#0a0a0a → #1a1a1a)
2. **Glass Layer**: BlurView with dark tint (intensity: 20)
3. **Gradient Overlay**: Semi-transparent white gradient
4. **Border**: Subtle white border (rgba(255, 255, 255, 0.15))
5. **Content**: High contrast text and icons

**Color Palette:**
- Primary: #7553DB (Purple - music/creativity)
- Secondary: #34CB76 (Green - success/progress)
- Accent: #FCBE25 (Gold - rewards/points)

**Animation Patterns:**
- Scale animations for point changes
- Smooth progress bar fills
- Haptic feedback on interactions
- Modal slide transitions

### Navigation Structure

```
app/
├── _layout.tsx              # Root with modal config
├── (tabs)/
│   ├── _layout.tsx          # Tab bar config
│   ├── index.tsx            # Home/Challenges screen
│   └── profile.tsx          # Profile/Stats screen
└── player.tsx               # Full-screen player modal
```

**Navigation Decisions:**
- **Tabs**: Easy access to main features (Challenges, Profile)
- **Modal**: Immersive player experience that overlays tabs
- **No Headers**: Clean, full-screen design with custom navigation

## 🔄 Data Flow

### Challenge Completion Flow

1. **User taps challenge** → Router navigates to player modal
2. **Player loads** → `useMusicPlayer.play()` starts audio
3. **Points counter starts** → `usePointsCounter.startCounting()`
4. **Audio plays** → Real-time progress updates every frame
5. **Points accumulate** → `(currentPosition / duration) * totalPoints`
6. **95% threshold** → Challenge marked complete
7. **State persisted** → AsyncStorage sync via Zustand
8. **UI updates** → All subscribed components re-render

### State Synchronization

```typescript
// Music Store (persisted)
- challenges: MusicChallenge[]
- currentTrack: MusicChallenge | null
- playback state

// User Store (persisted)
- totalPoints: number
- completedChallenges: string[]
- currentStreak: number

// Hook State (ephemeral)
- Audio instance
- Loading/error states
- Points counter state
```

## 🚀 Performance Optimizations

### Zustand Selectors
```typescript
// ✅ Good: Only re-renders when currentTrack changes
const currentTrack = useMusicStore((s) => s.currentTrack);

// ❌ Bad: Re-renders on any store change
const store = useMusicStore();
```

### React Memoization
```typescript
// Memoized filtered lists
const activeChallenges = useMemo(() => {
  return challenges.filter((challenge) => !challenge.completed);
}, [challenges]);
```

### Cleanup Patterns
```typescript
useEffect(() => {
  setupAudio();
  
  return () => {
    if (soundRef.current) {
      soundRef.current.unloadAsync(); // Prevent memory leaks
    }
  };
}, []);
```

## 🧪 Error Handling

### Audio Playback Errors
```typescript
try {
  const { sound } = await Audio.Sound.createAsync(/* ... */);
  soundRef.current = sound;
} catch (err) {
  setError(err instanceof Error ? err.message : 'Playback failed');
  setIsPlaying(false);
}
```

### Graceful Fallbacks
- Loading states during async operations
- Error messages with retry buttons
- Empty states for no data scenarios
- Challenge not found handling

## 📱 Platform Compatibility

### Web Considerations
```typescript
// Haptics only on mobile
if (Platform.OS !== 'web') {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

// Audio mode only on native
if (Platform.OS !== 'web') {
  await Audio.setAudioModeAsync({ /* ... */ });
}
```

### Cross-Platform Audio
- expo-av works on web via HTML5 Audio API
- Same codebase for all platforms
- Progressive enhancement for native features

## 🎯 Assessment Requirements Coverage

### ✅ Architecture (40%)
- [x] Zustand stores with selectors and persistence
- [x] Custom hooks for business logic separation
- [x] Clean component composition
- [x] Comprehensive TypeScript typing
- [x] Audio playback with expo-av
- [x] Proper lifecycle management

### ✅ UI/UX (30%)
- [x] Glass design system with blur effects
- [x] Smooth modal presentations
- [x] Consistent spacing and typography
- [x] Loading states and error handling
- [x] Audio controls with progress visualization
- [x] Animated points counter

### ✅ React Native Proficiency (20%)
- [x] Audio playback with expo-av
- [x] Expo Router navigation patterns
- [x] Performance optimizations (selectors, memoization)
- [x] AsyncStorage persistence
- [x] Cross-platform compatibility
- [x] Haptic feedback integration

### ✅ Code Quality (10%)
- [x] TypeScript strict mode
- [x] Component reusability
- [x] Proper cleanup and memory management
- [x] Organized file structure
- [x] Consistent naming conventions

## 🔮 Future Enhancements

### Advanced Features (Bonus)
1. **Background Playback**: Switch to react-native-track-player
2. **Audio Visualization**: Add waveform or spectrum display
3. **Gesture Navigation**: Swipe to dismiss modal
4. **Offline Mode**: Cache audio files locally
5. **Social Features**: Share achievements, leaderboards
6. **Analytics**: Track listening patterns and engagement

### Scalability Considerations
1. **API Integration**: Replace mock data with backend
2. **Pagination**: Virtual scrolling for large challenge lists
3. **Caching**: React Query for server state management
4. **Optimistic Updates**: Immediate UI feedback with rollback
5. **Testing**: Unit tests for hooks, integration tests for flows

## 📊 Testing Strategy

### Unit Tests
- Hook logic (useMusicPlayer, usePointsCounter)
- Store actions and selectors
- Utility functions (time formatting, progress calculation)

### Integration Tests
- Challenge completion flow
- Points accumulation accuracy
- State persistence and hydration
- Navigation between screens

### E2E Tests
- Full user journey: browse → play → earn → complete
- Audio playback scenarios
- Error recovery flows

## 🏆 Key Takeaways

1. **Zustand is Perfect for Mobile**: Lightweight, performant, great DX
2. **expo-av for Cross-Platform Audio**: Works everywhere without config
3. **Glass Design**: Modern, beautiful, achievable with expo-blur
4. **Custom Hooks**: Essential for clean business logic separation
5. **TypeScript**: Prevents bugs, improves maintainability
6. **Persistence**: Critical for mobile UX (state survives app restarts)

## 📚 Additional Resources

- [Expo Audio Documentation](https://docs.expo.dev/versions/latest/sdk/audio/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Native Performance](https://reactnative.dev/docs/performance)

---

**Built with ❤️ for the Belong Technical Assessment**