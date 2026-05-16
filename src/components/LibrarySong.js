import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPlay, faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { PlayingAnimation } from "./shared/PlayingAnimation";

const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  currentSong,
  onToggleFavorite,
}) => {
  const handleSelectSong = async () => {
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(song.id);
  };

  return (
    <div
      className={`library-song ${song.id === currentSong?.id ? "selected-song" : ""}`}
      onClick={handleSelectSong}
    >
      <img className="song-cover" src={song.cover} alt={song.name} />
      <div className="song-description">
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </div>
      <div className="library-song-status">
        {song.id === currentSong?.id ? (
          isPlaying ? (
            <PlayingAnimation />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </div>
      <button
        className={`favorite-toggle ${song.favorite ? "favorite-active" : ""}`}
        onClick={handleFavoriteClick}
        aria-label={song.favorite ? "Remove from favorites" : "Add to favorites"}
        type="button"
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

export default LibrarySong;
