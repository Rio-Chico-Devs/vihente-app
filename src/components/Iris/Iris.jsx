import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGuide } from '../../contexts/GuideContext';
import './Iris.css';

const GREETINGS = [
  ':D Eccomi! Mi hai chiamato?',
  "E' sempre un piacere vederti :)",
  'Grazie per aver attivato Iris, siamo pronti a cominciare.',
  'Carica e operativa.',
  'Cominciamo pure, sono Iris la tua guida creata su misura.',
  'Sempre pronta, iniziamo.',
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
  '/':                                      'Questa è la nostra Home, consulta le varie sezioni per scoprire chi siamo e cosa facciamo.',
  '/storia':                                'In questa sezione potrai osservare la nostra storia e le skills che ci hanno portato a essere quel che siamo.',
  '/services':                              'In questa pagina sono presenti le mansioni e i lavori che attualmente svolgiamo.',
  '/services/consulenze':                   'Consulenza digitale vuol dire strategia, analisi e supporto personalizzato in linea con la tua identità.',
  '/services/sitiweb':                      'Non creiamo i soliti siti web, esplora questa pagina per scoprire come ci differenziamo.',
  '/services/presenza':                     'Definire la propria identità mediatica è diventato imperativo per fare business di questi tempi, curiamo con zelo chi sei e come ti vedono i tuoi clienti.',
  '/services/multimedia':                   'Creiamo video, suoni, e qualsiasi tipo di file multimediale adattandolo ai tuoi bisogni.',
  '/portfolio':                             'Qui puoi vedere i nostri lavori migliori e degli esempi di cosa offriamo.',
  '/portfolio/componenti':                  'Questo spazio è dedicato a mostrare alcuni campioni di lavori UI/UX.',
  '/portfolio/grafiche':                    'Ecco alcuni campioni di illustrazioni e lavori di grafica.',
  '/portfolio/sitiweb':                     'Ci scusiamo per il disagio, stiamo ottenendo i permessi necessari dai nostri precedenti datori di lavoro.',
  '/portfolio/componenti/black-market':     'Questo componente è una simulazione di uno negozio online con generazione randomica per videogiochi.',
  '/portfolio/componenti/dashboard':        'Un esempio di interfaccia utente con metriche, grafici e transazioni con dati che si popolano da database.',
  '/portfolio/componenti/booking':          'Presentiamo un sistema di prenotazione facile e veloce, pensato per qualsiasi tipo di attività.',
  '/portfolio/componenti/music-player':     'Il nostro riproduttore di tracce musicali, tutte le canzoni sono state prodotte da noi collaborando con altri artisti.',
  '/portfolio/componenti/crud-simulator':   'Questo è un simulatore di operazioni gestionali e organizzazione di magazzino.',
  '/portfolio/componenti/slider':           "Qui puoi osservare un'idea di visualizzazioni di foto a scorrimento, interamente in CSS.",
  '/portfolio/componenti/text-sampler':     'Una breve dimostrazione di stilistica del testo.',
  '/portfolio/componenti/cubo-3d':          'Modelli interattivi ruotabili in tutte le direzioni, zero librerie esterne.',
  '/portfolio/componenti/image-checker':    'Esempio di visualizzatore di immagini con ingrandimento.',
  '/contatti':                              'Usa il form per contattarci, ti risponderemo presto! :D',
  '/privacy-policy':                        'Qui, trovi tutte le informazioni sul trattamento dei tuoi dati personali.',
  '/cookie-policy':                         'Qui, puoi consultare come utilizziamo i cookie su questo sito.',
  '/termini-e-condizioni':                  'Qui, puoi consultare le regole di utilizzo del nostro sito.',
};

