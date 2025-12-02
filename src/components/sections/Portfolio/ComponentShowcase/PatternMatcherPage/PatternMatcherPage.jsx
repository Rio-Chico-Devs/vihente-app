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
    'colors',       // Pattern di colori
    'shapes',       // Pattern di forme
    'rotation',     // Pattern di rotazione
    'size',         // Pattern di dimensioni
    'position'      // Pattern di posizione
  ];

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
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
      case 'position':
        return generatePositionPattern();
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
    const wrongAnswers = generateWrongShapeAnswers(shapes, color, correctAnswer);

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

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'rotation',
        rotation: (i * 45) % 360,
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

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'size',
        size: 30 + (i % 3) * 15,
        color,
        shape: 'circle'
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongSizeAnswers(color, correctAnswer);

    return {
      type: 'size',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova la dimensione corretta che completa il pattern'
    };
  };

  // Pattern di posizione
  const generatePositionPattern = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const grid = [];

    for (let i = 0; i < 9; i++) {
      grid.push({
        type: 'position',
        position: ['top-left', 'top-center', 'top-right'][i % 3],
        color,
        shape: 'square'
      });
    }

    const correctAnswer = grid[8];
    const wrongAnswers = generateWrongPositionAnswers(color, correctAnswer);

    return {
      type: 'position',
      grid: grid.slice(0, 8),
      correctAnswer,
      options: shuffleArray([correctAnswer, ...wrongAnswers]),
      description: 'Trova la posizione corretta che completa il pattern'
    };
  };

  // Genera risposte sbagliate per colori
  const generateWrongColorAnswers = (usedColors, correct) => {
    const wrong = [];
    const availableColors = colors.filter(c => !usedColors.includes(c));

    for (let i = 0; i < 3; i++) {
      if (availableColors[i]) {
        wrong.push({
          type: 'color',
          color: availableColors[i],
          shape: correct.shape
        });
      }
    }
    return wrong;
  };

  const generateWrongShapeAnswers = (allShapes, color, correct) => {
    return allShapes
      .filter(s => s !== correct.shape)
      .slice(0, 3)
      .map(shape => ({
        type: 'shape',
        shape,
        color
      }));
  };

  const generateWrongRotationAnswers = (color, correct) => {
    const wrongRotations = [0, 90, 180, 270].filter(r => r !== correct.rotation);
    return wrongRotations.slice(0, 3).map(rotation => ({
      type: 'rotation',
      rotation,
      color,
      shape: 'triangle'
    }));
  };

  const generateWrongSizeAnswers = (color, correct) => {
    const wrongSizes = [30, 45, 60, 75].filter(s => s !== correct.size);
    return wrongSizes.slice(0, 3).map(size => ({
      type: 'size',
      size,
      color,
      shape: 'circle'
    }));
  };

  const generateWrongPositionAnswers = (color, correct) => {
    const positions = ['top-left', 'top-center', 'top-right', 'center', 'bottom-left'];
    return positions
      .filter(p => p !== correct.position)
      .slice(0, 3)
      .map(position => ({
        type: 'position',
        position,
        color,
        shape: 'square'
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

    let positionStyle = {};
    if (pattern.position) {
      const positions = {
        'top-left': { top: '10%', left: '10%' },
        'top-center': { top: '10%', left: '50%', transform: 'translateX(-50%)' },
        'top-right': { top: '10%', right: '10%' },
        'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        'bottom-left': { bottom: '10%', left: '10%' }
      };
      positionStyle = positions[pattern.position] || {};
    }

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
        style={{ ...commonStyle, ...positionStyle }}
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
              {isCorrect ? '✓ Corretto! Ottimo lavoro!' : '✗ Ops! Riprova con il prossimo'}
            </div>
            <button className="next-btn" onClick={nextPuzzle}>
              Prossimo Pattern
            </button>
          </div>
        )}

        <div className="pattern-info">
          <p>
            💡 Analizza attentamente il pattern: colori, forme, rotazioni, dimensioni o posizioni
            potrebbero seguire una sequenza logica
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatternMatcherPage;
