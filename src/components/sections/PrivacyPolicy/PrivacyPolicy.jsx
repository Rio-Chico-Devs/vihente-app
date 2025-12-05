import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-intro">
          Ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 (Codice Privacy italiano),
          ti informiamo su come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.
        </p>

        <section className="privacy-section">
          <h2>1. Titolare del Trattamento</h2>
          <p>
            Il Titolare del trattamento dei dati personali è:
          </p>
          <div className="info-box">
            <p><strong>Antonio Vihente</strong></p>
            <p>Email: <a href="mailto:[TUA-EMAIL]">[TUA-EMAIL]</a></p>
            <p>Sito web: vihente.dev</p>
          </div>
          <p className="note">
            <em>Nota: Al momento non dispongo di Partita IVA. Questo è un portfolio personale.</em>
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Dati Personali Raccolti</h2>
          <p>Raccogliamo le seguenti categorie di dati personali:</p>
          <ul>
            <li><strong>Dati di contatto:</strong> nome, cognome, indirizzo email forniti volontariamente tramite il form di contatto</li>
            <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate (log del server GitHub Pages)</li>
            <li><strong>Cookie tecnici:</strong> preferenze cookie banner (salvate in localStorage)</li>
          </ul>
          <p className="highlight">
            Non raccogliamo dati sensibili (art. 9 GDPR) né dati relativi a condanne penali (art. 10 GDPR).
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Finalità del Trattamento e Base Giuridica</h2>
          <table className="privacy-table">
            <thead>
              <tr>
                <th>Finalità</th>
                <th>Base Giuridica (GDPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rispondere alle richieste di contatto</td>
                <td>Art. 6(1)(b) - Esecuzione di misure precontrattuali<br/>Art. 6(1)(f) - Legittimo interesse</td>
              </tr>
              <tr>
                <td>Garantire la sicurezza e funzionalità del sito</td>
                <td>Art. 6(1)(f) - Legittimo interesse</td>
              </tr>
              <tr>
                <td>Salvare preferenze cookie</td>
                <td>Art. 6(1)(f) - Legittimo interesse (cookie tecnici)</td>
              </tr>
              <tr>
                <td>Analytics (se abilitati dall'utente)</td>
                <td>Art. 6(1)(a) - Consenso esplicito</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="privacy-section">
          <h2>4. Modalità del Trattamento</h2>
          <p>I tuoi dati personali sono trattati con strumenti automatizzati per il tempo strettamente necessario
          a conseguire gli scopi per cui sono stati raccolti.</p>
          <p>Adottiamo le seguenti misure di sicurezza:</p>
          <ul>
            <li>Cifratura HTTPS per tutte le comunicazioni</li>
            <li>Self-hosting dei font per evitare tracking di terze parti (Google Fonts)</li>
            <li>Cookie banner GDPR-compliant per raccogliere consenso</li>
            <li>Minimizzazione dei dati raccolti</li>
            <li>Accesso ai dati limitato al solo titolare</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Periodo di Conservazione</h2>
          <ul>
            <li><strong>Richieste di contatto:</strong> 2 anni dalla ricezione (termine prescrizionale contrattuale)</li>
            <li><strong>Log del server:</strong> gestiti da GitHub Pages secondo la loro policy (max 90 giorni)</li>
            <li><strong>Cookie tecnici:</strong> 12 mesi o fino alla cancellazione manuale</li>
          </ul>
          <p>Trascorsi tali termini, i dati saranno cancellati o anonimizzati in modo irreversibile.</p>
        </section>

        <section className="privacy-section">
          <h2>6. Destinatari dei Dati e Trasferimenti Extra-UE</h2>
          <p>I tuoi dati personali possono essere comunicati ai seguenti soggetti terzi (Responsabili del Trattamento ai sensi dell'Art. 28 GDPR):</p>

          <div className="info-box">
            <h3>GitHub Pages (Microsoft Corporation)</h3>
            <p><strong>Finalità:</strong> Hosting del sito web e gestione infrastruttura</p>
            <p><strong>Ubicazione server:</strong> USA (trasferimento extra-UE)</p>
            <p><strong>Dati trasferiti:</strong> Indirizzo IP, dati di navigazione (log del server), cookies tecnici</p>
            <p><strong>Periodo conservazione:</strong> Massimo 90 giorni (gestito da GitHub)</p>
            <p><strong>Base giuridica trasferimento:</strong></p>
            <ul>
              <li>Clausole Contrattuali Standard (SCC) approvate dalla Commissione Europea (Decisione 2021/914)</li>
              <li>EU-U.S. Data Privacy Framework (DPF) - Microsoft è certificata</li>
              <li>Misure tecniche supplementari: Cifratura TLS 1.3, accesso limitato ai dati</li>
            </ul>
            <p>
              <strong>Privacy Policy:</strong>{' '}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">
                GitHub Privacy Statement
              </a>
            </p>
            <p>
              <strong>DPF Certification:</strong>{' '}
              <a href="https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000KzNaAAK&status=Active" target="_blank" rel="noopener noreferrer">
                Microsoft DPF Status
              </a>
            </p>
          </div>

          <div className="info-box">
            <h3>EmailJS (se implementato)</h3>
            <p><strong>Finalità:</strong> Invio email dal form di contatto</p>
            <p><strong>Ubicazione server:</strong> UE (conformità GDPR)</p>
            <p><strong>Dati trasferiti:</strong> Nome, email, messaggio inviato tramite form</p>
            <p><strong>Periodo conservazione:</strong> Immediata cancellazione dopo invio (EmailJS funge da relay)</p>
            <p>
              <strong>Privacy Policy:</strong>{' '}
              <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                EmailJS Privacy Policy
              </a>
            </p>
          </div>

          <div className="highlight">
            <h3>Garanzie per i Trasferimenti Extra-UE (Art. 46 GDPR):</h3>
            <ul>
              <li><strong>Clausole Contrattuali Standard (SCC):</strong> Accordi vincolanti approvati dalla Commissione UE</li>
              <li><strong>EU-U.S. Data Privacy Framework:</strong> Certificazione che garantisce standard di protezione equivalenti al GDPR</li>
              <li><strong>Misure supplementari (Schrems II):</strong> Cifratura end-to-end, minimizzazione dati, audit periodici</li>
              <li><strong>Diritto di copia SCC:</strong> Puoi richiedere copia delle clausole contrattuali via email</li>
            </ul>
          </div>

          <p className="highlight">
            <strong>Importante:</strong> Non vendiamo, affittiamo né cediamo i tuoi dati a terzi per scopi commerciali, pubblicitari o di marketing.
            I tuoi dati sono trattati esclusivamente per le finalità dichiarate in questa Privacy Policy.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Diritti degli Interessati (Artt. 15-22 GDPR)</h2>
          <p>In qualità di interessato, hai i seguenti diritti:</p>
          <div className="rights-grid">
            <div className="right-card">
              <h3>Diritto di Accesso (Art. 15)</h3>
              <p>Ottenere conferma dell'esistenza dei tuoi dati e riceverne copia</p>
            </div>
            <div className="right-card">
              <h3>Diritto di Rettifica (Art. 16)</h3>
              <p>Correggere dati inesatti o incompleti</p>
            </div>
            <div className="right-card">
              <h3>Diritto di Cancellazione (Art. 17)</h3>
              <p>Ottenere la cancellazione dei dati ("diritto all'oblio")</p>
            </div>
            <div className="right-card">
              <h3>Diritto di Limitazione (Art. 18)</h3>
              <p>Limitare il trattamento in determinate circostanze</p>
            </div>
            <div className="right-card">
              <h3>Diritto di Portabilità (Art. 20)</h3>
              <p>Ricevere i dati in formato strutturato e interoperabile</p>
            </div>
            <div className="right-card">
              <h3>Diritto di Opposizione (Art. 21)</h3>
              <p>Opporti al trattamento per motivi legittimi</p>
            </div>
          </div>
          <p>
            Per esercitare questi diritti, contattaci via email: <a href="mailto:[TUA-EMAIL]">[TUA-EMAIL]</a>
          </p>
          <p>
            Risponderemo alla tua richiesta entro 30 giorni (prorogabili di ulteriori 60 giorni in caso di complessità,
            con comunicazione motivata).
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Diritto di Reclamo</h2>
          <p>
            Hai il diritto di proporre reclamo all'Autorità di controllo competente se ritieni che il trattamento
            dei tuoi dati violi il GDPR.
          </p>
          <div className="info-box">
            <p><strong>Garante per la Protezione dei Dati Personali (Italia)</strong></p>
            <p>Piazza di Monte Citorio n. 121, 00186 Roma</p>
            <p>Tel: +39 06.696771</p>
            <p>Email: <a href="mailto:garante@gpdp.it">garante@gpdp.it</a></p>
            <p>PEC: <a href="mailto:protocollo@pec.gpdp.it">protocollo@pec.gpdp.it</a></p>
            <p>Sito: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a></p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>9. Risoluzione Controversie Online (ODR)</h2>
          <p>
            Se hai acquistato servizi online e hai una controversia relativa al trattamento dei tuoi dati personali
            o all'esecuzione del contratto, puoi utilizzare la piattaforma ODR (Online Dispute Resolution) della
            Commissione Europea per risolvere la questione in modo extragiudiziale.
          </p>
          <div className="info-box" style={{ background: 'linear-gradient(135deg, var(--color-primary-10) 0%, var(--color-secondary-10) 100%)', border: '2px solid var(--color-primary)', boxShadow: '0 0 20px var(--color-primary-20)' }}>
            <p><strong>Piattaforma ODR (Online Dispute Resolution)</strong></p>
            <p>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-secondary)', wordBreak: 'break-all' }}
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>Email per contatti ODR: <a href="mailto:[TUA-EMAIL]">[TUA-EMAIL]</a></p>
          </div>
          <p>
            La piattaforma ODR facilita la risoluzione extragiudiziale delle controversie tra consumatori e
            professionisti nell'UE, evitando il ricorso al tribunale.
          </p>
          <p className="highlight">
            Conformità al Regolamento UE 524/2013 sulle controversie online.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Modifiche alla Privacy Policy</h2>
          <p>
            Questa Privacy Policy può essere aggiornata periodicamente. La versione più recente sarà sempre
            disponibile su questa pagina.
          </p>
          <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </section>

        <section className="privacy-section">
          <h2>11. Cookie e Tecnologie di Tracciamento</h2>
          <p>
            Per informazioni dettagliate sull'uso dei cookie, consulta la nostra{' '}
            <a href="/cookie-policy" className="internal-link">Cookie Policy</a>.
          </p>
        </section>

        <div className="privacy-footer">
          <p>
            Per qualsiasi domanda relativa al trattamento dei tuoi dati personali, contattaci via email:{' '}
            <a href="mailto:[TUA-EMAIL]">[TUA-EMAIL]</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