/* ── Voci per i tooltip hover (setGuide) ── */
const GUIDE_VOICES = {
  /* Landing / generale */
  'Questo badge verde significa che siamo disponibili per nuove collaborazioni. Non esitare a contattarci!':
    '/audio/iris/iris-hover-badge.mp3',
  "Dai un'occhiata ad alcuni dei miei precedenti lavori":
    '/audio/iris/iris-hover-services-preview.mp3',
  "Dai un'occhiata ai miei precedenti lavori!":
    '/audio/iris/iris-hover-portfolio-preview.mp3',
  "Guarda un pò chi abbiamo qui, è la mia persona preferita <3":
    '/audio/iris/iris-hover-persona.mp3',
  'Io ci cliccherei sopra.':
    '/audio/iris/iris-hover-cliccarci.mp3',
  "Mi sembra un'ottima idea e.e":
    '/audio/iris/iris-hover-ottima-idea.mp3',
  "E quella roba chi l'ha messa lì? o_o":
    '/audio/iris/iris-hover-roba.mp3',

  /* MyStory */
  'Visita questa sezione per conoscere la storia del titolare del sito':
    '/audio/iris/iris-hover-storia-desc.mp3',
  'Il nostro percorso, i nostri studi e la nostra voglia di fare.':
    '/audio/iris/iris-hover-storia-chi.mp3',
  'da 7 anni ormai.':
    '/audio/iris/iris-hover-skill-web.mp3',
  'Il suo record è 20k followers per ora!':
    '/audio/iris/iris-hover-skill-social.mp3',
  'Penso che sia il suo lavoro preferito ^^':
    '/audio/iris/iris-hover-skill-creator.mp3',
  'Ha una matita in mano da quando è nato :V':
    '/audio/iris/iris-hover-skill-illustratore.mp3',
  'Non si è mai arreso, ha allenato giocatori e vinto molte competizioni di E-sports ;)':
    '/audio/iris/iris-hover-skill-coach.mp3',
  'Attualmente disponibile solo previa consultazione.':
    '/audio/iris/iris-hover-skill-linguistico.mp3',
  'Con esperienza e alta formazione accademica.':
    '/audio/iris/iris-hover-skill-traduttore.mp3',

  /* Services */
  'Seleziona il servizio di cui hai bisogno: consulenza, grafica, sito web, social media o content creation.':
    '/audio/iris/iris-hover-service-select.mp3',

  /* Portfolio categories */
  'Loghi, illustrazioni e materiali grafici — visual identity e comunicazione digitale.':
    '/audio/iris/iris-hover-portfolio-grafiche.mp3',
  'Siti web professionali — design e sviluppo su misura.':
    '/audio/iris/iris-hover-portfolio-siti.mp3',
  'Componenti interattivi realizzati da zero — slider, player, dashboard, shop e molto altro.':
    '/audio/iris/iris-hover-portfolio-componenti.mp3',

  /* ComponentShowcase cards */
  'Gallery/slider con animazioni, transizioni fluide e navigazione touch.':
    '/audio/iris/iris-hover-comp-slider.mp3',
  'Anteprima live di tutti i font e stili tipografici usati nel sito.':
    '/audio/iris/iris-hover-comp-text.mp3',
  'Cubo 3D interattivo con rotazione animata — CSS puro, zero librerie.':
    '/audio/iris/iris-hover-comp-cubo.mp3',
  'Player musicale con playlist, progress bar e visualizer grafico in tempo reale.':
    '/audio/iris/iris-hover-comp-music.mp3',
  'Simulatore di magazzino con operazioni CRUD complete e inventario gestito in stato.':
    '/audio/iris/iris-hover-comp-crud.mp3',
  'shop game con sistema di rarità, inventario randomico, carrello e checkout.':
    '/audio/iris/iris-hover-comp-bm.mp3',
  'Pannello analytics con grafici SVG, KPI, metriche ECG scrollanti e selezione periodo.':
    '/audio/iris/iris-hover-comp-dashboard.mp3',
  'componente per analizzare immagini, con lente per focalizzare piccoli dettagli':
    '/audio/iris/iris-hover-comp-imagechecker.mp3',
  'Sistema di prenotazione con calendario interattivo e gestione disponibilità.':
    '/audio/iris/iris-hover-comp-booking.mp3',

  /* Portfolio / Siti web WIP */
  "Ci scusiamo per il momentaneo disagio — questa sezione è in aggiornamento e tornerà presto con i progetti!":
    '/audio/iris/iris-hover-sitiweb-wip.mp3',

  /* Contacts */
  'Il tuo nome o il nome della tua azienda. Es: "Mario Rossi" o "Acme S.r.l."':
    '/audio/iris/iris-hover-contact-name.mp3',
  'La tua email: useremo questo indirizzo per risponderti. Es: "mario@gmail.com"':
    '/audio/iris/iris-hover-contact-email.mp3',
  'Spiegaci brevemente il motivo del contatto. Es: "Vorrei una collaborazione" o "Ho bisogno di informazioni"':
    '/audio/iris/iris-hover-contact-message.mp3',
  'Invia il modulo compilato — ti risponderemo il prima possibile!':
    '/audio/iris/iris-hover-contact-send.mp3',
  "Accetta la Privacy Policy per inviare il modulo — i tuoi dati vengono usati solo per risponderti.":
    '/audio/iris/iris-hover-contact-privacy.mp3',
  'Descrivi il tuo progetto: obiettivi, tempi, budget e qualsiasi dettaglio utile per prepararti un preventivo preciso.':
    '/audio/iris/iris-hover-contact-preventivo.mp3',
  'Scrivi liberamente: dicci chi sei, racconta cosa cerchi e come possiamo aiutarti.':
    '/audio/iris/iris-hover-contact-messaggio.mp3',

  /* Booking */
  'Indicatore di avanzamento — mostra in quale step della prenotazione ti trovi.':
    '/audio/iris/iris-hover-booking-stepper.mp3',
  'Scegli il servizio che ti interessa prenotare — ogni opzione ha durata e prezzo dedicati.':
    '/audio/iris/iris-hover-booking-services.mp3',
  'Calendario interattivo — seleziona il giorno disponibile per la tua prenotazione.':
    '/audio/iris/iris-hover-booking-calendar.mp3',

  /* Dashboard */
  'Transazioni recenti — lista degli ultimi movimenti con importo, servizio e stato di pagamento.':
    '/audio/iris/iris-hover-dash-transactions.mp3',
  'Andamento del fatturato, grafico a barre o lineare del periodo selezionato.':
    '/audio/iris/iris-hover-dash-chart.mp3',
  'Crescita settori — confronto visivo delle performance per area di business.':
    '/audio/iris/iris-hover-dash-sectors.mp3',
  'Metriche ECG — indicatori di salute del business con trend animati in tempo reale.':
    '/audio/iris/iris-hover-dash-ecg.mp3',
  'Seleziona il periodo di analisi: 7 giorni, 30 giorni, 90 giorni o annuale.':
    '/audio/iris/iris-hover-dash-period.mp3',

  /* Music Player */
  "Ed eccoci alla mia sezione preferita, metti un pò di musica ;D":
    '/audio/iris/iris-hover-music-welcome.mp3',
  "Visualizzatore — l'occhio reagisce al volume e al beat della musica in riproduzione.":
    '/audio/iris/iris-hover-music-visualizer.mp3',
  'Info traccia — titolo, artista, album, anno e genere del brano selezionato.':
    '/audio/iris/iris-hover-music-info.mp3',
  'Equalizzatore — regola bass, mid e treble per personalizzare il suono.':
    '/audio/iris/iris-hover-music-eq.mp3',
  'Playlist — seleziona un brano dalla lista per avviarne la riproduzione.':
    '/audio/iris/iris-hover-music-playlist.mp3',
  'Barra di avanzamento — mostra il progresso del brano. Clicca per saltare a un punto preciso.':
    '/audio/iris/iris-hover-music-progress.mp3',

  /* CRUD Simulator */
  'Filtri — cerca per nome, filtra per magazzino e ordina i prodotti secondo le tue esigenze.':
    '/audio/iris/iris-hover-crud-filters.mp3',
  'Form prodotto — aggiungi un nuovo articolo al magazzino inserendo nome, categoria, quantità e prezzo.':
    '/audio/iris/iris-hover-crud-form.mp3',
  'Statistiche — panoramica del magazzino: prodotti totali, pezzi, valore e scorte in esaurimento.':
    '/audio/iris/iris-hover-crud-stats.mp3',
  'Tabella prodotti — visualizza, modifica o elimina ogni articolo del magazzino con le operazioni CRUD.':
    '/audio/iris/iris-hover-crud-table.mp3',
  'Monitor memoria — mostra quanta memoria simulata stanno occupando i dati del magazzino.':
    '/audio/iris/iris-hover-crud-memory.mp3',

  /* Femo's Black Market */
  'Aggiungi prodotti, modifica le quantità e procedi al checkout.':
    '/audio/iris/iris-hover-bm-cart.mp3',
  'Inventario del market, ogni refresh cambia i prodotti disponibili con rarità casuali.':
    '/audio/iris/iris-hover-bm-inventory.mp3',
  'Ti presento Femo! Si irrita facilmente, quindi trattalo con rispetto':
    '/audio/iris/iris-hover-bm-femo.mp3',
  "Questo è Femo — l'altra mascotte del mercato. Commenta le tue azioni in tempo reale.":
    '/audio/iris/iris-hover-bm-femo2.mp3',
  "Rifornisce il negozio con nuovi prodotti casuali — ogni click cambia l'inventario.":
    '/audio/iris/iris-hover-bm-restock.mp3',

  /* Slider */
  "Galleria espandibile — clicca su un pannello per espanderlo. Passaci sopra per vedere l'anteprima colorata.":
    '/audio/iris/iris-hover-slider-gallery.mp3',
  'Descrizione immagine — titolo e dettagli del pannello selezionato.':
    '/audio/iris/iris-hover-slider-desc.mp3',
  "Lightbox — visualizzazione a schermo intero dell'immagine selezionata. Clicca fuori per chiudere.":
    '/audio/iris/iris-hover-slider-lightbox.mp3',

  /* Text Sampler */
  "Lista effetti — seleziona un effetto tipografico per vederlo applicato all'anteprima. Sono tutti realizzati in CSS puro.":
    '/audio/iris/iris-hover-text-list.mp3',
  'Anteprima live — mostra il testo con l\'effetto selezionato applicato in tempo reale.':
    '/audio/iris/iris-hover-text-preview.mp3',

  /* Cubo 3D */
  'Viewport 3D — trascina per ruotare il cubo in tutte le direzioni. Zero librerie 3D: tutto in CSS puro.':
    '/audio/iris/iris-hover-cubo-viewport.mp3',

  /* Image Checker */
  'Area immagine — muovi il cursore per esplorare i dettagli con la lente.':
    '/audio/iris/iris-hover-img-area.mp3',
  "Attiva o disattiva la lente di ingrandimento — quando attiva segue il cursore sull'immagine.":
    '/audio/iris/iris-hover-img-toggle.mp3',
  'Info lente — stato, zoom e dimensione della lente attiva.':
    '/audio/iris/iris-hover-img-info.mp3',
};
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
  const ref                  = useRef(null);
  const greetingTimer        = useRef(null);
  const speechAudioRef       = useRef(null);
  const greetingIdxRef       = useRef(0);
  const hoverTimerRef        = useRef(null);
  const greetingPlayingRef   = useRef(false);

  /* ── Audio helpers ── */
  const stopVoice = useCallback(() => {
    if (speechAudioRef.current) {
      speechAudioRef.current.pause();
      speechAudioRef.current = null;
    }
    greetingPlayingRef.current = false;
  }, []);

  const playVoice = useCallback((path) => {
    stopVoice();
    if (!path) return;
    const audio = new Audio(path);
    speechAudioRef.current = audio;
    audio.play().catch(() => {});
  }, [stopVoice]);

  /* Play greeting, then page voice once greeting ends */
  const playGreetingThenPage = useCallback((greetPath, pagePath) => {
    stopVoice();
    if (!greetPath) { if (pagePath) playVoice(pagePath); return; }
    greetingPlayingRef.current = true;
    const audio = new Audio(greetPath);
    speechAudioRef.current = audio;
    audio.onended = () => {
      greetingPlayingRef.current = false;
      speechAudioRef.current = null;
      if (pagePath) playVoice(pagePath);
    };
    audio.play().catch(() => {
      greetingPlayingRef.current = false;
      if (pagePath) playVoice(pagePath);
    });
  }, [stopVoice, playVoice]);

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
    clearTimeout(hoverTimerRef.current);
    stopVoice();
  }, [stopVoice]);

  /* ── Page voice on navigation (NOT on first activation — handled in handleToggle) ── */
  useEffect(() => {
    if (!isActive || isMuted) return;
    playVoice(PAGE_VOICES[location.pathname] ?? null);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Hover guide voice — debounced 400ms, never interrupts greeting ── */
  useEffect(() => {
    clearTimeout(hoverTimerRef.current);
    if (!isActive || isMuted || !text) return;
    hoverTimerRef.current = setTimeout(() => {
      if (greetingPlayingRef.current) return;
      const path = GUIDE_VOICES[text];
      if (path) playVoice(path);
    }, 400);
  }, [text, isActive, isMuted, playVoice]);

  /* ── Stop voice when muted or deactivated ── */
  useEffect(() => {
    if (isMuted || !isActive) {
      clearTimeout(hoverTimerRef.current);
      stopVoice();
    }
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
        /* Saluto → poi voce pagina in sequenza */
        if (!isMuted) {
          playGreetingThenPage(
            GREETING_VOICES[idx],
            PAGE_VOICES[location.pathname] ?? null
          );
        }
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
