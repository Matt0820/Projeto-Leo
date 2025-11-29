import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";
import "./musicPlayer.css";
import { usePlayer } from "../../context/PlayerContext";

export default function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlay, currentTime, setCurrentTime, nextTrack, previousTrack, setVolume } = usePlayer();
  const [volume, setVolumeLocal] = useState(70);

  useEffect(() => {
    // when track changes reset time
    setCurrentTime(0);
  }, [currentTrack, setCurrentTime]);

  const handlePlayPause = () => {
    togglePlay();
  };

  const handleNext = () => {
    nextTrack();
  };

  const handlePrevious = () => {
    previousTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolumeLocal(vol);
    setVolume(vol);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor((time || 0) / 60);
    const seconds = Math.floor((time || 0) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="music-player">
      <div className="player-track-info">
        <div className="track-image">
          {currentTrack?.image && (
            <img src={currentTrack.image} alt={currentTrack.name} className="track-cover" />
          )}
        </div>
        <div className="track-details">
          <p className="track-title">{currentTrack?.name || "—"}</p>
          <p className="track-artist">{currentTrack?.artist || "—"}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="control-btn" onClick={handlePrevious} title="Anterior">
          <FaBackward />
        </button>

        <button
          className="control-btn play-btn"
          onClick={handlePlayPause}
          title={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="control-btn" onClick={handleNext} title="Próxima">
          <FaForward />
        </button>

        <div className="progress-bar-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={currentTrack?.duration || 100}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="progress-bar"
          />
          <span className="time">{formatTime(currentTrack?.duration || 0)}</span>
        </div>
      </div>

      <div className="player-volume">
        <FaVolumeUp className="volume-icon" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <span className="volume-value">{volume}%</span>
      </div>
    </div>
  );
}

