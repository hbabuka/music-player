import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

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

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const handleDragInput = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const handleSkipTrack = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(
        songs[(currentIndex + 1) % songs.length]
        // songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      // songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
    }
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={handleDragInput}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back-icon"
          icon={faAngleLeft}
          size="2x"
          onClick={() => handleSkipTrack("skip-back")}
        />
        <FontAwesomeIcon
          className="play-icon"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={handlePlaySong}
        />
        <FontAwesomeIcon
          className="skip-forward-icon"
          icon={faAngleRight}
          size="2x"
          onClick={() => handleSkipTrack("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
