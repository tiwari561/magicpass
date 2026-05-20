import { useEffect } from 'react';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const CHIME = require('../assets/approval-chime.wav');

export function playApprovalSound() {
  try {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    }).catch(() => {});
    const player = createAudioPlayer(CHIME);
    player.volume = 1.0;
    player.play();
    setTimeout(() => {
      try {
        player.remove();
      } catch {}
    }, 2000);
  } catch {}
}

export function useApprovalSoundOnMount() {
  useEffect(() => {
    playApprovalSound();
  }, []);
}
