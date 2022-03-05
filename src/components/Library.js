import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  currentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  return (
    <div className="library-container">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            currentSong={currentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
