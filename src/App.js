import React, { useEffect, useState } from "react";
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/styles.scss";
import data, { fetchMusicList } from "./data";
import { useRef } from "react";
import Header from "./components/Header";
import {
  applyFavoritesToSongs,
  getDocumentTitle,
  getDominantColor,
  getStoredFavoriteIds,
  persistFavoriteIds,
} from "./utils";
import { DEFAULT_PAGE_BACKGROUND } from "./constants";

function App() {
  const initialSongs = data();
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(initialSongs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadSongs = async () => {
      try {
        const remoteSongs = await fetchMusicList();

        if (!isActive || remoteSongs.length === 0) {
          return;
        }

        const songsWithFavorites = applyFavoritesToSongs(remoteSongs, getStoredFavoriteIds());
        setSongs(songsWithFavorites);
        setCurrentSong(songsWithFavorites[0]);
      } catch (error) {
        console.error("Could not load songs from iTunes API.", error);
      }
    };

    loadSongs();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!songs.length) {
      return;
    }

    persistFavoriteIds(songs);
  }, [songs]);

  useEffect(() => {
    if (!currentSong || !currentSong.cover) {
      setDominantColor(null);
      return;
    }

    getDominantColor(currentSong.cover).then((color) => {
      setDominantColor(color);
    });
  }, [currentSong]);

  useEffect(() => {
    document.title = getDocumentTitle(currentSong, isPlaying);
  }, [currentSong, isPlaying]);

  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentage,
      volume: e.target.volume,
    });
  };

  const handleEndSong = async () => {
    if (!currentSong || songs.length === 0) {
      return;
    }

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    return;
  };

  const handleToggleFavorite = (songId) => {
    setSongs((previousSongs) =>
      previousSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              favorite: !song.favorite,
            }
          : song
      )
    );

    setCurrentSong((previousSong) => {
      if (!previousSong || previousSong.id !== songId) {
        return previousSong;
      }

      return {
        ...previousSong,
        favorite: !previousSong.favorite,
      };
    });
  };

  return (
    <div className="App">
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        currentSong={currentSong}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        songInfo={songInfo}
        onToggleFavorite={handleToggleFavorite}
      />
      <div
        className={`page-content ${libraryStatus ? "" : "page-content-full-width"}`}
        style={
          dominantColor
            ? { "--dominant-color": dominantColor.rgb }
            : { background: DEFAULT_PAGE_BACKGROUND }
        }
      >
        <Header libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <main>
          {currentSong ? (
            <>
              <Song currentSong={currentSong} />
              <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
              />
            </>
          ) : (
            <div className="loading-container">
              <h1>Loading...</h1>
              <h3>Cool music is on the way!</h3>
            </div>
          )}
        </main>
      </div>
      {currentSong ? (
        <audio
          src={currentSong.audio}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={handleEndSong}
        ></audio>
      ) : null}
    </div>
  );
}

export default App;
