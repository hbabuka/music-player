import React from "react";
import KeyValuePair from "./shared/KeyValuePair";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className="song-info">
        <div className="main-info">
          <h1>{currentSong.name}</h1>
          <h3>{currentSong.artist}</h3>
        </div>
        <div className="more-info">
          <KeyValuePair label="Collection" value={currentSong.collection} />
          <KeyValuePair label="Release year" value={currentSong.year} />
        </div>
      </div>
    </div>
  );
};

export default Song;
