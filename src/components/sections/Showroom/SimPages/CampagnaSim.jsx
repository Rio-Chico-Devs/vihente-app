import { useState } from 'react';
import SimWrapper from './SimWrapper';
import './CampagnaSim.css';

const VALORI = [
  { titolo: 'Lavoro e Crescita', testo: 'Investimenti concreti per creare occupazione stabile e sostenere le PMI del territorio.' },
  { titolo: 'Sanità Pubblica', testo: 'Difesa e potenziamento del Servizio Sanitario Nazionale, accessibile a tutti i cittadini.' },
  { titolo: 'Ambiente e Futuro', testo: 'Transizione energetica, economia circolare e protezione delle risorse naturali comuni.' },
];

const EVENTI = [
  { data: '20 GIU', luogo: 'Piazza del Duomo, Milano', titolo: 'Comizio di apertura campagna' },
  { data: '25 GIU', luogo: 'Teatro Sociale, Como', titolo: 'Incontro con i cittadini' },
  { data: '02 LUG', luogo: 'Sala Comunale, Varese', titolo: 'Tavola rotonda sul lavoro' },
];

const IMPORTI = [10, 25, 50, 100];

const CampagnaSim = () => {
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState('');
  const [donated, setDonated] = useState(false);
  const [joined, setJoined] = useState(false);

  const finalAmount = custom !== '' ? Number(custom) : amount;

  const handleDonate = () => {
    setDonated(true);
    setTimeout(() => setDonated(false), 2500);
  };

  return (
    <SimWrapper templateId="campagna" templateTitle="Campagna Politica" accentColor="#C41E3A">
      <div className="cam-site">

        {/* ── NAV ── */}
        <nav className="cam-nav">
          <div className="cam-nav-logo">MARCO ROSSI</div>
          <div className="cam-nav-links">
            <a className="cam-nav-link">La Missione</a>
            <a className="cam-nav-link">Valori</a>
            <a className="cam-nav-link">Agenda</a>
            <a className="cam-nav-link">Donazioni</a>
          </div>
          <button
            className={`cam-nav-join${joined ? ' cam-nav-join--done' : ''}`}
            onClick={() => setJoined(j => !j)}
          >
            {joined ? 'Iscritto ✓' : 'Unisciti'}
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="cam-hero">
          <div className="cam-hero-photo">
            <div className="cam-candidate-silhouette">
              <svg viewBox="0 0 100 160" width="80" height="128">
                <circle cx="50" cy="42" r="24" fill="rgba(255,255,255,0.12)" />
                <path d="M5 160 Q5 90 50 90 Q95 90 95 160" fill="rgba(255,255,255,0.08)" />
              </svg>
            </div>
            <div className="cam-hero-accent" />
          </div>
          <div className="cam-hero-text">
            <p className="cam-eyebrow">CANDIDATO SINDACO · ELEZIONI COMUNALI 2026</p>
            <h1 className="cam-h1">Un futuro<br />per tutti.</h1>
            <p className="cam-hero-desc">
              Costruiamo insieme una città più giusta, più verde e più sicura.
              Il cambiamento parte da ognuno di noi.
            </p>
            <div className="cam-hero-btns">
              <button className="cam-btn-red" onClick={() => document.getElementById('cam-donazione')?.scrollIntoView({ behavior: 'smooth' })}>
                Sostienici ora
              </button>
              <button
                className={`cam-btn-outline${joined ? ' cam-btn-outline--done' : ''}`}
                onClick={() => setJoined(j => !j)}
              >
                {joined ? 'Iscritto ✓' : 'Unisciti al movimento'}
              </button>
            </div>
          </div>
        </section>

        {/* ── VALORI ── */}
        <section className="cam-valori">
          <div className="cam-valori-inner">
            <p className="cam-section-eyebrow">IL PROGRAMMA</p>
            <h2 className="cam-section-title">Tre priorità per la nostra città</h2>
            <div className="cam-valori-grid">
              {VALORI.map((v, i) => (
                <div key={v.titolo} className="cam-valore-card">
                  <div className="cam-valore-num">0{i + 1}</div>
                  <h3 className="cam-valore-titolo">{v.titolo}</h3>
                  <p className="cam-valore-testo">{v.testo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AGENDA ── */}
        <section className="cam-agenda">
          <div className="cam-agenda-inner">
            <p className="cam-section-eyebrow">AGENDA</p>
            <h2 className="cam-section-title">Prossimi appuntamenti</h2>
            <div className="cam-eventi">
              {EVENTI.map(ev => (
                <div key={ev.data} className="cam-evento">
                  <div className="cam-evento-data">{ev.data}</div>
                  <div className="cam-evento-info">
                    <div className="cam-evento-titolo">{ev.titolo}</div>
                    <div className="cam-evento-luogo">{ev.luogo}</div>
                  </div>
                  <button className="cam-evento-btn">Partecipa</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DONAZIONE ── */}
        <section className="cam-donazione" id="cam-donazione">
          <div className="cam-donazione-inner">
            <p className="cam-section-eyebrow" style={{ color: '#C41E3A' }}>SOSTIENI LA CAMPAGNA</p>
            <h2 className="cam-section-title" style={{ color: '#fff' }}>Ogni contributo conta.</h2>
            <p className="cam-donazione-desc">
              Le donazioni finanziano spazi pubblici, materiali e la presenza sul territorio.
              Massimo consentito per legge: € 500.
            </p>
            <div className="cam-amount-grid">
              {IMPORTI.map(imp => (
                <button
                  key={imp}
                  className={`cam-amount-btn${amount === imp && custom === '' ? ' cam-amount-btn--active' : ''}`}
                  onClick={() => { setAmount(imp); setCustom(''); }}
                >
                  € {imp}
                </button>
              ))}
            </div>
            <div className="cam-custom-row">
              <span className="cam-custom-label">Importo personalizzato: €</span>
              <input
                className="cam-custom-input"
                type="number"
                min="1"
                max="500"
                placeholder="es. 35"
                value={custom}
                onChange={e => { setCustom(e.target.value); }}
              />
            </div>
            <button
              className={`cam-donate-btn${donated ? ' cam-donate-btn--done' : ''}`}
              onClick={handleDonate}
            >
              {donated
                ? 'Grazie per il tuo supporto! ✓'
                : `Dona € ${finalAmount || '—'} ora →`}
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="cam-footer">
          <div className="cam-footer-logo">MARCO ROSSI</div>
          <p className="cam-footer-sub">Comitato elettorale — Via della Repubblica 5, Milano</p>
          <p className="cam-footer-legal">
            Le donazioni sono regolate dalla L. 195/1974 e successive modifiche.
          </p>
        </footer>

      </div>
    </SimWrapper>
  );
};

export default CampagnaSim;
