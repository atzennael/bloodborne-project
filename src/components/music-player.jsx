
import { useEffect, useRef, useState } from 'react';
import './music-player.scss';
import madmansKnowledge from '../assets/MadmansKnowledge.png'

const tracks = [
  {
    title: 'Ludwig, The Holy Blade',
    artist: 'Bloodborne OST',
    url: 'music/Ludwig_the_holy_blade.mp3',
  },
  {
    title: 'The First Hunter',
    artist: 'Bloodborne OST',
    url: 'music/The_First_Hunter.mp3',
  },
  {
    title: 'The Witch of Hemwick',
    artist: 'Bloodborne OST',
    url: 'music/The_Witch_of_Hemwick.mp3',
  },

  {
    title: 'Blood-starved Beast',
    artist: 'Bloodborne OST',
    url: 'music/Blood-starved_beast.mp3',
  },
 
  {
    title: 'Cleric Beast',
    artist: 'Bloodborne OST',
    url: 'music/Cleric_Beast.mp3',
  },

];

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const shouldPlayRef = useRef(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const currentTrack = tracks[currentTrackIndex];

  // Configurar volumen
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Cargar canción seleccionada
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);

    if (shouldPlayRef.current) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
          shouldPlayRef.current = false;
          setAudioError(true);
        });
    }
  }, [currentTrackIndex]);

  // Reproducir o pausar
  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        shouldPlayRef.current = true;
        setIsPlaying(true);
        setAudioError(false);
      } catch {
        setIsPlaying(false);
        setAudioError(true);
      }
    } else {
      audio.pause();
      shouldPlayRef.current = false;
      setIsPlaying(false);
    }
  };

  // Cambiar canción
  const changeTrack = (direction) => {
    shouldPlayRef.current = true;
    setIsPlaying(true);

    setCurrentTrackIndex((previousIndex) => {
      return (
        (previousIndex + direction + tracks.length) % tracks.length
      );
    });
  };

  // Canción anterior
  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      changeTrack(-1);
    }
  };

  // Canción siguiente
  const handleNext = () => {
    changeTrack(1);
  };

  // Reproducción automática
  const handleEnded = () => {
    changeTrack(1);
  };

  // Barra de progreso
  const handleSeek = (event) => {
    const newTime = Number(event.target.value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Control de volumen
  const handleVolume = (event) => {
    setVolume(Number(event.target.value));
    setIsMuted(false);
  };

  return (
    <section className="music-player">

      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration);
        }}
        onEnded={handleEnded}
        onError={() => {
          setAudioError(true);
          setIsPlaying(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Información de la canción */}
      <div className="music-player__info">

        <div className={`music-player__vinyl ${isPlaying ? 'playing' : ''}`}>
          <span><img src={madmansKnowledge} alt="Madman's Knowledge icon"/></span>
        </div>

        <div className="music-player__track">
          <span className="music-player__label">
            NOW PLAYING
          </span>

          <strong>{currentTrack.title}</strong>
          <small>{currentTrack.artist}</small>
        </div>

      </div>

      {/* Controles y progreso */}
      <div className="music-player__main">

        <div className="music-player__controls">

          <button
            type="button"
            className="music-player__button"
            onClick={handlePrevious}
            aria-label="Canción anterior"
            title="Anterior"
          >
            |◀
          </button>

          <button
            type="button"
            className="music-player__play"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? 'Ⅱ' : '▶'}
          </button>

          <button
            type="button"
            className="music-player__button"
            onClick={handleNext}
            aria-label="Canción siguiente"
            title="Siguiente"
          >
            ▶|
          </button>

        </div>

        <div className="music-player__progress">

          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            style={{
              '--progress': duration
                ? `${(currentTime / duration) * 100}%`
                : '0%',
            }}
            aria-label="Progreso de reproducción"
          />

          <span>{formatTime(duration)}</span>

        </div>

        {audioError && (
          <p className="music-player__error">
            No se pudo cargar el audio. Comprueba la conexión.
          </p>
        )}

      </div>

      {/* Control de volumen */}
      <div className="music-player__volume">

        <button
          type="button"
          className="music-player__button"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted || volume === 0 ? '×' : '♪'}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolume}
          aria-label="Volumen"
        />

      </div>

    </section>
  );
}

export default MusicPlayer;
