import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGuide } from '../../contexts/GuideContext';
import './Iris.css';

const GREETINGS = [
  ':D Eccomi! Mi hai chiamato?',
  'Yawn... e.e Hola amigo mi ero addormentata.',
  'Un antico male si risveglia... scherzo :D sono solo io!',
  'Carica e operativa.',
  'Cominciamo pure, sono Iris la tua guida creata su misura.',
  'rrrr* zz* boop* Ca-Carica e P-Pronta!',
];

/* ── File audio pre-registrati — stessa posizione di GREETINGS ── */
const GREETING_VOICES = [
  '/audio/iris/iris-g0.mp3',
  '/audio/iris/iris-g1.mp3',
  '/audio/iris/iris-g2.mp3',
  '/audio/iris/iris-g3.mp3',
  '/audio/iris/iris-g4.mp3',
  '/audio/iris/iris-g5.mp3',
];

/* ── Guide text per ogni pagina/sezione ── */
const PAGE_GUIDES = {
  '/':                                      'Home — panoramica del sito. Scorri per scoprire chi siamo e cosa facciamo.',
  '/storia':                                'La mia storia — skills, lingue e background di Antonio.',
  '/services':                              'Servizi — tutto quello che offriamo come consulenti digitali.',
  '/services/consulenze':                   'Consulenza digitale — strategia, analisi e supporto personalizzato.',
  '/services/sitiweb':                      'Siti web — dal design al deploy, realizziamo progetti web completi.',
  '/services/presenza':                     'Presenza online — social media, SEO e visibilità digitale.',
  '/services/multimedia':                   'Multimedia — illustrazioni, grafiche e content creation.',
  '/portfolio':                             'Portfolio — una selezione dei lavori più significativi.',
  '/portfolio/componenti':                  'Componenti UI — showcase di interfacce interattive realizzate da zero.',
  '/portfolio/grafiche':                    'Grafiche — illustrazioni e visual design del portfolio.',
  '/portfolio/sitiweb':                     'Siti web — esempi di progetti web realizzati.',
  '/portfolio/componenti/black-market':     "Femo's Black Market — negozio cyberpunk con inventario casuale, carrello e checkout simulato.",
  '/portfolio/componenti/dashboard':        'Analytics Dashboard — metriche, grafici e transazioni con dati simulati in tempo reale.',
  '/portfolio/componenti/booking':          'Booking System — prenota sessioni scegliendo servizio, data e orario.',
  '/portfolio/componenti/music-player':     'Music Player — riproduttore con equalizzatore, visualizzatore e playlist.',
  '/portfolio/componenti/crud-simulator':   'Gestionale Logistico — magazzino completo con filtri, form CRUD e monitor memoria.',
  '/portfolio/componenti/slider':           'Expanding Gallery — galleria con pannelli espandibili e lightbox.',
  '/portfolio/componenti/text-sampler':     'Text Sampler — effetti tipografici in CSS puro, selezionabili in tempo reale.',
  '/portfolio/componenti/cubo-3d':          '3D Model — cubo interattivo ruotabile in tutte le direzioni, zero librerie esterne.',
  '/portfolio/componenti/image-checker':    "Image Checker — lente d'ingrandimento su immagini caricate dall'utente.",
  '/contatti':                              'Contatti — scrivi un messaggio o richiedi un preventivo. Ti risponderemo presto!',
  '/privacy-policy':                        'Privacy Policy — informazioni sul trattamento dei tuoi dati personali.',
  '/cookie-policy':                         'Cookie Policy — come utilizziamo i cookie su questo sito.',
  '/termini-e-condizioni':                  'Termini e Condizioni — le regole di utilizzo del sito.',
};

/* ── File audio pre-registrati per ogni pagina ── */
const PAGE_VOICES = {
  '/':                                    '/audio/iris/iris-home.mp3',
  '/storia':                              '/audio/iris/iris-storia.mp3',
  '/services':                            '/audio/iris/iris-services.mp3',
  '/services/consulenze':                 '/audio/iris/iris-consulenze.mp3',
  '/services/sitiweb':                    '/audio/iris/iris-sitiweb.mp3',
  '/services/presenza':                   '/audio/iris/iris-presenza.mp3',
  '/services/multimedia':                 '/audio/iris/iris-multimedia.mp3',
  '/portfolio':                           '/audio/iris/iris-portfolio.mp3',
  '/portfolio/componenti':                '/audio/iris/iris-componenti.mp3',
  '/portfolio/grafiche':                  '/audio/iris/iris-grafiche.mp3',
  '/portfolio/sitiweb':                   '/audio/iris/iris-sitiweb-portfolio.mp3',
  '/portfolio/componenti/black-market':   '/audio/iris/iris-black-market.mp3',
  '/portfolio/componenti/dashboard':      '/audio/iris/iris-dashboard.mp3',
  '/portfolio/componenti/booking':        '/audio/iris/iris-booking.mp3',
  '/portfolio/componenti/music-player':   '/audio/iris/iris-music-player.mp3',
  '/portfolio/componenti/crud-simulator': '/audio/iris/iris-crud.mp3',
  '/portfolio/componenti/slider':         '/audio/iris/iris-slider.mp3',
  '/portfolio/componenti/text-sampler':   '/audio/iris/iris-text-sampler.mp3',
  '/portfolio/componenti/cubo-3d':        '/audio/iris/iris-cubo-3d.mp3',
  '/portfolio/componenti/image-checker':  '/audio/iris/iris-image-checker.mp3',
  '/contatti':                            '/audio/iris/iris-contatti.mp3',
  '/privacy-policy':                      '/audio/iris/iris-privacy.mp3',
  '/cookie-policy':                       '/audio/iris/iris-cookie.mp3',
  '/termini-e-condizioni':                '/audio/iris/iris-termini.mp3',
};

