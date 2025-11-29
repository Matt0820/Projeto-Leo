import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import PlaylistCard from "../components/PlaylistCard/PlaylistCard";
import { getTopPlaylists, getPlaylistTracks } from "../services/spotify";
import type { SpotifyPlaylist } from "../services/spotify";
import { usePlayer } from "../context/PlayerContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./player.css";

export default function Explore() {
  const [categories, setCategories] = useState<string[]>(["Pop", "Rock", "Lo-Fi", "Hip-Hop", "Eletrônica", "Indie"]);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { playTracks } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTopPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar explorações");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <h1 className="fw-bold">🔎 Explorar</h1>
          <p className="subtitle">Descubra novas playlists por categorias e tendências</p>
        </header>

        {/* LOADING */}
        {loading && (
          <section className="text-center my-5">
            <div className="spinner-border mb-3" role="status"></div>
            <p className="text-muted">Carregando...</p>
          </section>
        )}

        {/* ERRO */}
        {error && !loading && (
          <div className="alert alert-warning text-center">⚠️ {error}</div>
        )}

        {!loading && (
          <>
            {/* CATEGORIAS */}
            <section className="mb-5">
              <h2 className="mb-3">🌈 Categorias</h2>

              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span key={cat} className="badge bg-primary p-2 px-3 fs-6 rounded-pill">
                    {cat}
                  </span>
                ))}
              </div>
            </section>

            {/* PLAYLISTS */}
            <section className="mb-5">
              <h2 className="mb-3">🔥 Tendências</h2>

              <div className="row g-3">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <PlaylistCard playlist={playlist} onClick={handlePlaylistClick} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
