import { useState, useEffect, useCallback } from 'react';

import './PatternMatcherPage.css';

 

const PatternMatcherPage = () => {

  const [currentPuzzle, setCurrentPuzzle] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);

  const [totalGames, setTotalGames] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);

  const [gameFinished, setGameFinished] = useState(false);

 

  const MAX_GAMES = 10;

  const patternTypes = ['colors', 'shapes', 'rotation', 'size'];

 

  const colors = [

    '#ff0000',

    '#00ff00',

    '#0000ff',

    '#ffff00',

    '#ff00ff',

    '#00ffff'

  ];

 

  const shapes = ['circle', 'square', 'triangle', 'diamond'];

 

  const generateColorPattern = useCallback(() => {

    const selectedColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 3);

    const grid = [];

 

    for (let i = 0; i < 9; i++) {

      grid.push({

        type: 'color',

        color: selectedColors[i % 3],

        shape: 'circle'

      });

    }

 

    const correctAnswer = grid[8];

    const wrong = [];

    const availableColors = colors.filter(c => !selectedColors.includes(c));

 

    for (let i = 0; i < Math.min(3, availableColors.length); i++) {

      wrong.push({

        type: 'color',

        color: availableColors[i],

        shape: correctAnswer.shape

      });

    }

 

    return {

      type: 'colors',

      grid: grid.slice(0, 8),

      correctAnswer,

      options: [...wrong, correctAnswer].sort(() => Math.random() - 0.5),

      description: 'Trova il colore che completa il pattern'

    };

  }, []);

 

  const generateShapePattern = useCallback(() => {

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

    const availableShapes = shapes.filter(s => !selectedShapes.includes(s));

    const wrong = availableShapes.slice(0, 3).map(shape => ({

      type: 'shape',

      shape,

      color

    }));

 

    return {

      type: 'shapes',

      grid: grid.slice(0, 8),

      correctAnswer,

      options: [...wrong, correctAnswer].sort(() => Math.random() - 0.5),

      description: 'Trova la forma che completa il pattern'

    };

  }, []);

 

  const generateRotationPattern = useCallback(() => {

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

    const allRotations = [0, 45, 90, 135, 180, 225, 270, 315];

    const wrongRotations = allRotations.filter(r => r !== correctAnswer.rotation);

    const shuffled = wrongRotations.sort(() => Math.random() - 0.5);

    const wrong = shuffled.slice(0, 3).map(rotation => ({

      type: 'rotation',

      rotation,

      color,

      shape: 'triangle'

    }));

 

    return {

      type: 'rotation',

      grid: grid.slice(0, 8),

      correctAnswer,

      options: [...wrong, correctAnswer].sort(() => Math.random() - 0.5),

      description: 'Trova la rotazione corretta che completa il pattern'

    };

  }, []);

 

  const generateSizePattern = useCallback(() => {

    const color = colors[Math.floor(Math.random() * colors.length)];

    const grid = [];

    const sizes = [15, 22, 30];

 

    for (let i = 0; i < 9; i++) {

      grid.push({

        type: 'size',

        size: sizes[i % 3],

        color,

        shape: 'circle'

      });

    }

 

    const correctAnswer = grid[8];

    const allSizes = [12, 15, 18, 22, 26, 30, 35, 40];

    const wrongSizes = allSizes.filter(s => !sizes.includes(s));

    const wrong = wrongSizes.slice(0, 3).map(size => ({

      type: 'size',

      size,

      color,

      shape: 'circle'

    }));

 

    return {

      type: 'size',

      grid: grid.slice(0, 8),

      correctAnswer,

      options: [...wrong, correctAnswer].sort(() => Math.random() - 0.5),

      description: 'Trova la dimensione corretta che completa il pattern'

    };

  }, []);

 

  const generatePuzzle = useCallback(() => {

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

  }, [generateColorPattern, generateShapePattern, generateRotationPattern, generateSizePattern]);

 

  useEffect(() => {

    setCurrentPuzzle(generatePuzzle());

  }, [generatePuzzle]);

 

  const handleAnswerClick = (answer, index) => {

    if (showResult) return;

 

    setSelectedAnswer(index);

    const isAnswerCorrect = JSON.stringify(answer) === JSON.stringify(currentPuzzle.correctAnswer);

    setIsCorrect(isAnswerCorrect);

    setShowResult(true);

 

    const newTotalGames = totalGames + 1;

    setTotalGames(newTotalGames);

 

    if (isAnswerCorrect) {

      setScore(score + 1);

    }

 

    if (newTotalGames >= MAX_GAMES) {

      setGameFinished(true);

    }

  };

 

  const nextPuzzle = () => {

    setCurrentPuzzle(generatePuzzle());

    setSelectedAnswer(null);

    setShowResult(false);

    setIsCorrect(false);

  };

 

  const restartGame = () => {

    setScore(0);

    setTotalGames(0);

    setGameFinished(false);

    setSelectedAnswer(null);

    setShowResult(false);

    setIsCorrect(false);

    setCurrentPuzzle(generatePuzzle());

  };

 

  const renderPattern = (pattern, size = 24) => {

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

 

  if (gameFinished) {

    return (

      <div className="pattern-matcher-page">

        <div className="pattern-container game-over">

          <div className="game-over-content">

            <h1 className="pattern-title">Gioco Completato!</h1>

            <div className="final-score">

              <div className="score-label">Punteggio Finale</div>

              <div className="score-value">{score} / {MAX_GAMES}</div>

              <div className="score-percentage">

                {Math.round((score / MAX_GAMES) * 100)}% Precisione

              </div>

            </div>

            <button className="restart-btn" onClick={restartGame}>

              Gioca Ancora

            </button>

          </div>

        </div>

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

              <span className="stat-label">Domanda</span>

              <span className="stat-value">{totalGames + 1} / {MAX_GAMES}</span>

            </div>

            <div className="stat-item">

              <span className="stat-label">Punteggio</span>

              <span className="stat-value">{score}</span>

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

              {renderPattern(pattern, 24)}

            </div>

          ))}

          <div className="grid-cell missing-cell">

            <span className="question-mark">?</span>

          </div>

        </div>

 

        <div className="right-column">

          <div className="options-section">

            <h3 className="options-title">Seleziona la risposta:</h3>

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

                  {renderPattern(option, 20)}

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

                {totalGames >= MAX_GAMES ? 'Vedi Risultati' : 'Prossimo'}

              </button>

            </div>

          )}

        </div>

 

        <div className="pattern-info">

          <p>

            💡 Trova il pattern che completa la sequenza logica

          </p>

        </div>

      </div>

    </div>

  );

};

 

export default PatternMatcherPage;