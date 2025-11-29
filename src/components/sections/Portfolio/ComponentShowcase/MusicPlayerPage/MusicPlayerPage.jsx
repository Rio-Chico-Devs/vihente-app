import { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayerPage.css';

const MusicPlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showMixer, setShowMixer] = useState(false);

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');
  const [bassLevel, setBassLevel] = useState(0);
  const [beatWaves, setBeatWaves] = useState([]);

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
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;

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

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !isPlaying) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bassCalc = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10 / 255;
    
    setBassLevel(bassCalc);

    // Detect beat (bass spike)
    const now = Date.now();
    if (bassCalc > 0.7 && now - lastBeatTimeRef.current > 300) {
      lastBeatTimeRef.current = now;
      const newWave = { id: now, size: 0 };
      setBeatWaves(prev => [...prev, newWave]);
      
      setTimeout(() => {
        setBeatWaves(prev => prev.filter(w => w.id !== now));
      }, 1500);
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
        } catch {
          // Audio source già connesso
        }
      }

      audioRef.current.play().catch(() => {
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

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {
        // Source già disconnesso
      }
      sourceRef.current = null;
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        setIsPlaying(true);
        audioRef.current.play().catch(() => {
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
      <div className="music-player-container">
        <div className="player-layout">
          {/* Left: Visualizer */}
          <div className="visualizer-container">
            <div className="japanese-corner top-left">音楽</div>
            <div className="japanese-corner top-right">波</div>
            <div className="japanese-corner bottom-left">鼓動</div>
            <div className="japanese-corner bottom-right">心</div>
            
            <button className="gear-toggle" onClick={() => setShowMixer(!showMixer)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
              </svg>
            </button>

            {!showMixer ? (
              <div className="eye-visualizer">
                {/* Beat waves */}
                {beatWaves.map(wave => (
                  <div key={wave.id} className="beat-wave" />
                ))}
                
                <svg viewBox="0 0 1000 1000" className="eye-svg">
                  <defs>
                    <filter id="eyeGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <clipPath id="eyeClip">
                      <path d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z"/>
                    </clipPath>
                    <radialGradient id="eyeGradient">
                      <stop offset="0%" stopColor="rgba(255, 215, 0, 0.8)" />
                      <stop offset="50%" stopColor="rgba(220, 20, 60, 0.6)" />
                      <stop offset="100%" stopColor="rgba(0, 255, 255, 0.4)" />
                    </radialGradient>
                  </defs>
                  
                  {/* Outer glow pulse */}
                  <circle 
                    cx="500" 
                    cy="500" 
                    r={isPlaying ? 180 + bassLevel * 60 : 180}
                    fill="none" 
                    stroke="url(#eyeGradient)" 
                    strokeWidth={isPlaying ? 2 + bassLevel * 3 : 2}
                    opacity={isPlaying ? bassLevel * 0.6 : 0}
                    filter="url(#eyeGlow)"
                    style={{ transition: 'all 0.15s ease-out' }}
                  />
                  
                  {/* Eye outline */}
                  <path 
                    d="M 350 500 C 390 430, 440 400, 500 400 C 560 400, 610 430, 650 500 C 610 570, 560 600, 500 600 C 440 600, 390 570, 350 500 Z" 
                    fill="none" 
                    stroke="rgba(220, 20, 60, 0.95)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    filter="url(#eyeGlow)"
                    style={{
                      transform: isPlaying ? `scale(${1 + bassLevel * 0.08})` : 'scale(1)',
                      transformOrigin: 'center',
                      transition: 'transform 0.15s ease-out'
                    }}
                  />
                  
                  {/* Pupil rings - pulsating */}
                  <g clipPath="url(#eyeClip)">
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 80 + bassLevel * 40 : 80}
                      fill="none" 
                      stroke="rgba(255, 215, 0, 0.95)" 
                      strokeWidth="10" 
                      filter="url(#eyeGlow)"
                      style={{ transition: 'r 0.15s ease-out' }}
                    />
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 35 + bassLevel * 20 : 35}
                      fill="rgba(0, 255, 255, 0.3)" 
                      stroke="rgba(0, 255, 255, 0.95)" 
                      strokeWidth="8" 
                      filter="url(#eyeGlow)"
                      style={{ transition: 'r 0.15s ease-out' }}
                    />
                    
                    {/* Center dot pulse */}
                    <circle 
                      cx="500" 
                      cy="500" 
                      r={isPlaying ? 8 + bassLevel * 12 : 8}
                      fill="rgba(255, 215, 0, 1)" 
                      filter="url(#eyeGlow)"
                      style={{ transition: 'r 0.1s ease-out' }}
                    />
                  </g>
                </svg>
              </div>
            ) : (
              <div className="mixer-panel">
                <h3 className="mixer-title">音響調整</h3>
                
                <div className="mixer-control">
                  <label className="mixer-label">低音 BASS</label>
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
                  <label className="mixer-label">中音 MID</label>
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
                  <label className="mixer-label">高音 TREBLE</label>
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
                  リセット
                </button>
              </div>
            )}
          </div>

          {/* Right: Controls */}
          <div className="controls-container">
            <div className="japanese-corner top-left">再生</div>
            <div className="japanese-corner top-right">曲</div>
            
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

            <div className="volume-container">
              <span className="volume-icon">{volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}</span>
              <div className="volume-slider-bar" onClick={handleVolumeChange}>
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
