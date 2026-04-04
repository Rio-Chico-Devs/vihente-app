import { useState, useEffect, useRef } from 'react';
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

const Iris = () => {
  const [isActive,    setIsActive]    = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [greeting,    setGreeting]    = useState(null);
  const [pupilPos,    setPupilPos]    = useState({ x: 50, y: 50 });
  const [blinking,    setBlinking]    = useState(false);
  const { text, clearGuide } = useGuide();
  const location         = useLocation();
  const ref              = useRef(null);
  const greetingTimer    = useRef(null);

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

  /* ── Cleanup ── */
  useEffect(() => () => clearTimeout(greetingTimer.current), []);

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
        const msg = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
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
  /* Priority: wake-up greeting > hover element > current page */
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

      {/* ── Eye widget ── */}
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
  );
};

export default Iris;
