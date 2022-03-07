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
      <div className="library-song-info" id={`#${songs.id}`}>
        <img src={song.cover} alt={song.name} />
        <div className="song-description">
          <h4>{song.name}</h4>
          <h5>{song.artist}</h5>
        </div>
      </div>
      {/* <p></p> */}
    </div>
  );
};

export default LibrarySong;
