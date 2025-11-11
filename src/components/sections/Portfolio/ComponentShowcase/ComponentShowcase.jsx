import { useState, useEffect, useRef } from 'react';

const ComponentShowcase = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (activeComponent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeComponent]);

  const closeComponent = () => {
    setActiveComponent(null);
  };

  return (
    <>
      <style>{`
        /* Reset e Base */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .component-showcase {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          color: #fff;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .component-showcase::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(0, 255, 255, 0.03) 3px);
          pointer-events: none;
          z-index: 1;
        }

        /* Preview Grid */
        .preview-grid {
          position: relative;
          z-index: 2;
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .showcase-title {
          font-size: 3.5rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #00ffff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
          letter-spacing: 2px;
        }

        .showcase-subtitle {
          text-align: center;
          color: #888;
          margin-bottom: 4rem;
          font-size: 1.1rem;
        }

        .previews-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        /* Preview Cards */
        .preview-card {
          background: rgba(20, 20, 35, 0.6);
          border: 2px solid rgba(0, 255, 255, 0.2);
          border-radius: 16px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .preview-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 136, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .preview-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 255, 255, 0.6);
          box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1);
        }

        .preview-card:hover::before {
          opacity: 1;
        }

        .preview-content {
          position: relative;
          z-index: 1;
        }

        .preview-title {
          font-size: 1.5rem;
          margin: 1.5rem 0 0.5rem;
          color: #00ffff;
          font-weight: 700;
        }

        .preview-description {
          color: #aaa;
          font-size: 0.95rem;
        }

        /* Mini Previews */
        .mini-scroll {
          height: 120px;
          overflow: hidden;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .scroll-track {
          display: flex;
          gap: 10px;
          animation: miniScroll 3s linear infinite;
        }

        @keyframes miniScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .scroll-item {
          min-width: 80px;
          height: 60px;
          background: linear-gradient(135deg, #00ffff, #00ff88);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: #000;
          margin-top: 30px;
        }

        .mini-animation {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }

        .morph-blob {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: miniMorph 3s ease-in-out infinite;
          filter: blur(2px);
        }

        @keyframes miniMorph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(0deg) scale(1);
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            transform: rotate(180deg) scale(1.2);
          }
        }

        .mini-stone {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }

        .stone-gem {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff00ff, #00ffff);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          animation: miniGemRotate 4s linear infinite;
          filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.6));
        }

        @keyframes miniGemRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .mini-3d {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          perspective: 400px;
        }

        .cube-mini {
          width: 60px;
          height: 60px;
          position: relative;
          transform-style: preserve-3d;
          animation: miniCubeRotate 8s linear infinite;
        }

        @keyframes miniCubeRotate {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .cube-face-mini {
          position: absolute;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 255, 136, 0.3));
          border: 1px solid rgba(0, 255, 255, 0.6);
        }

        .cube-face-mini.front  { transform: translateZ(30px); }
        .cube-face-mini.back   { transform: rotateY(180deg) translateZ(30px); }
        .cube-face-mini.left   { transform: rotateY(-90deg) translateZ(30px); }
        .cube-face-mini.right  { transform: rotateY(90deg) translateZ(30px); }
        .cube-face-mini.top    { transform: rotateX(90deg) translateZ(30px); }
        .cube-face-mini.bottom { transform: rotateX(-90deg) translateZ(30px); }

        /* Full Component */
        .full-component {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .close-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: rgba(0, 255, 255, 0.1);
          border: 2px solid #00ffff;
          border-radius: 50%;
          color: #00ffff;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 101;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .close-btn:hover {
          background: rgba(0, 255, 255, 0.2);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        /* Slider Component */
        .slider-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .slider-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #00ffff;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          position: absolute;
          top: 3rem;
        }

        .slider-instruction {
          color: #888;
          font-size: 1.1rem;
          position: absolute;
          top: 7rem;
        }

        .slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem 0;
          width: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        .slider-line {
          display: flex;
          gap: 2rem;
          will-change: transform;
        }

        .playing .slider-line-1 {
          animation: infiniteSlide 25s linear infinite;
        }

        .playing .slider-line-2 {
          animation: infiniteSlide 30s linear infinite reverse;
        }

        .playing .slider-line-3 {
          animation: infiniteSlide 35s linear infinite;
        }

        .paused .slider-line-1,
        .paused .slider-line-2,
        .paused .slider-line-3 {
          animation-play-state: paused;
        }

        @keyframes infiniteSlide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .slider-line img {
          width: 300px;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid rgba(0, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .slider-line img:hover {
          transform: scale(1.05);
          border-color: rgba(0, 255, 255, 0.8);
          box-shadow: 0 8px 30px rgba(0, 255, 255, 0.4);
          z-index: 10;
        }

        .play-pause-btn {
          position: absolute;
          bottom: 4rem;
          width: 80px;
          height: 80px;
          background: rgba(0, 255, 255, 0.1);
          border: 3px solid #00ffff;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .play-pause-btn:hover {
          background: rgba(0, 255, 255, 0.2);
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
        }

        .play-pause-btn:active {
          transform: scale(0.95);
        }

        .play-icon {
          color: #00ffff;
          font-size: 2rem;
          margin-left: 5px;
          transition: opacity 0.2s ease;
        }

        .pause-icon {
          display: flex;
          gap: 8px;
          transition: opacity 0.2s ease;
        }

        .pause-icon span {
          width: 8px;
          height: 32px;
          background: #00ffff;
          border-radius: 2px;
        }

        .play-icon.hidden,
        .pause-icon.hidden {
          opacity: 0;
          position: absolute;
          pointer-events: none;
        }

        /* Animation Component */
        .animation-container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
          position: relative;
          overflow: hidden;
        }

        .liquid-morph {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .blob {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(40px);
          mix-blend-mode: screen;
          animation: morphing 8s ease-in-out infinite;
        }

        .blob-1 {
          background: linear-gradient(135deg, #00ffff, #0088ff);
          top: 0;
          left: 0;
          animation-delay: 0s;
        }

        .blob-2 {
          background: linear-gradient(135deg, #ff00ff, #ff0088);
          top: 50px;
          left: 50px;
          animation-delay: 2s;
        }

        .blob-3 {
          background: linear-gradient(135deg, #00ff88, #88ff00);
          top: 100px;
          left: 100px;
          animation-delay: 4s;
        }

        @keyframes morphing {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
            transform: translate(50px, -30px) rotate(90deg) scale(1.1);
          }
          50% {
            border-radius: 50% 50% 30% 70% / 60% 40% 50% 50%;
            transform: translate(-30px, 50px) rotate(180deg) scale(0.9);
          }
          75% {
            border-radius: 30% 70% 40% 60% / 50% 50% 70% 30%;
            transform: translate(40px, 40px) rotate(270deg) scale(1.15);
          }
        }

        .animation-title {
          margin-top: 3rem;
          font-size: 3rem;
          background: linear-gradient(135deg, #00ffff, #ff00ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGlow 2s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 30px rgba(255, 0, 255, 0.8)); }
        }

        /* Stone Component */
        .stone-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
          position: relative;
        }

        .stone-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #00ffff;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }

        .stone-instruction {
          color: #888;
          margin-bottom: 3rem;
          font-size: 1.1rem;
          text-align: center;
          max-width: 600px;
        }

        .magic-stone {
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s ease;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .magic-stone:hover {
          transform: scale(1.05);
        }

        .magic-stone:active {
          transform: scale(0.95);
        }

        .stone-core {
          position: relative;
          width: 200px;
          height: 200px;
          animation: stoneFloat 4s ease-in-out infinite;
        }

        @keyframes stoneFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .stone-facet {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff00ff, #00ffff, #00ff88);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          opacity: 0.8;
        }

        .facet-1 {
          transform: rotate(0deg) scale(1);
          animation: facetPulse 3s ease-in-out infinite;
        }

        .facet-2 {
          transform: rotate(45deg) scale(0.8);
          animation: facetPulse 3s ease-in-out infinite 0.5s;
        }

        .facet-3 {
          transform: rotate(90deg) scale(0.6);
          animation: facetPulse 3s ease-in-out infinite 1s;
        }

        .facet-4 {
          transform: rotate(135deg) scale(0.4);
          animation: facetPulse 3s ease-in-out infinite 1.5s;
        }

        @keyframes facetPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }

        .stone-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.4), transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        .stone-hint {
          color: #666;
          margin-top: 3rem;
          font-size: 0.9rem;
          text-align: center;
        }

        /* Magic Cursor */
        .magic-custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          font-size: 24px;
          transform: translate(-50%, -50%);
          transition: none;
        }

        body.magic-cursor {
          cursor: none !important;
        }

        body.magic-cursor * {
          cursor: none !important;
        }

        body.cursor-sparkle .magic-custom-cursor::before {
          content: '✨';
          animation: cursorFloat 1s ease-in-out infinite;
        }

        body.cursor-star .magic-custom-cursor::before {
          content: '⭐';
          animation: cursorSpin 2s linear infinite;
        }

        body.cursor-circle .magic-custom-cursor::before {
          content: '◉';
          font-size: 32px;
          color: #00ffff;
          animation: cursorPulse 1s ease-in-out infinite;
        }

        body.cursor-cross .magic-custom-cursor::before {
          content: '✛';
          font-size: 28px;
          color: #ff00ff;
          animation: cursorRotate 3s linear infinite;
        }

        body.cursor-diamond .magic-custom-cursor::before {
          content: '◆';
          color: #00ff88;
          animation: cursorBounce 1s ease-in-out infinite;
        }

        body.cursor-heart .magic-custom-cursor::before {
          content: '💖';
          animation: cursorBeat 1.5s ease-in-out infinite;
        }

        body.cursor-arrow .magic-custom-cursor::before {
          content: '➤';
          color: #ffff00;
          animation: cursorShake 0.5s ease-in-out infinite;
        }

        body.cursor-plus .magic-custom-cursor::before {
          content: '✚';
          font-size: 32px;
          color: #ff0088;
          animation: cursorExpand 1s ease-in-out infinite;
        }

        @keyframes cursorFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes cursorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cursorPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        @keyframes cursorRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cursorBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes cursorBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
        }

        @keyframes cursorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        @keyframes cursorExpand {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.4) rotate(90deg); }
        }

        /* 3D Model */
        .model3d-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
          position: relative;
        }

        .model3d-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #00ffff;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          position: absolute;
          top: 3rem;
        }

        .model3d-instruction {
          color: #888;
          margin-bottom: 3rem;
          font-size: 1.1rem;
          text-align: center;
          max-width: 600px;
          position: absolute;
          top: 7rem;
        }

        .model3d-viewport {
          width: 600px;
          height: 600px;
          perspective: 1000px;
          cursor: grab;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
        }

        .model3d-viewport:active {
          cursor: grabbing;
        }

        .model3d-scene {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube-3d {
          width: 250px;
          height: 250px;
          position: relative;
          transform-style: preserve-3d;
        }

        .cube-face {
          position: absolute;
          width: 250px;
          height: 250px;
          background: rgba(10, 10, 30, 0.9);
          border: 3px solid #00ffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #00ffff;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .cube-face.front {
          transform: translateZ(125px);
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 150, 255, 0.2));
        }

        .cube-face.back {
          transform: rotateY(180deg) translateZ(125px);
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(255, 0, 150, 0.2));
        }

        .cube-face.left {
          transform: rotateY(-90deg) translateZ(125px);
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 200, 100, 0.2));
        }

        .cube-face.right {
          transform: rotateY(90deg) translateZ(125px);
          background: linear-gradient(135deg, rgba(255, 255, 0, 0.2), rgba(200, 200, 0, 0.2));
        }

        .cube-face.top {
          transform: rotateX(90deg) translateZ(125px);
          background: linear-gradient(135deg, rgba(255, 136, 0, 0.2), rgba(200, 100, 0, 0.2));
        }

        .cube-face.bottom {
          transform: rotateX(-90deg) translateZ(125px);
          background: linear-gradient(135deg, rgba(136, 0, 255, 0.2), rgba(100, 0, 200, 0.2));
        }

        .face-content {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          letter-spacing: 3px;
        }

        .model3d-hint {
          color: #666;
          margin-top: 3rem;
          font-size: 1rem;
          text-align: center;
          position: absolute;
          bottom: 3rem;
          font-family: 'Courier New', monospace;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .showcase-title {
            font-size: 2.5rem;
          }

          .showcase-subtitle {
            font-size: 0.95rem;
            padding: 0 1rem;
          }
          
          .previews-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 1rem;
          }

          .preview-card {
            padding: 1.5rem;
          }
          
          .slider-line img {
            width: 200px;
            height: 133px;
          }

          .slider-title,
          .animation-title,
          .stone-title,
          .model3d-title {
            font-size: 2rem;
            padding: 0 1rem;
            text-align: center;
          }

          .slider-instruction,
          .stone-instruction,
          .model3d-instruction {
            font-size: 0.95rem;
            padding: 0 1rem;
          }
          
          .liquid-morph {
            width: 300px;
            height: 300px;
          }
          
          .blob {
            width: 200px;
            height: 200px;
          }
          
          .stone-core {
            width: 150px;
            height: 150px;
          }

          .magic-stone {
            width: 250px;
            height: 250px;
          }

          .cube-3d {
            width: 180px;
            height: 180px;
          }

          .cube-face {
            width: 180px;
            height: 180px;
            font-size: 1.2rem;
          }

          .cube-face.front { transform: translateZ(90px); }
          .cube-face.back { transform: rotateY(180deg) translateZ(90px); }
          .cube-face.left { transform: rotateY(-90deg) translateZ(90px); }
          .cube-face.right { transform: rotateY(90deg) translateZ(90px); }
          .cube-face.top { transform: rotateX(90deg) translateZ(90px); }
          .cube-face.bottom { transform: rotateX(-90deg) translateZ(90px); }

          .model3d-viewport {
            width: 90vw;
            height: 400px;
            touch-action: none;
          }

          .play-pause-btn {
            width: 70px;
            height: 70px;
            bottom: 3rem;
          }

          .pause-icon span {
            width: 6px;
            height: 28px;
          }

          .model3d-hint {
            font-size: 0.9rem;
            bottom: 2rem;
          }

          .close-btn {
            width: 45px;
            height: 45px;
            top: 1.5rem;
            right: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .showcase-title {
            font-size: 2rem;
          }

          .preview-grid {
            padding: 2rem 1rem;
          }

          .slider-title,
          .animation-title,
          .stone-title,
          .model3d-title {
            font-size: 1.75rem;
            top: 2rem;
          }

          .slider-instruction,
          .stone-instruction,
          .model3d-instruction {
            font-size: 0.85rem;
            top: 5.5rem;
          }

          .cube-3d {
            width: 140px;
            height: 140px;
          }

          .cube-face {
            width: 140px;
            height: 140px;
            font-size: 1rem;
          }

          .cube-face.front { transform: translateZ(70px); }
          .cube-face.back { transform: rotateY(180deg) translateZ(70px); }
          .cube-face.left { transform: rotateY(-90deg) translateZ(70px); }
          .cube-face.right { transform: rotateY(90deg) translateZ(70px); }
          .cube-face.top { transform: rotateX(90deg) translateZ(70px); }
          .cube-face.bottom { transform: rotateX(-90deg) translateZ(70px); }

          .model3d-viewport {
            height: 350px;
          }

          .slider-line img {
            width: 160px;
            height: 107px;
          }
        }
      `}</style>

      <div className="component-showcase">
        {/* Preview Grid */}
        {!activeComponent && (
          <div className="preview-grid">
            <h1 className="showcase-title">Component Showcase</h1>
            <p className="showcase-subtitle">Click su una preview per espandere il componente</p>
            
            <div className="previews-container">
              {/* Preview 1: Image Slider */}
              <div 
                className="preview-card preview-scroll"
                onClick={() => setActiveComponent('slider')}
              >
                <div className="preview-content">
                  <div className="mini-scroll">
                    <div className="scroll-track">
                      <div className="scroll-item">IMG</div>
                      <div className="scroll-item">IMG</div>
                      <div className="scroll-item">IMG</div>
                    </div>
                  </div>
                  <h3 className="preview-title">Image Slider</h3>
                  <p className="preview-description">Slider con play/pause</p>
                </div>
              </div>

              {/* Preview 2: Modern Animation */}
              <div 
                className="preview-card preview-animation"
                onClick={() => setActiveComponent('animation')}
              >
                <div className="preview-content">
                  <div className="mini-animation">
                    <div className="morph-blob"></div>
                  </div>
                  <h3 className="preview-title">Liquid Morph</h3>
                  <p className="preview-description">Animazione fluida moderna</p>
                </div>
              </div>

              {/* Preview 3: Magic Stone */}
              <div 
                className="preview-card preview-stone"
                onClick={() => setActiveComponent('stone')}
              >
                <div className="preview-content">
                  <div className="mini-stone">
                    <div className="stone-gem"></div>
                  </div>
                  <h3 className="preview-title">Magic Stone</h3>
                  <p className="preview-description">Pietra che cambia il cursore</p>
                </div>
              </div>

              {/* Preview 4: 3D Model */}
              <div 
                className="preview-card preview-3d"
                onClick={() => setActiveComponent('model3d')}
              >
                <div className="preview-content">
                  <div className="mini-3d">
                    <div className="cube-mini">
                      <div className="cube-face-mini front"></div>
                      <div className="cube-face-mini back"></div>
                      <div className="cube-face-mini left"></div>
                      <div className="cube-face-mini right"></div>
                      <div className="cube-face-mini top"></div>
                      <div className="cube-face-mini bottom"></div>
                    </div>
                  </div>
                  <h3 className="preview-title">3D Model</h3>
                  <p className="preview-description">Figura 3D manipolabile</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Component: Image Slider with Play/Pause */}
        {activeComponent === 'slider' && (
          <div className="full-component">
            <button className="close-btn" onClick={closeComponent}>✕</button>
            <ImageSlider />
          </div>
        )}

        {/* Full Component: Modern Animation */}
        {activeComponent === 'animation' && (
          <div className="full-component">
            <button className="close-btn" onClick={closeComponent}>✕</button>
            <div className="animation-container">
              <div className="liquid-morph">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
              </div>
              <h2 className="animation-title">Liquid Morphing</h2>
            </div>
          </div>
        )}

        {/* Full Component: Magic Stone */}
        {activeComponent === 'stone' && (
          <div className="full-component">
            <button className="close-btn" onClick={closeComponent}>✕</button>
            <MagicStone />
          </div>
        )}

        {/* Full Component: 3D Model */}
        {activeComponent === 'model3d' && (
          <div className="full-component">
            <button className="close-btn" onClick={closeComponent}>✕</button>
            <Model3D />
          </div>
        )}
      </div>
    </>
  );
};

