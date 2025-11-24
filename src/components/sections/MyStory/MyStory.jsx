import { useEffect } from 'react';
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

  // Typewriter code background effect
  useEffect(() => {
    const codeSnippets = [
      'const story = {',
      'class Profile {',
      'function getSkills() {',
      'return experience;',
      'export default MyStory;'
    ];
    let activeTimeouts = [];

    function generateCodeLine() {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const x = Math.random() * (window.innerWidth - 250);
      const y = Math.random() * (window.innerHeight - 30);
      
      const codeLine = document.createElement('div');
      codeLine.className = 'code-line';
      codeLine.textContent = snippet;
      codeLine.style.cssText = `left:${x}px;top:${y}px`;
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        codeBackground.appendChild(codeLine);
      }
      
      const removeTimeout = setTimeout(() => {
        if (codeLine.parentNode) {
          codeLine.parentNode.removeChild(codeLine);
        }
      }, 6000);
      
      activeTimeouts.push(removeTimeout);
    }

    const codeInterval = setInterval(generateCodeLine, 6000);
    const codeTimeout = setTimeout(generateCodeLine, 2000);

    return () => {
      clearInterval(codeInterval);
      clearTimeout(codeTimeout);
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      
      const codeBackground = document.getElementById('codeBackground');
      if (codeBackground) {
        while (codeBackground.firstChild) {
          codeBackground.removeChild(codeBackground.firstChild);
        }
      }
    };
  }, []);

  return (
    <section className="mystory-section">
      <div className="code-background" id="codeBackground"></div>
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