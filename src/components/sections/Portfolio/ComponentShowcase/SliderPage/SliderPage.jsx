import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SliderPage.css';

const SliderPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="slider-page">
      {/* Back button */}
      <button className="back-to-showcase" onClick={() => navigate('/portfolio/componenti')}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span>Torna alla Showcase</span>
      </button>

      <div className="slider-container">
        <h2 className="slider-title">Infinite Image Slider</h2>
        <p className="slider-instruction">Click play/pause per controllare lo slider</p>
        
        <div className={`slider-wrapper ${isPlaying ? 'playing' : 'paused'}`}>
          <div className="slider-line slider-line-1">
            <img src="https://picsum.photos/300/200?random=1" alt="Slide 1" />
            <img src="https://picsum.photos/300/200?random=2" alt="Slide 2" />
            <img src="https://picsum.photos/300/200?random=3" alt="Slide 3" />
            <img src="https://picsum.photos/300/200?random=4" alt="Slide 4" />
            <img src="https://picsum.photos/300/200?random=5" alt="Slide 5" />
            <img src="https://picsum.photos/300/200?random=6" alt="Slide 6" />
            <img src="https://picsum.photos/300/200?random=1" alt="Slide 1 Duplicate" />
            <img src="https://picsum.photos/300/200?random=2" alt="Slide 2 Duplicate" />
            <img src="https://picsum.photos/300/200?random=3" alt="Slide 3 Duplicate" />
            <img src="https://picsum.photos/300/200?random=4" alt="Slide 4 Duplicate" />
            <img src="https://picsum.photos/300/200?random=5" alt="Slide 5 Duplicate" />
            <img src="https://picsum.photos/300/200?random=6" alt="Slide 6 Duplicate" />
          </div>
          <div className="slider-line slider-line-2">
            <img src="https://picsum.photos/300/200?random=7" alt="Slide 7" />
            <img src="https://picsum.photos/300/200?random=8" alt="Slide 8" />
            <img src="https://picsum.photos/300/200?random=9" alt="Slide 9" />
            <img src="https://picsum.photos/300/200?random=10" alt="Slide 10" />
            <img src="https://picsum.photos/300/200?random=11" alt="Slide 11" />
            <img src="https://picsum.photos/300/200?random=12" alt="Slide 12" />
            <img src="https://picsum.photos/300/200?random=7" alt="Slide 7 Duplicate" />
            <img src="https://picsum.photos/300/200?random=8" alt="Slide 8 Duplicate" />
            <img src="https://picsum.photos/300/200?random=9" alt="Slide 9 Duplicate" />
            <img src="https://picsum.photos/300/200?random=10" alt="Slide 10 Duplicate" />
            <img src="https://picsum.photos/300/200?random=11" alt="Slide 11 Duplicate" />
            <img src="https://picsum.photos/300/200?random=12" alt="Slide 12 Duplicate" />
          </div>
          <div className="slider-line slider-line-3">
            <img src="https://picsum.photos/300/200?random=13" alt="Slide 13" />
            <img src="https://picsum.photos/300/200?random=14" alt="Slide 14" />
            <img src="https://picsum.photos/300/200?random=15" alt="Slide 15" />
            <img src="https://picsum.photos/300/200?random=16" alt="Slide 16" />
            <img src="https://picsum.photos/300/200?random=17" alt="Slide 17" />
            <img src="https://picsum.photos/300/200?random=18" alt="Slide 18" />
            <img src="https://picsum.photos/300/200?random=13" alt="Slide 13 Duplicate" />
            <img src="https://picsum.photos/300/200?random=14" alt="Slide 14 Duplicate" />
            <img src="https://picsum.photos/300/200?random=15" alt="Slide 15 Duplicate" />
            <img src="https://picsum.photos/300/200?random=16" alt="Slide 16 Duplicate" />
            <img src="https://picsum.photos/300/200?random=17" alt="Slide 17 Duplicate" />
            <img src="https://picsum.photos/300/200?random=18" alt="Slide 18 Duplicate" />
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
    </div>
  );
};

export default SliderPage;