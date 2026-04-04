import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuide } from '../../../contexts/GuideContext';
import './MultimediaPage.css';

/* ── Slot immagini grafiche digitali — sostituisci src con i tuoi URL ── */
const GRAFICHE_SLIDES = [
  { src: '', alt: 'Banner',       description: 'Banner digitale — aggiungi descrizione' },
  { src: '', alt: 'Sfondo',       description: 'Sfondo digitale — aggiungi descrizione' },
  { src: '', alt: 'Social Media', description: 'Grafica social media — aggiungi descrizione' },
  { src: '', alt: 'Web Graphic',  description: 'Web grafica — aggiungi descrizione' },
];

/* ── Slot frame animazione — sostituisci src con i tuoi URL (8 frame) ── */
const ANIM_FRAMES = [
  { src: '', alt: 'Frame 1' },
  { src: '', alt: 'Frame 2' },
  { src: '', alt: 'Frame 3' },
  { src: '', alt: 'Frame 4' },
  { src: '', alt: 'Frame 5' },
  { src: '', alt: 'Frame 6' },
  { src: '', alt: 'Frame 7' },
  { src: '', alt: 'Frame 8' },
];

const FRAME_MS = 120; // millisecondi per frame

const MultimediaPage = () => {
  const navigate = useNavigate();
  const { setGuide, clearGuide } = useGuide();

  /* Grafiche: slider + modal */
  const [slide, setSlide]   = useState(0);
  const [modal, setModal]   = useState(null); // null | indice slide

  /* Animazione: frame corrente + play/pause */
  const [frame,   setFrame]   = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  /* Body class */
  useEffect(() => {
    document.body.classList.add('multimedia-page-body');
    return () => document.body.classList.remove('multimedia-page-body');
  }, []);

  /* Loop animazione */
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(
        () => setFrame(f => (f + 1) % ANIM_FRAMES.length),
        FRAME_MS
      );
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  /* Chiudi modal con Escape */
  useEffect(() => {
    if (modal === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const prevSlide = () => setSlide(s => (s - 1 + GRAFICHE_SLIDES.length) % GRAFICHE_SLIDES.length);
  const nextSlide = () => setSlide(s => (s + 1) % GRAFICHE_SLIDES.length);

  return (
    <div className="multimedia-page-wrapper">
      <div className="multimedia-grid-overlay"></div>

      {/* ── Modal immagine grafiche ── */}
      {modal !== null && (
        <div className="img-modal-overlay" onClick={() => setModal(null)}>
          <div className="img-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <img
              src={GRAFICHE_SLIDES[modal].src}
              alt={GRAFICHE_SLIDES[modal].alt}
              className="modal-img"
            />
            <p className="modal-description">{GRAFICHE_SLIDES[modal].description}</p>
          </div>
        </div>
      )}

      <div className="multimedia-content">

        {/* Hero */}
        <section className="multimedia-hero">
          <h1 className="multimedia-title">Creazione Multimedia</h1>
          <p className="multimedia-subtitle">Grafiche, Animazioni e Illustrazioni su Misura</p>
        </section>

        {/* Intro */}
        <section className="multimedia-section intro-section">
          <div className="intro-box">
            <p className="intro-text">
              Cerchi delle grafiche fatte apposta per te o hai bisogno di aiuto per la creazione delle tue immagini
              o disegni? Sono specializzato in <strong>grafiche digitali</strong> e <strong>content creation</strong>,
              ti aiuto a sviluppare le tue idee e ti seguo fornendoti un costante feedback grafico, che siano grafiche
              o illustrazioni, sei nel posto giusto:
            </p>
            <p className="intro-highlight">
              Qui sotto puoi dare un' occhiata ad alcuni dei miei campioni.
            </p>
          </div>
        </section>

        {/* ── Animazioni ── */}
        <section className="multimedia-section work-section">
          <div className="work-container work-reverse">
            <div className="work-content">
              <h2 className="work-title">Animazioni</h2>
              <p className="work-text">
                Creo e partecipo nella creazione di animazioni da quando sono giovane, illustrami il tuo progetto
                e ti faccio sapere subito se sono disponibile ;)
              </p>
              <button className="work-cta" onClick={() => navigate('/contatti')}>
                Raccontami il Tuo Progetto
              </button>
            </div>
            <div className="work-showcase">
              <div className="animation-frame">
                {/* 8 frame — sostituisci src in ANIM_FRAMES */}
                <img
                  src={ANIM_FRAMES[frame].src}
                  alt={ANIM_FRAMES[frame].alt}
                  className="anim-frame-img"
                />
                <button
                  className={`anim-play-btn${playing ? ' is-playing' : ''}`}
                  onClick={() => setPlaying(p => !p)}
                  aria-label={playing ? 'Pausa animazione' : 'Avvia animazione'}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7L8 5z"/>
                    </svg>
                  )}
                </button>
                <span className="anim-frame-counter">{frame + 1} / {ANIM_FRAMES.length}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Grafiche Digitali — slider ── */}
        <section className="multimedia-section work-section">
          <div className="work-container">
            <div className="work-content">
              <h2 className="work-title">Grafiche Digitali</h2>
              <p className="work-text">
                Creo banner, sfondi e immagini utilizzabili in vari tipi di progetti e piattaforme.
                Contattami subito per creare le tue!
              </p>
              <button
                className="work-cta"
                onClick={() => navigate('/contatti')}
                onMouseEnter={() => setGuide('Mi sembra un\'ottima idea e.e')}
                onMouseLeave={clearGuide}
              >
                Inizia il Tuo Progetto
              </button>
            </div>
            <div className="work-showcase">
              {/* Slider — sostituisci src in GRAFICHE_SLIDES */}
              <div className="graphics-slider">
                <div className="slider-viewport" onClick={() => setModal(slide)}>
                  <img
                    src={GRAFICHE_SLIDES[slide].src}
                    alt={GRAFICHE_SLIDES[slide].alt}
                    className="slider-img"
                  />
                  <button
                    className="slider-arrow slider-prev"
                    onClick={e => { e.stopPropagation(); prevSlide(); }}
                    aria-label="Precedente"
                  >‹</button>
                  <button
                    className="slider-arrow slider-next"
                    onClick={e => { e.stopPropagation(); nextSlide(); }}
                    aria-label="Successivo"
                  >›</button>
                  <span className="slider-zoom-hint">🔍 Clicca per ingrandire</span>
                </div>
                <div className="slider-dots">
                  {GRAFICHE_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      className={`slider-dot${i === slide ? ' active' : ''}`}
                      onClick={() => setSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Illustrazioni ── */}
        <section className="multimedia-section work-section">
          <div className="work-container work-reverse">
            <div className="work-content">
              <h2 className="work-title">Illustrazioni</h2>
              <p className="work-text">
                Da anni seguo il mondo delle illustrazioni, metto a disposizione tutta la mia esperienza per
                insegnarti, aiutarti nei tuoi progetti o creare direttamente illustrazioni su commissione,
                visita i miei canali social o consulta il mio portfolio per avere un'idea più precisa dei miei vari stili e tecniche!
              </p>
              <button className="work-cta" onClick={() => navigate('/contatti')}>
                Scopri i Miei Stili
              </button>
            </div>
            <div className="work-showcase">
              <div className="illustration-showcase">
                {/* Inserisci il tuo URL nell'attributo src */}
                <img
                  src=""
                  alt="Illustrazione — aggiungi descrizione"
                  className="showcase-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Vari Contenuti Digitali (Brand Identity) ── */}
        <section className="multimedia-section work-section">
          <div className="work-container">
            <div className="work-content">
              <h2 className="work-title">Vari Contenuti Digitali</h2>
              <p className="work-text">
                E se cerchi anche qualcuno che curi il tuo logo, il tuo brand, le tue palette o le tue icone,
                sono qui anche per questo, non esitare a contattarmi, <strong>le tue idee sono la mia passione!</strong>
              </p>
              <div className="services-list">
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 26 L16 6 L24 26 L8 26 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                    <line x1="12" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span>Logo Design</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4 L20 14 L30 14 L22 20 L26 30 L16 24 L6 30 L10 20 L2 14 L12 14 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
                  </svg>
                  <span>Brand Identity</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="12" r="6" fill="currentColor" opacity="0.8"/>
                    <circle cx="22" cy="12" r="6" fill="currentColor" opacity="0.6"/>
                    <circle cx="16" cy="20" r="6" fill="currentColor" opacity="0.4"/>
                  </svg>
                  <span>Color Palette</span>
                </div>
                <div className="service-tag">
                  <svg className="tag-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                    <line x1="16" y1="12" x2="16" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="12" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <span>Icon Design</span>
                </div>
              </div>
              <button
                className="work-cta work-cta-primary"
                onClick={() => navigate('/contatti')}
                onMouseEnter={() => setGuide('Mi sembra un\'ottima idea e.e')}
                onMouseLeave={clearGuide}
              >
                Contattami Ora
              </button>
            </div>
            <div className="work-showcase">
              <div className="brand-showcase">
                {/* Inserisci il tuo URL nell'attributo src */}
                <img
                  src=""
                  alt="Brand Identity — aggiungi descrizione"
                  className="showcase-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Disclaimer: Come viene erogato il servizio ── */}
        <section className="work-disclaimer-section">
          <div className="disclaimer-header">
            <span className="disclaimer-icon">ⓘ</span>
            <h2 className="disclaimer-title">Come Viene Erogato il Servizio</h2>
          </div>
          <p className="disclaimer-note">
            Questo sito è esclusivamente un <strong>portfolio</strong>: i servizi descritti rappresentano
            ciò che so fare e lavori già svolti per aziende che mi hanno assunto. Attualmente non ho
            partita IVA (sto lavorando per ottenerla), ma posso collaborare tramite{' '}
            <strong>contratto a tempo determinato</strong>, <strong>contratto di collaborazione</strong>{' '}
            o <strong>ritenuta d'acconto</strong>.
          </p>
          <div className="disclaimer-steps">
            <div className="disclaimer-step">
              <span className="disclaimer-step-num">01</span>
              <div className="disclaimer-step-body">
                <h3 className="disclaimer-step-title">Ci Conosciamo</h3>
                <p className="disclaimer-step-desc">Parliamo del tuo progetto e delle tue esigenze. Zero impegno, massima trasparenza.</p>
              </div>
            </div>
            <div className="disclaimer-step">
              <span className="disclaimer-step-num">02</span>
              <div className="disclaimer-step-body">
                <h3 className="disclaimer-step-title">Ti Mostro i Lavori</h3>
                <p className="disclaimer-step-desc">Posso mostrarti altri progetti e referenze oltre a quelle presenti in questo portfolio.</p>
              </div>
            </div>
            <div className="disclaimer-step">
              <span className="disclaimer-step-num">03</span>
              <div className="disclaimer-step-body">
                <h3 className="disclaimer-step-title">Definiamo i Termini</h3>
                <p className="disclaimer-step-desc">Stabiliamo insieme la forma di collaborazione: contratto, co.co.co. o ritenuta d'acconto.</p>
              </div>
            </div>
            <div className="disclaimer-step">
              <span className="disclaimer-step-num">04</span>
              <div className="disclaimer-step-body">
                <h3 className="disclaimer-step-title">Si Comincia!</h3>
                <p className="disclaimer-step-desc">Avviamo la collaborazione e trasformiamo le tue idee in realtà.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="multimedia-cta-section">
          <h2 className="cta-title">Dai Vita alle Tue Idee</h2>
          <p className="cta-text">
            Sono pronto ad ascoltare il tuo progetto e trasformarlo in realtà
          </p>
          <button
            className="multimedia-cta-button"
            onClick={() => navigate('/contatti')}
            onMouseEnter={() => setGuide('Mi sembra un\'ottima idea e.e')}
            onMouseLeave={clearGuide}
          >
            Contattami
          </button>
        </section>

      </div>
    </div>
  );
};

export default MultimediaPage;
