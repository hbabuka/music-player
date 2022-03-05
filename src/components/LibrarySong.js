import React from "react";

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
    // const newSongs = songs.map((song) => {
    //   if (song.id === id) {
    //     return {
    //       ...song,
    //       active: true,
    //     };
    //   } else {
    //     return {
    //       ...song,
    //       active: false,
    //     };
    //   }
    // });
    // setSongs(newSongs);
    audioRef.current.play();
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
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
