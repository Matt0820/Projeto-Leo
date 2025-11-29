import React from "react";
import type { SpotifyPlaylist } from "../../services/spotify";
import "./playlistCard.css";

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
  onClick?: (playlist: SpotifyPlaylist) => void;
}

export default function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <div className="playlist-card" onClick={() => onClick?.(playlist)}>
      <div className="playlist-image-wrapper">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="playlist-image"
        />
        <div className="playlist-overlay">
          <button className="play-btn">▶</button>
        </div>
      </div>
      <div className="playlist-info">
        <h3 className="playlist-name">{playlist.name}</h3>
        <p className="playlist-description">{playlist.description}</p>
        {playlist.followers && (
          <p className="playlist-stats">
            👥 {(playlist.followers / 1000).toFixed(0)}K seguidores
          </p>
        )}
      </div>
    </div>
  );
}
