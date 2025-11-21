import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationDebugPanel = () => {
  const location = useLocation();
  const [logs, setLogs] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [renderStart, setRenderStart] = useState(null);
  const [renderTime, setRenderTime] = useState(0);
  const [loadingComponent, setLoadingComponent] = useState(null);

  // Track page render time
  useEffect(() => {
    const startTime = performance.now();
    setRenderStart(startTime);
    setLoadingComponent(location.pathname);
    
    addLog(`🔄 Starting to load: ${location.pathname}`, '#ffaa00');

    const checkRender = () => {
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      setRenderTime(totalTime);
      setLoadingComponent(null);
      addLog(`✅ Page rendered in ${totalTime.toFixed(2)}ms`, '#00ff00');
    };

    if (document.readyState === 'complete') {
      setTimeout(checkRender, 100);
    } else {
      window.addEventListener('load', checkRender);
    }

    const timeout = setTimeout(checkRender, 1000);

    return () => {
      window.removeEventListener('load', checkRender);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  const addLog = (message, color = '#00ffff') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      {
        timestamp,
        message,
        color
      },
      ...prev.slice(0, 29)
    ]);
  };

  // Intercept console logs
  useEffect(() => {
    const originalLog = console.log;

    console.log = function(...args) {
      originalLog.apply(console, args);

      if (args[0] && typeof args[0] === 'string' && args[0].includes('[NAVBAR DEBUG]')) {
        const timestamp = new Date().toLocaleTimeString();
        const message = args[0].replace(/\[NAVBAR DEBUG\]/, '').trim();
        
        setLogs(prev => [
          {
            timestamp,
            message,
            color: '#00ffff'
          },
          ...prev.slice(0, 29)
        ]);
      }
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          top: '80px',
          left: '10px',
          padding: '12px 16px',
          backgroundColor: 'rgba(0, 255, 255, 0.5)',
          border: '3px solid rgba(0, 255, 255, 1)',
          borderRadius: '8px',
          color: '#00ffff',
          cursor: 'pointer',
          zIndex: 99999999,
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.8)',
          pointerEvents: 'auto',
          touchAction: 'manipulation'
        }}
      >
        🔍
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '10px',
      right: '10px',
      width: 'auto',
      maxWidth: '380px',
      maxHeight: '55vh',
      backgroundColor: 'rgba(0, 0, 0, 0.98)',
      border: '3px solid rgba(0, 255, 255, 0.9)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '11px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.9), 0 0 60px rgba(0, 255, 255, 0.5)',
      zIndex: 99999999,
      pointerEvents: 'auto',
      touchAction: 'manipulation',
      fontFamily: 'monospace'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '2px solid rgba(0, 255, 255, 0.5)',
        backgroundColor: 'rgba(0, 255, 255, 0.15)',
        flexShrink: 0
      }}>
        <div style={{
          color: '#00ffff',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          🔍 Nav Debug
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setLogs([])}
            style={{
              padding: '6px 10px',
              backgroundColor: 'rgba(255, 100, 100, 0.3)',
              border: '2px solid rgba(255, 100, 100, 0.6)',
              borderRadius: '4px',
              color: '#ff6464',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}
          >
            Clear
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              padding: '6px 10px',
              backgroundColor: 'rgba(255, 255, 0, 0.3)',
              border: '2px solid rgba(255, 255, 0, 0.6)',
              borderRadius: '4px',
              color: '#ffff00',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}
          >
            ➖
          </button>
        </div>
      </div>

      {/* Performance Stats */}
      <div style={{
        padding: '10px',
        borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
        backgroundColor: 'rgba(0, 255, 255, 0.05)',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '10px'
        }}>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>📍 Path: </span>
            <span style={{ color: '#00ff00', fontWeight: 'bold', wordBreak: 'break-all' }}>
              {location.pathname}
            </span>
          </div>
          <div>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>⏱️ Render: </span>
            <span style={{ 
              color: renderTime > 1000 ? '#ff0000' : renderTime > 500 ? '#ffaa00' : '#00ff00', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {renderTime > 0 ? `${renderTime.toFixed(0)}ms` : 'Loading...'}
            </span>
          </div>
        </div>
        {loadingComponent && (
          <div style={{
            marginTop: '6px',
            padding: '5px',
            backgroundColor: 'rgba(255, 170, 0, 0.3)',
            borderLeft: '3px solid #ffaa00',
            borderRadius: '3px',
            fontSize: '9px',
            color: '#ffaa00',
            fontWeight: 'bold'
          }}>
            ⏳ Loading: {loadingComponent}
          </div>
        )}
      </div>

      {/* Logs */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
        minHeight: 0
      }}>
        {logs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            padding: '20px',
            fontSize: '10px'
          }}>
            Waiting for events...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              style={{
                marginBottom: '6px',
                padding: '5px',
                backgroundColor: 'rgba(0, 255, 255, 0.08)',
                borderLeft: '2px solid rgba(0, 255, 255, 0.6)',
                borderRadius: '3px',
                fontSize: '9px'
              }}
            >
              <div style={{
                fontSize: '8px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '2px'
              }}>
                {log.timestamp}
              </div>
              <div style={{
                color: log.color,
                fontWeight: 'bold',
                wordBreak: 'break-word',
                lineHeight: '1.2'
              }}>
                {log.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NavigationDebugPanel;