// Componente Image Slider con Play/Pause
const ImageSlider = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">Infinite Image Slider</h2>
      <p className="slider-instruction">Click play/pause per controllare lo slider</p>
      
      <div className={`slider-wrapper ${isPlaying ? 'playing' : 'paused'}`}>
        <div className="slider-line slider-line-1">
          <img src="https://picsum.photos/300/200?random=1" alt="" />
          <img src="https://picsum.photos/300/200?random=2" alt="" />
          <img src="https://picsum.photos/300/200?random=3" alt="" />
          <img src="https://picsum.photos/300/200?random=4" alt="" />
          <img src="https://picsum.photos/300/200?random=5" alt="" />
          <img src="https://picsum.photos/300/200?random=6" alt="" />
          <img src="https://picsum.photos/300/200?random=1" alt="" />
          <img src="https://picsum.photos/300/200?random=2" alt="" />
          <img src="https://picsum.photos/300/200?random=3" alt="" />
          <img src="https://picsum.photos/300/200?random=4" alt="" />
          <img src="https://picsum.photos/300/200?random=5" alt="" />
          <img src="https://picsum.photos/300/200?random=6" alt="" />
        </div>
        <div className="slider-line slider-line-2">
          <img src="https://picsum.photos/300/200?random=7" alt="" />
          <img src="https://picsum.photos/300/200?random=8" alt="" />
          <img src="https://picsum.photos/300/200?random=9" alt="" />
          <img src="https://picsum.photos/300/200?random=10" alt="" />
          <img src="https://picsum.photos/300/200?random=11" alt="" />
          <img src="https://picsum.photos/300/200?random=12" alt="" />
          <img src="https://picsum.photos/300/200?random=7" alt="" />
          <img src="https://picsum.photos/300/200?random=8" alt="" />
          <img src="https://picsum.photos/300/200?random=9" alt="" />
          <img src="https://picsum.photos/300/200?random=10" alt="" />
          <img src="https://picsum.photos/300/200?random=11" alt="" />
          <img src="https://picsum.photos/300/200?random=12" alt="" />
        </div>
        <div className="slider-line slider-line-3">
          <img src="https://picsum.photos/300/200?random=13" alt="" />
          <img src="https://picsum.photos/300/200?random=14" alt="" />
          <img src="https://picsum.photos/300/200?random=15" alt="" />
          <img src="https://picsum.photos/300/200?random=16" alt="" />
          <img src="https://picsum.photos/300/200?random=17" alt="" />
          <img src="https://picsum.photos/300/200?random=18" alt="" />
          <img src="https://picsum.photos/300/200?random=13" alt="" />
          <img src="https://picsum.photos/300/200?random=14" alt="" />
          <img src="https://picsum.photos/300/200?random=15" alt="" />
          <img src="https://picsum.photos/300/200?random=16" alt="" />
          <img src="https://picsum.photos/300/200?random=17" alt="" />
          <img src="https://picsum.photos/300/200?random=18" alt="" />
        </div>
      </div>

      <button className="play-pause-btn" onClick={togglePlay}>
        <div className={`play-icon ${isPlaying ? 'hidden' : ''}`}>▶</div>
        <div className={`pause-icon ${isPlaying ? '' : 'hidden'}`}>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

