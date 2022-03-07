import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  currentSong,
  setIsPlaying,
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
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
