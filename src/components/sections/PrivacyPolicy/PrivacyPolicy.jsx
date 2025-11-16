const PrivacyPolicy = () => {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      padding: '4rem 2rem',
      fontFamily: "'Share Tech Mono', monospace"
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '2.5rem',
          color: '#0ff',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
        }}>
          Privacy Policy
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
          <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
        </p>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            1. Titolare del Trattamento
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Il titolare del trattamento dei dati è:<br />
            <strong>Antonio Vihente</strong><br />
            Portfolio personale non commerciale<br />
            Email: <strong>[TUA-EMAIL]</strong>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            2. Tipologia di Dati Raccolti
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Questo sito web raccoglie i seguenti dati personali:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>Dati di navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate (raccolti automaticamente dal server di hosting)</li>
            <li><strong>Dati forniti volontariamente:</strong> Nome, indirizzo email, messaggio (tramite form di contatto)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            3. Base Giuridica e Finalità del Trattamento
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            I tuoi dati personali vengono trattati per le seguenti finalità:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>Gestione richieste di contatto:</strong> rispondere alle tue richieste inviate tramite form (base giuridica: consenso, Art. 6(1)(a) GDPR)</li>
            <li><strong>Funzionamento tecnico del sito:</strong> garantire il corretto funzionamento del sito web (base giuridica: legittimo interesse, Art. 6(1)(f) GDPR)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            4. Periodo di Conservazione
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            I dati personali raccolti tramite il form di contatto verranno conservati per il tempo strettamente necessario a rispondere alla tua richiesta e comunque non oltre 12 mesi dalla raccolta, salvo obblighi di legge.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            5. Comunicazione e Trasferimento Dati
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            I tuoi dati personali non vengono venduti, ceduti o condivisi con terze parti, ad eccezione di:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>GitHub Pages:</strong> Il sito è ospitato su GitHub Pages (GitHub, Inc., USA). I dati di navigazione (indirizzo IP) vengono trasferiti sui server di GitHub situati negli Stati Uniti d'America. GitHub applica adeguate garanzie per la protezione dei dati personali in conformità al GDPR.</li>
            <li><strong>EmailJS:</strong> Il servizio di invio email utilizzato per il form di contatto. I dati inviati tramite form vengono processati da EmailJS per l'invio delle email.</li>
          </ul>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginTop: '1rem' }}>
            <strong>Trasferimenti extra-UE:</strong> I dati possono essere trasferiti verso paesi extra Unione Europea (USA) attraverso i servizi sopra menzionati, i quali applicano clausole contrattuali standard approvate dalla Commissione Europea.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            6. Cookie e Tecnologie di Tracciamento
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Questo sito utilizza cookie e tecnologie simili. Per maggiori informazioni, consulta la nostra <a href="/cookie-policy" style={{ color: '#0ff', textDecoration: 'underline' }}>Cookie Policy</a>.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            7. Diritti dell'Interessato (Artt. 15-22 GDPR)
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            In qualità di interessato, hai i seguenti diritti:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>Diritto di accesso (Art. 15):</strong> ottenere conferma che sia in corso un trattamento di dati personali e accedere a tali dati</li>
            <li><strong>Diritto di rettifica (Art. 16):</strong> ottenere la rettifica dei dati personali inesatti</li>
            <li><strong>Diritto alla cancellazione (Art. 17):</strong> ottenere la cancellazione dei dati personali ("diritto all'oblio")</li>
            <li><strong>Diritto di limitazione (Art. 18):</strong> ottenere la limitazione del trattamento</li>
            <li><strong>Diritto alla portabilità (Art. 20):</strong> ricevere i dati in formato strutturato e leggibile</li>
            <li><strong>Diritto di opposizione (Art. 21):</strong> opporsi al trattamento dei dati personali</li>
            <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
          </ul>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginTop: '1rem' }}>
            Per esercitare i tuoi diritti, contattami all'indirizzo email: <strong>[TUA-EMAIL]</strong>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            8. Diritto di Reclamo
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Hai il diritto di proporre reclamo all'autorità di controllo competente:
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <strong>Garante per la Protezione dei Dati Personali</strong><br />
            Piazza Venezia n. 11, 00187 - Roma<br />
            Tel: +39 06.696771<br />
            Email: garante@gpdp.it<br />
            PEC: protocollo@pec.gpdp.it<br />
            Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>www.garanteprivacy.it</a>
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            9. Sicurezza dei Dati
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Sono state implementate misure tecniche e organizzative adeguate per proteggere i tuoi dati personali da accessi non autorizzati, perdita, distruzione o alterazione, tra cui:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li>Connessione HTTPS crittografata</li>
            <li>Self-hosting di risorse (font, immagini) per evitare tracking terze parti</li>
            <li>Minimizzazione della raccolta dati</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            10. Modifiche alla Privacy Policy
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Questa Privacy Policy può essere aggiornata periodicamente. La data dell'ultimo aggiornamento è indicata in alto. Ti consigliamo di consultare regolarmente questa pagina.
          </p>
        </section>

        <div style={{
          marginTop: '4rem',
          padding: '1.5rem',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '8px',
          background: 'rgba(0, 255, 255, 0.05)'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', margin: 0 }}>
            <strong>Nota:</strong> Questo è un portfolio personale non commerciale. Non viene svolta alcuna attività di profilazione, marketing o vendita di dati. I tuoi dati vengono trattati esclusivamente per rispondere alle tue richieste di contatto.
          </p>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a 
            href="/" 
            style={{
              color: '#0ff',
              textDecoration: 'none',
              fontSize: '1.1rem',
              border: '2px solid #0ff',
              padding: '0.75rem 2rem',
              display: 'inline-block',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 255, 255, 0.1)';
              e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;