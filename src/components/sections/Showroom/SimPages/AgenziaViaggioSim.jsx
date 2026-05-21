import { useState, useRef } from 'react';
import SimWrapper from './SimWrapper';
import './AgenziaViaggioSim.css';

const DESTINATIONS = [
  {
    id: 'giappone', name: 'GIAPPONE', native: '日本',
    tagline: 'Cerimonie silenziose e neon accecanti.',
    flagPrimary: '#BC002D', flagSecondary: '#FFFFFF',
    nights: '10 – 16 notti', price: '€ 2.800+',
    currencyCode: 'JPY', rate: 163.4,
    bestSeason: 'Marzo – Maggio / Ottobre – Nov.',
    intro: "Un paese di contraddizioni perfette: dove il silenzio dei templi Zen incontra l'energia dei quartieri neon di Tokyo. Il Giappone non si visita — si abita per un momento.",
    moments: ['Cerimonia del tè, Kyoto', 'Mercati notturni di Osaka', 'Tempio Fushimi Inari', "Shibuya all'alba"],
  },
  {
    id: 'marocco', name: 'MAROCCO', native: 'المغرب',
    tagline: 'Spezie, mosaici e cieli senza confine.',
    flagPrimary: '#C1272D', flagSecondary: '#006233',
    nights: '7 – 12 notti', price: '€ 1.400+',
    currencyCode: 'MAD', rate: 10.87,
    bestSeason: 'Ott. – Apr.',
    intro: 'Medine millenarie, dune senza fine e riads nascosti nei vicoli di Marrakech. Il Marocco è un paese che si impara lentamente, un vicolo alla volta.',
    moments: ['Mercato Djemaa el-Fna', 'Dune del Sahara, Merzouga', 'Cascate di Ouzoud', 'Bagni hammam tradizionali'],
  },
  {
    id: 'islanda', name: 'ISLANDA', native: 'Ísland',
    tagline: 'Aurora boreale e paesaggi da un altro pianeta.',
    flagPrimary: '#003897', flagSecondary: '#D72828',
    nights: '7 – 10 notti', price: '€ 2.200+',
    currencyCode: 'ISK', rate: 147.2,
    bestSeason: 'Nov. – Feb. (aurora) / Giu. – Ago. (midnight sun)',
    intro: "L'Islanda non è un paese, è un fenomeno geologico. Geyser, ghiacciai, aurora boreale e cascate che sembrano uscire da un racconto antico.",
    moments: ['Aurora boreale, Þingvellir', 'Cascata Skógafoss', 'Bagni geotermali Blue Lagoon', 'Ring Road in camper'],
  },
  {
    id: 'peru', name: 'PERÙ', native: 'Perú',
    tagline: 'Civiltà perdute e cucina che cambia il mondo.',
    flagPrimary: '#D91023', flagSecondary: '#D91023',
    nights: '12 – 18 notti', price: '€ 2.600+',
    currencyCode: 'PEN', rate: 4.08,
    bestSeason: 'Mag. – Ott.',
    intro: "Machu Picchu è l'inizio, non la fine. Il Perù è Lake Titicaca, Lima gastronomica, i canyon del Colca e i mercati di Cusco dove il tempo si è fermato.",
    moments: ["Machu Picchu all'alba", 'Mercato di Pisac', 'Crociera Lake Titicaca', 'Lima — cena da Central'],
  },
  {
    id: 'portogallo', name: 'PORTOGALLO', native: 'Portugal',
    tagline: 'Fado, azulejos e oceano Atlantico.',
    flagPrimary: '#006600', flagSecondary: '#FF2400',
    nights: '7 – 10 notti', price: '€ 1.100+',
    currencyCode: 'EUR', rate: 1,
    bestSeason: 'Apr. – Ott.',
    intro: 'Lisbona ha i quartieri dove il tempo scivola lento, il Douro ha i vigneti che producono il Porto migliore del mondo. Il Portogallo è piccolo e non finisce mai.',
    moments: ['Tramonto a Miradouro da Graça', 'Degustazione vini, Valle del Douro', 'Sintra — Palácio da Pena', 'Surf ad Ericeira'],
  },
  {
    id: 'maldive', name: 'MALDIVE', native: 'ދިވެހި',
    tagline: 'Acqua cristallina e notti sotto le stelle.',
    flagPrimary: '#007E3A', flagSecondary: '#D21034',
    nights: '7 – 14 notti', price: '€ 3.200+',
    currencyCode: 'MVR', rate: 16.8,
    bestSeason: 'Nov. – Apr.',
    intro: "Le Maldive non sono tutte uguali. Oltre i resort di lusso, ci sono atolli remoti, villaggi di pescatori, barriere coralline incontaminate. Ti mostriamo quelle.",
    moments: ['Snorkeling con i mante', 'Cena sulla spiaggia privata', 'Bioluminescenza notturna', "Escursione all'atollo di Baa"],
  },
];

