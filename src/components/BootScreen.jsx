import { useState, useEffect } from 'react';

const BootScreen = ({ onBootComplete }) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [bootStage, setBootStage] = useState('INITIALIZING');
  const [terminal, setTerminal] = useState([]);

  const bootMessages = [
    '> LOADING DATA...',
    '> PREPARING HUD...',
    '> PARSING TEXT...',
    '> READY TO LAUNCH',
    '> VIHENTE CONSULENZE DIGITALI - ONLINE'
  ];

  useEffect(() => {
    // Terminal messages
    const messageInterval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setTerminal(prev => [...prev, bootMessages[messageIndex]]);
        setMessageIndex(prev => prev + 1);
      } else {
        clearInterval(messageInterval);
      }
    }, 300);

    // Progress bar
    const progressTimeout = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setBootProgress(prev => {
          const newProgress = prev + Math.random() * 12;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setBootStage('SYSTEM ONLINE');
              setTimeout(() => {
                onBootComplete();
              }, 1000);
            }, 400);
            return 100;
          }
          return newProgress;
        });
      }, 220);
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(progressTimeout);
    };
  }, [messageIndex, bootMessages, onBootComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Boot Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'gridMove 4s linear infinite'
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1000px',
        padding: '2rem'
      }}>
        {/* Boot Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '7rem',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#0ff',
            textShadow: '0 0 20px #0ff, 0 0 40px #0ff',
            animation: 'glitch 5s infinite'
          }}>
            V//HENTE
          </h1>
          <p style={{
            color: 'rgba(0, 255, 255, 0.6)',
            fontSize: '1.25rem',
            letterSpacing: '0.3em',
            fontFamily: "'Share Tech Mono', monospace"
          }}>
            CONSULENZE DIGITALI
          </p>
        </div>
        
        {/* Terminal */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          height: '192px',
          overflow: 'hidden',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ height: '100%', overflowY: 'auto' }}>
            {terminal.map((message, index) => (
              <div key={index} style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: '#0f0',
                margin: '4px 0',
                textShadow: '0 0 10px #0f0',
                animation: 'flicker 0.15s infinite'
              }}>
                {message}
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            color: '#0ff',
            fontFamily: "'Share Tech Mono', monospace"
          }}>
            <span>{bootStage}</span>
            <span>{Math.floor(bootProgress)}%</span>
          </div>
          <div style={{
            position: 'relative',
            height: '12px',
            background: '#000',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(to right, rgb(6, 182, 212), rgb(103, 232, 249))',
              width: `${bootProgress}%`,
              transition: 'width 0.2s',
              boxShadow: '0 0 20px #0ff'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6, 182, 212, 0.2)',
              clipPath: `polygon(${Math.max(0, bootProgress - 5)}% 0, ${bootProgress}% 0, ${bootProgress}% 100%, ${Math.max(0, bootProgress - 5)}% 100%)`,
              animation: 'flicker 0.2s infinite'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;