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

  let audio = document.querySelector("audio");
  if (audio) {
    window.addEventListener("keydown", function (event) {
      if (event.key === " ") {
        // eat the spacebar, so it does not scroll the page
        event.preventDefault();
        if (isPlaying) {
          audio.pause();
          setIsPlaying(!isPlaying);
        } else {
          audio.play();
          setIsPlaying(!isPlaying);
        }
      }
    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      return handleSkipTrack("skip-forward");
    } else if (event.key === "ArrowLeft") {
      return handleSkipTrack("skip-back");
    }
  });

  return (
    <div className="player-container">
      <div className="time-control">
        <div className="time-display-container">
          <h4>{getTime(songInfo.currentTime)}</h4>
        </div>
        <div className="input-track">
          <input
            type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={handleDragInput}
            tabIndex="-1"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <div className="time-display-container">
          <h4>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</h4>
        </div>
      </div>
      <div className="player-buttons">
        <IconButton
          icon={faStepBackward}
          className="icon-button"
          iconsize="2x"
          data-tooltip="⬅️&nbsp; Play the previous song using the left arrow key"
          onClick={() => handleSkipTrack("skip-back")}
        />
        <IconButton
          icon={isPlaying ? faCirclePause : faCirclePlay}
          className="icon-button play-button"
          iconsize="4x"
          data-tooltip="🚀&nbsp; Hit the Spacebar to play or pause your song"
          onClick={handlePlaySong}
          onKeyUp={(event) => {
            if ([" "].includes(event.key)) {
              return handlePlaySong;
            }
          }}
        />
        <IconButton
          icon={faStepForward}
          className="icon-button"
          iconsize="2x"
          data-tooltip="➡️&nbsp; Skip to the next song with your right arrow key"
          onClick={() => handleSkipTrack("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
