const SPOTIFY_API_URL = "http://127.0.0.1:8001";

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  image: string;
  followers?: number;
  tracks?: number;
}

export async function getTopPlaylists(): Promise<SpotifyPlaylist[]> {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/spotify/top-playlists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar playlists: ${response.statusText}`);
    }

    const data = await response.json();
    return data.playlists || [];
  } catch (error) {
    console.error("Erro ao buscar playlists do Spotify:", error);
    return [];
  }
}

export async function getPlaylistTracks(playlistId: string) {
  try {
    const response = await fetch(
      `${SPOTIFY_API_URL}/spotify/playlist/${playlistId}/tracks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar músicas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar músicas da playlist:", error);
    return [];
  }
}

export async function searchSpotify(query: string) {
  try {
    const response = await fetch(
      `${SPOTIFY_API_URL}/spotify/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar no Spotify:", error);
    return [];
  }
}
export function getFavoritePlaylists(): SpotifyPlaylist[] {
  try {
    const raw = localStorage.getItem("favorite_playlists");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoritePlaylist(playlist: SpotifyPlaylist) {
  const raw = localStorage.getItem("favorite_playlists");
  const list: SpotifyPlaylist[] = raw ? JSON.parse(raw) : [];

  const exists = list.find((p) => p.id === playlist.id);

  let updated;

  if (exists) {
    // remover
    updated = list.filter((p) => p.id !== playlist.id);
  } else {
    // adicionar
    updated = [...list, playlist];
  }

  localStorage.setItem("favorite_playlists", JSON.stringify(updated));

  return updated;
}
