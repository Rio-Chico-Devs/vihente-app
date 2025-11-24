import { useState, useEffect, useRef } from 'react';

const Contacts = () => {
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    service: 'Consulenza',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [showRateLimit, setShowRateLimit] = useState(false);

  // 🔧 FIX MEMORY LEAK: Track all timeouts
  const timeoutsRef = useRef([]);

  // 🔧 FIX MEMORY LEAK: Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsQuoteMode(!isQuoteMode);
    setFormData({
      name: '',
      email: '',
      reason: '',
      service: 'Consulenza',
      message: ''
    });
    setSubmitStatus(null);
    setShowRateLimit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canSubmit) {
      setShowRateLimit(true);
      const timeout1 = setTimeout(() => setShowRateLimit(false), 3000);
      timeoutsRef.current.push(timeout1);
      return;
    }
    
    setIsAnimating(true);
    setSubmitStatus(null);
    
    const timeout2 = setTimeout(() => {
      createDefragParticles();
    }, 2000);
    timeoutsRef.current.push(timeout2);
    
    const timeout3 = setTimeout(() => {
      setIsAnimating(false);
      setSubmitStatus('success');
      
      const timeout4 = setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          reason: '',
          service: 'Consulenza',
          message: ''
        });
      }, 100);
      timeoutsRef.current.push(timeout4);
      
      setCanSubmit(false);
      const timeout5 = setTimeout(() => {
        setCanSubmit(true);
      }, 10000);
      timeoutsRef.current.push(timeout5);
      
      const timeout6 = setTimeout(() => {
        setSubmitStatus(null);
      }, 4000);
      timeoutsRef.current.push(timeout6);
    }, 3000);
    timeoutsRef.current.push(timeout3);
  };

  const createDefragParticles = () => {
    const container = document.querySelector('.contacts-container');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 100 + Math.random() * 150;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: rgba(0, 255, 255, ${0.6 + Math.random() * 0.4});
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation: particleSpread 1s ease-out forwards;
      `;

      container.appendChild(particle);

      const timeout = setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 1000);
      timeoutsRef.current.push(timeout);
    }
  };

  return (
    <section style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Share Tech Mono', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes breathingGrid {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.01);
          }
        }

        @keyframes vignettePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
        }

        @keyframes modeSwitch {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="86.6" height="100" viewBox="0 0 86.6 100"><path d="M43.3 0 L86.6 25 L86.6 75 L43.3 100 L 0 75 L0 25 Z" fill="none" stroke="rgba(0,255,255,0.45)" stroke-width="1.2"/></svg>');
          background-size: 86.6px 100px;
          z-index: 2;
          box-shadow: 
            inset 0 0 80px rgba(0, 255, 255, 0.12),
            inset 0 0 40px rgba(0, 255, 255, 0.08);
          animation: breathingGrid 7s ease-in-out infinite;
        }

        .vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%);
          animation: vignettePulse 10s ease-in-out infinite;
          z-index: 3;
        }

        .vhs-scanlines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 255, 255, 0.01) 3px,
            rgba(0, 255, 255, 0.01) 6px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* LAYER CODICE DI SFONDO */
        .code-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .code-line {
          position: absolute;
          font-size: 16px;
          color: var(--color-primary-30, rgba(0, 255, 255, 0.3));
          white-space: nowrap;
          opacity: 0;
          animation: typewriter 3s ease-in-out forwards;
          text-shadow: 0 0 5px var(--color-primary-20, rgba(0, 255, 255, 0.2));
          font-weight: 500;
        }

        @keyframes typewriter {
          0% {
            opacity: 0;
            width: 0;
            overflow: hidden;
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            width: 100%;
            overflow: visible;
          }
        }

        .contacts-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 100%;
          max-width: 700px;
          padding: 0 1rem;
        }

        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #0ff;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
          text-align: center;
        }

        .section-subtitle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          color: rgba(0, 255, 255, 0.7);
          text-align: center;
          letter-spacing: 0.2em;
          margin: 0;
        }

        /* Mobile: subtitle sotto CONTATTI */
        @media (max-width: 1024px) {
          .section-subtitle {
            margin-bottom: 0.8rem;
          }
        }

        .mode-toggle-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        /* Desktop: bottone in alto a sinistra del form */
        @media (min-width: 1025px) {
          .mode-toggle-container {
            position: absolute;
            left: -260px;
            top: 0;
            margin-bottom: 0;
            align-items: flex-start;
            width: 220px;
          }
        }

        .mode-toggle-button {
          padding: 0.7rem 1.8rem;
          background: rgba(0, 255, 255, 0.1);
          border: 2px solid rgba(0, 255, 255, 0.4);
          color: rgba(0, 255, 255, 0.8);
          font-family: 'Orbitron', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .mode-toggle-button:hover {
          background: rgba(0, 255, 255, 0.2);
          border-color: rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
        }

        .mode-toggle-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .mode-toggle-button:hover::before {
          left: 100%;
        }

        .mode-toggle-text {
          position: relative;
          z-index: 1;
        }

        .form-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 20, 40, 0.6) 100%);
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 2px;
          box-shadow: 
            0 0 40px rgba(0, 255, 255, 0.2),
            inset 0 0 40px rgba(0, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .form-container:hover:not(.cube-animation):not(.reappearing) {
          border-color: rgba(0, 255, 255, 0.6);
          box-shadow: 
            0 0 60px rgba(0, 255, 255, 0.3),
            inset 0 0 60px rgba(0, 255, 255, 0.08);
        }

        .form-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0ff;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          margin-bottom: 0.8rem;
          text-align: center;
          animation: modeSwitch 0.5s ease-out;
        }

        .form-description {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-bottom: 0.8rem;
          line-height: 1.5;
        }

        .form-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          animation: modeSwitch 0.5s ease-out;
        }

        .form-field-full {
          grid-column: 1 / -1;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: rgba(0, 255, 255, 0.8);
          margin-bottom: 0.4rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(0, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.95);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(0, 255, 255, 0.8);
          background: rgba(0, 255, 255, 0.08);
          box-shadow: 
            0 0 15px rgba(0, 255, 255, 0.3),
            inset 0 0 10px rgba(0, 255, 255, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: 'Share Tech Mono', monospace;
        }

        .form-select {
          cursor: pointer;
          background-image: linear-gradient(45deg, transparent 50%, rgba(0, 255, 255, 0.8) 50%),
                            linear-gradient(135deg, rgba(0, 255, 255, 0.8) 50%, transparent 50%);
          background-position: calc(100% - 20px) calc(1em + 2px),
                               calc(100% - 15px) calc(1em + 2px);
          background-size: 5px 5px, 5px 5px;
          background-repeat: no-repeat;
          padding-right: 2.5rem;
          appearance: none;
        }

        .form-select option {
          background: rgba(0, 20, 40, 0.95);
          color: rgba(255, 255, 255, 0.95);
          padding: 0.5rem;
        }

        @keyframes transformToCube {
          0% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1);
            border-radius: 2px;
          }
          30% {
            transform: translateY(-20px) rotateX(15deg) rotateY(15deg) scale(0.95);
            border-radius: 10px;
          }
          60% {
            transform: translateY(-40px) rotateX(30deg) rotateY(30deg) scale(0.9);
            border-radius: 20px;
          }
          100% {
            transform: translateY(-50px) rotateX(45deg) rotateY(45deg) scale(0.85);
            border-radius: 30px;
            box-shadow: 
              0 0 60px rgba(0, 255, 255, 0.6),
              inset 0 0 40px rgba(0, 255, 255, 0.3);
          }
        }

        @keyframes cubeRotation {
          0% {
            transform: translateY(-50px) rotateX(45deg) rotateY(45deg) scale(0.85);
          }
          25% {
            transform: translateY(-50px) rotateX(135deg) rotateY(135deg) scale(0.85);
          }
          50% {
            transform: translateY(-50px) rotateX(225deg) rotateY(225deg) scale(0.85);
          }
          75% {
            transform: translateY(-50px) rotateX(315deg) rotateY(315deg) scale(0.85);
          }
          100% {
            transform: translateY(-50px) rotateX(405deg) rotateY(405deg) scale(0.85);
          }
        }

        @keyframes defragmentation {
          0% {
            transform: translateY(-50px) rotateX(405deg) rotateY(405deg) scale(0.85);
            opacity: 1;
            filter: blur(0px);
          }
          20% {
            transform: translateY(-60px) rotateX(405deg) rotateY(405deg) scale(0.8);
            opacity: 0.9;
            filter: blur(1px);
          }
          40% {
            transform: translateY(-80px) rotateX(405deg) rotateY(405deg) scale(0.6);
            opacity: 0.7;
            filter: blur(3px);
            box-shadow: 
              0 0 80px rgba(0, 255, 255, 0.8),
              inset 0 0 60px rgba(0, 255, 255, 0.5);
          }
          60% {
            transform: translateY(-120px) rotateX(405deg) rotateY(405deg) scale(0.4);
            opacity: 0.5;
            filter: blur(6px);
          }
          80% {
            transform: translateY(-180px) rotateX(405deg) rotateY(405deg) scale(0.2);
            opacity: 0.3;
            filter: blur(10px);
          }
          100% {
            transform: translateY(-300px) rotateX(405deg) rotateY(405deg) scale(0);
            opacity: 0;
            filter: blur(15px);
          }
        }

        @keyframes particleSpread {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        .form-container.cube-animation {
          animation: 
            transformToCube 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards,
            cubeRotation 1.2s 0.8s linear forwards,
            defragmentation 1s 2s ease-in forwards !important;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .form-container.cube-animation::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
          animation: particleGlow 1s 2s ease-out forwards;
          pointer-events: none;
          opacity: 0;
        }

        @keyframes particleGlow {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes reappear {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .form-container.reappearing {
          animation: reappear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
        }

        .rate-limit-warning {
          grid-column: 1 / -1;
          background: rgba(255, 165, 0, 0.1);
          border: 2px solid rgba(255, 165, 0, 0.6);
          color: rgba(255, 165, 0, 0.95);
          padding: 1rem;
          text-align: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          animation: successPulse 1.5s ease-in-out;
          box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
        }

        .submit-button {
          grid-column: 1 / -1;
          padding: 1rem 2rem;
          background: rgba(0, 255, 255, 0.1);
          border: 2px solid rgba(0, 255, 255, 0.5);
          color: rgba(0, 255, 255, 0.95);
          font-family: 'Orbitron', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .submit-button:hover:not(:disabled) {
          background: rgba(0, 255, 255, 0.2);
          border-color: rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-button-text {
          position: relative;
          z-index: 1;
        }

        .success-message {
          grid-column: 1 / -1;
          background: rgba(0, 255, 100, 0.1);
          border: 2px solid rgba(0, 255, 100, 0.6);
          color: rgba(0, 255, 100, 0.95);
          padding: 1rem;
          text-align: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          animation: successPulse 1.5s ease-in-out;
          box-shadow: 0 0 20px rgba(0, 255, 100, 0.3);
        }

        /* TABLET 768-1024px */
        @media (max-width: 1024px) and (min-width: 769px) {
          .contacts-container {
            max-width: 650px;
            transform: translate(-50%, -50%) scale(0.95);
          }

          .section-title {
            font-size: 2.2rem;
          }

          .form-container {
            padding: 1.8rem;
            gap: 1.3rem;
          }

          .form-title {
            font-size: 1.4rem;
          }

          .form-fields {
            gap: 1.1rem;
          }
        }

        /* MOBILE 481-768px */
        @media (max-width: 768px) and (min-width: 481px) {
          .contacts-container {
            max-width: 500px;
            transform: translate(-50%, -50%) scale(0.9);
          }

          .section-title {
            font-size: 1.9rem;
          }

          .section-subtitle {
            font-size: 0.8rem;
          }

          .mode-toggle-button {
            font-size: 0.75rem;
            padding: 0.6rem 1.5rem;
          }

          .form-container {
            padding: 1.5rem;
            gap: 1.2rem;
          }

          .form-title {
            font-size: 1.3rem;
          }

          .form-description {
            font-size: 0.8rem;
          }

          .form-fields {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-label {
            font-size: 0.75rem;
          }

          .form-input,
          .form-select,
          .form-textarea {
            font-size: 0.8rem;
            padding: 0.7rem 0.9rem;
          }

          .form-textarea {
            min-height: 90px;
          }

          .submit-button {
            font-size: 0.9rem;
            padding: 0.9rem 1.8rem;
          }
        }

        /* MOBILE 381-480px */
        @media (max-width: 480px) and (min-width: 381px) {
          .contacts-container {
            max-width: 360px;
            transform: translate(-50%, -50%) scale(0.9);
            padding: 0 0.8rem;
          }

          .section-title {
            font-size: 1.7rem;
          }

          .section-subtitle {
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }

          .mode-toggle-container {
            margin-bottom: 1.2rem;
          }

          .mode-toggle-button {
            font-size: 0.7rem;
            padding: 0.55rem 1.3rem;
          }

          .form-container {
            padding: 1.3rem;
            gap: 1rem;
          }

          .form-title {
            font-size: 1.2rem;
            margin-bottom: 0.6rem;
          }

          .form-description {
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }

          .form-fields {
            grid-template-columns: 1fr;
            gap: 0.9rem;
          }

          .form-label {
            font-size: 0.7rem;
            margin-bottom: 0.3rem;
          }

          .form-input,
          .form-select,
          .form-textarea {
            font-size: 0.75rem;
            padding: 0.65rem 0.8rem;
          }

          .form-textarea {
            min-height: 85px;
          }

          .submit-button {
            font-size: 0.85rem;
            padding: 0.85rem 1.6rem;
            margin-top: 0.3rem;
          }

          .rate-limit-warning,
          .success-message {
            font-size: 0.8rem;
            padding: 0.9rem;
          }
        }

        /* MOBILE TINY ≤380px */
        @media (max-width: 380px) {
          .contacts-container {
            max-width: 340px;
            transform: translate(-50%, -50%) scale(0.9);
            padding: 0 0.6rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 0.7rem;
            letter-spacing: 0.15em;
            margin-bottom: 0.5rem;
          }

          .mode-toggle-container {
            margin-bottom: 1rem;
          }

          .mode-toggle-button {
            font-size: 0.65rem;
            padding: 0.5rem 1.2rem;
          }

          .form-container {
            padding: 1.2rem;
            gap: 0.9rem;
          }

          .form-title {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          .form-description {
            font-size: 0.7rem;
            line-height: 1.4;
            margin-bottom: 0.5rem;
          }

          .form-fields {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .form-label {
            font-size: 0.65rem;
            margin-bottom: 0.3rem;
          }

          .form-input,
          .form-select,
          .form-textarea {
            font-size: 0.7rem;
            padding: 0.6rem 0.75rem;
          }

          .form-textarea {
            min-height: 80px;
          }

          .submit-button {
            font-size: 0.8rem;
            padding: 0.8rem 1.5rem;
            margin-top: 0.2rem;
          }

          .rate-limit-warning,
          .success-message {
            font-size: 0.75rem;
            padding: 0.85rem;
          }
        }

        /* ================================================
           LIGHT MODE (NIGHT MODE) - AMBER WARM
           Scientifically optimized for nighttime viewing
           ================================================ */

        [data-theme="light"] .section-title {
          color: var(--color-primary);
          text-shadow: var(--text-glow-title);
        }

        [data-theme="light"] .section-subtitle {
          color: var(--color-secondary-70);
        }

        [data-theme="light"] .grid-overlay {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="86.6" height="100" viewBox="0 0 86.6 100"><path d="M43.3 0 L86.6 25 L86.6 75 L43.3 100 L0 75 L0 25 Z" fill="none" stroke="rgba(180,120,60,0.12)" stroke-width="1"/></svg>');
          box-shadow:
            inset 0 0 40px rgba(232, 160, 48, 0.05),
            inset 0 0 20px rgba(232, 160, 48, 0.03);
        }

        [data-theme="light"] .vhs-scanlines::before {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(180, 120, 60, 0.02) 2px,
            rgba(180, 120, 60, 0.02) 4px
          );
        }

        [data-theme="light"] .code-line {
          color: var(--color-secondary-30);
          text-shadow: none;
        }

        [data-theme="light"] .mode-toggle-button {
          background: rgba(232, 160, 48, 0.08);
          border-color: var(--color-primary-30);
          color: var(--color-primary-80);
        }

        [data-theme="light"] .mode-toggle-button:hover {
          background: rgba(232, 160, 48, 0.15);
          border-color: var(--color-primary-50);
          box-shadow: 0 5px 20px rgba(232, 160, 48, 0.2);
        }

        [data-theme="light"] .form-container {
          background: rgba(8, 6, 4, 0.6);
          border-color: var(--color-primary-30);
          box-shadow:
            0 0 30px rgba(232, 160, 48, 0.15),
            inset 0 0 30px rgba(232, 160, 48, 0.03);
        }

        [data-theme="light"] .form-title {
          color: var(--color-primary);
          text-shadow: var(--text-glow-title);
        }

        [data-theme="light"] .form-description,
        [data-theme="light"] .form-label {
          color: var(--color-secondary-90);
        }

        [data-theme="light"] .form-input,
        [data-theme="light"] .form-select,
        [data-theme="light"] .form-textarea {
          background: rgba(8, 6, 4, 0.5);
          border-color: var(--color-primary-20);
          color: var(--color-secondary-90);
        }

        [data-theme="light"] .form-input:focus,
        [data-theme="light"] .form-select:focus,
        [data-theme="light"] .form-textarea:focus {
          border-color: var(--color-primary-50);
          box-shadow: 0 0 15px rgba(232, 160, 48, 0.15);
        }

        [data-theme="light"] .submit-button {
          background: linear-gradient(135deg, var(--color-primary-80), var(--color-secondary-70));
          border-color: var(--color-primary-50);
          color: var(--bg-black);
          box-shadow: 0 6px 25px rgba(232, 160, 48, 0.2);
        }

        [data-theme="light"] .submit-button:hover {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          box-shadow: 0 8px 35px rgba(232, 160, 48, 0.35);
        }

        [data-theme="light"] .success-message {
          background: rgba(76, 175, 80, 0.15);
          border-color: rgba(76, 175, 80, 0.5);
          color: rgb(160, 200, 130);
        }

        [data-theme="light"] .rate-limit-warning {
          background: rgba(255, 152, 0, 0.15);
          border-color: rgba(255, 152, 0, 0.5);
          color: rgb(255, 200, 120);
        }
      `}</style>

      <div className="vhs-scanlines" />

      <div className="grid-overlay">
        <div className="vignette-overlay"></div>
      </div>

      <div className="contacts-container">
        <h1 className="section-title">CONTATTI</h1>

        <div 
          className={`form-container ${isAnimating ? 'cube-animation' : ''} ${submitStatus === 'success' && !isAnimating ? 'reappearing' : ''}`}
        >
          <div className="mode-toggle-container">
            <button 
              type="button"
              className="mode-toggle-button"
              onClick={toggleMode}
            >
              <span className="mode-toggle-text">
                {isQuoteMode ? '📧 Contatto Generale' : 'Richiedi un Preventivo'}
              </span>
            </button>
            <p className="section-subtitle">
              {isQuoteMode ? '→ RICHIEDI UN PREVENTIVO' : ''}
            </p>
          </div>

          <div>
            <h2 className="form-title">
              {isQuoteMode ? 'RICHIESTA PREVENTIVO' : 'MODULO DI CONTATTO'}
            </h2>
            <p className="form-description">
              {isQuoteMode 
                ? 'Compila il form con i dettagli del servizio richiesto e ti risponderò con un preventivo personalizzato.'
                : 'Compila il form e ti risponderò il prima possibile. Tutti i campi sono obbligatori.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Nome/Azienda *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Inserisci nome o ragione sociale"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tua@email.it"
                  required
                />
              </div>

              {!isQuoteMode ? (
                <div className="form-group form-field-full">
                  <label className="form-label" htmlFor="reason">
                    Motivo Contatto *
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="form-input"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Es: Informazioni generali, collaborazione, ecc."
                    required
                  />
                </div>
              ) : (
                <div className="form-group form-field-full">
                  <label className="form-label" htmlFor="service">
                    Prestazione Richiesta *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="Consulenza">Consulenza</option>
                    <option value="Grafica">Grafica</option>
                    <option value="Sito Web o componenti">Sito Web o componenti</option>
                    <option value="Social e SEO">Social e SEO</option>
                    <option value="Content Creation">Content Creation</option>
                  </select>
                </div>
              )}

              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="message">
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isQuoteMode 
                    ? "Descrivi in dettaglio il progetto e i tuoi obiettivi..."
                    : "Scrivi qui il tuo messaggio..."}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                <span className="submit-button-text">
                  {isQuoteMode 
                    ? '→ INVIA RICHIESTA PREVENTIVO' 
                    : '→ INVIA MESSAGGIO'}
                </span>
              </button>

              {showRateLimit && (
                <div className="rate-limit-warning">
                  ⚠ Hai appena inviato una richiesta, aspetta qualche secondo
                </div>
              )}

              {submitStatus === 'success' && !isAnimating && (
                <div className="success-message">
                  ✓ {isQuoteMode 
                    ? 'Richiesta preventivo inviata con successo! Ti risponderò a breve.' 
                    : 'Messaggio inviato con successo! Ti risponderò il prima possibile.'}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contatti",
          "description": "Contattami per progetti, collaborazioni e preventivi personalizzati"
        })}
      </script>
    </section>
  );
};

export default Contacts;