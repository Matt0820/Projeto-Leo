import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import { usePlayer } from "../context/PlayerContext";
import { getFavoritePlaylists, getPlaylistTracks } from "../services/spotify";
import type { SpotifyPlaylist } from "../services/spotify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./player.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { playTracks } = usePlayer();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavoritePlaylists(); // 🔥 Função que você cria no serviço
        setFavorites(data);

        if (data.length === 0) {
          setError("Você ainda não favoritou nenhuma playlist");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar favoritos");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handlePlaylistClick = async (playlist: SpotifyPlaylist) => {
    try {
      const res = await getPlaylistTracks(playlist.id);
      const tracks = res?.tracks || [];

      const mapped = tracks.map((t: any) => ({
        id: t.id,
        name: t.name,
        artist: t.artist,
        image: t.image,
        duration: t.duration,
        preview_url: t.preview_url,
      }));

      if (mapped.length > 0) playTracks(mapped);
    } catch (err) {
      console.error("Erro ao obter faixas da playlist:", err);
    }
  };

  return (
    <Layout>
      <div className="container py-4 player-page">

        {/* HEADER */}
        <header className="text-center mb-4 player-header">
          <h1 className="fw-bold">❤️ Playlists Favoritas</h1>
          <p className="subtitle">Suas playlists salvas e favoritas</p>
        </header>

        {/* LOADING */}
        {loading && (
          <section className="text-center my-5">
            <div className="spinner-border mb-3" role="status"></div>
            <p className="text-muted">Carregando favoritos...</p>
          </section>
        )}

        {/* ERRO */}
        {error && !loading && (
          <div className="alert alert-warning text-center">⚠️ {error}</div>
        )}

        {/* LISTAGEM */}
        {!loading && favorites.length > 0 && (
          <main>
            <section className="mb-5">
              <h2 className="mb-3">⭐ Suas Playlists</h2>

              <div className="row g-3">
                {favorites.map((playlist) => (
                  <div key={playlist.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <PlaylistCard playlist={playlist} onClick={handlePlaylistClick} />
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        {/* EMPTY */}
        {!loading && favorites.length === 0 && !error && (
          <div className="text-center mt-5 text-muted">
            <p>Nenhuma playlist favoritada ainda</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
