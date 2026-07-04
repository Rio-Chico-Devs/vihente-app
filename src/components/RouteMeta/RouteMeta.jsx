import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * RouteMeta — SEO per SPA senza SSR, tutto via DOM API (CSP-safe).
 *
 * Un'unica tabella pathname -> { title, description } invece di un hook
 * sparso in 35 pagine: aggiorna document.title, la meta description, il
 * canonical (senza query string) e il meta robots. Inietta il JSON-LD
 * ProfessionalService sulla home come data-block (non eseguito, quindi
 * fuori dallo scope di script-src della CSP).
 */

const SITE = 'https://vihente.it';
const DEFAULT_TITLE = 'VIHENTE - Consulenze Digitali | Web Design & Development';
const DEFAULT_DESC =
  'Creo la tua presenza digitale da zero, o ti aiuto a migliorare quella che già hai. ' +
  'Consulenze digitali professionali per web design, sviluppo web e strategie digitali.';

const META = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESC },
  '/storia': {
    title: 'La Mia Storia — VIHENTE',
    description: 'Il percorso, gli studi e le competenze dietro VIHENTE: web development, grafica, social e content creation.',
  },
  '/services': {
    title: 'Servizi Digitali — VIHENTE',
    description: 'Consulenze digitali, siti web su misura, gestione social e contenuti multimediali. Scopri come posso aiutarti.',
  },
  '/services/consulenze': {
    title: 'Consulenza Digitale — VIHENTE',
    description: 'Strategia, analisi e supporto personalizzato per la tua presenza digitale. Discovery call gratuita, pacchetti da €350.',
  },
  '/services/sitiweb': {
    title: 'Siti Web e Web App — VIHENTE',
    description: 'Sviluppo siti web personalizzati in React o WordPress: landing page da €600, siti multipagina, web app custom.',
  },
  '/services/presenza': {
    title: 'Social Media e Presenza Online — VIHENTE',
    description: 'Gestione professionale dei tuoi canali social: setup, piano editoriale, contenuti e report. Pacchetti mensili da €350.',
  },
  '/services/multimedia': {
    title: 'Contenuti Multimediali — VIHENTE',
    description: 'Reel, grafiche, animazioni e video su misura per il tuo brand. Dal singolo contenuto alla campagna completa.',
  },
  '/portfolio': {
    title: 'Portfolio — VIHENTE',
    description: 'I miei lavori: componenti interattivi, grafiche, illustrazioni e siti web realizzati.',
  },
  '/portfolio/componenti': {
    title: 'Componenti UI Interattivi — Portfolio VIHENTE',
    description: 'Slider, dashboard, music player, shop simulato e altri componenti React realizzati da zero, senza librerie esterne.',
  },
  '/portfolio/grafiche': {
    title: 'Grafiche e Illustrazioni — Portfolio VIHENTE',
    description: 'Campioni di logo design, illustrazioni, packaging e visual identity realizzati per clienti e progetti personali.',
  },
  '/portfolio/sitiweb': {
    title: 'Siti Web Realizzati — Portfolio VIHENTE',
    description: 'Selezione di siti web progettati e sviluppati: design, performance e SEO curati in ogni dettaglio.',
  },
  '/portfolio/componenti/slider': { title: 'Slider CSS — Componenti VIHENTE' },
  '/portfolio/componenti/text-sampler': { title: 'Text Sampler — Componenti VIHENTE' },
  '/portfolio/componenti/cubo-3d': { title: 'Cubo 3D Interattivo — Componenti VIHENTE' },
  '/portfolio/componenti/music-player': { title: 'Music Player — Componenti VIHENTE' },
  '/portfolio/componenti/crud-simulator': { title: 'CRUD Simulator — Componenti VIHENTE' },
  '/portfolio/componenti/black-market': { title: 'Shop Game Simulato — Componenti VIHENTE' },
  '/portfolio/componenti/dashboard': { title: 'Dashboard Analytics — Componenti VIHENTE' },
  '/portfolio/componenti/image-checker': { title: 'Image Checker — Componenti VIHENTE' },
  '/portfolio/componenti/booking': { title: 'Sistema di Prenotazione — Componenti VIHENTE' },
  '/portfolio/componenti/backgrounds': { title: 'Backgrounds Animati — Componenti VIHENTE' },
  '/showroom': {
    title: 'Showroom — VIHENTE',
    description: 'Vetrine dimostrative per settori reali: barbiere, studio legale, e-commerce, immobiliare e altri. Guarda cosa posso costruire per te.',
  },
  '/showroom/psicologo': { title: 'Studio di Psicologia — Showroom VIHENTE (demo)' },
  '/showroom/avvocati': { title: 'Studio Legale — Showroom VIHENTE (demo)' },
  '/showroom/campagna': { title: 'Campagna Elettorale — Showroom VIHENTE (demo)' },
  '/showroom/ecommerce': { title: 'E-commerce Moda — Showroom VIHENTE (demo)' },
  '/showroom/salone': { title: 'Salone di Bellezza — Showroom VIHENTE (demo)' },
  '/showroom/fotografo': { title: 'Studio Fotografico — Showroom VIHENTE (demo)' },
  '/showroom/barbiere': { title: 'Barbiere — Showroom VIHENTE (demo)' },
  '/showroom/agenzia-viaggio': { title: 'Agenzia Viaggi — Showroom VIHENTE (demo)' },
  '/showroom/immobiliare': { title: 'Agenzia Immobiliare — Showroom VIHENTE (demo)' },
  '/contatti': {
    title: 'Contatti — VIHENTE',
    description: 'Scrivimi per informazioni, collaborazioni o per richiedere un preventivo personalizzato. Rispondo entro 24-48 ore.',
  },
  '/privacy-policy': { title: 'Privacy Policy — VIHENTE' },
  '/cookie-policy': { title: 'Cookie Policy — VIHENTE' },
  '/termini-e-condizioni': { title: 'Termini e Condizioni — VIHENTE' },
  '/impostazioni': { title: 'Impostazioni — VIHENTE', noindex: true },
};