const PACKAGES = [
  {
    label: 'CULTURA',
    title: 'Il Giappone dei contrasti',
    nights: '14 notti', price: '€ 3.200 / persona',
    hint: 'Giappone — Tokyo / Kyoto / Osaka',
    desc: "Da Tokyo caotica e luminosa ai templi silenziosi di Kyoto, passando per i mercati notturni di Osaka. Un itinerario costruito su misura per chi vuole capire il Giappone, non solo fotografarlo.",
  },
  {
    label: 'CULTURA · DESERTO',
    title: 'Marocco autentico',
    nights: '10 notti', price: '€ 1.680 / persona',
    hint: 'Marocco — Marrakech / Sahara / Fez',
    desc: "Marrakech, le dune di Merzouga, la medina di Fez. Un viaggio nell'entroterra marocchino, lontano dai resort e vicino alle persone. Riads selezionati, guide locali.",
  },
  {
    label: 'AVVENTURA',
    title: 'Ring Road, Islanda',
    nights: '8 notti', price: '€ 2.450 / persona',
    hint: 'Islanda — Ring Road in camper',
    desc: "L'intero perimetro dell'isola percorso in camper, con soste agli indirizzi giusti. Cascate, geyser, aurora boreale e il silenzio assoluto delle highland.",
  },
];

const FILTERS = ['TUTTE', 'MARE', 'MONTAGNA', 'CULTURA', 'AVVENTURA'];

