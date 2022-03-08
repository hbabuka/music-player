import React from "react";
import {
  faCirclePause,
  faCirclePlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { getTime } from "../utils";
import IconButton from "./shared/IconButton";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
}) => {
  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleDragInput = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const handleSkipTrack = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(
        songs[(currentIndex + 1) % songs.length]
        // songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.pay();
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <h4>{getTime(songInfo.currentTime)}</h4>
        <div className="input-track">
          <input
            type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={handleDragInput}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <h4>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</h4>
      </div>
      <div className="player-buttons">
        <IconButton
          icon={faStepBackward}
          className="icon-button"
          iconsize="2x"
          onClick={() => handleSkipTrack("skip-back")}
        />
        <IconButton
          icon={isPlaying ? faCirclePause : faCirclePlay}
          className="icon-button"
          iconsize="4x"
          onClick={handlePlaySong}
        />
        <IconButton
          icon={faStepForward}
          className="icon-button"
          iconsize="2x"
          onClick={() => handleSkipTrack("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