/* Trova (o crea) un tag nel <head> e ne aggiorna un attributo. */
function upsertHeadTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return el;
}

/* JSON-LD ProfessionalService: data block (type non-JS), la CSP script-src
   non lo esegue ne' lo blocca; i crawler lo leggono dal DOM renderizzato. */
function ensureJsonLd() {
  if (document.getElementById('vihente-jsonld')) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'vihente-jsonld';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'VIHENTE',
    url: SITE,
    image: `${SITE}/og-image.png`,
    description: DEFAULT_DESC,
    email: 'vihenteweb@proton.me',
    areaServed: 'IT',
    knowsLanguage: 'it',
    serviceType: [
      'Consulenza digitale',
      'Sviluppo siti web',
      'Gestione social media',
      'Creazione contenuti multimediali',
    ],
  });
  document.head.appendChild(script);
}

const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const entry = META[pathname];

    document.title = entry?.title || DEFAULT_TITLE;

    upsertHeadTag(
      'meta[name="description"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      },
      'content',
      entry?.description || DEFAULT_DESC
    );

    // Canonical: sempre senza query string (evita URL duplicati indicizzati
    // tipo /contatti?mode=quote&service=...).
    upsertHeadTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      'href',
      `${SITE}${pathname === '/' ? '/' : pathname}`
    );

    // Robots: noindex per route sconosciute (404 soft) e per quelle marcate.
    upsertHeadTag(
      'meta[name="robots"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'robots');
        return m;
      },
      'content',
      !entry || entry.noindex ? 'noindex, follow' : 'index, follow'
    );

    if (pathname === '/') ensureJsonLd();
  }, [pathname]);

  return null;
};

export default RouteMeta;
