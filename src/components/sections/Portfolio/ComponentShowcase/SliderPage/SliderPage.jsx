import { useState } from 'react';
import './SliderPage.css';

const SliderPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    { id: 1, url: 'https://picsum.photos/800/1200?random=1', caption: 'Paesaggio montano al tramonto', description: 'Una vista mozzafiato delle montagne illuminate dai raggi dorati del tramonto, creando un contrasto perfetto tra luci e ombre.' },
    { id: 2, url: 'https://picsum.photos/800/1200?random=2', caption: 'Architettura moderna minimalista', description: 'Linee pulite e forme geometriche definiscono questa struttura architettonica contemporanea, simbolo di innovazione e design.' },
    { id: 3, url: 'https://picsum.photos/800/1200?random=3', caption: 'Natura selvaggia e incontaminata', description: 'La bellezza pura della natura incontaminata, dove la flora e la fauna convivono in perfetta armonia.' },
    { id: 4, url: 'https://picsum.photos/800/1200?random=4', caption: 'Design urbano contemporaneo', description: 'Il paesaggio urbano moderno si fonde con elementi di design innovativi, creando spazi vivibili e funzionali.' },
    { id: 5, url: 'https://picsum.photos/800/1200?random=5', caption: 'Vita marina e oceano', description: 'Le profondità oceaniche rivelano un mondo sommerso ricco di vita, colori e mistero.' },
    { id: 6, url: 'https://picsum.photos/800/1200?random=6', caption: 'Arte digitale astratta', description: 'Una composizione astratta che sfida la percezione, mescolando forme, colori e texture in modo armonico.' },
    { id: 7, url: 'https://picsum.photos/800/1200?random=7', caption: 'Ritratto emozionale', description: 'Uno sguardo intenso che cattura l\'essenza dell\'emozione umana, raccontando storie senza parole.' },
    { id: 8, url: 'https://picsum.photos/800/1200?random=8', caption: 'Geometrie e simmetrie', description: 'Pattern geometrici perfetti che si ripetono creando un effetto ipnotico di simmetria e equilibrio.' }
  ];

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="expanding-gallery">
      <h2 className="expanding-title">Expanding Gallery</h2>
      
      <div className="expanding-container">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`expanding-panel ${selectedIndex === index ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={image.url} 
              alt={image.caption}
              className={hoveredIndex === index && selectedIndex !== index ? 'colored' : ''}
            />
          </div>
        ))}
      </div>

      <div className="image-description">
        <h3 className="description-title">{images[selectedIndex].caption}</h3>
        <p className="description-text">{images[selectedIndex].description}</p>
      </div>
    </div>
  );
};

export default SliderPage;
