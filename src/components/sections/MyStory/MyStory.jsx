import { useEffect } from 'react';
import { useGuide } from '../../../contexts/GuideContext';
import './MyStory.css';

const MyStory = () => {
  const { setGuide, clearGuide } = useGuide();
  const skills = [
    { name: 'Sviluppatore Web',  guide: 'React, Vite, JavaScript — da 7 anni nel settore.' },
    { name: 'UI/UX Design',      guide: 'Interfacce che funzionano e che si vedono bene.' },
    { name: 'Illustratore',      guide: 'Ha una matita in mano da quando è nato :V' },
    { name: 'Creator Digitale',  guide: 'Contenuti digitali, video, grafica — il suo lavoro preferito ^^' },
    { name: 'Social Media',      guide: 'Il suo record è 20k followers per ora!' },
    { name: 'Traduttore',        guide: 'Con esperienza e alta formazione accademica.' },
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
            <div
              key={index}
              className="mystory-skill-item"
              onMouseEnter={() => setGuide(skill.guide)}
              onMouseLeave={clearGuide}
            >
              {skill.name}
            </div>
          ))}
        </div>

        {/* Center - Bio + Languages */}
        <div className="mystory-center">
          <div className="mystory-box">
            <h1 className="mystory-title">CHI SONO</h1>
            <p className="mystory-text">
              Ciao, sono Antonio — sviluppatore web con 7 anni di esperienza e un background nel design e nelle illustrazioni digitali che porto avanti da oltre 10 anni.
              Ho lavorato con aziende di vari settori, costruendo interfacce moderne e soluzioni digitali complete.
              Unisco competenze tecniche e visione creativa: se cerchi qualcuno che capisce sia il codice che l'estetica, sei nel posto giusto.
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
        <div
          className="mystory-photo-container"
          onMouseEnter={() => setGuide('Guarda un pò chi abbiamo qui, è la mia persona preferita <3')}
          onMouseLeave={clearGuide}
        >
          <div className="mystory-photo">
            <img
      src="/images/AVBPT.webp"
      alt="Antonio - Consulente Digitale"
      className="mystory-photo-img"
    />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;