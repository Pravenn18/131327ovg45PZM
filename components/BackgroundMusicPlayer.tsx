import React, { useEffect } from "react";
import { Audio } from "expo-av";

const BackgroundMusicPlayer = () => {
  const sound = new Audio.Sound();
  useEffect(() => {
    const playMusic = async () => {
      await sound.loadAsync(require("../assets/backgroundMusic.mp3"));
      await sound.playAsync();
    };

    playMusic();

    return () => {
      sound && sound.unloadAsync();
    };
  }, []);

  return null;
};

export default BackgroundMusicPlayer;
