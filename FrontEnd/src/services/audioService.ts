/**
 * Serviço de reprodução de áudio usando HTML5 Audio
 * Toca URLs reais de áudio (preview do Spotify)
 */

class AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private currentUrl: string | null = null;

  constructor() {
    // Criar elemento de áudio
    if (typeof window !== "undefined") {
      this.audioElement = new Audio();
      this.audioElement.addEventListener("timeupdate", () => {
        if (this.onTimeUpdateCallback && this.audioElement) {
          this.onTimeUpdateCallback(this.audioElement.currentTime);
        }
      });

      this.audioElement.addEventListener("ended", () => {
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      });

      // Permitir CORS (alguns navegadores podem bloquear)
      this.audioElement.crossOrigin = "anonymous";
    }
  }

  /**
   * Carrega e reproduz uma URL de áudio
   */
  loadAndPlay(url: string) {
    if (!this.audioElement) {
      console.error("audioElement não disponível!");
      return;
    }

    console.log("🎵 loadAndPlay chamado com URL:", url);

    // Se a URL mudou, recarrega
    if (this.currentUrl !== url) {
      this.audioElement.src = url;
      this.currentUrl = url;
      this.audioElement.load();
      console.log("✅ URL carregada no elemento <audio>");
    }

    this.audioElement.play().catch((err) => {
      console.error("❌ Erro ao tocar áudio:", err);
    });
  }

  /**
   * Inicia a reprodução
   */
  play() {
    if (!this.audioElement) return;
    this.audioElement.play().catch((err) => {
      console.error("Erro ao retomar áudio:", err);
    });
  }

  /**
   * Pausa a reprodução
   */
  pause() {
    if (!this.audioElement) return;
    this.audioElement.pause();
  }

  /**
   * Para a reprodução completamente
   */
  stop() {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  /**
   * Define o tempo de reprodução (em segundos)
   */
  setCurrentTime(time: number) {
    if (!this.audioElement) return;
    this.audioElement.currentTime = time;
  }

  /**
   * Define o volume (0-1)
   */
  setVolume(volume: number) {
    if (!this.audioElement) return;
    this.audioElement.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Registra callback para atualizar tempo de reprodução
   */
  onTimeUpdate(callback: (time: number) => void) {
    this.onTimeUpdateCallback = callback;
  }

  /**
   * Registra callback quando a música termina
   */
  onEnded(callback: () => void) {
    this.onEndedCallback = callback;
  }

  /**
   * Retorna tempo atual em segundos
   */
  getCurrentTime(): number {
    if (!this.audioElement) return 0;
    return this.audioElement.currentTime;
  }

  /**
   * Retorna duração total em segundos
   */
  getDuration(): number {
    if (!this.audioElement) return 0;
    return this.audioElement.duration || 0;
  }

  /**
   * Retorna se está tocando
   */
  isPlaying(): boolean {
    if (!this.audioElement) return false;
    return !this.audioElement.paused;
  }
}

// Singleton
let audioServiceInstance: AudioService | null = null;

export function getAudioService(): AudioService {
  if (!audioServiceInstance) {
    audioServiceInstance = new AudioService();
  }
  return audioServiceInstance;
}


