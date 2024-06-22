import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/store";
import {
  setCurrentTime,
  setIsPlaying,
  setCurrentTrackIndex,
} from "../../state/track/trackReducer";
import MusicController from "./MusicController";

const MusicPlayer = () => {

  const [progress, setProgress] = useState(0); // Progress of the current track
  const [isLoading, setIsLoading] = useState(false); // Loading state of the audio

  // console.log('Progress:', progress, 'Loading:', isLoading)

  const dispatch = useDispatch();
  const queue = useSelector((state: AppState) => state.tracks.queue);
  const currentTrackIndex = useSelector(
    (state: AppState) => state.tracks.currentTrackIndex
  );
  const currentTime = useSelector(
    (state: AppState) => state.tracks.currentTime
  );
  const isPlaying = useSelector((state: AppState) => state.tracks.isPlaying);

  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    if (audioPlayer) {
      // Define event listener functions
      const onTimeUpdate = () => {
        if (audioPlayer) {
          const currentTime = audioPlayer.currentTime; 
          const duration = audioPlayer.duration; 
          const progressBar = (currentTime / duration) * 100;
          // console.log('Current Time:', currentTime, 'Progress:', progressBar);
          setProgress(progressBar);

          dispatch(setCurrentTime(currentTime));
        }
      };

      const onWaiting = () => {
        setIsLoading(true);
      };

      const onPlaying = () => {
        setIsLoading(false);
      };

      // Add event listeners
      audioPlayer.addEventListener("timeupdate", onTimeUpdate);
      audioPlayer.addEventListener("waiting", onWaiting);
      audioPlayer.addEventListener("playing", onPlaying);

      // Cleanup function
      return () => {
        audioPlayer.removeEventListener("timeupdate", onTimeUpdate);
        audioPlayer.removeEventListener("waiting", onWaiting);
        audioPlayer.removeEventListener("playing", onPlaying);
      };
    }
  }, [audioPlayer]);

  useEffect(() => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }, [audioPlayer, isPlaying]);

  useEffect(() => {
    if (queue.length > 0) {
      dispatch(
        setCurrentTrackIndex({
          trackIndex: currentTrackIndex === -1 ? 0 : currentTrackIndex,
        })
      );
      dispatch(setCurrentTime(0));
      dispatch(setIsPlaying(true));
    }
  }, [dispatch, queue]);

  useEffect(() => {
    if (currentTrackIndex !== -1) {
      let audio;
      if (!audioPlayer) {
        audio = new Audio();
        setAudioPlayer(audio);
      } else {
        audio = audioPlayer;
      }

      // const audio = new Audio(queue[currentTrackIndex].songUrl);
      audio.src = queue[currentTrackIndex].songUrl;
      audio.load();

      audio.addEventListener("ended", () => {
        dispatch(setIsPlaying(false));
        if (currentTrackIndex + 1 < queue.length) {
          dispatch(setCurrentTrackIndex({ trackIndex: currentTrackIndex + 1 }));
          setTimeout(() => {
            dispatch(setIsPlaying(true));
          }, 800);
        } else {
          dispatch(setCurrentTime(0));
        }
      });

      if (isPlaying) {
        audio.play().catch((e) => console.error("Playback failed", e));
      }

      audio.addEventListener("timeupdate", () => {
        dispatch(setCurrentTime(audio.currentTime));
      });
      setAudioPlayer(audio);

      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
      });

    }
  }, [currentTrackIndex, dispatch, queue, audioPlayer, isPlaying]);

  return (
    <>
      {currentTrackIndex !== -1 && (
        <div className="fixed md:top-auto !txt md:right-auto bottom-20 left-0 right-0 z-50 md:bottom-6 md:left-16 rounded-[13px]">
          <MusicController track={queue[currentTrackIndex]} progress={progress} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
