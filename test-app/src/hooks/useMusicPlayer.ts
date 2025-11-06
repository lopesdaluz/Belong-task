import { useEffect, useCallback, useState, useRef } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useMusicStore } from '../stores/musicStore';
import { MusicChallenge } from '../types';
import { Platform } from 'react-native';

export interface UseMusicPlayerReturn {
  isPlaying: boolean;
  currentTrack: MusicChallenge | null;
  currentPosition: number;
  duration: number;
  play: (track: MusicChallenge) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seekTo: (seconds: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useMusicPlayer = (): UseMusicPlayerReturn => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentTrack = useMusicStore((s) => s.currentTrack);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const currentPosition = useMusicStore((s) => s.currentPosition);
  const duration = useMusicStore((s) => s.duration);
  const setCurrentTrack = useMusicStore((s) => s.setCurrentTrack);
  const setIsPlaying = useMusicStore((s) => s.setIsPlaying);
  const setCurrentPosition = useMusicStore((s) => s.setCurrentPosition);
  const setDuration = useMusicStore((s) => s.setDuration);

  useEffect(() => {
    const setupAudio = async () => {
      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }
    };

    setupAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        setCurrentPosition(status.positionMillis / 1000);
        setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      }
    },
    [setCurrentPosition, setDuration, setIsPlaying]
  );

  const play = useCallback(
    async (track: MusicChallenge) => {
      try {
        setLoading(true);
        setError(null);

        if (soundRef.current) {
          await soundRef.current.unloadAsync();
        }

        console.log('Loading audio:', track.audioUrl);

        const { sound } = await Audio.Sound.createAsync(
          { uri: track.audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;
        setCurrentTrack(track);
        setIsPlaying(true);

        console.log('Audio loaded and playing');
      } catch (err) {
        console.error('Playback error:', err);
        setError(err instanceof Error ? err.message : 'Playback failed');
        setIsPlaying(false);
      } finally {
        setLoading(false);
      }
    },
    [onPlaybackStatusUpdate, setCurrentTrack, setIsPlaying]
  );

  const pause = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Pause error:', err);
    }
  }, [setIsPlaying]);

  const resume = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Resume error:', err);
    }
  }, [setIsPlaying]);

  const seekTo = useCallback(async (seconds: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(seconds * 1000);
      }
    } catch (err) {
      console.error('Seek error:', err);
    }
  }, []);

  return {
    isPlaying,
    currentTrack,
    currentPosition,
    duration,
    play,
    pause,
    resume,
    seekTo,
    loading,
    error,
  };
};
