# MusicRewards - React Native Assessment

A music rewards app that lets users earn points by listening to music challenges. Built for Belong's React Native Developer interview.

## Features

- Stream music challenges and earn points
- Real-time progress tracking while listening
- Challenge completion system (90% threshold)
- User profile with earned points and stats
- Persistent data storage (survives app restart)
- Glass UI design with Belong's color scheme

## Technologies Used

- **React Native** with Expo
- **Expo Router** for navigation
- **Expo AV** for audio playback
- **Zustand** for state management
- **AsyncStorage** for data persistence
- **TypeScript** for type safety

## Setup and Installation

### Prerequisites

- Node.js installed
- Expo Go app on your phone

### Steps

1. Clone or download this project
2. Navigate to the project folder:
   ```bash
   cd test-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Scan the QR code with Expo Go app

## How to Use

1. **Challenges Tab**: Browse available music challenges
2. **Tap "Play Challenge"**: Opens the audio player modal
3. **Listen to earn points**: Progress bar shows listening progress
4. **Complete challenges**: Reach 90% to earn full points
5. **Profile Tab**: View your earned points and achievements

## Architecture Decisions

src/
├── app/ # Expo Router pages
│ ├── (tabs)/
│ │ ├── index.tsx # Home screen with challenge list
│ │ ├── profile.tsx # Profile with user progress
│ │ └── \_layout.tsx # Tab navigation setup
│ ├── (modals)/
│ │ ├── player.tsx # Full-screen audio player
│ │ └── \_layout.tsx # Modal navigation setup
│ └── \_layout.tsx # Root layout
├── components/
│ ├── ui/ # Glass design system components
│ │ ├── GlassCard.tsx
│ │ ├── GlassButton.tsx
│ │ └── PointsCounter.tsx
│ └── challenge/ # Challenge-specific components
│ ├── ChallengeCard.tsx
│ └── ChallengeList.tsx
├── hooks/ # Business logic hooks
│ ├── useMusicPlayer.ts
│ ├── usePointsCounter.ts
│ └── useChallenges.ts
├── stores/ # Zustand stores
│ ├── musicStore.ts
│ └── userStore.ts
├── services/ # External services
│ └── audioService.ts
├── constants/ # Theme and configuration
│ └── theme.ts
└── types/ # TypeScript definitions
└── index.ts

```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical decisions and implementation details.

## Demo

The app includes two sample music challenges:

- **"All Night" by Camo & Krooked** (150 points, 3:39)
- **"New Forms" by Roni Size** (300 points, 7:44)

## Platform testing

This app was tested on an Android device using Expo Go - npm start.
iOS testing was not performed due to lack device access.

## Demo video

A full walkthrough of the app is included in demo-video.mp4 in this repository. The video shows setup, navigation, audio playback, points earning
```
