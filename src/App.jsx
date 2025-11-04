import { useState } from 'react';
import BootScreen from './components/BootScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import MyStory from './components/MyStory';
import ServicesPage from './components/ServicesPage/ServicesPage';
import ConsulenzePage from './components/ServicesPage/ConsulenzePage';
import SitiWebPage from './components/ServicesPage/SitiWebPage';
import PresenzaOnlinePage from './components/ServicesPage/PresenzaOnlinePage';
import MultimediaPage from './components/ServicesPage/MultimediaPage';
import Contacts from './components/Contacts';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');
  const [startTime] = useState(Date.now());

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor key={currentPage} />
      
      {isBooting ? (
        <BootScreen onBootComplete={handleBootComplete} />
      ) : (
        <>
          {/* Navbar sempre visibile */}
          <Navbar 
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
          
          {/* Landing Page */}
          {currentPage === 'landing' && (
            <LandingPage 
              startTime={startTime} 
              onNavigateToServices={() => handleNavigate('services')}
            />
          )}

          {/* La Mia Storia */}
          {currentPage === 'storia' && (
            <MyStory />
          )}

          {/* Services Main Page */}
          {currentPage === 'services' && (
            <ServicesPage onNavigate={handleNavigate} />
          )}

          {/* Service Details Pages */}
          {currentPage === 'consulenze' && (
            <ConsulenzePage onNavigate={handleNavigate} />
          )}

          {currentPage === 'sitiweb' && (
            <SitiWebPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'presenza' && (
            <PresenzaOnlinePage onNavigate={handleNavigate} />
          )}

          {currentPage === 'multimedia' && (
            <MultimediaPage onNavigate={handleNavigate} />
          )}

          {/* Contacts */}
          {currentPage === 'contatti' && (
            <Contacts />
          )}

          {/* Footer sempre visibile */}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;