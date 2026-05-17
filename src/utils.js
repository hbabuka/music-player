import {
  APP_TITLE,
  FAVORITES_STORAGE_KEY,
  PLAYING_TITLE_NOTE,
  RECENT_SONGS_STORAGE_KEY,
} from "./constants";

export const getTime = (time) => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

export const getRandomElementFromArray = (arrayName) => {
  return Math.floor(Math.random() * arrayName.length);
};

export const getStoredFavoriteIds = () => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
    return Array.isArray(favoriteIds) ? favoriteIds : [];
  } catch (error) {
    return [];
  }
};

export const applyFavoritesToSongs = (songsToUpdate, favoriteIds) => {
  const favoriteIdSet = new Set(favoriteIds);

  return songsToUpdate.map((song) => ({
    ...song,
    favorite: favoriteIdSet.has(song.id),
  }));
};

export const persistFavoriteIds = (songs) => {
  const favoriteIds = songs.filter((song) => song.favorite).map((song) => song.id);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
};

export const getStoredRecentSongIds = () => {
  try {
    const storedRecentSongs = localStorage.getItem(RECENT_SONGS_STORAGE_KEY);
    const recentSongIds = storedRecentSongs ? JSON.parse(storedRecentSongs) : [];
    return Array.isArray(recentSongIds) ? recentSongIds : [];
  } catch (error) {
    return [];
  }
};

export const updateRecentSongIds = (previousRecentSongIds, songId, maxRecentSongs) => {
  if (!songId) {
    return previousRecentSongIds;
  }

  const withoutCurrentSong = previousRecentSongIds.filter(
    (recentSongId) => recentSongId !== songId
  );
  return [songId, ...withoutCurrentSong].slice(0, maxRecentSongs);
};

export const persistRecentSongIds = (recentSongIds) => {
  localStorage.setItem(RECENT_SONGS_STORAGE_KEY, JSON.stringify(recentSongIds));
};

export const getRecentSongs = (songs, recentSongIds) => {
  const songsById = new Map(songs.map((song) => [song.id, song]));

  return recentSongIds.map((recentSongId) => songsById.get(recentSongId)).filter(Boolean);
};

export const getDocumentTitle = (currentSong, isPlaying) => {
  if (!currentSong || !isPlaying) {
    return APP_TITLE;
  }

  return `${PLAYING_TITLE_NOTE} ${currentSong.name} — ${currentSong.artist}`;
};

export const getDominantColor = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      const imageData = ctx.getImageData(0, 0, 50, 50).data;

      let sumR = 0,
        sumG = 0,
        sumB = 0,
        count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a > 128) {
          sumR += r;
          sumG += g;
          sumB += b;
          count++;
        }
      }

      const avgR = Math.round(sumR / count);
      const avgG = Math.round(sumG / count);
      const avgB = Math.round(sumB / count);

      resolve({
        rgb: `rgb(${avgR}, ${avgG}, ${avgB})`,
        values: `${avgR} ${avgG} ${avgB}`,
      });
    };
    img.onerror = () => {
      resolve({
        rgb: "rgb(255, 255, 255)",
        values: "255 255 255",
      });
    };
    img.src = imageUrl;
  });
};
