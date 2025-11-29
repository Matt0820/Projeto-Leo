import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { getAudioService } from "../services/audioService";

export interface Track {
  id: string;
  name: string;
  artist?: string;
  image?: string;
  duration?: number;
  preview_url?: string;
}

interface PlayerContextValue {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  queue: Track[];
  queueIndex: number;
  playTrack: (t: Track) => void;
  playTracks: (tracks: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const audioService = useRef(getAudioService());

  // Setup audio service callbacks
  useEffect(() => {
    const audio = audioService.current;
    audio.onTimeUpdate((time) => {
      setCurrentTime(time);
    });
    audio.onEnded(() => {
      nextTrack();
    });
  }, []);

  // Sincroniza isPlaying com o serviço de áudio
  useEffect(() => {
    const audio = audioService.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playTrack = (t: Track) => {
    const audio = audioService.current;
    audio.stop();

    setCurrentTrack(t);
    setQueue([t]);
    setQueueIndex(0);
    setCurrentTime(0);

    // Carrega e toca se tiver preview_url
    if (t.preview_url) {
      audio.loadAndPlay(t.preview_url);
      setIsPlaying(true);
    }
  };

  const playTracks = (tracks: Track[]) => {
    if (!tracks || tracks.length === 0) {
      console.warn("playTracks: nenhuma track recebida!");
      return;
    }

    console.log("🎶 playTracks chamado com", tracks.length, "faixas");
    console.log("📍 Primeira faixa:", tracks[0]);

    const audio = audioService.current;
    audio.stop();

    setQueue(tracks);
    setCurrentTrack(tracks[0]);
    setQueueIndex(0);
    setCurrentTime(0);

    // Carrega e toca a primeira faixa
    if (tracks[0].preview_url) {
      console.log("▶️ Carregando preview_url:", tracks[0].preview_url);
      audio.loadAndPlay(tracks[0].preview_url);
      setIsPlaying(true);
    } else {
      console.warn("⚠️ preview_url não disponível para faixa:", tracks[0].name);
    }
  };

  const togglePlay = () => setIsPlaying((s) => !s);

  const nextTrack = () => {
    if (queueIndex < queue.length - 1) {
      const nextIndex = queueIndex + 1;
      const next = queue[nextIndex];

      const audio = audioService.current;
      audio.stop();

      setCurrentTrack(next);
      setQueueIndex(nextIndex);
      setCurrentTime(0);

      // Toca a próxima faixa
      if (next.preview_url) {
        audio.loadAndPlay(next.preview_url);
        setIsPlaying(true);
      }
    } else {
      // Fim da fila — parar
      const audio = audioService.current;
      audio.stop();
      setIsPlaying(false);
    }
  };

  const previousTrack = () => {
    if (currentTime > 3) {
      // Se passou de 3s, volta pro início da faixa atual
      const audio = audioService.current;
      audio.setCurrentTime(0);
      setCurrentTime(0);
    } else if (queueIndex > 0) {
      // Caso contrário, vai pra faixa anterior
      const prevIndex = queueIndex - 1;
      const prev = queue[prevIndex];

      const audio = audioService.current;
      audio.stop();

      setCurrentTrack(prev);
      setQueueIndex(prevIndex);
      setCurrentTime(0);

      // Toca a faixa anterior
      if (prev.preview_url) {
        audio.loadAndPlay(prev.preview_url);
        setIsPlaying(true);
      }
    }
  };

  const handleSetCurrentTime = (time: number) => {
    const audio = audioService.current;
    audio.setCurrentTime(time);
    setCurrentTime(time);
  };

  const handleSetVolume = (volume: number) => {
    const audio = audioService.current;
    audio.setVolume(volume / 100); // Converte 0-100 para 0-1
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        queue,
        queueIndex,
        playTrack,
        playTracks,
        togglePlay,
        nextTrack,
        previousTrack,
        setCurrentTime: handleSetCurrentTime,
        setVolume: handleSetVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export default PlayerContext;
