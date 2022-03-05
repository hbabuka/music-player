import React, { useState } from "react";
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import data from "./util";
import { useRef } from "react";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  return (
    <div className="App">
      {/* <h1>Music Player</h1> */}
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        currentSong={currentSong}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      ></audio>
    </div>
  );
}

export default App;
