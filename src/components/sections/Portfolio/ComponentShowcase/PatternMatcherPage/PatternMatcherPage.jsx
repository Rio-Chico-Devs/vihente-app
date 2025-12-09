import { useState, useEffect } from 'react';
import './PatternMatcherPage.css';

const PatternMatcherPage = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  // Tipi di pattern possibili
  const patternTypes = [
    'colors',
    'shapes',
    'rotation',
    'size'
  ];

  // Colori ben distinguibili
  const colors = [
    '#ff0000',  // Rosso puro
    '#00ff00',  // Verde puro
    '#0000ff',  // Blu puro
    '#ffff00',  // Giallo puro
    '#ff00ff',  // Magenta
    '#00ffff'   // Ciano
  ];

  const shapes = ['circle', 'square', 'triangle', 'diamond'];

  // Genera un puzzle randomico
  const generatePuzzle = () => {
    const type = patternTypes[Math.floor(Math.random() * patternTypes.length)];

    switch (type) {
      case 'colors':
        return generateColorPattern();
      case 'shapes':
        return generateShapePattern();
      case 'rotation':
        return generateRotationPattern();
      case 'size':
        return generateSizePattern();
      default:
        return generateColorPattern();
    }
  };

  // Pattern di colori crescenti
  const generateColorPattern = () => {
    const selectedColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 3);
    const grid = [];

    // Crea pattern: ripete i 3 colori in sequenza
    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'color',
        color: selectedColors[i % 3],
        shape: 'circle'
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongColorAnswers(selectedColors, correctAnswer);

    return {
      type: 'colors',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova il colore che completa il pattern'
    };
  };

  // Pattern di forme che si ripetono
  const generateShapePattern = () => {
    const selectedShapes = [...shapes].sort(() => Math.random() - 0.5).slice(0, 3);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const grid = [];

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'shape',
        shape: selectedShapes[i % 3],
        color
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongShapeAnswers(selectedShapes, color, correctAnswer);

    return {
      type: 'shapes',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova la forma che completa il pattern'
    };
  };

  // Pattern di rotazione
  const generateRotationPattern = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const grid = [];
    const rotationStep = 45;

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'rotation',
        rotation: (i * rotationStep) % 360,
        color,
        shape: 'triangle'
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongRotationAnswers(color, correctAnswer);

    return {
      type: 'rotation',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova la rotazione corretta che completa il pattern'
    };
  };

  // Pattern di dimensioni crescenti
  const generateSizePattern = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const grid = [];
    const sizes = [25, 40, 55];

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'size',
        size: sizes[i % 3],
        color,
        shape: 'circle'
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongSizeAnswers(color, sizes, correctAnswer);

    return {
      type: 'size',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova la dimensione corretta che completa il pattern'
    };
  };

  // Genera risposte sbagliate per colori (no duplicati)
  const generateWrongColorAnswers = (usedColors, correct) => {
    const wrong = [];
    const availableColors = colors.filter(c => !usedColors.includes(c));

    // Prendi 3 colori diversi che non sono stati usati
    for (let i = 0; i < Math.min(3, availableColors.length); i++) {
      wrong.push({
        type: 'color',
        color: availableColors[i],
        shape: correct.shape
      });
    }

    return wrong;
  };

  // Genera risposte sbagliate per forme (no duplicati)
  const generateWrongShapeAnswers = (usedShapes, color, correct) => {
    const availableShapes = shapes.filter(s => !usedShapes.includes(s));

    return availableShapes.slice(0, 3).map(shape => ({
      type: 'shape',
      shape,
      color
    }));
  };

  // Genera risposte sbagliate per rotazione (no duplicati)
  const generateWrongRotationAnswers = (color, correct) => {
    const allRotations = [0, 45, 90, 135, 180, 225, 270, 315];
    const wrongRotations = allRotations.filter(r => r !== correct.rotation);

    // Prendi 3 rotazioni casuali diverse dalla corretta
    const shuffled = wrongRotations.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 3).map(rotation => ({
      type: 'rotation',
      rotation,
      color,
      shape: 'triangle'
    }));
  };

  // Genera risposte sbagliate per dimensioni (no duplicati)
  const generateWrongSizeAnswers = (color, usedSizes, correct) => {
    const allSizes = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    const wrongSizes = allSizes.filter(s => !usedSizes.includes(s));

    return wrongSizes.slice(0, 3).map(size => ({
      type: 'size',
      size,
      color,
      shape: 'circle'
    }));
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCurrentPuzzle(generatePuzzle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerClick = (answer, index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    const correct = JSON.stringify(answer) === JSON.stringify(currentPuzzle.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    setTotalGames(totalGames + 1);

    if (correct) {
      setScore(score + 1);
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzle(generatePuzzle());
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const renderPattern = (pattern, size = 60) => {
    if (!pattern) return null;

    const commonStyle = {
      width: `${pattern.size || size}px`,
      height: `${pattern.size || size}px`,
      backgroundColor: pattern.color,
      transform: pattern.rotation ? `rotate(${pattern.rotation}deg)` : 'none'
    };

    let className = 'pattern-shape ';

    switch (pattern.shape) {
      case 'circle':
        className += 'circle-shape';
        break;
      case 'square':
        className += 'square-shape';
        break;
      case 'triangle':
        className += 'triangle-shape';
        break;
      case 'diamond':
        className += 'diamond-shape';
        break;
      default:
        className += 'circle-shape';
    }

    return (
      <div
        className={className}
        style={commonStyle}
      />
    );
  };

  if (!currentPuzzle) {
    return (
      <div className="pattern-matcher-page">
        <div className="loading">Generazione puzzle...</div>
      </div>
    );
  }

  return (
    <div className="pattern-matcher-page">
      <div className="pattern-container">
        <div className="pattern-header">
          <h1 className="pattern-title">Pattern Matcher</h1>
          <p className="pattern-subtitle">{currentPuzzle.description}</p>
          <div className="pattern-stats">
            <div className="stat-item">
              <span className="stat-label">Punteggio</span>
              <span className="stat-value">{score} / {totalGames}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Precisione</span>
              <span className="stat-value">
                {totalGames > 0 ? Math.round((score / totalGames) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="puzzle-grid">
          {currentPuzzle.grid.map((pattern, index) => (
            <div key={index} className="grid-cell">
              {renderPattern(pattern)}
            </div>
          ))}
          <div className="grid-cell missing-cell">
            <span className="question-mark">?</span>
          </div>
        </div>

        <div className="right-column">
          <div className="options-section">
            <h3 className="options-title">Seleziona il pattern mancante:</h3>
            <div className="options-grid">
              {currentPuzzle.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-cell ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'correct-answer'
                        : 'wrong-answer'
                      : ''
                  } ${
                    showResult &&
                    JSON.stringify(option) === JSON.stringify(currentPuzzle.correctAnswer)
                      ? 'show-correct'
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(option, index)}
                >
                  {renderPattern(option, 50)}
                </div>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="result-section">
              <div className={`result-message ${isCorrect ? 'correct' : 'wrong'}`}>
                {isCorrect ? '✓ Corretto!' : '✗ Riprova'}
              </div>
              <button className="next-btn" onClick={nextPuzzle}>
                Prossimo Pattern
              </button>
            </div>
          )}
        </div>

        <div className="pattern-info">
          <p>
            💡 Analizza il pattern: colori, forme, rotazioni o dimensioni seguono una sequenza logica
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatternMatcherPage;
