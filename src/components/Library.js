import React from "react";
import LibrarySong from "./LibrarySong";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./shared/IconButton";

const Library = ({
  songs,
  setCurrentSong,
  currentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
  setLibraryStatus,
  songInfo,
}) => {
  const handleButtonClick = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <aside
      className={`library-container ${libraryStatus ? "library-active" : ""}`}
    >
      <div className="library-header">
        <h3>My Library</h3>
        <IconButton
          icon={faXmark}
          iconsize="xl"
          className="icon-button icon-button-small"
          onClick={handleButtonClick}
        />
      </div>
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
            key={song.id}
            songInfo={songInfo}
          />
        ))}
      </div>
    </aside>
  );
};

export default Library;
