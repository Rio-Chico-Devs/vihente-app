import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicPlayerPage.css';

const MusicPlayerPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // 9 tracce predefinite
  const [playlist] = useState([
    { id: 1, title: "Neon Pulse", artist: "Cyber Sound", duration: 0, file: "/audio/CRYSTAL CAVE ELETTRO .mp3" },
    { id: 2, title: "Electric Dreams", artist: "Digital Waves", duration: 0, file: "/audio/track2.mp3" },
    { id: 3, title: "Synth Storm", artist: "Tech Master", duration: 0, file: "/audio/track3.mp3" },
    { id: 4, title: "Bass Revolution", artist: "Underground Beat", duration: 0, file: "/audio/track4.mp3" },
    { id: 5, title: "Frequency Flow", artist: "Wave Rider", duration: 0, file: "/audio/track5.mp3" },
    { id: 6, title: "Digital Horizon", artist: "Neon Knight", duration: 0, file: "/audio/track6.mp3" },
    { id: 7, title: "Cyber Matrix", artist: "Code Runner", duration: 0, file: "/audio/track7.mp3" },
    { id: 8, title: "Techno Pulse", artist: "Binary Beat", duration: 0, file: "/audio/track8.mp3" },
    { id: 9, title: "Future Sound", artist: "Quantum Echo", duration: 0, file: "/audio/track9.mp3" }
  ]);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(128));
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');
  const [bassLevel, setBassLevel] = useState(0);
  const [midLevel, setMidLevel] = useState(0);
  const [trebleLevel, setTrebleLevel] = useState(0);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const dropdownRef = useRef(null);

  // Chiudi dropdown quando clicchi fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Inizializza Web Audio API
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Analizza l'audio in tempo reale con effetti migliorati
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !isPlaying) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    setFrequencyData(dataArray);

    // Calcola livelli separati per bass, mid, treble
    const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10 / 255;
    const mid = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 40 / 255;
    const treble = dataArray.slice(50, 128).reduce((a, b) => a + b, 0) / 78 / 255;

    setBassLevel(bass);
    setMidLevel(mid);
    setTrebleLevel(treble);

    animationRef.current = requestAnimationFrame(analyzeAudio);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      analyzeAudio();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying, analyzeAudio]);

  const handleButtonPress = (buttonName) => {
    setButtonPressed(buttonName);
    setTimeout(() => setButtonPressed(''), 200);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    handleButtonPress('play');

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Connetti audio alla Web Audio API se non è già connesso
      if (!sourceRef.current && audioRef.current) {
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        } catch (_err) {
          // Audio source già connesso
        }
      }

      audioRef.current.play().catch(_err => {
        // Gestione errore play
      });
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (index) => {
    handleButtonPress('track');

    setCurrentTrack(index);
    setCurrentTime(0);
    setIsPlaying(false);
    setShowDropdown(false);

    // Reset source per il nuovo track
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (_err) {
        // Source già disconnesso
      }
      sourceRef.current = null;
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        setIsPlaying(true);
        audioRef.current.play().catch(_err => {
          // Gestione errore play
        });
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    const nextIndex = (currentTrack + 1) % playlist.length;
    changeTrack(nextIndex);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-player-page">
      {/* Back button */}
      <button className="back-to-showcase" onClick={() => navigate('/portfolio/componenti')}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span>Torna alla Showcase</span>
      </button>

      <div className="music-player-container">
        <div className="player-wrapper">
          <div
            className="player-card"
            style={{
              boxShadow: isPlaying
                ? `0 4px 20px rgba(0, 255, 255, ${0.1 + bassLevel * 0.3}), inset 0 1px 0 rgba(0, 255, 255, ${0.1 + midLevel * 0.2})`
                : undefined
            }}
          >
            <div className="player-content">
              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={playlist[currentTrack].file}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
              />

              {/* Track Selector Dropdown */}
              <div className="track-selector" ref={dropdownRef}>
                <button
                  className={`dropdown-btn ${showDropdown ? 'active' : ''}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>🎵 {playlist[currentTrack].title}</span>
                  <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu">
                    {playlist.map((track, index) => (
                      <div
                        key={track.id}
                        className={`dropdown-item ${index === currentTrack ? 'active' : ''}`}
                        onClick={() => changeTrack(index)}
                      >
                        <div className="dropdown-item-info">
                          <div className="dropdown-item-title">{track.title}</div>
                          <div className="dropdown-item-artist">{track.artist}</div>
                        </div>
                        {index === currentTrack && <span>▶</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Circular Visualizer con effetti migliorati */}
              <div
                className={`visualizer ${isPlaying ? 'playing' : ''}`}
                style={{
                  background: isPlaying
                    ? `radial-gradient(circle at center, rgba(0, 255, 255, ${0.08 + bassLevel * 0.15}), rgba(0, 0, 0, 0.5))`
                    : undefined,
                  boxShadow: isPlaying
                    ? `inset 0 0 ${60 + bassLevel * 40}px rgba(0, 255, 255, ${0.1 + bassLevel * 0.2}), 0 0 ${30 + midLevel * 30}px rgba(0, 255, 255, ${0.15 + midLevel * 0.2})`
                    : undefined
                }}
              >
                <div className={`circular-visualizer ${isPlaying ? 'playing' : ''}`}>
                  <div className="visualizer-circle">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const angle = (i * 360) / 64;
                      const dataIndex = Math.floor((i / 64) * frequencyData.length);
                      const height = 40 + (frequencyData[dataIndex] / 255) * 80;
                      const intensity = frequencyData[dataIndex] / 255;

                      return (
                        <div
                          key={i}
                          className="frequency-bar"
                          style={{
                            transform: `rotate(${angle}deg) translateX(-50%)`,
                            height: `${isPlaying ? height : 40}px`,
                            opacity: isPlaying ? 0.7 + intensity * 0.3 : 0.3,
                            boxShadow: isPlaying && frequencyData[dataIndex] > 200
                              ? `0 0 ${15 + intensity * 10}px rgba(0, 255, 255, ${0.8 + intensity * 0.2})`
                              : `0 0 8px rgba(0, 255, 255, 0.5)`,
                            background: isPlaying
                              ? `linear-gradient(to top, rgba(0, 255, 255, ${0.8 + intensity * 0.2}), rgba(0, 255, 255, ${0.2 + intensity * 0.3}))`
                              : undefined
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    className={`visualizer-center ${isPlaying ? 'playing' : ''}`}
                    style={{
                      boxShadow: isPlaying
                        ? `0 0 ${30 + bassLevel * 50}px rgba(0, 255, 255, ${0.5 + bassLevel * 0.3})`
                        : undefined,
                      transform: isPlaying
                        ? `translate(-50%, -50%) scale(${1 + bassLevel * 0.15})`
                        : undefined
                    }}
                  >
                    <div
                      className={`visualizer-center-icon ${isPlaying ? 'playing' : ''}`}
                      style={{
                        textShadow: isPlaying
                          ? `0 0 ${10 + trebleLevel * 20}px rgba(0, 255, 255, ${0.8 + trebleLevel * 0.2})`
                          : undefined
                      }}
                    >
                      {isPlaying ? '♪' : '⏸'}
                    </div>
                  </div>
                </div>

                {/* Indicatori di livello audio */}
                {isPlaying && (
                  <div className="audio-levels">
                    <div className="level-indicator">
                      <div className="level-bar" style={{ width: `${bassLevel * 100}%`, background: '#ff0055' }} />
                      <span className="level-label">BASS</span>
                    </div>
                    <div className="level-indicator">
                      <div className="level-bar" style={{ width: `${midLevel * 100}%`, background: '#00ff88' }} />
                      <span className="level-label">MID</span>
                    </div>
                    <div className="level-indicator">
                      <div className="level-bar" style={{ width: `${trebleLevel * 100}%`, background: '#0ff' }} />
                      <span className="level-label">TREBLE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="track-info">
                <h2
                  className="track-title"
                  style={{
                    textShadow: isPlaying
                      ? `0 0 ${20 + bassLevel * 30}px rgba(0, 255, 255, ${0.8 + bassLevel * 0.2}), 0 0 40px rgba(0, 255, 255, ${0.4 + midLevel * 0.3})`
                      : undefined
                  }}
                >
                  {playlist[currentTrack].title}
                </h2>
                <p className="track-artist">{playlist[currentTrack].artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  onClick={handleSeek}
                >
                  <div
                    className={`progress-fill ${isPlaying ? 'playing' : ''}`}
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      boxShadow: isPlaying
                        ? `0 0 ${10 + bassLevel * 15}px rgba(0, 255, 255, ${0.5 + bassLevel * 0.3})`
                        : undefined
                    }}
                  />
                </div>
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="controls">
                <button
                  className={`control-btn ${buttonPressed === 'prev' ? 'pressed' : ''}`}
                  onClick={() => {
                    handleButtonPress('prev');
                    const prevIndex = (currentTrack - 1 + playlist.length) % playlist.length;
                    changeTrack(prevIndex);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="19 20 9 12 19 4 19 20" />
                    <line x1="5" y1="19" x2="5" y2="5" />
                  </svg>
                </button>

                <button
                  className={`control-btn play-btn ${isPlaying ? 'playing' : ''} ${buttonPressed === 'play' ? 'pressed' : ''}`}
                  onClick={togglePlay}
                  style={{
                    boxShadow: isPlaying
                      ? `0 0 ${20 + bassLevel * 30}px rgba(0, 255, 255, ${0.4 + bassLevel * 0.4})`
                      : undefined
                  }}
                >
                  {isPlaying ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <button
                  className={`control-btn ${buttonPressed === 'next' ? 'pressed' : ''}`}
                  onClick={() => {
                    handleButtonPress('next');
                    const nextIndex = (currentTrack + 1) % playlist.length;
                    changeTrack(nextIndex);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 4 15 12 5 20 5 4" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                  </svg>
                </button>
              </div>

              {/* Volume */}
              <div className="volume-container">
                <span className="volume-icon">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
                <div
                  className="volume-slider"
                  onClick={handleVolumeChange}
                >
                  <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerPage;