const Iris = () => {
  const [isActive,    setIsActive]    = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [greeting,    setGreeting]    = useState(null);
  const [pupilPos,    setPupilPos]    = useState({ x: 50, y: 50 });
  const [blinking,    setBlinking]    = useState(false);
  const [isMuted,     setIsMuted]     = useState(() => localStorage.getItem('iris-muted') === 'true');
  const { text, clearGuide } = useGuide();
  const location         = useLocation();
  const ref              = useRef(null);
  const greetingTimer    = useRef(null);
  const speechAudioRef   = useRef(null);
  const greetingIdxRef   = useRef(0);

  /* ── Audio helpers ── */
  const stopVoice = useCallback(() => {
    if (speechAudioRef.current) {
      speechAudioRef.current.pause();
      speechAudioRef.current = null;
    }
  }, []);

  const playVoice = useCallback((path) => {
    stopVoice();
    if (!path) return;
    const audio = new Audio(path);
    speechAudioRef.current = audio;
    audio.play().catch(() => {});
  }, [stopVoice]);

  /* ── Clear hover guide on route change ── */
  useEffect(() => {
    clearGuide();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Cursor tracking — only when active ── */
  useEffect(() => {
    if (!isActive) return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      setPupilPos({ x: 50 + Math.cos(angle) * 8, y: 50 + Math.sin(angle) * 6 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isActive]);

  /* ── Idle random look — only when active ── */
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      if (Math.random() > 0.5) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 0.7;
        setPupilPos({ x: 50 + Math.cos(a) * 8 * d, y: 50 + Math.sin(a) * 6 * d });
        setTimeout(() => setPupilPos({ x: 50, y: 50 }), 1000 + Math.random() * 1000);
      }
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, [isActive]);

  /* ── Blinking — only when active ── */
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 100);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [isActive]);

  /* ── Cleanup timers and audio on unmount ── */
  useEffect(() => () => {
    clearTimeout(greetingTimer.current);
    stopVoice();
  }, [stopVoice]);

  /* ── Play greeting voice when Iris opens ── */
  useEffect(() => {
    if (!greeting || isMuted) return;
    playVoice(GREETING_VOICES[greetingIdxRef.current]);
  }, [greeting, isMuted, playVoice]);

  /* ── Play page guide voice on navigation (only when active) ── */
  useEffect(() => {
    if (!isActive || isMuted) return;
    playVoice(PAGE_VOICES[location.pathname] ?? null);
  }, [location.pathname, isActive, isMuted, playVoice]);

  /* ── Stop voice when muted or deactivated ── */
  useEffect(() => {
    if (isMuted || !isActive) stopVoice();
  }, [isMuted, isActive, stopVoice]);

  /* ── Mute toggle ── */
  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    setIsMuted(prev => {
      const next = !prev;
      localStorage.setItem('iris-muted', next);
      return next;
    });
  }, []);

  /* ── Toggle on/off ── */
  const handleToggle = () => {
    if (isGlitching) return;

    if (!isActive) {
      /* Activate: glitch → open → greet */
      setIsGlitching(true);
      clearTimeout(greetingTimer.current);
      setTimeout(() => {
        setIsGlitching(false);
        setIsActive(true);
        setPupilPos({ x: 50, y: 50 });
        const idx = Math.floor(Math.random() * GREETINGS.length);
        greetingIdxRef.current = idx;
        const msg = GREETINGS[idx];
        setGreeting(msg);
        greetingTimer.current = setTimeout(() => setGreeting(null), 4500);
      }, 650);
    } else {
      /* Deactivate */
      clearTimeout(greetingTimer.current);
      setGreeting(null);
      setIsActive(false);
      setBlinking(false);
    }
  };

  const eyeOpacity = blinking ? 0 : 1;
  const pTrans     = 'cx 0.3s ease-out, cy 0.3s ease-out';
  const pageGuide  = PAGE_GUIDES[location.pathname] ?? null;
  /* greeting > hover element > current page
     On desktop the page guide shows briefly between hovers — acceptable.
     On mobile (no hover) it shows persistently while active. */
  const bubbleText = greeting || (isActive ? (text || pageGuide) : null);

  const sleeping   = !isActive && !isGlitching;
  const glitching  = isGlitching;
  const awake      = isActive || isGlitching;

  return (
    <div className="iris-container">
      {/* ── Speech bubble ── */}
      <div
        className={`iris-bubble${bubbleText ? ' iris-bubble--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span className="iris-bubble-text">{bubbleText}</span>
      </div>

      {/* ── Eye widget + mute button row ── */}
      <div className="iris-widget-row">
        {isActive && (
          <button
            className={`iris-mute-btn${isMuted ? ' iris-mute-btn--muted' : ''}`}
            onClick={toggleMute}
            title={isMuted ? 'Attiva voce' : 'Muta voce'}
            aria-label={isMuted ? 'Attiva voce di Iris' : 'Muta voce di Iris'}
          >
            {isMuted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            )}
          </button>
        )}
        <div
          className={[
            'iris-widget',
            sleeping  ? 'iris-widget--sleeping'  : '',
            glitching ? 'iris-widget--glitching' : '',
          ].join(' ').trim()}
          ref={ref}
          aria-label={isActive ? 'Disattiva Iris' : 'Attiva Iris'}
          title={isActive ? 'Disattiva Iris' : 'Attiva Iris'}
          onClick={handleToggle}
        >
        <svg className="iris-svg" viewBox="20 27 62 42" aria-hidden="true">
          <defs>
            <filter id="irisGlowD">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="irisClipD">
              <path d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z" />
            </clipPath>
          </defs>

          {/* ── Active / glitching eye ── */}
          {awake && (
            <>
              <path
                d="M 35 50 C 39 43, 44 40, 50 40 C 56 40, 61 43, 65 50 C 61 57, 56 60, 50 60 C 44 60, 39 57, 35 50 Z"
                fill="none"
                stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#irisGlowD)"
                style={{ opacity: eyeOpacity, transition: 'opacity 0.1s ease-in-out' }}
              />
              <g clipPath="url(#irisClipD)" style={{ opacity: eyeOpacity, transition: 'opacity 0.1s ease-in-out' }}>
                <circle cx={pupilPos.x} cy={pupilPos.y} r="8"
                  fill="none" stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                  strokeWidth="1" filter="url(#irisGlowD)"
                  style={{ transition: pTrans }}
                />
                <circle cx={pupilPos.x} cy={pupilPos.y} r="3.5"
                  fill="none" stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                  strokeWidth="0.8" filter="url(#irisGlowD)"
                  style={{ transition: pTrans }}
                />
              </g>
            </>
          )}

          {/* ── Sleeping eye ── */}
          {sleeping && (
            <>
              {/* Lower drooping lid */}
              <path
                d="M 36 50 C 42 53.5, 58 53.5, 64 50"
                fill="none"
                stroke="var(--color-primary-95, rgba(0,255,255,0.95))"
                strokeWidth="1.2"
                strokeLinecap="round"
                filter="url(#irisGlowD)"
              />
              {/* Upper lid (faint) */}
              <path
                d="M 36 50 C 42 47, 58 47, 64 50"
                fill="none"
                stroke="var(--color-primary-40, rgba(0,255,255,0.4))"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* Zzz */}
              <text className="iris-zzz iris-zzz--1" x="66" y="44"
                fill="var(--color-primary, #0ff)" fontSize="3.2"
                fontFamily="monospace" filter="url(#irisGlowD)">z</text>
              <text className="iris-zzz iris-zzz--2" x="69" y="40"
                fill="var(--color-primary, #0ff)" fontSize="3.8"
                fontFamily="monospace" filter="url(#irisGlowD)">z</text>
              <text className="iris-zzz iris-zzz--3" x="72" y="36"
                fill="var(--color-primary, #0ff)" fontSize="4.4"
                fontFamily="monospace" filter="url(#irisGlowD)">z</text>
            </>
          )}

          {/* ── Papillon ── */}
          <g transform="translate(65.5,37) rotate(45)" filter="url(#irisGlowD)">
            <path d="M -1.5,-1.2 C -2.5,-3 -4.5,-4.8 -7.5,-4.3 C -10,-3.8 -10.5,0 -7.5,4.3 C -4.5,4.8 -2.5,3 -1.5,1.2 C -1,0.5 -1,-0.5 -1.5,-1.2 Z" fill="var(--color-primary, #0ff)" />
            <path d="M 1.5,-1.2 C 2.5,-3 4.5,-4.8 7.5,-4.3 C 10,-3.8 10.5,0 7.5,4.3 C 4.5,4.8 2.5,3 1.5,1.2 C 1,0.5 1,-0.5 1.5,-1.2 Z" fill="var(--color-primary, #0ff)" />
            <rect x="-2" y="-2" width="4" height="4" rx="0.8" fill="rgba(0,0,0,0.9)" />
            <rect x="-1.2" y="-1.2" width="2.4" height="2.4" rx="0.5" fill="var(--color-primary, #0ff)" />
          </g>

          {/* ── Neo ── */}
          <circle cx="65" cy="61" r="1.5" fill="var(--color-primary, #0ff)" filter="url(#irisGlowD)" />
        </svg>
        </div>
      </div>
    </div>
  );
};

export default Iris;