// Componente Magic Stone con gestione cursore
const MagicStone = () => {
  const [isHovering, setIsHovering] = useState(false);

  const cursorStyles = [
    'cursor-sparkle',
    'cursor-star',
    'cursor-circle',
    'cursor-cross',
    'cursor-diamond',
    'cursor-heart',
    'cursor-arrow',
    'cursor-plus'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.body.classList.contains('magic-cursor')) {
        const cursor = document.querySelector('.magic-custom-cursor');
        if (cursor) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    const randomCursor = cursorStyles[Math.floor(Math.random() * cursorStyles.length)];
    document.body.classList.add('magic-cursor', randomCursor);
    
    const cursorEl = document.createElement('div');
    cursorEl.className = 'magic-custom-cursor';
    document.body.appendChild(cursorEl);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    document.body.classList.remove('magic-cursor', ...cursorStyles);
    
    const cursorEl = document.querySelector('.magic-custom-cursor');
    if (cursorEl) {
      cursorEl.remove();
    }
  };

  const handleClick = () => {
    if (isHovering) {
      document.body.classList.remove(...cursorStyles);
      const randomCursor = cursorStyles[Math.floor(Math.random() * cursorStyles.length)];
      document.body.classList.add('magic-cursor', randomCursor);
    }
  };

  // Touch handlers per mobile
  const handleTouchStart = () => {
    setIsHovering(true);
    const randomCursor = cursorStyles[Math.floor(Math.random() * cursorStyles.length)];
    document.body.classList.add('magic-cursor', randomCursor);
    
    const cursorEl = document.createElement('div');
    cursorEl.className = 'magic-custom-cursor';
    document.body.appendChild(cursorEl);
  };

  const handleTouchEnd = () => {
    // Su mobile cambia cursore ad ogni touch
    if (isHovering) {
      document.body.classList.remove(...cursorStyles);
      const randomCursor = cursorStyles[Math.floor(Math.random() * cursorStyles.length)];
      document.body.classList.add('magic-cursor', randomCursor);
    }
  };

  return (
    <div className="stone-container">
      <h2 className="stone-title">Magic Stone</h2>
      <p className="stone-instruction">Passa sopra la pietra per cambiare il cursore, cliccala per randomizzare!</p>
      
      <div 
        className="magic-stone"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="stone-core">
          <div className="stone-facet facet-1"></div>
          <div className="stone-facet facet-2"></div>
          <div className="stone-facet facet-3"></div>
          <div className="stone-facet facet-4"></div>
          <div className="stone-glow"></div>
        </div>
      </div>
      
      <p className="stone-hint">Esci dalla zona della pietra per ripristinare il cursore originale</p>
    </div>
  );
};

