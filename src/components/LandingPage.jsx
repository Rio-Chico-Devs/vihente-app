import { useState, useEffect, useRef } from 'react';

const LandingPage = ({ startTime, onNavigateToServices }) => {
  const [uptime, setUptime] = useState('0m 0s');
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState('N/A');
  const [network, setNetwork] = useState('UNKNOWN');

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalsRef = useRef([]);

  useEffect(() => {
    console.log('🎯 LandingPage mounted');

    // Singolo interval per tempo E metriche
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }));
      
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      setUptime(`${mins}m ${secs}s`);

      if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        setMemory(`${memoryMB}MB`);
      }

      const conn = navigator.connection;
      const netType = conn && conn.effectiveType ? conn.effectiveType.toUpperCase() : 'ONLINE';
      setNetwork(netType);
    }, 2000);

    intervalsRef.current.push(timeInterval);

    // FPS counter ottimizzato
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 2000) {
        const calculatedFps = Math.round(frameCount * 1000 / (currentTime - lastTime));
        setFps(Math.min(calculatedFps, 60));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(measureFPS);
    }
    
    measureFPS();

    // Cleanup
    return () => {
      console.log('🧹 LandingPage cleanup START');
      
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      console.log('✅ LandingPage cleanup COMPLETE');
    };
  }, [startTime]);

  // Matrix Canvas ottimizzato
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEF0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 🌟 Caratteri brillanti e bianchi come icona binaria
      ctx.fillStyle = '#00ffff'; // Cyan puro brillante
      ctx.font = 'bold ' + fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i += 2) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 100);
    intervalsRef.current.push(interval);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Share Tech Mono', monospace", // ✅ Font base come ServicesPage
      animation: 'fadeInScan 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    }}>
      {/* Scan Line */}
      <div style={{
        position: 'fixed',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #0ff, transparent)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.3,
        boxShadow: '0 0 10px #0ff',
        animation: 'scanLineMove 4s linear infinite'
      }} />

      {/* Grid Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'gridScroll 40s linear infinite'
      }} />

      {/* Matrix Canvas - Caratteri brillanti */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.3, // Opacità moderata per caratteri definiti
          willChange: 'auto'
        }}
      />

      {/* HUD Decorations */}
      <div style={{
        position: 'fixed',
        top: '85px',
        left: '20px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        color: '#0ff',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '0 0 5px #0ff'
      }}>
        UPTIME<br/>{uptime}
      </div>

      <div style={{
        position: 'fixed',
        top: '85px',
        right: '20px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        color: '#0ff',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '0 0 5px #0ff',
        textAlign: 'right'
      }}>
        NET: {network}<br/>FPS: {fps}
      </div>

      <div style={{
        position: 'fixed',
        bottom: '85px',
        left: '20px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        color: '#0ff',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '0 0 5px #0ff'
      }}>
        MEM: {memory}<br/>REACT: 19.2
      </div>

      <div style={{
        position: 'fixed',
        bottom: '85px',
        right: '20px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        color: '#0ff',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '0 0 5px #0ff',
        textAlign: 'right'
      }}>
        HTTPS<br/>{currentTime}
      </div>

      {/* Header - IDENTICO A SERVIZI */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.3)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.875rem',
            fontWeight: 900,
            letterSpacing: '0.3em',
            color: '#0ff',
            textShadow: '0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff',
            animation: 'holoFlicker 4s infinite'
          }}>
            V//HENTE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* ✅ TITOLO SENZA LINEA - FONT OMOLOGATO A SERVIZI */}
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #0ff 0%, #00d4ff 50%, #0ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            position: 'relative'
          }}>
            CONSULENZE<br/>DIGITALI
          </h1>

          {/* ✅ SOTTOTITOLO - FONT OMOLOGATO A SERVIZI */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
            fontFamily: "'Share Tech Mono', monospace"
          }}>
            Creo la tua presenza digitale da zero, o ti aiuto a migliorare quella che già hai.
          </p>

          {/* ✅ BOTTONE - IDENTICO A SERVIZI */}
          <button
            onClick={onNavigateToServices}
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: 'transparent',
              color: '#0ff',
              border: '2px solid #0ff',
              borderRadius: '50px',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.background = '#0ff';
              e.currentTarget.style.boxShadow = '0 0 30px #0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#0ff';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              ESPLORA SERVIZI
            </span>
          </button>
        </div>
      </main>

      {/* Footer - IDENTICO A SERVIZI */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '2px solid rgba(0, 255, 255, 0.3)',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        padding: '1.5rem 0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: 'rgba(103, 232, 249, 0.5)',
            fontSize: '0.875rem',
            letterSpacing: '0.2em',
            fontFamily: "'Share Tech Mono', monospace" // ✅ Font esplicito
          }}>
            © 2025 VIHENTE - PER ASPERA AD ASTRA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;