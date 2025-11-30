import { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayerPage.css';

const MusicPlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showMixer, setShowMixer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [playMode, setPlayMode] = useState('order');

  const [playlist] = useState([
    { 
      id: 1, 
      title: "Neon Pulse", 
      artist: "Cyber Sound", 
      album: "Digital Dreams",
      year: "2024",
      genre: "Electronic",
      duration: 0, 
      file: "/audio/CRYSTAL CAVE ELETTRO .mp3" 
    },
    { 
      id: 2, 
      title: "Electric Dreams", 
      artist: "Digital Waves", 
      album: "Synthetic Reality",
      year: "2024",
      genre: "Synthwave",
      duration: 0, 
      file: "/audio/track2.mp3" 
    },
    { 
      id: 3, 
      title: "Synth Storm", 
      artist: "Tech Master", 
      album: "Binary Code",
      year: "2023",
      genre: "Techno",
      duration: 0, 
      file: "/audio/track3.mp3" 
    },
    { 
      id: 4, 
      title: "Bass Revolution", 
      artist: "Underground Beat", 
      album: "Deep Frequencies",
      year: "2024",
      genre: "Bass",
      duration: 0, 
      file: "/audio/track4.mp3" 
    },
    { 
      id: 5, 
      title: "Frequency Flow", 
      artist: "Wave Rider", 
      album: "Sound Waves",
      year: "2023",
      genre: "Ambient",
      duration: 0, 
      file: "/audio/track5.mp3" 
    },
    { 
      id: 6, 
      title: "Digital Horizon", 
      artist: "Neon Knight", 
      album: "Cyber City",
      year: "2024",
      genre: "Electronic",
      duration: 0, 
      file: "/audio/track6.mp3" 
    },
    { 
      id: 7, 
      title: "Cyber Matrix", 
      artist: "Code Runner", 
      album: "Virtual World",
      year: "2023",
      genre: "Techno",
      duration: 0, 
      file: "/audio/track7.mp3" 
    },
    { 
      id: 8, 
      title: "Techno Pulse", 
      artist: "Binary Beat", 
      album: "Machine Language",
      year: "2024",
      genre: "Techno",
      duration: 0, 
      file: "/audio/track8.mp3" 
    },
    { 
      id: 9, 
      title: "Future Sound", 
      artist: "Quantum Echo", 
      album: "Tomorrow's Beat",
      year: "2024",
      genre: "Future Bass",
      duration: 0, 
      file: "/audio/track9.mp3" 
    }
  ]);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');
  const [bassLevel, setBassLevel] = useState(0);
  const [midLevel, setMidLevel] = useState(0);
  const [trebleLevel, setTrebleLevel] = useState(0);
  const [beatWaves, setBeatWaves] = useState([]);
  const [playHistory, setPlayHistory] = useState([]);

  const [bass, setBass] = useState(0);
  const [mid, setMid] = useState(0);
  const [treble, setTreble] = useState(0);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const dropdownRef = useRef(null);
  const gainNodeRef = useRef(null);
  const bassFilterRef = useRef(null);
  const midFilterRef = useRef(null);
  const trebleFilterRef = useRef(null);
  const lastBeatTimeRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512;
      analyserRef.current.smoothingTimeConstant = 0.7;

      bassFilterRef.current = audioContextRef.current.createBiquadFilter();
      bassFilterRef.current.type = 'lowshelf';
      bassFilterRef.current.frequency.value = 200;

      midFilterRef.current = audioContextRef.current.createBiquadFilter();
      midFilterRef.current.type = 'peaking';
      midFilterRef.current.frequency.value = 1000;
      midFilterRef.current.Q.value = 1;

      trebleFilterRef.current = audioContextRef.current.createBiquadFilter();
      trebleFilterRef.current.type = 'highshelf';
      trebleFilterRef.current.frequency.value = 3000;

      gainNodeRef.current = audioContextRef.current.createGain();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (bassFilterRef.current) bassFilterRef.current.gain.value = bass;
    if (midFilterRef.current) midFilterRef.current.gain.value = mid;
    if (trebleFilterRef.current) trebleFilterRef.current.gain.value = treble;
  }, [bass, mid, treble]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !isPlaying) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bassCalc = dataArray.slice(0, 15).reduce((a, b) => a + b, 0) / 15 / 255;
    const midCalc = dataArray.slice(15, 80).reduce((a, b) => a + b, 0) / 65 / 255;
    const trebleCalc = dataArray.slice(80, 150).reduce((a, b) => a + b, 0) / 70 / 255;
    
    setBassLevel(bassCalc);
    setMidLevel(midCalc);
    setTrebleLevel(trebleCalc);

    const now = Date.now();
    const threshold = 0.65;
    const minInterval = 250;
    
    if (bassCalc > threshold && now - lastBeatTimeRef.current > minInterval) {
      lastBeatTimeRef.current = now;
      const newWave = { id: now, size: 0, intensity: bassCalc };
      setBeatWaves(prev => [...prev, newWave]);
      
      setTimeout(() => {
        setBeatWaves(prev => prev.filter(w => w.id !== now));
      }, 1200);
    }

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
      if (!sourceRef.current && audioRef.current) {
        try {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(bassFilterRef.current);
          bassFilterRef.current.connect(midFilterRef.current);
          midFilterRef.current.connect(trebleFilterRef.current);
          trebleFilterRef.current.connect(gainNodeRef.current);
          gainNodeRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        } catch (error) {
          console.error('Audio context error:', error);
        }
      }

      audioRef.current.play().catch((error) => {
        console.error('Play error:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const getNextTrack = () => {
    if (playMode === 'repeat-one') {
      return currentTrack;
    } else if (playMode === 'shuffle') {
      let nextTrack;
      do {
        nextTrack = Math.floor(Math.random() * playlist.length);
      } while (nextTrack === currentTrack && playlist.length > 1);
      return nextTrack;
    } else {
      return (currentTrack + 1) % playlist.length;
    }
  };

  const getPrevTrack = () => {
    if (playMode === 'repeat-one') {
      return currentTrack;
    } else if (playMode === 'shuffle') {
      if (playHistory.length > 0) {
        const prev = playHistory[playHistory.length - 1];
        setPlayHistory(playHistory.slice(0, -1));
        return prev;
      }
      let prevTrack;
      do {
        prevTrack = Math.floor(Math.random() * playlist.length);
      } while (prevTrack === currentTrack && playlist.length > 1);
      return prevTrack;
    } else {
      return (currentTrack - 1 + playlist.length) % playlist.length;
    }
  };

  const changeTrack = (index) => {
    handleButtonPress('track');

    if (playMode === 'shuffle' && index !== currentTrack) {
      setPlayHistory([...playHistory, currentTrack]);
    }

    setCurrentTrack(index);
    setCurrentTime(0);
    setIsPlaying(false);

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (error) {
        console.error('Disconnect error:', error);
      }
      sourceRef.current = null;
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        setIsPlaying(true);
        audioRef.current.play().catch((error) => {
          console.error('Play error:', error);
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
    const nextIndex = getNextTrack();
    changeTrack(nextIndex);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    setVolume(newVolume);
  };

  const cyclePlayMode = () => {
    handleButtonPress('mode');
    if (playMode === 'order') {
      setPlayMode('shuffle');
    } else if (playMode === 'shuffle') {
      setPlayMode('repeat-one');
    } else {
      setPlayMode('order');
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayModeIcon = () => {
    if (playMode === 'shuffle') {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
      );
    } else if (playMode === 'repeat-one') {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          <text x="12" y="15" fontSize="8" fill="currentColor" textAnchor="middle">1</text>
        </svg>
      );
    } else {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    }
  };

  return (
    <div className="music-player-page">
      <div className="music-player-container">
        <div className="player-layout">
          <div className="visualizer-container">
            
            <button className="gear-toggle" onClick={() => setShowMixer(!showMixer)}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364 6.364l-2.121-2.121M7.757 7.757L5.636 5.636m12.728 0l-2.121 2.121M7.757 16.243l-2.121 2.121" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>

            {!showMixer && !showInfo && (
              <div className="eye-visualizer">
                {beatWaves.map(wave => (
                  <div 
                    key={wave.id} 
                    className="beat-wave"
                    style={{ '--intensity': wave.intensity }}
                  />
                ))}
                
                <svg viewBox="0 0 1000 1000" className="eye-svg">
                  <defs>
                    <filter id="eyeGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <clipPath id="eyeClip">
                      <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"/>
                    </clipPath>
                    <radialGradient id="eyeGradient">
                      <stop offset="0%" stopColor="rgba(0, 255, 255, 0.9)" />
                      <stop offset="50%" stopColor="rgba(0, 200, 255, 0.7)" />
                      <stop offset="100%" stopColor="rgba(0, 150, 255, 0.5)" />
                    </radialGradient>
                  </defs>
                  
                  <circle 
                    cx="500" 
                    cy="500" 
                    r={isPlaying ? 180 + (bassLevel * 50 + midLevel * 30) : 180}
                    fill="none" 
                    stroke="url(#eyeGradient)" 
                    strokeWidth={isPlaying ? 2 + (bassLevel + midLevel) * 2 : 2}
                    opacity={isPlaying ? (bassLevel + midLevel) * 0.5 : 0}
                    filter="url(#eyeGlow)"
                    style={{ 
                      transition: bassLevel > 0.7 ? 'none' : 'all 0.1s ease-out'
                    }}
                  />
                  
                  <path 
                    d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z" 
                    fill="none" 
                    stroke="rgba(0, 255, 255, 0.95)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    filter="url(#eyeGlow)"
                    style={{
                      transform: isPlaying ? `scale(${1 + bassLevel * 0.1 + midLevel * 0.05})` : 'scale(1)',
                      transformOrigin: 'center',
                      transition: bassLevel > 0.7 ? 'none' : 'transform 0.1s ease-out'
                    }}
                  />
                  
                  <g clipPath="url(#eyeClip)">
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 80 + bassLevel * 35 + trebleLevel * 15 : 80}
                      fill="none" 
                      stroke="rgba(0, 200, 255, 0.95)" 
                      strokeWidth="10" 
                      filter="url(#eyeGlow)"
                      style={{ 
                        transition: bassLevel > 0.7 ? 'none' : 'r 0.1s ease-out' 
                      }}
                    />
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 35 + bassLevel * 18 + midLevel * 12 : 35}
                      fill="rgba(0, 150, 255, 0.3)" 
                      stroke="rgba(0, 180, 255, 0.95)" 
                      strokeWidth="8" 
                      filter="url(#eyeGlow)"
                      style={{ 
                        transition: bassLevel > 0.7 ? 'none' : 'r 0.1s ease-out' 
                      }}
                    />
                    
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 8 + bassLevel * 10 + trebleLevel * 8 : 8}
                      fill="rgba(0, 255, 255, 1)" 
                      filter="url(#eyeGlow)"
                      style={{ 
                        transition: bassLevel > 0.7 ? 'none' : 'r 0.08s ease-out' 
                      }}
                    />
                  </g>
                </svg>
              </div>
            )}

            {!showMixer && showInfo && (
              <div className="track-info-display">
                <div className="info-display-header">
                  <div className="info-display-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <h2 className="info-display-title">{playlist[currentTrack].title}</h2>
                </div>
                <div className="info-display-content">
                  <div className="info-display-row">
                    <span className="info-display-label">ARTIST</span>
                    <span className="info-display-value">{playlist[currentTrack].artist}</span>
                  </div>
                  <div className="info-display-row">
                    <span className="info-display-label">ALBUM</span>
                    <span className="info-display-value">{playlist[currentTrack].album}</span>
                  </div>
                  <div className="info-display-row">
                    <span className="info-display-label">YEAR</span>
                    <span className="info-display-value">{playlist[currentTrack].year}</span>
                  </div>
                  <div className="info-display-row">
                    <span className="info-display-label">GENRE</span>
                    <span className="info-display-value">{playlist[currentTrack].genre}</span>
                  </div>
                  <div className="info-display-row">
                    <span className="info-display-label">DURATION</span>
                    <span className="info-display-value">{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            )}

            {showMixer && (
              <div className="mixer-panel">
                <h3 className="mixer-title">EQUALIZER</h3>
                
                <div className="mixer-control">
                  <label className="mixer-label">BASS</label>
                  <input 
                    type="range" 
                    min="-15" 
                    max="15" 
                    value={bass} 
                    onChange={(e) => setBass(parseFloat(e.target.value))}
                    className="mixer-slider"
                  />
                  <span className="mixer-value">{bass > 0 ? '+' : ''}{bass} dB</span>
                </div>

                <div className="mixer-control">
                  <label className="mixer-label">MID</label>
                  <input 
                    type="range" 
                    min="-15" 
                    max="15" 
                    value={mid} 
                    onChange={(e) => setMid(parseFloat(e.target.value))}
                    className="mixer-slider"
                  />
                  <span className="mixer-value">{mid > 0 ? '+' : ''}{mid} dB</span>
                </div>

                <div className="mixer-control">
                  <label className="mixer-label">TREBLE</label>
                  <input 
                    type="range" 
                    min="-15" 
                    max="15" 
                    value={treble} 
                    onChange={(e) => setTreble(parseFloat(e.target.value))}
                    className="mixer-slider"
                  />
                  <span className="mixer-value">{treble > 0 ? '+' : ''}{treble} dB</span>
                </div>

                <button 
                  className="mixer-reset-btn"
                  onClick={() => {
                    setBass(0);
                    setMid(0);
                    setTreble(0);
                  }}
                >
                  RESET
                </button>
              </div>
            )}
          </div>

          <div className="controls-container">
            
            <audio
              ref={audioRef}
              src={playlist[currentTrack].file}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            />

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

            <div className="track-info">
              <h2 className="track-title">{playlist[currentTrack].title}</h2>
              <p className="track-artist">{playlist[currentTrack].artist}</p>
            </div>

            <div className="progress-container">
              <div className="progress-bar" onClick={handleSeek}>
                <div
                  className={`progress-fill ${isPlaying ? 'playing' : ''}`}
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls">
              <button
                className={`control-btn extra-control-btn ${buttonPressed === 'mode' ? 'pressed' : ''} ${playMode !== 'order' ? 'active' : ''}`}
                onClick={cyclePlayMode}
                title={playMode === 'order' ? 'Order' : playMode === 'shuffle' ? 'Shuffle' : 'Repeat One'}
              >
                {getPlayModeIcon()}
              </button>

              <button
                className={`control-btn ${buttonPressed === 'prev' ? 'pressed' : ''}`}
                onClick={() => {
                  handleButtonPress('prev');
                  const prevIndex = getPrevTrack();
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
                  const nextIndex = getNextTrack();
                  changeTrack(nextIndex);
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </button>

              <button
                className={`control-btn extra-control-btn ${showInfo ? 'active' : ''}`}
                onClick={() => setShowInfo(!showInfo)}
                title="Track Info"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
            </div>

            <div className="volume-container">
              <span className="volume-icon">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
              <div className="volume-slider-bar" onClick={handleVolumeClick}>
                <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerPage;
