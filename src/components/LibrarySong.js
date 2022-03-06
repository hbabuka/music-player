import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  currentSong,
}) => {
  const handleSelectSong = () => {
    setCurrentSong(song);
    audioRef.current.play();
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      className={`library-song ${
        song.id === currentSong.id ? "selected-song" : ""
      }`}
      onClick={handleSelectSong}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
