import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import './SiteSoundtrack.css';

const PAUSE_PATHS = [
  '/portfolio/componenti/music-player',
  '/portfolio/componenti/black-market',
];

const BASE_VOL = 0.18;

const SiteSoundtrack = () => {
  const audioRef   = useRef(null);
  const location   = useLocation();
  const wasPlaying = useRef(false);
  const { musicVolume } = useSettings();
  const musicVolumeRef  = useRef(musicVolume);

  const [isMuted,    setIsMuted]    = useState(() => { try { return localStorage.getItem('soundtrack-muted') === 'true'; } catch { return false; } });
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying,  setIsPlaying]  = useState(false);

  // Refs so the visibilitychange handler always reads current state without re-registering
  const isMutedRef     = useRef(isMuted);
  const hasStartedRef  = useRef(hasStarted);
  const pathnameRef    = useRef(location.pathname);

  useEffect(() => { isMutedRef.current    = isMuted;           }, [isMuted]);
  useEffect(() => { hasStartedRef.current = hasStarted;        }, [hasStarted]);
  useEffect(() => { pathnameRef.current   = location.pathname; }, [location.pathname]);

  /* ── Sync volume ref + update playing audio in real-time ── */
  useEffect(() => {
    musicVolumeRef.current = musicVolume;
    if (audioRef.current) audioRef.current.volume = musicVolume * BASE_VOL;
  }, [musicVolume]);

  /* ── Start on first user interaction (browser autoplay policy) ── */
  useEffect(() => {
    if (isMuted || hasStarted) return;

    const start = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = musicVolumeRef.current * BASE_VOL;
      audio.play()
        .then(() => {
          setHasStarted(true);
          setIsPlaying(true);
          wasPlaying.current = true;
        })
        .catch(() => {});
    };

    document.addEventListener('click',   start, { once: true });
    document.addEventListener('keydown', start, { once: true });
    return () => {
      document.removeEventListener('click',   start);
      document.removeEventListener('keydown', start);
    };
  }, [isMuted, hasStarted]);

  /* ── Pause on music player / black market, resume when leaving ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasStarted) return;

    if (PAUSE_PATHS.includes(location.pathname)) {
      wasPlaying.current = !audio.paused;
      audio.pause();
      setIsPlaying(false);
    } else if (wasPlaying.current && !isMuted) {
      audio.volume = musicVolumeRef.current * BASE_VOL;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Pause when tab is hidden, resume when visible again ── */
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !hasStartedRef.current || isMutedRef.current) return;
      if (document.hidden) {
        wasPlaying.current = !audio.paused;
        audio.pause();
        setIsPlaying(false);
      } else if (wasPlaying.current && !PAUSE_PATHS.includes(pathnameRef.current)) {
        audio.volume = musicVolumeRef.current * BASE_VOL;
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Cancel on unmount ── */
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    const next  = !isMuted;
    setIsMuted(next);
    try { localStorage.setItem('soundtrack-muted', next); } catch {}

    if (!audio) return;

    if (next) {
      wasPlaying.current = !audio.paused;
      audio.pause();
      setIsPlaying(false);
    } else if (hasStarted && !PAUSE_PATHS.includes(location.pathname)) {
      audio.volume = musicVolumeRef.current * BASE_VOL;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/soundtrack.mp3" loop preload="none" />
      <button
        className={`soundtrack-btn${isMuted ? ' soundtrack-btn--muted' : ''}`}
        onClick={toggleMute}
        title={isMuted ? 'Attiva soundtrack' : 'Muta soundtrack'}
        aria-label={isMuted ? 'Attiva musica di sottofondo' : 'Muta musica di sottofondo'}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
        <span className="soundtrack-label">{isMuted ? 'Music' : 'Music'}</span>
      </button>
    </>
  );
};

export default SiteSoundtrack;
