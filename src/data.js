import { v4 as uuidv4 } from "uuid";
import { ITUNES_API_URL } from "./constants";

const mapTrackToSong = (track) => ({
  name: track.trackName,
  artist: track.artistName,
  cover: track.artworkUrl100?.replace("100x100", "600x600"),
  year: track.releaseDate ? String(new Date(track.releaseDate).getFullYear()) : "",
  collection: track.collectionName || "Single",
  id: track.trackId ? String(track.trackId) : uuidv4(),
  audio: track.previewUrl,
  favorite: false,
});

export async function fetchMusicList() {
  const response = await fetch(ITUNES_API_URL);

  if (!response.ok) {
    throw new Error(`Song API request failed: ${response.status}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload.results)) {
    return [];
  }

  return payload.results
    .filter((track) => track.previewUrl && track.artworkUrl100 && track.trackName)
    .map(mapTrackToSong);
}

function musicList() {
  return [];
}

export default musicList;
