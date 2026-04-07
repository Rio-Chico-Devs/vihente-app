import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">Termini e Condizioni</h1>
        <p className="terms-intro">
          I presenti Termini e Condizioni regolano l'utilizzo di questo sito web.
          Questo sito ha esclusivamente finalità di <strong>portfolio personale</strong> e non offre
          servizi commerciali a pagamento.
        </p>

        <section className="terms-section">
          <h2>1. Informazioni Generali</h2>
          <p>
            Il titolare del sito è:
          </p>
          <div className="info-box">
            <p><strong>Nome:</strong> Antonio Vicente Bruno</p>
            <p><strong>Email:</strong> <a href="mailto:vihenteweb@proton.me">vihenteweb@proton.me</a></p>
            <p><strong>PEC:</strong> antoniovicente@postacertifica.it</p>
            <p><strong>Sito web:</strong> vihente.it</p>
          </div>
          <p className="note">
            <em>
              Questo è un sito portfolio personale. Non è attiva alcuna attività commerciale
              né partita IVA al momento. Il sito è rivolto esclusivamente a potenziali datori
              di lavoro, collaboratori o chiunque voglia contattarmi per opportunità professionali.
            </em>
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Scopo del Sito</h2>
          <p>
            Il presente sito web è un <strong>portfolio personale</strong> con le seguenti finalità:
          </p>
          <ul>
            <li><strong>Presentazione professionale:</strong> Competenze, progetti e lavori realizzati</li>
            <li><strong>Contatto:</strong> Form per richieste di collaborazione, assunzione o contratti a ritenuta d'acconto</li>
            <li><strong>Showcase tecnico:</strong> Dimostrazione delle capacità di sviluppo web e design</li>
          </ul>
          <p className="highlight">
            Questo sito <strong>non vende servizi</strong>, non accetta pagamenti e non stipula contratti commerciali.
            Qualsiasi collaborazione sarà concordata direttamente tramite contatto email.
          </p>
        </section>

        {/* ============================================================
            TODO P.IVA: Ripristinare quando la Partita IVA è attiva.
            Sostituire la sezione 2 "Scopo del Sito" con la versione
            commerciale qui sotto, e aggiornare i numeri delle sezioni.
            ============================================================

        <section className="terms-section">
          <h2>X. Oggetto del Servizio</h2>
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
          <h2>X. Conclusione del Contratto</h2>
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

        ============================================================ */}

        <section className="terms-section">
          <h2>3. Proprietà Intellettuale e Diritti d'Autore</h2>
          <p>
            Tutti i contenuti presenti su questo sito (testi, immagini, grafica, codice, loghi) sono protetti
            da diritto d'autore (Legge 633/1941) e sono di proprietà di VIHENTE o dei rispettivi proprietari.
          </p>
          <div className="rights-box">
            <h3>Cosa NON puoi fare:</h3>
            <ul>
              <li>Copiare, riprodurre, modificare o distribuire i contenuti senza autorizzazione scritta</li>
              <li>Utilizzare il codice sorgente o elementi grafici per progetti commerciali</li>
              <li>Attribuire a sé stessi la paternità dei lavori presentati in questo portfolio</li>
            </ul>
          </div>
          <p>
            <strong>Portfolio e lavori mostrati:</strong>
          </p>
          <ul>
            <li><strong>Diritti morali:</strong> VIHENTE mantiene la paternità di tutti i lavori presentati</li>
            <li><strong>Diritti d'utilizzo:</strong> I lavori mostrati sono presentati a scopo dimostrativo</li>
          </ul>
        </section>

        {/* ============================================================
            TODO P.IVA: Ripristinare la sezione Garanzie e Responsabilità
            per i servizi commerciali quando la P.IVA è attiva.
            ============================================================

        <section className="terms-section">
          <h2>X. Garanzie e Responsabilità</h2>
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
            <li>VIHENTE non garantisce risultati specifici per tool di terze parti o scelte personali del datore di lavoro</li>
          </ul>
        </section>

        ============================================================ */}

        {/* ============================================================
            TODO P.IVA: Ripristinare la sezione ODR (Risoluzione
            Controversie Online) obbligatoria per e-commerce/servizi
            commerciali ai sensi del Reg. UE 524/2013.
            ============================================================

        <section className="terms-section">
          <h2>X. Risoluzione Controversie Online (ODR)</h2>
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

        ============================================================ */}

        <section className="terms-section">
          <h2>4. Legge Applicabile</h2>
          <p>
            I presenti Termini e Condizioni sono regolati dalla legge italiana.
          </p>
          <p>
            Per eventuali controversie derivanti dall'utilizzo di questo sito, è competente il Foro di Pordenone,
            salvo diversa disposizione inderogabile di legge.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Trattamento Dati Personali</h2>
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
          <h2>6. Modifiche ai Termini e Condizioni</h2>
          <p>
            VIHENTE si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento.
            Le modifiche saranno pubblicate su questa pagina e entreranno in vigore dalla data di pubblicazione.
          </p>
          <p>
            <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa a questi Termini e Condizioni, puoi contattarci:
          </p>
          <div className="info-box">
            <p><strong>Email:</strong> <a href="mailto:vihenteweb@proton.me">vihenteweb@proton.me</a></p>
            <p><strong>PEC:</strong> antoniovicente@postacertifica.it</p>
          </div>
        </section>

        <div className="terms-footer">
          <p>
            Questi Termini e Condizioni sono conformi alla normativa italiana applicabile ai siti portfolio
            e al GDPR (Regolamento UE 2016/679) per il trattamento dei dati personali.
          </p>
          {/* TODO P.IVA: quando attiva, aggiungere conformità a D.Lgs. 70/2003
              (Commercio Elettronico) e D.Lgs. 206/2005 (Codice del Consumo) */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
