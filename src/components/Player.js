import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { getTime } from "../utils";

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
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="input-track"
          style={{
            background: "grey",
          }}
        >
          <input
            type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={handleDragInput}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
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
