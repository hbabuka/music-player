import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
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
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          max={songInfo.duration}
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
        />
      </div>
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      ></audio>
    </div>
  );
};

export default Player;
