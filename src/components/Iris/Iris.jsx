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
  '/audio/iris/iris-g0.opus',
  '/audio/iris/iris-g1.opus',
  '/audio/iris/iris-g2.opus',
  '/audio/iris/iris-g3.opus',
  '/audio/iris/iris-g4.opus',
  '/audio/iris/iris-g5.opus',
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
    '/audio/iris/iris-hover-badge.opus',
  "Dai un'occhiata ad alcuni dei miei precedenti lavori":
    '/audio/iris/iris-hover-services-preview.opus',
  "Dai un'occhiata ai miei precedenti lavori!":
    '/audio/iris/iris-hover-portfolio-preview.opus',
  "Guarda un pò chi abbiamo qui, è la mia persona preferita <3":
    '/audio/iris/iris-hover-persona.opus',
  'Io ci cliccherei sopra.':
    '/audio/iris/iris-hover-cliccarci.opus',
  "Mi sembra un'ottima idea e.e":
    '/audio/iris/iris-hover-ottima-idea.opus',
  "E quella roba chi l'ha messa lì? o_o":
    '/audio/iris/iris-hover-roba.opus',

  /* MyStory */
  'Visita questa sezione per conoscere la storia del titolare del sito':
    '/audio/iris/iris-hover-storia-desc.opus',
  'Il nostro percorso, i nostri studi e la nostra voglia di fare.':
    '/audio/iris/iris-hover-storia-chi.opus',
  'da 7 anni ormai.':
    '/audio/iris/iris-hover-skill-web.opus',
  'Il suo record è 20k followers per ora!':
    '/audio/iris/iris-hover-skill-social.opus',
  'Penso che sia il suo lavoro preferito ^^':
    '/audio/iris/iris-hover-skill-creator.opus',
  'Ha una matita in mano da quando è nato :V':
    '/audio/iris/iris-hover-skill-illustratore.opus',
  'Non si è mai arreso, ha allenato giocatori e vinto molte competizioni di E-sports ;)':
    '/audio/iris/iris-hover-skill-coach.opus',
  'Attualmente disponibile solo previa consultazione.':
    '/audio/iris/iris-hover-skill-linguistico.opus',
  'Con esperienza e alta formazione accademica.':
    '/audio/iris/iris-hover-skill-traduttore.opus',

  /* Services */
  'Seleziona il servizio di cui hai bisogno: consulenza, grafica, sito web, social media o content creation.':
    '/audio/iris/iris-hover-service-select.opus',

  /* Portfolio categories */
  'Loghi, illustrazioni e materiali grafici — visual identity e comunicazione digitale.':
    '/audio/iris/iris-hover-portfolio-grafiche.opus',
  'Siti web professionali — design e sviluppo su misura.':
    '/audio/iris/iris-hover-portfolio-siti.opus',
  'Componenti interattivi realizzati da zero — slider, player, dashboard, shop e molto altro.':
    '/audio/iris/iris-hover-portfolio-componenti.opus',

  /* ComponentShowcase cards */
  'Gallery/slider con animazioni, transizioni fluide e navigazione touch.':
    '/audio/iris/iris-hover-comp-slider.opus',
  'Anteprima live di tutti i font e stili tipografici usati nel sito.':
    '/audio/iris/iris-hover-comp-text.opus',
  'Cubo 3D interattivo con rotazione animata — CSS puro, zero librerie.':
    '/audio/iris/iris-hover-comp-cubo.opus',
  'Player musicale con playlist, progress bar e visualizer grafico in tempo reale.':
    '/audio/iris/iris-hover-comp-music.opus',
  'Simulatore di magazzino con operazioni CRUD complete e inventario gestito in stato.':
    '/audio/iris/iris-hover-comp-crud.opus',
  'shop game con sistema di rarità, inventario randomico, carrello e checkout.':
    '/audio/iris/iris-hover-comp-bm.opus',
  'Pannello analytics con grafici SVG, KPI, metriche ECG scrollanti e selezione periodo.':
    '/audio/iris/iris-hover-comp-dashboard.opus',
  'componente per analizzare immagini, con lente per focalizzare piccoli dettagli':
    '/audio/iris/iris-hover-comp-imagechecker.opus',
  'Sistema di prenotazione con calendario interattivo e gestione disponibilità.':
    '/audio/iris/iris-hover-comp-booking.opus',

  /* Portfolio / Siti web WIP */
  "Ci scusiamo per il momentaneo disagio — questa sezione è in aggiornamento e tornerà presto con i progetti!":
    '/audio/iris/iris-hover-sitiweb-wip.opus',

  /* Contacts */
  'Il tuo nome o il nome della tua azienda. Es: "Mario Rossi" o "Acme S.r.l."':
    '/audio/iris/iris-hover-contact-name.opus',
  'La tua email: useremo questo indirizzo per risponderti. Es: "mario@gmail.com"':
    '/audio/iris/iris-hover-contact-email.opus',
  'Spiegaci brevemente il motivo del contatto. Es: "Vorrei una collaborazione" o "Ho bisogno di informazioni"':
    '/audio/iris/iris-hover-contact-message.opus',
  'Invia il modulo compilato — ti risponderemo il prima possibile!':
    '/audio/iris/iris-hover-contact-send.opus',
  "Accetta la Privacy Policy per inviare il modulo — i tuoi dati vengono usati solo per risponderti.":
    '/audio/iris/iris-hover-contact-privacy.opus',
  'Descrivi il tuo progetto: obiettivi, tempi, budget e qualsiasi dettaglio utile per prepararti un preventivo preciso.':
    '/audio/iris/iris-hover-contact-preventivo.opus',
  'Scrivi liberamente: dicci chi sei, racconta cosa cerchi e come possiamo aiutarti.':
    '/audio/iris/iris-hover-contact-messaggio.opus',

  /* Booking */
  'Indicatore di avanzamento — mostra in quale step della prenotazione ti trovi.':
    '/audio/iris/iris-hover-booking-stepper.opus',
  'Scegli il servizio che ti interessa prenotare — ogni opzione ha durata e prezzo dedicati.':
    '/audio/iris/iris-hover-booking-services.opus',
  'Calendario interattivo — seleziona il giorno disponibile per la tua prenotazione.':
    '/audio/iris/iris-hover-booking-calendar.opus',

  /* Dashboard */
  'Transazioni recenti — lista degli ultimi movimenti con importo, servizio e stato di pagamento.':
    '/audio/iris/iris-hover-dash-transactions.opus',
  'Andamento del fatturato, grafico a barre o lineare del periodo selezionato.':
    '/audio/iris/iris-hover-dash-chart.opus',
  'Crescita settori — confronto visivo delle performance per area di business.':
    '/audio/iris/iris-hover-dash-sectors.opus',
  'Metriche ECG — indicatori di salute del business con trend animati in tempo reale.':
    '/audio/iris/iris-hover-dash-ecg.opus',
  'Seleziona il periodo di analisi: 7 giorni, 30 giorni, 90 giorni o annuale.':
    '/audio/iris/iris-hover-dash-period.opus',

  /* Music Player */
  "Ed eccoci alla mia sezione preferita, metti un pò di musica ;D":
    '/audio/iris/iris-hover-music-welcome.opus',
  "Visualizzatore — l'occhio reagisce al volume e al beat della musica in riproduzione.":
    '/audio/iris/iris-hover-music-visualizer.opus',
  'Info traccia — titolo, artista, album, anno e genere del brano selezionato.':
    '/audio/iris/iris-hover-music-info.opus',
  'Equalizzatore — regola bass, mid e treble per personalizzare il suono.':
    '/audio/iris/iris-hover-music-eq.opus',
  'Playlist — seleziona un brano dalla lista per avviarne la riproduzione.':
    '/audio/iris/iris-hover-music-playlist.opus',
  'Barra di avanzamento — mostra il progresso del brano. Clicca per saltare a un punto preciso.':
    '/audio/iris/iris-hover-music-progress.opus',

  /* CRUD Simulator */
  'Filtri — cerca per nome, filtra per magazzino e ordina i prodotti secondo le tue esigenze.':
    '/audio/iris/iris-hover-crud-filters.opus',
  'Form prodotto — aggiungi un nuovo articolo al magazzino inserendo nome, categoria, quantità e prezzo.':
    '/audio/iris/iris-hover-crud-form.opus',
  'Statistiche — panoramica del magazzino: prodotti totali, pezzi, valore e scorte in esaurimento.':
    '/audio/iris/iris-hover-crud-stats.opus',
  'Tabella prodotti — visualizza, modifica o elimina ogni articolo del magazzino con le operazioni CRUD.':
    '/audio/iris/iris-hover-crud-table.opus',
  'Monitor memoria — mostra quanta memoria simulata stanno occupando i dati del magazzino.':
    '/audio/iris/iris-hover-crud-memory.opus',

  /* Femo's Black Market */
  'Aggiungi prodotti, modifica le quantità e procedi al checkout.':
    '/audio/iris/iris-hover-bm-cart.opus',
  'Inventario del market, ogni refresh cambia i prodotti disponibili con rarità casuali.':
    '/audio/iris/iris-hover-bm-inventory.opus',
  'Ti presento Femo! Si irrita facilmente, quindi trattalo con rispetto':
    '/audio/iris/iris-hover-bm-femo.opus',
  "Questo è Femo — l'altra mascotte del mercato. Commenta le tue azioni in tempo reale.":
    '/audio/iris/iris-hover-bm-femo2.opus',
  "Rifornisce il negozio con nuovi prodotti casuali — ogni click cambia l'inventario.":
    '/audio/iris/iris-hover-bm-restock.opus',

  /* Slider */
  "Galleria espandibile — clicca su un pannello per espanderlo. Passaci sopra per vedere l'anteprima colorata.":
    '/audio/iris/iris-hover-slider-gallery.opus',
  'Descrizione immagine — titolo e dettagli del pannello selezionato.':
    '/audio/iris/iris-hover-slider-desc.opus',
  "Lightbox — visualizzazione a schermo intero dell'immagine selezionata. Clicca fuori per chiudere.":
    '/audio/iris/iris-hover-slider-lightbox.opus',

  /* Text Sampler */
  "Lista effetti — seleziona un effetto tipografico per vederlo applicato all'anteprima. Sono tutti realizzati in CSS puro.":
    '/audio/iris/iris-hover-text-list.opus',
  'Anteprima live — mostra il testo con l\'effetto selezionato applicato in tempo reale.':
    '/audio/iris/iris-hover-text-preview.opus',

  /* Cubo 3D */
  'Viewport 3D — trascina per ruotare il cubo in tutte le direzioni. Zero librerie 3D: tutto in CSS puro.':
    '/audio/iris/iris-hover-cubo-viewport.opus',

  /* Image Checker */
  'Area immagine — muovi il cursore per esplorare i dettagli con la lente.':
    '/audio/iris/iris-hover-img-area.opus',
  "Attiva o disattiva la lente di ingrandimento — quando attiva segue il cursore sull'immagine.":
    '/audio/iris/iris-hover-img-toggle.opus',
  'Info lente — stato, zoom e dimensione della lente attiva.':
    '/audio/iris/iris-hover-img-info.opus',
};
const PAGE_VOICES = {
  '/':                                    '/audio/iris/iris-home.opus',
  '/storia':                              '/audio/iris/iris-storia.opus',
  '/services':                            '/audio/iris/iris-services.opus',
  '/services/consulenze':                 '/audio/iris/iris-consulenze.opus',
  '/services/sitiweb':                    '/audio/iris/iris-sitiweb.opus',
  '/services/presenza':                   '/audio/iris/iris-presenza.opus',
  '/services/multimedia':                 '/audio/iris/iris-multimedia.opus',
  '/portfolio':                           '/audio/iris/iris-portfolio.opus',
  '/portfolio/componenti':                '/audio/iris/iris-componenti.opus',
  '/portfolio/grafiche':                  '/audio/iris/iris-grafiche.opus',
  '/portfolio/sitiweb':                   '/audio/iris/iris-siti-web-portfolio.opus',
  '/portfolio/componenti/black-market':   '/audio/iris/iris-black-market.opus',
  '/portfolio/componenti/dashboard':      '/audio/iris/iris-dashboard.opus',
  '/portfolio/componenti/booking':        '/audio/iris/iris-booking.opus',
  '/portfolio/componenti/music-player':   '/audio/iris/iris-music-player.opus',
  '/portfolio/componenti/crud-simulator': '/audio/iris/iris-crud.opus',
  '/portfolio/componenti/slider':         '/audio/iris/iris-slider.opus',
  '/portfolio/componenti/text-sampler':   '/audio/iris/iris-text-sampler.opus',
  '/portfolio/componenti/cubo-3d':        '/audio/iris/iris-cubo-3d.opus',
  '/portfolio/componenti/image-checker':  '/audio/iris/iris-image-checker.opus',
  '/contatti':                            '/audio/iris/iris-contatti.opus',
  '/privacy-policy':                      '/audio/iris/iris-privacy.opus',
  '/cookie-policy':                       '/audio/iris/iris-cookie.opus',
  '/termini-e-condizioni':                '/audio/iris/iris-termini.opus',
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
  const playPromiseRef       = useRef(null);
  const greetingIdxRef       = useRef(0);
  const hoverTimerRef        = useRef(null);
  const greetingPlayingRef   = useRef(false);

  /* ── Audio helpers ── */
  const stopVoice = useCallback(() => {
    greetingPlayingRef.current = false;
    const audio = speechAudioRef.current;
    const promise = playPromiseRef.current;
    speechAudioRef.current = null;
    playPromiseRef.current = null;
    if (!audio) return;
    if (promise) {
      promise.then(() => { try { audio.pause(); } catch (_) {} }).catch(() => {});
    } else {
      try { audio.pause(); } catch (_) {}
    }
  }, []);

  const playVoice = useCallback((path) => {
    stopVoice();
    if (!path) return;
    const audio = new Audio(path);
    speechAudioRef.current = audio;
    const p = audio.play();
    playPromiseRef.current = p;
    if (p) p.catch(() => { if (playPromiseRef.current === p) playPromiseRef.current = null; });
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
      playPromiseRef.current = null;
      if (pagePath) playVoice(pagePath);
    };
    const p = audio.play();
    playPromiseRef.current = p;
    if (p) p.catch(() => {
      greetingPlayingRef.current = false;
      playPromiseRef.current = null;
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