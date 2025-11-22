import './MyStory.css';

const MyStory = () => {
  const skills = [
    'Sviluppatore Web',
    'Social Media',
    'Creator Digitale',
    'Illustratore',
    'Coach',
    'Intermediatore Linguistico',
    'Traduttore'
  ];

  return (
    <section className="mystory-section">
      <div className="mystory-vignette-overlay"></div>

      <div className="mystory-content">
        {/* Skills - Left */}
        <div className="mystory-skills">
          <h3 className="mystory-skills-title">Skills</h3>
          {skills.map((skill, index) => (
            <div key={index} className="mystory-skill-item">
              {skill}
            </div>
          ))}
        </div>

        {/* Center - Bio + Languages */}
        <div className="mystory-center">
          <div className="mystory-box">
            <h1 className="mystory-title">CHI SONO</h1>
            <p className="mystory-text">
              Ciao, sono Antonio e sono un Consulente Digitale specializzato in grafiche e contenuti multimediali.
              Sono nel settore delle illustrazioni, delle grafiche e del design da più di 10 anni.
              Recentemente ho completato la mia formazione informatica evolutasi nel corso del tempo grazie ai vari lavori fatti sia per aziende informatiche che di altri settori.
              Punto a creare soluzioni originali e moderne, se cerchi questo, sei nel posto giusto.
            </p>
          </div>

          <div className="mystory-languages">
            <h3 className="mystory-languages-title">Lingue</h3>
            <p className="mystory-languages-text">
              Spagnolo, Italiano, Inglese, Francese. Sto imparando il Giapponese.
            </p>
          </div>
        </div>

        {/* Photo - Right */}
        <div className="mystory-photo-container">
          <div className="mystory-photo">
            Foto
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;