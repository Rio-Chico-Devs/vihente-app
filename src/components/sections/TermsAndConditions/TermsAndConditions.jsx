import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">Termini e Condizioni</h1>
        <p className="terms-intro">
          I presenti Termini e Condizioni regolano l'utilizzo di questo sito web e i servizi offerti.
          Utilizzando questo sito, accetti integralmente questi termini.
        </p>

        <section className="terms-section">
          <h2>1. Informazioni Generali e Impressum</h2>
          <p>
            In conformità con l'Art. 21 del D.Lgs. 70/2003 (Commercio Elettronico), il titolare del sito è:
          </p>
          <div className="info-box">
            <p><strong>Nome/Ragione Sociale:</strong> Antonio Vicente Bruno</p>
            
            <p><strong>Partita IVA / Codice Fiscale:</strong> [in fase di ottenimento]</p>
            <p><strong>Email:</strong> <a href="mailto: vihenteweb@proton.me">vihenteweb@proton.me</a></p>
            <p><strong>PEC:</strong> antoniovicente@postacertifica.it</p>
            <p><strong>Sito web:</strong> vihente.it</p>
          </div>
          <p className="note">
            <em>Nota: Questi dati devono essere compilati prima della pubblicazione del sito per conformità legale.</em>
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Oggetto del Servizio</h2>
          <p>
            Il presente sito web offre:
          </p>
          <ul>
            <li><strong>Portfolio personale:</strong> Presentazione di progetti, competenze e lavori realizzati</li>
            <li><strong>Servizi di consulenza digitale:</strong> Web design, sviluppo web, strategie digitali, grafica, multimedia</li>
            <li><strong>Form di contatto:</strong> Per richieste di informazioni e preventivi personalizzati</li>
          </ul>
          <p className="highlight">
            Ogni servizio verrà concordato preventivamente con il cliente tramite preventivo scritto specifico.
            Nessun contratto si intende concluso fino all'accettazione formale del preventivo da parte del cliente.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Conclusione del Contratto</h2>
          <div className="step-box">
            <h3>Procedura di acquisto servizi:</h3>
            <ol>
              <li><strong>Richiesta:</strong> Il cliente compila il form di contatto o invia email specificando il servizio richiesto</li>
              <li><strong>Preventivo:</strong> Invio preventivo dettagliato entro 5 giorni lavorativi</li>
              <li><strong>Accettazione:</strong> Il cliente accetta il preventivo tramite email o firma digitale</li>
              <li><strong>Pagamento:</strong> Anticipo del 30-50% per avvio lavori (specificato nel preventivo)</li>
              <li><strong>Esecuzione:</strong> Realizzazione del servizio secondo tempi concordati</li>
              <li><strong>Consegna:</strong> Saldo finale e consegna del lavoro completo</li>
            </ol>
          </div>
          <p>
            Il contratto si considera concluso nel momento in cui il cliente invia conferma di accettazione del preventivo.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Proprietà Intellettuale e Diritti d'Autore</h2>
          <p>
            Tutti i contenuti presenti su questo sito (testi, immagini, grafica, codice, loghi) sono protetti
            da diritto d'autore (Legge 633/1941) e sono di proprietà di VIHENTE o dei rispettivi proprietari.
          </p>
          <div className="rights-box">
            <h3>Cosa NON puoi fare:</h3>
            <ul>
              <li>Copiare, riprodurre, modificare o distribuire i contenuti senza autorizzazione scritta</li>
              <li>Utilizzare il codice sorgente o elementi grafici per progetti commerciali</li>
              <li>Rivendere o cedere a terzi i lavori consegnati senza accordi specifici</li>
            </ul>
          </div>
          <p>
            <strong>Diritti sui lavori commissionati:</strong>
          </p>
          <ul>
            <li><strong>Diritti di utilizzo:</strong> Il cliente acquisisce i diritti di utilizzo del lavoro per le finalità concordate</li>
            <li><strong>Diritti patrimoniali:</strong> Trasferimento completo solo se espressamente concordato </li>
            <li><strong>Diritti morali:</strong> VIHENTE mantiene il diritto di citare il lavoro nel proprio portfolio</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Garanzie e Responsabilità</h2>
          <p>
            VIHENTE garantisce:
          </p>
          <ul>
            <li>Rispetto dei tempi concordati (salvo cause di forza maggiore)</li>
            <li>Assistenza post-consegna secondo quanto specificato</li>
          </ul>
          <p className="warning-note">
            <strong>Limitazioni di responsabilità:</strong>
          </p>
          <ul>
            <li>VIHENTE non è responsabile per malfunzionamenti causati da hosting, server o servizi di terze parti</li>
            <li>Il cliente è responsabile per il backup dei propri dati e contenuti</li>
            <li>VIHENTE non garantisce risultati specifici per tool di terze parti o scelte personali del datore di lavoro(es. posizionamento SEO, vendite, traffico)</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Risoluzione Controversie Online (ODR)</h2>
          <p>
            In conformità al Regolamento UE 524/2013, i consumatori europei possono risolvere eventuali controversie
            relative all'acquisto di servizi online attraverso la piattaforma ODR della Commissione Europea:
          </p>
          <div className="info-box odr-box">
            <p><strong>Piattaforma ODR (Online Dispute Resolution):</strong></p>
            <p>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="odr-link"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              Email per contatti ODR: <a href="mailto:vihenteweb@proton.me">vihenteweb@proton.me</a>
            </p>
          </div>
          <p>
            La piattaforma ODR facilita la risoluzione extragiudiziale delle controversie tra consumatori e professionisti
            nell'UE, senza necessità di ricorrere al tribunale.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Legge Applicabile e Foro Competente</h2>
          <p>
            I presenti Termini e Condizioni sono regolati dalla legge italiana.
          </p>
          <p>
            <strong>Per consumatori:</strong> In caso di controversia, è competente il foro di residenza del consumatore
            (Art. 63 Codice del Consumo).
          </p>
          <p>
            <strong>Per professionisti/imprese:</strong> Per eventuali controversie derivanti dall'interpretazione o
            esecuzione del presente contratto, è competente in via esclusiva il Foro di Pordenone.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Trattamento Dati Personali</h2>
          <p>
            Il trattamento dei dati personali raccolti attraverso questo sito è disciplinato dalla nostra{' '}
            <a href="/privacy-policy" className="internal-link">Privacy Policy</a>, in conformità con il GDPR (Regolamento UE 2016/679).
          </p>
          <p>
            Utilizzando il form di contatto, accetti il trattamento dei tuoi dati personali secondo quanto descritto
            nella Privacy Policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Modifiche ai Termini e Condizioni</h2>
          <p>
            VIHENTE si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento.
            Le modifiche saranno pubblicate su questa pagina e entreranno in vigore dalla data di pubblicazione.
          </p>
          <p>
            Ti consigliamo di consultare regolarmente questa pagina per rimanere aggiornato.
          </p>
          <p>
            <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa a questi Termini e Condizioni, puoi contattarci:
          </p>
          <div className="info-box">
            <p><strong>Email:</strong> <a href="mailto:vihenteweb@proton.me">[vihenteweb@proton.me]</a></p>
            <p><strong>PEC:</strong> [antoniovicente@postecertifica.it]</p>
            <p><strong>Indirizzo:</strong> [in fase di ottenimento]</p>
          </div>
        </section>

        <div className="terms-footer">
          <p>
            Questi Termini e Condizioni sono conformi al D.Lgs. 70/2003 (Commercio Elettronico),
            al Codice del Consumo (D.Lgs. 206/2005) e al GDPR (Regolamento UE 2016/679).
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
