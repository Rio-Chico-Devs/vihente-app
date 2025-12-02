import { useState, useEffect } from 'react';
import './QuizPage.css';

const QuizPage = () => {
  // Pool di 21 domande su informatica e grafica
  const questionPool = [
    {
      id: 1,
      question: "Qual è la profondità di colore standard per il formato PNG-24?",
      options: ["16 bit", "24 bit", "32 bit", "48 bit"],
      correct: 2 // 32 bit (24 bit RGB + 8 bit alpha)
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

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Seleziona 7 domande randomiche all'inizio
  useEffect(() => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return; // Previeni click multipli

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === selectedQuestions[currentQuestion].correct;

    setAnswerFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(score + 1);
    }

    // Salva la risposta
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: selectedQuestions[currentQuestion].question,
        selectedAnswer: answerIndex,
        correctAnswer: selectedQuestions[currentQuestion].correct,
        isCorrect
      }
    ]);

    // Passa alla prossima domanda dopo 1.5 secondi
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
  };

  const getScoreMessage = () => {
    if (score === 7) return "PERFETTO! Sei un vero esperto! 🎯";
    if (score >= 5) return "Ottimo lavoro! 👏";
    if (score >= 3) return "Non male, continua così! 💪";
    return "Dai, riprova! Puoi fare meglio! 📚";
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-loading">Caricamento quiz...</div>
      </div>
    );
  }

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
                  <div className="answer-review-number">Domanda {index + 1}</div>
                  <div className="answer-review-question">{answer.question}</div>
                  <div className="answer-review-status">
                    {answer.isCorrect ? '✓ Corretta' : '✗ Sbagliata'}
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

  const question = selectedQuestions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">Tech & Design Quiz</h1>
          <div className="quiz-progress">
            <span className="progress-text">Domanda {currentQuestion + 1} di 7</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / 7) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="quiz-score">Punteggio: {score}</div>
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
              {answerFeedback === 'correct' ? '✓ Risposta Corretta!' : '✗ Risposta Sbagliata!'}
            </div>
          )}
        </div>

        <div className="quiz-footer">
          <div className="quiz-info">
            Domande randomiche da un pool di {questionPool.length} domande
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