// Componente Modello 3D Manipolabile
const Model3D = () => {
  const [rotation, setRotation] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const modelRef = useRef(null);

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault(); // Previeni lo scroll durante il drag

    const deltaX = e.touches[0].clientX - startPos.x;
    const deltaY = e.touches[0].clientY - startPos.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startPos]);

  return (
    <div className="model3d-container">
      <h2 className="model3d-title">3D Interactive Model</h2>
      <p className="model3d-instruction">Trascina con il mouse per ruotare il modello in ogni direzione</p>
      
      <div 
        className="model3d-viewport"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className="model3d-scene"
          ref={modelRef}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          <div className="cube-3d">
            <div className="cube-face front">
              <div className="face-content">FRONT</div>
            </div>
            <div className="cube-face back">
              <div className="face-content">BACK</div>
            </div>
            <div className="cube-face left">
              <div className="face-content">LEFT</div>
            </div>
            <div className="cube-face right">
              <div className="face-content">RIGHT</div>
            </div>
            <div className="cube-face top">
              <div className="face-content">TOP</div>
            </div>
            <div className="cube-face bottom">
              <div className="face-content">BOTTOM</div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="model3d-hint">Rotazione: X: {Math.round(rotation.x)}° | Y: {Math.round(rotation.y)}°</p>
    </div>
  );
};

export default ComponentShowcase;
