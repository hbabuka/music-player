import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPlay, faCircle } from "@fortawesome/free-solid-svg-icons";

const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  currentSong,
}) => {
  const handleSelectSong = async () => {
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div
      className={`library-song ${
        song.id === currentSong.id ? "selected-song" : ""
      }`}
      onClick={handleSelectSong}
    >
      <img className="song-cover" src={song.cover} alt={song.name} />
      <div className="song-description">
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </div>
      <FontAwesomeIcon icon={song.id === currentSong.id ? faCircle : faPlay} />
    </div>
  );
};

export default LibrarySong;
