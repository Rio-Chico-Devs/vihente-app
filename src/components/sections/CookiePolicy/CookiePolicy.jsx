const CookiePolicy = () => {
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
          Cookie Policy
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
            1. Cosa sono i Cookie
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Servono a migliorare l'esperienza di navigazione e a fornire informazioni ai proprietari del sito.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            2. Cookie Utilizzati da Questo Sito
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.2rem',
              color: '#0ff',
              marginBottom: '0.5rem',
              opacity: 0.8
            }}>
              2.1 Cookie Tecnici Necessari
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
              Questo sito utilizza <strong>cookie tecnici strettamente necessari</strong> per il funzionamento del sito stesso. Questi cookie non richiedono il tuo consenso esplicito ai sensi della normativa vigente.
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
              <li><strong>Cookie di sessione:</strong> Utilizzati per mantenere la sessione di navigazione</li>
              <li><strong>Cookie di preferenze:</strong> Memorizzano le tue scelte (es. consenso cookie)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.2rem',
              color: '#0ff',
              marginBottom: '0.5rem',
              opacity: 0.8
            }}>
              2.2 Cookie di Terze Parti
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
              Attualmente questo sito <strong>NON utilizza</strong> cookie di terze parti per:
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
              <li>❌ Analytics (Google Analytics, ecc.)</li>
              <li>❌ Marketing o pubblicità</li>
              <li>❌ Profilazione utenti</li>
              <li>❌ Social media tracking</li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: '8px',
            background: 'rgba(0, 255, 0, 0.05)',
            marginTop: '1.5rem'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', margin: 0 }}>
              ✅ <strong>Privacy-First:</strong> Tutti i font e le risorse sono self-hosted (ospitati localmente) per evitare tracking da parte di servizi terzi come Google Fonts.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            3. Servizi di Terze Parti
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Questo sito utilizza i seguenti servizi di terze parti che potrebbero impostare cookie:
          </p>
          
          <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
            <h4 style={{ color: '#0ff', marginBottom: '0.5rem' }}>GitHub Pages (Hosting)</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
              Il sito è ospitato su GitHub Pages. GitHub potrebbe raccogliere dati di navigazione per scopi tecnici e di sicurezza.
              <br />
              Informativa: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>GitHub Privacy Statement</a>
            </p>
          </div>

          <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
            <h4 style={{ color: '#0ff', marginBottom: '0.5rem' }}>EmailJS (Form di Contatto)</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
              Il form di contatto utilizza EmailJS per l'invio delle email. I dati inseriti vengono processati da EmailJS.
              <br />
              Informativa: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>EmailJS Privacy Policy</a>
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            4. Durata dei Cookie
          </h2>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>Cookie di sessione:</strong> Vengono cancellati automaticamente alla chiusura del browser</li>
            <li><strong>Cookie persistenti:</strong> Rimangono sul dispositivo per un periodo massimo di 12 mesi</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            5. Come Gestire i Cookie
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Puoi gestire le tue preferenze sui cookie in qualsiasi momento attraverso:
          </p>
          <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginLeft: '2rem' }}>
            <li><strong>Banner cookie:</strong> Alla prima visita del sito, puoi accettare o rifiutare i cookie tramite il banner</li>
            <li><strong>Impostazioni browser:</strong> Puoi bloccare o eliminare i cookie attraverso le impostazioni del tuo browser</li>
          </ul>

          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: '#0ff', marginBottom: '0.5rem' }}>Guide per browser:</h4>
            <ul style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginLeft: '2rem' }}>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: '#0ff' }}>Microsoft Edge</a></li>
            </ul>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginTop: '1rem', fontStyle: 'italic' }}>
            ⚠️ Nota: Disabilitare i cookie tecnici potrebbe compromettere alcune funzionalità del sito.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            6. Consenso
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Continuando la navigazione su questo sito, chiudendo il banner o cliccando su qualsiasi elemento della pagina, acconsenti all'uso dei cookie tecnici necessari per il funzionamento del sito.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Per i cookie non tecnici (quando presenti), verrà richiesto il tuo consenso esplicito tramite il banner apposito.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            7. Aggiornamenti
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Questa Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare questa pagina regolarmente per rimanere informato.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.5rem',
            color: '#0ff',
            marginBottom: '1rem'
          }}>
            8. Contatti
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Per qualsiasi domanda riguardante questa Cookie Policy, puoi contattarmi a:<br />
            <strong>Email:</strong> [TUA-EMAIL]
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
            Per maggiori informazioni sul trattamento dei dati personali, consulta la <a href="/privacy-policy" style={{ color: '#0ff', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </section>

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

export default CookiePolicy;