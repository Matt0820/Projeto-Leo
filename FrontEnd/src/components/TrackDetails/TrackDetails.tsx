import React, { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import "./trackDetails.css";

export default function TrackDetails() {
  const { currentTrack, queue, queueIndex } = usePlayer();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentTrack) return null;

  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão flutuante para abrir detalhes */}
      {!isOpen && (
        <button className="details-fab" onClick={toggleDetails} title="Ver detalhes">
          ℹ️
        </button>
      )}

      {/* Drawer de detalhes */}
      {isOpen && (
        <div className="track-details-modal">
          <div className="track-details-header">
            <h2>Informações da Faixa</h2>
            <button className="close-btn" onClick={toggleDetails}>✕</button>
          </div>

          <div className="track-details-content">
            {/* Capa da música */}
            {currentTrack.image && (
              <div className="track-cover-large">
                <img src={currentTrack.image} alt={currentTrack.name} />
              </div>
            )}

            {/* Informações */}
            <div className="track-info-section">
              <h3 className="track-name">{currentTrack.name}</h3>
              <p className="track-artist-details">{currentTrack.artist || "Artista desconhecido"}</p>
              <p className="track-duration">
                Duração: {formatTime(currentTrack.duration || 0)}
              </p>
            </div>

            {/* Fila de reprodução */}
            <div className="queue-section">
              <h4>Fila de Reprodução</h4>
              <div className="queue-list">
                {queue.length === 0 ? (
                  <p className="empty-queue">Nenhuma música na fila</p>
                ) : (
                  queue.map((track, idx) => (
                    <div
                      key={`${track.id}-${idx}`}
                      className={`queue-item ${idx === queueIndex ? "active" : ""}`}
                    >
                      <span className="queue-index">{idx + 1}</span>
                      <div className="queue-track-info">
                        <p className="queue-track-name">{track.name}</p>
                        <p className="queue-track-artist">{track.artist || "—"}</p>
                      </div>
                      <span className="queue-track-duration">
                        {formatTime(track.duration || 0)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
