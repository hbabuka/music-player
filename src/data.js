import { v4 as uuidv4 } from "uuid";

const ITUNES_API_URL =
  "https://itunes.apple.com/search?term=lofi%20hip%20hop&media=music&entity=song&limit=25";

const mapTrackToSong = (track) => ({
  name: track.trackName,
  artist: track.artistName,
  cover: track.artworkUrl100?.replace("100x100", "600x600"),
  year: track.releaseDate ? String(new Date(track.releaseDate).getFullYear()) : "",
  collection: track.collectionName || "Single",
  id: track.trackId ? String(track.trackId) : uuidv4(),
  audio: track.previewUrl,
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
