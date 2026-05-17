import React from "react";

const RecentlyPlayed = ({ recentSongs, setCurrentSong, isPlaying, audioRef }) => {
  if (!recentSongs.length) {
    return null;
  }

  const handleRecentSongClick = async (song) => {
    await setCurrentSong(song);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <section className="recently-played-section">
      <h5>Recently Played</h5>
      <div className="recently-played-list">
        {recentSongs.map((song) => (
          <button
            key={`recent-${song.id}`}
            className="recently-played-item"
            type="button"
            onClick={() => handleRecentSongClick(song)}
          >
            <img className="song-cover" src={song.cover} alt={song.name} />
            <span>{song.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayed;
