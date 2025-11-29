import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { usePlayer } from "../context/PlayerContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./player.css";

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  followers: number;
  following: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentTrack } = usePlayer();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        // 🔥 Mock temporário — depois só substituir pela API real
        const mockUser: UserProfile = {
          name: "Mateus Vieira",
          avatar: "https://i.pravatar.cc/300?img=12",
          email: "mateus@example.com",
          followers: 1284,
          following: 321,
        };

        setUser(mockUser);
      } catch (err) {
        setError("Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <Layout>
      <div className="container py-4 player-page">

        <header className="text-center mb-4 player-header">
          <h1 className="fw-bold">👤 Seu Perfil</h1>
          <p className="subtitle">Informações da sua conta e atividades</p>
        </header>

        {loading && (
          <section className="text-center my-5">
            <div className="spinner-border mb-3" role="status"></div>
            <p className="text-muted">Carregando perfil...</p>
          </section>
        )}

        {error && !loading && (
          <div className="alert alert-warning text-center">⚠️ {error}</div>
        )}

        {!loading && user && (
          <>
            {/* CARD DO PERFIL */}
            <div className="card shadow-sm mx-auto mb-5" style={{ maxWidth: "420px" }}>
              <div className="card-body text-center">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />
                <h3 className="fw-bold">{user.name}</h3>
                <p className="text-muted mb-1">{user.email}</p>

                <div className="d-flex justify-content-center gap-4 mt-3">
                  <div className="text-center">
                    <h5 className="fw-bold mb-0">{user.followers}</h5>
                    <small>Seguidores</small>
                  </div>
                  <div className="text-center">
                    <h5 className="fw-bold mb-0">{user.following}</h5>
                    <small>Seguindo</small>
                  </div>
                </div>
              </div>
            </div>

            {/* ATIVIDADE ATUAL */}
            <section>
              <h2 className="mb-3">🎧 Tocando Agora</h2>

              {currentTrack ? (
                <div className="card p-3 shadow-sm d-flex align-items-center flex-row gap-3">
                  <img
                    src={currentTrack.image}
                    width="70"
                    height="70"
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="fw-bold mb-0">{currentTrack.name}</h5>
                    <small className="text-muted">{currentTrack.artist}</small>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Nenhuma música tocando no momento</p>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}