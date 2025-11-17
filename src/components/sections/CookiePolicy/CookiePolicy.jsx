import React from 'react';
import './CookiePolicy.css';

const CookiePolicy = () => {
  return (
    <div className="cookie-policy-container">
      <div className="cookie-policy-content">
        <h1 className="cookie-title">Cookie Policy</h1>
        <p className="cookie-intro">
          Questa Cookie Policy spiega cosa sono i cookie, come li utilizziamo su questo sito e come puoi gestirli,
          in conformità con il Provvedimento del Garante Privacy del 10 giugno 2021 e la Direttiva ePrivacy (2002/58/CE).
        </p>

        <section className="cookie-section">
          <h2>1. Cosa sono i Cookie</h2>
          <p>
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, smartphone, tablet)
            quando visiti un sito web. Permettono al sito di ricordare le tue azioni e preferenze per un certo periodo di tempo.
          </p>
          <div className="info-box">
            <p><strong>Dimensione massima:</strong> 4 KB per cookie</p>
            <p><strong>Durata:</strong> variabile (da sessione a permanente)</p>
            <p><strong>Tipo di dati:</strong> testo semplice (non eseguibile)</p>
          </div>
        </section>

        <section className="cookie-section">
          <h2>2. Tipologie di Cookie Utilizzati</h2>

          <div className="cookie-type">
            <h3>2.1 Cookie Tecnici Necessari</h3>
            <p className="essential-badge">SEMPRE ATTIVI - Non richiedono consenso (Art. 122 Codice Privacy)</p>
            <p>
              Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati.
              Senza questi cookie, alcune funzionalità del sito non funzionerebbero correttamente.
            </p>
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Nome Cookie</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cc_cookie</code></td>
                  <td>Memorizza le preferenze dell'utente rispetto ai cookie</td>
                  <td>12 mesi</td>
                  <td>localStorage</td>
                </tr>
                <tr>
                  <td><code>session_id</code></td>
                  <td>Gestione della sessione utente</td>
                  <td>Sessione</td>
                  <td>Tecnico</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cookie-type">
            <h3>2.2 Cookie Analytics (Opzionali)</h3>
            <p className="optional-badge">RICHIEDONO CONSENSO</p>
            <p>
              Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo
              informazioni in forma anonima e aggregata.
            </p>
            <p className="status-info">
              <strong>Stato attuale:</strong> Non attivi. Se in futuro implementeremo servizi di analytics,
              richiederemo il tuo consenso esplicito tramite il cookie banner.
            </p>
          </div>

          <div className="cookie-type">
            <h3>2.3 Cookie di Profilazione e Marketing</h3>
            <p className="status-info">
              <strong>Stato attuale:</strong> Non utilizzati. Questo sito NON utilizza cookie di profilazione
              o marketing per pubblicità personalizzata.
            </p>
          </div>
        </section>

        <section className="cookie-section">
          <h2>3. Cookie di Terze Parti</h2>
          <p>
            Alcune funzionalità del sito utilizzano servizi esterni che potrebbero installare cookie.
            Questi servizi sono gestiti da terze parti indipendenti.
          </p>

          <div className="third-party-service">
            <h3>GitHub Pages (Microsoft)</h3>
            <p><strong>Finalità:</strong> Hosting del sito web</p>
            <p><strong>Ubicazione server:</strong> USA (trasferimento extra-UE)</p>
            <p><strong>Privacy Policy:</strong> <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a></p>
            <p><strong>Cookie utilizzati:</strong> Log tecnici per sicurezza e funzionalità (max 90 giorni)</p>
          </div>

          <div className="third-party-service">
            <h3>EmailJS (se implementato)</h3>
            <p><strong>Finalità:</strong> Invio email dal form di contatto</p>
            <p><strong>Privacy Policy:</strong> <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">EmailJS Privacy Policy</a></p>
            <p><strong>Tipo:</strong> Processore dati (Data Processor)</p>
          </div>

          <div className="highlight-box">
            <h4>Font Self-Hosted - Nessun Tracking</h4>
            <p>
              Questo sito utilizza font self-hosted (Orbitron, Share Tech Mono, Electrolize) tramite <code>@fontsource</code>.
              <strong> Non vengono contattati server di Google Fonts</strong>, quindi non c'è alcun tracking esterno legato ai font.
            </p>
          </div>
        </section>

        <section className="cookie-section">
          <h2>4. Base Giuridica (GDPR)</h2>
          <table className="legal-table">
            <thead>
              <tr>
                <th>Tipo Cookie</th>
                <th>Base Giuridica</th>
                <th>Riferimento GDPR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cookie Tecnici Necessari</td>
                <td>Legittimo interesse del titolare</td>
                <td>Art. 6(1)(f) GDPR + Art. 122 Codice Privacy</td>
              </tr>
              <tr>
                <td>Cookie Analytics</td>
                <td>Consenso esplicito dell'utente</td>
                <td>Art. 6(1)(a) GDPR + Art. 122 Codice Privacy</td>
              </tr>
              <tr>
                <td>Cookie Marketing</td>
                <td>Consenso esplicito dell'utente</td>
                <td>Art. 6(1)(a) GDPR + Art. 122 Codice Privacy</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="cookie-section">
          <h2>5. Come Gestire i Cookie</h2>

          <div className="management-option">
            <h3>5.1 Tramite Cookie Banner</h3>
            <p>
              Alla prima visita del sito, appare un banner che ti permette di:
            </p>
            <ul>
              <li>Accettare tutti i cookie</li>
              <li>Rifiutare i cookie non necessari</li>
              <li>Gestire le preferenze in dettaglio (categorie specifiche)</li>
            </ul>
            <p>
              Puoi modificare le tue preferenze in qualsiasi momento cliccando sul link
              "Gestisci Cookie" presente nel footer del sito.
            </p>
          </div>

          <div className="management-option">
            <h3>5.2 Tramite Impostazioni del Browser</h3>
            <p>
              Puoi bloccare o cancellare i cookie direttamente dalle impostazioni del tuo browser.
              Ecco le istruzioni per i browser più comuni:
            </p>

            <div className="browser-grid">
              <div className="browser-card">
                <h4>Google Chrome</h4>
                <p>Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</p>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Guida completa</a>
              </div>
              <div className="browser-card">
                <h4>Mozilla Firefox</h4>
                <p>Opzioni → Privacy e sicurezza → Cookie e dati dei siti web</p>
                <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Guida completa</a>
              </div>
              <div className="browser-card">
                <h4>Safari (macOS/iOS)</h4>
                <p>Preferenze → Privacy → Gestisci dati siti web</p>
                <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Guida completa</a>
              </div>
              <div className="browser-card">
                <h4>Microsoft Edge</h4>
                <p>Impostazioni → Cookie e autorizzazioni sito → Gestisci ed elimina cookie</p>
                <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Guida completa</a>
              </div>
            </div>

            <p className="warning-note">
              <strong>Attenzione:</strong> Disabilitare i cookie tecnici necessari potrebbe compromettere
              il corretto funzionamento del sito e alcune funzionalità potrebbero non essere disponibili.
            </p>
          </div>

          <div className="management-option">
            <h3>5.3 Strumenti di Terze Parti</h3>
            <p>Puoi anche utilizzare strumenti esterni per gestire i cookie:</p>
            <ul>
              <li><a href="https://www.youronlinechoices.com/it/" target="_blank" rel="noopener noreferrer">Your Online Choices</a> - Gestione cookie pubblicitari</li>
              <li><a href="https://tools.google.com/dlpage/gaoptout?hl=it" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a> - Disattiva Google Analytics</li>
              <li>Estensioni browser come Privacy Badger, uBlock Origin, Ghostery</li>
            </ul>
          </div>
        </section>

        <section className="cookie-section">
          <h2>6. Cookie e localStorage</h2>
          <p>
            Oltre ai cookie tradizionali, questo sito utilizza <strong>localStorage</strong> per memorizzare
            le preferenze del cookie banner. Il localStorage è simile ai cookie ma:
          </p>
          <ul>
            <li>Non ha scadenza automatica (rimane fino alla cancellazione manuale)</li>
            <li>Può contenere più dati (fino a 5-10 MB)</li>
            <li>Non viene inviato automaticamente al server con ogni richiesta</li>
            <li>È accessibile solo via JavaScript lato client</li>
          </ul>
          <p>
            Puoi cancellare il localStorage manualmente tramite gli strumenti sviluppatore del browser
            (F12 → Application/Storage → Local Storage).
          </p>
        </section>

        <section className="cookie-section">
          <h2>7. Modifiche alla Cookie Policy</h2>
          <p>
            Questa Cookie Policy può essere aggiornata periodicamente per riflettere cambiamenti nelle
            pratiche di utilizzo dei cookie o nelle normative applicabili.
          </p>
          <p>
            Ti consigliamo di consultare regolarmente questa pagina per rimanere informato sulle nostre
            pratiche relative ai cookie.
          </p>
          <p><strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </section>

        <section className="cookie-section">
          <h2>8. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa a questa Cookie Policy o alle nostre pratiche sui cookie,
            puoi contattarci:
          </p>
          <div className="info-box">
            <p><strong>Titolare del Trattamento:</strong> Antonio Vihente</p>
            <p><strong>Email:</strong> <a href="mailto:[TUA-EMAIL]">[TUA-EMAIL]</a></p>
            <p><strong>Sito web:</strong> vihente.dev</p>
          </div>
          <p>
            Per informazioni più dettagliate sul trattamento dei dati personali, consulta la nostra{' '}
            <a href="/privacy-policy" className="internal-link">Privacy Policy</a>.
          </p>
        </section>

        <div className="cookie-footer">
          <p>
            Questa Cookie Policy è conforme al GDPR (Regolamento UE 2016/679), al Codice Privacy italiano
            (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018) e al Provvedimento del Garante Privacy
            del 10 giugno 2021.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;