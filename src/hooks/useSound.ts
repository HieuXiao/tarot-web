import { useEffect, useRef, useCallback } from 'react';

const useSound = (soundEnabled: boolean) => {
  const shuffleAudio = useRef<HTMLAudioElement | null>(null);
  const flipAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    shuffleAudio.current = new Audio('/shuffle.mp3');
    flipAudio.current = new Audio('/card-flip.mp3');
  }, []);

  const playShuffle = useCallback(() => {
    if (soundEnabled && shuffleAudio.current) {
      shuffleAudio.current.currentTime = 0;
      shuffleAudio.current.play();
    }
  }, [soundEnabled]);

  const playFlip = useCallback(() => {
    if (soundEnabled && flipAudio.current) {
      flipAudio.current.volume = 0.8;
      flipAudio.current.currentTime = 0;
      flipAudio.current.play();
    }
  }, [soundEnabled]);

  return { playShuffle, playFlip };
};

export default useSound;