const AgenziaViaggioSim = () => {
  const [activeId, setActiveId] = useState('giappone');
  const [activeFilter, setActiveFilter] = useState('TUTTE');
  const [eurValue, setEurValue] = useState(1000);
  const storyRef = useRef(null);

  const dest = DESTINATIONS.find(d => d.id === activeId);
  const currencyResult = Math.round(eurValue * dest.rate).toLocaleString('it-IT');

  const selectDest = (id) => {
    setActiveId(id);
    setTimeout(() => storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <SimWrapper templateId="agenzia-viaggio" templateTitle="Agenzia Viaggio" accentColor="#C8A96E">
      <div className="alt-site">

        {/* ── NAV ── */}
        <nav className="alt-nav">
          <div className="alt-nav-left">
            <a className="alt-nav-link">Destinazioni</a>
            <a className="alt-nav-link">Pacchetti</a>
            <a className="alt-nav-link">Chi Siamo</a>
          </div>
          <div className="alt-nav-center">ALTROVE</div>
          <div className="alt-nav-right">
            <a className="alt-nav-link">Consulenza</a>
            <a className="alt-nav-pill">CERCA →</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="alt-hero">
          <div className="alt-hero-left">
            <div className="alt-hero-eyebrow">
              <span className="alt-label">ALTROVE TRAVEL STUDIO · EST. 2018</span>
            </div>
            <div className="alt-hero-headline">
              <h1 className="alt-hero-h1-normal">Il tuo prossimo</h1>
              <h1 className="alt-hero-h1-italic">altrove.</h1>
              <div className="alt-hero-rule" />
              <p className="alt-hero-subtext">Ogni viaggio inizia con una domanda. La nostra è: cosa stai cercando davvero?</p>
            </div>
            <div className="alt-hero-bottom">
              <a href="#destinazioni" className="alt-hero-scroll-label">SCOPRI LE DESTINAZIONI ↓</a>
            </div>
          </div>
          <div className="alt-hero-right">
            <span className="alt-label">DOVE VUOI ANDARE?</span>
            <div className="alt-hero-selectors">
              <div className="alt-selector-wrap">
                <select className="alt-selector">
                  <option>Tipo di viaggio</option>
                  <option>Mare</option>
                  <option>Montagna</option>
                  <option>Città</option>
                  <option>Avventura</option>
                </select>
              </div>
              <div className="alt-selector-wrap">
                <select className="alt-selector">
                  <option>Quando partiresti</option>
                  <option>Entro 1 mese</option>
                  <option>Tra 1–3 mesi</option>
                  <option>Tra 3–6 mesi</option>
                  <option>Tra 6–12 mesi</option>
                </select>
              </div>
              <div className="alt-selector-wrap">
                <select className="alt-selector">
                  <option>Con chi</option>
                  <option>Solo</option>
                  <option>Coppia</option>
                  <option>Famiglia</option>
                  <option>Gruppo</option>
                </select>
              </div>
            </div>
            <button className="alt-hero-cta">COSTRUISCI IL TUO VIAGGIO →</button>
          </div>
        </section>

        {/* ── DESTINATION STRIP ── */}
        <div id="destinazioni" className="alt-dest-strip">
          <span className="alt-label">DESTINAZIONI CURATE</span>
          <div className="alt-dest-filters">
            {FILTERS.map(f => (
              <span
                key={f}
                className={`alt-filter-tab${activeFilter === f ? ' alt-filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</span>
            ))}
          </div>
          <span className="alt-label">06 destinazioni</span>
        </div>

        {/* ── DESTINATION GRID ── */}
        <div className="alt-dest-grid">
          {DESTINATIONS.map(d => (
            <div
              key={d.id}
              className={`alt-dest-card${activeId === d.id ? ' alt-dest-card--active' : ''}`}
              style={{ background: d.flagPrimary, '--card-accent': d.flagSecondary }}
              onClick={() => selectDest(d.id)}
            >
              <span className="alt-card-native">{d.native}</span>
              <div className="alt-card-bottom">
                <div>
                  <div className="alt-card-name">{d.name}</div>
                  <div className="alt-card-tagline">{d.tagline}</div>
                </div>
                <div className="alt-card-meta">
                  <span className="alt-card-price">{d.price}</span>
                  <span className="alt-card-nights">{d.nights}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── COUNTRY STORY ── */}
        <section
          className="alt-country-story"
          ref={storyRef}
          style={{ borderTopColor: dest.flagPrimary }}
        >
          <div className="alt-story-inner">
            <div className="alt-story-left">
              <div className="alt-story-watermark">{dest.native}</div>
              <div className="alt-story-content">
                <div className="alt-story-eyebrow">
                  <span className="alt-label-gold">SCOPRI LA DESTINAZIONE</span>
                </div>
                <h2 className="alt-story-country-name">{dest.name}</h2>
                <p className="alt-story-intro">{dest.intro}</p>
                <div className="alt-story-season-pill">
                  <span>⟡ MIGLIORE STAGIONE:</span>
                  <span>{dest.bestSeason}</span>
                </div>
                <div className="alt-story-moments-label">
                  <span className="alt-label">I MOMENTI DA NON PERDERE</span>
                </div>
                <ul className="alt-story-moments">
                  {dest.moments.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
            <div className="alt-story-right">
              <div className="alt-story-photo-grid">
                {dest.moments.map((m, i) => (
                  <div key={i} className="alt-photo-slot sim-photo-slot">
                    <span className="sim-photo-hint">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="alt-story-bottom-strip">
            <div className="alt-currency-widget">
              <span className="alt-label">CAMBIO VALUTA · STIMA DI VIAGGIO</span>
              <div className="alt-currency-row">
                <div className="alt-currency-from">
                  <span className="alt-currency-code">EUR</span>
                  <div className="alt-currency-input-wrap">
                    <input
                      type="number"
                      value={eurValue}
                      min="0"
                      onChange={e => setEurValue(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <span className="alt-currency-arrow">→</span>
                <div className="alt-currency-to">
                  <span className="alt-currency-code">{dest.currencyCode}</span>
                  <span className="alt-currency-result" style={{ color: dest.flagPrimary }}>{currencyResult}</span>
                </div>
              </div>
              <span className="alt-rate-text">
                1 EUR = {dest.rate.toLocaleString('it-IT')} {dest.currencyCode} · tasso indicativo
              </span>
            </div>
            <button className="alt-story-cta-btn">
              Vedi i pacchetti per {dest.name} →
            </button>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="alt-packages-section">
          <div className="alt-packages-header">
            <span className="alt-label">I NOSTRI PACCHETTI</span>
            <h2 className="alt-packages-h2">Viaggi costruiti.<br />Non assemblati.</h2>
          </div>
          {PACKAGES.map((pkg, i) => (
            <div key={i} className="alt-package-strip">
              <div className="alt-package-photo sim-photo-slot">
                <span className="sim-photo-hint">{pkg.hint}</span>
              </div>
              <div className="alt-package-text">
                <span className="alt-label">{pkg.label}</span>
                <h3 className="alt-package-title">{pkg.title}</h3>
                <div className="alt-package-meta">
                  <span className="alt-package-pill">{pkg.nights}</span>
                  <span className="alt-package-pill">{pkg.price}</span>
                </div>
                <p className="alt-package-desc">{pkg.desc}</p>
                <a className="alt-package-link">SCOPRI IL PACCHETTO →</a>
              </div>
            </div>
          ))}
        </section>

        {/* ── PERCHÉ ALTROVE ── */}
        <section className="alt-why-section">
          <div className="alt-why-header">
            <span className="alt-label-gold">PERCHÉ ALTROVE</span>
          </div>
          <div className="alt-why-grid">
            <div className="alt-why-col">
              <h3 className="alt-why-title">Nessun catalogo.</h3>
              <p className="alt-why-text">Costruiamo ogni viaggio da zero. Non esistono due viaggi Altrove identici.</p>
            </div>
            <div className="alt-why-col">
              <h3 className="alt-why-title">Il paese prima del pacchetto.</h3>
              <p className="alt-why-text">Ti mostriamo la cultura, il clima, la cucina. Poi ti proponiamo cosa fare.</p>
            </div>
            <div className="alt-why-col">
              <h3 className="alt-why-title">Siamo lì anche dopo.</h3>
              <p className="alt-why-text">Dalla prenotazione all'atterraggio, hai un numero diretto. Senza call center.</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="alt-footer">
          <div className="alt-footer-brand">ALTROVE</div>
          <div className="alt-footer-copy">© 2026 Altrove Travel Studio · Milano</div>
          <div className="alt-footer-links">
            <a className="alt-footer-link">Instagram</a>
            <a className="alt-footer-link">LinkedIn</a>
            <a className="alt-footer-link">info@altrove.it</a>
          </div>
        </footer>

      </div>
    </SimWrapper>
  );
};

export default AgenziaViaggioSim;
