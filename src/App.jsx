import { useState } from 'react';
import BootScreen from './components/BootScreen';
import LandingPage from './components/LandingPage';
import ServicesPage from './components/ServicesPage/ServicesPage';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');
  const [startTime] = useState(Date.now());

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const goToServices = () => {
    setCurrentPage('services');
  };

  const goToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <>
      {/* 🔑 key={currentPage} forza il re-mount del cursore quando cambi pagina */}
      {/* Questo previene l'accumulo di event listeners e mantiene il cursore fluido */}
      <CustomCursor key={currentPage} />
      
      {isBooting ? (
        <BootScreen onBootComplete={handleBootComplete} />
      ) : (
        <>
          {currentPage === 'landing' && (
            <LandingPage 
              startTime={startTime} 
              onNavigateToServices={goToServices}
            />
          )}
          {currentPage === 'services' && (
            <ServicesPage onNavigateBack={goToLanding} />
          )}
        </>
      )}
    </>
  );
}

export default App;