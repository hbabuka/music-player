import React from "react";
import {
  faBackwardFast,
  faCirclePause,
  faCirclePlay,
  faRotateLeft,
  faShuffle,
  faStepBackward,
  faStepForward,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { getRandomElementFromArray, getTime } from "../utils";
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
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
    }
    if (direction === "shuffle") {
      await setCurrentSong(songs[getRandomElementFromArray(songs)]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const handleResetPlaylist = async () => {
    await setCurrentSong(songs[0]);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handleResetSong = () => {
    audioRef.current.currentTime = 0;
  };

  // Adding key events for the player

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

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
    if (audio.muted) {
      audio.muted = false;
    }
  };

  const muteVolume = () => {
    if (isPlaying) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <div className="time-display-container">
          <h4>{getTime(songInfo.currentTime)}</h4>
        </div>
        <div className="input-track">
          <input
            className="player-input"
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
        <div className="auxiliary-buttons ab-start">
          <IconButton
            icon={faBackwardFast}
            className="icon-button reset-playlist-button"
            iconsize="2x"
            data-tooltip="🪐&nbsp; Reset playlist from the beginning"
            onClick={handleResetPlaylist}
          />
          <IconButton
            icon={faRotateLeft}
            className="icon-button replay-song-button"
            iconsize="2x"
            data-tooltip="🎧&nbsp; Replay this song"
            onClick={handleResetSong}
          />
        </div>
        <div className="main-buttons">
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
        <div className="auxiliary-buttons ab-end">
          <IconButton
            icon={faShuffle}
            className="icon-button shuffle-button"
            iconsize="2x"
            data-tooltip="🎲&nbsp; Skip to a random song. Every day I'm shufflin'!"
            onClick={() => handleSkipTrack("shuffle")}
          />
          <div className="volume-control">
            <IconButton
              icon={
                songInfo.volume === 0 || audio.muted === true
                  ? faVolumeMute
                  : songInfo.volume > "0.6"
                  ? faVolumeHigh
                  : faVolumeLow
              }
              className="icon-button volume-button"
              iconsize="2x"
              onClick={muteVolume}
            />
            <div className="volume-input-wrapper">
              <input
                className="volume-input"
                type="range"
                onChange={changeVolume}
                value={
                  isPlaying && audioRef.current.muted ? "0" : songInfo.volume
                }
                min="0"
                max="1"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
