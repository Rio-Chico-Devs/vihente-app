import { useState, useEffect, useRef } from 'react';
import './QuizPage.css';

const QuizPage = () => {
  // Pool di 21 domande su informatica e grafica
  const questionPool = [
    {
      id: 1,
      question: "Qual è la profondità di colore standard per il formato PNG-24?",
      options: ["16 bit", "24 bit", "32 bit", "48 bit"],
      correct: 2
    },
    {
      id: 2,
      question: "In tipografia, cosa indica il termine 'kerning'?",
      options: [
        "Lo spazio tra le righe",
        "Lo spazio tra coppie specifiche di lettere",
        "Lo spazio uniforme tra tutte le lettere",
        "L'altezza delle maiuscole"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Quale algoritmo di compressione usa il formato JPEG?",
      options: ["LZW", "DCT (Discrete Cosine Transform)", "Huffman", "RLE"],
      correct: 1
    },
    {
      id: 4,
      question: "In CSS, quale proprietà controlla l'ordine di sovrapposizione degli elementi?",
      options: ["layer-index", "z-index", "stack-order", "depth"],
      correct: 1
    },
    {
      id: 5,
      question: "Qual è la differenza principale tra RGB e CMYK?",
      options: [
        "RGB è per stampa, CMYK per schermi",
        "RGB è additivo, CMYK è sottrattivo",
        "RGB ha più colori di CMYK",
        "Non c'è differenza, sono intercambiabili"
      ],
      correct: 1
    },
    {
      id: 6,
      question: "Quale valore esadecimale corrisponde al colore bianco puro?",
      options: ["#000000", "#FFFFFF", "#111111", "#CCCCCC"],
      correct: 1
    },
    {
      id: 7,
      question: "Cosa significa DPI in ambito grafico?",
      options: [
        "Digital Pixel Intensity",
        "Dots Per Inch",
        "Display Picture Index",
        "Dynamic Picture Integration"
      ],
      correct: 1
    },
    {
      id: 8,
      question: "In JavaScript, quale metodo NON modifica l'array originale?",
      options: ["push()", "map()", "splice()", "sort()"],
      correct: 1
    },
    {
      id: 9,
      question: "Quale formato vettoriale è nativo per Adobe Illustrator?",
      options: [".svg", ".ai", ".eps", ".pdf"],
      correct: 1
    },
    {
      id: 10,
      question: "Qual è la risoluzione minima consigliata per la stampa professionale?",
      options: ["72 DPI", "150 DPI", "300 DPI", "600 DPI"],
      correct: 2
    },
    {
      id: 11,
      question: "In CSS Grid, cosa fa la proprietà 'grid-gap'?",
      options: [
        "Definisce la larghezza delle colonne",
        "Crea spazio tra gli elementi della griglia",
        "Allinea gli elementi al centro",
        "Definisce il numero di colonne"
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Cosa rappresenta il valore 'em' in CSS?",
      options: [
        "Una dimensione fissa in pixel",
        "Una dimensione relativa al font-size dell'elemento genitore",
        "Una percentuale della viewport",
        "Una unità assoluta come i millimetri"
      ],
      correct: 1
    },
    {
      id: 13,
      question: "Quale protocollo è alla base del Web moderno?",
      options: ["FTP", "SMTP", "HTTP/HTTPS", "SSH"],
      correct: 2
    },
    {
      id: 14,
      question: "In Photoshop, cosa sono i 'livelli di regolazione'?",
      options: [
        "Livelli che modificano solo l'opacità",
        "Livelli non distruttivi per correzioni colore/tonalità",
        "Livelli che raggruppano altri livelli",
        "Livelli bloccati per evitare modifiche"
      ],
      correct: 1
    },
    {
      id: 15,
      question: "Qual è la differenza tra margin e padding in CSS?",
      options: [
        "Non c'è differenza",
        "Margin è lo spazio esterno, padding è lo spazio interno",
        "Margin è per il testo, padding per le immagini",
        "Padding è lo spazio esterno, margin è lo spazio interno"
      ],
      correct: 1
    },
    {
      id: 16,
      question: "Cosa indica il termine 'viewport' nel web design?",
      options: [
        "La risoluzione dello schermo del dispositivo",
        "L'area visibile della pagina web nel browser",
        "La larghezza massima del contenuto",
        "Il formato dell'immagine di anteprima"
      ],
      correct: 1
    },
    {
      id: 17,
      question: "In Git, quale comando serve per creare un nuovo branch?",
      options: [
        "git new branch nome",
        "git branch nome",
        "git create nome",
        "git checkout nome"
      ],
      correct: 1
    },
    {
      id: 18,
      question: "Cosa significa il termine 'sans-serif' in tipografia?",
      options: [
        "Font con grazie decorative",
        "Font senza grazie decorative",
        "Font corsivo",
        "Font monospazio"
      ],
      correct: 1
    },
    {
      id: 19,
      question: "Quale proprietà CSS controlla la trasparenza di un elemento?",
      options: ["transparency", "opacity", "alpha", "visible"],
      correct: 1
    },
    {
      id: 20,
      question: "In quale spazio colore si lavora tipicamente per il web?",
      options: ["CMYK", "sRGB", "Adobe RGB", "ProPhoto RGB"],
      correct: 1
    },
    {
      id: 21,
      question: "Cosa significa 'responsive design'?",
      options: [
        "Design che risponde velocemente ai click",
        "Design che si adatta a diverse dimensioni di schermo",
        "Design con animazioni fluide",
        "Design accessibile per utenti con disabilità"
      ],
      correct: 1
    }
  ];

  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);
  const bgMusicRef = useRef(null);
  const resultSoundRef = useRef(null);

  // Percorsi audio (MODIFICA QUESTI PERCORSI)
  const BG_MUSIC_PATH = '/path/to/quiz-background-music.mp3';
  const RESULT_SOUND_PATH = '/path/to/result-sound.mp3';

  // Inizializza audio refs
  useEffect(() => {
    bgMusicRef.current = new Audio(BG_MUSIC_PATH);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;

    resultSoundRef.current = new Audio(RESULT_SOUND_PATH);
    resultSoundRef.current.volume = 0.7;

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (resultSoundRef.current) {
        resultSoundRef.current.pause();
        resultSoundRef.current = null;
      }
    };
  }, []);

  // Gestione musica di sottofondo
  useEffect(() => {
    if (quizStarted && !showResult && bgMusicRef.current) {
      bgMusicRef.current.play().catch(err => console.log('Audio play error:', err));
    }

    if (showResult && bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [quizStarted, showResult]);

  // Riproduce suono risultato
  useEffect(() => {
    if (showResult && resultSoundRef.current) {
      resultSoundRef.current.play().catch(err => console.log('Result sound error:', err));
    }
  }, [showResult]);

  // Avvia il quiz
  const startQuiz = () => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 7));
    setQuizStarted(true);
  };

  // Timer 15 secondi
  useEffect(() => {
    if (!quizStarted || showResult || selectedAnswer !== null) return;

    setTimeLeft(15);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, showResult, quizStarted]);

  const handleTimeout = () => {
    if (selectedAnswer !== null || showResult) return;

    setAnswerFeedback('timeout');
    setSelectedAnswer(-1);

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: selectedQuestions[currentQuestion].question,
        selectedAnswer: -1,
        correctAnswer: selectedQuestions[currentQuestion].correct,
        isCorrect: false
      }
    ]);

    setTimeout(() => {
      if (currentQuestion < 6) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswerFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === selectedQuestions[currentQuestion].correct;

    setAnswerFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: selectedQuestions[currentQuestion].question,
        selectedAnswer: answerIndex,
        correctAnswer: selectedQuestions[currentQuestion].correct,
        isCorrect
      }
    ]);

    setTimeout(() => {
      if (currentQuestion < 6) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswerFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 7));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswerFeedback(null);
    setAnsweredQuestions([]);
    setTimeLeft(15);
    setQuizStarted(true);
  };

  const getScoreMessage = () => {
    if (score === 7) return "PERFETTO! Sei un vero esperto!";
    if (score >= 5) return "Ottimo lavoro!";
    if (score >= 3) return "Non male, continua così!";
    return "Dai, riprova! Puoi fare meglio!";
  };

  // SCHERMATA INIZIALE
  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <div className="quiz-container quiz-start-screen">
          <div className="start-content">
            <h1 className="start-title">Tech & Design Quiz</h1>
            <div className="start-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="35" stroke="var(--color-primary, #0ff)" strokeWidth="3"/>
                <path d="M40 20 L40 40 L55 55" stroke="var(--color-primary, #0ff)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="start-question">Sei pronto per il quiz?</h2>
            <p className="start-description">
              7 domande su informatica e grafica.<br />
              Hai 15 secondi per risposta.<br />
              Metti alla prova le tue conoscenze!
            </p>
            <button className="start-button" onClick={startQuiz}>
              <span className="start-button-text">INIZIA</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCHERMATA RISULTATI
  if (showResult) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="quiz-result">
            <h1 className="result-title">Quiz Completato!</h1>
            <div className="result-score">
              <span className="score-number">{score}</span>
              <span className="score-total">/ 7</span>
            </div>
            <p className="result-message">{getScoreMessage()}</p>

            <div className="result-details">
              <h3>Riepilogo Risposte:</h3>
              {answeredQuestions.map((answer, index) => (
                <div
                  key={index}
                  className={`answer-review ${answer.isCorrect ? 'correct' : 'wrong'}`}
                >
                  <div className="answer-review-number">Q{index + 1}</div>
                  <div className="answer-review-question">{answer.question}</div>
                  <div className="answer-review-status">
                    {answer.isCorrect ? 'OK' : 'NO'}
                  </div>
                </div>
              ))}
            </div>

            <button className="quiz-restart-btn" onClick={restartQuiz}>
              Riprova con nuove domande
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCHERMATA QUIZ
  const question = selectedQuestions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">Tech & Design Quiz</h1>
          <div className="quiz-meta">
            <div className="quiz-progress-info">
              <span className="progress-text">Domanda {currentQuestion + 1} / 7</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / 7) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="quiz-stats">
              <div className="stat-item">
                <span className="stat-label">Punteggio</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className={`stat-item timer ${timeLeft <= 5 ? 'timer-warning' : ''}`}>
                <span className="stat-label">Tempo</span>
                <span className="stat-value">{timeLeft}s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <h2 className="question-text">{question.question}</h2>

          <div className="answers-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === index
                    ? index === question.correct
                      ? 'correct'
                      : 'wrong'
                    : ''
                } ${
                  selectedAnswer !== null && index === question.correct
                    ? 'show-correct'
                    : ''
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="answer-text">{option}</span>
              </button>
            ))}
          </div>

          {answerFeedback && (
            <div className={`feedback-message ${answerFeedback}`}>
              {answerFeedback === 'correct' && 'Risposta Corretta!'}
              {answerFeedback === 'wrong' && 'Risposta Sbagliata!'}
              {answerFeedback === 'timeout' && 'Tempo Scaduto!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;