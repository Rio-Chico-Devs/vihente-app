import { useState } from 'react';
import BootScreen from './components/sections/BootScreen/BootScreen';
import Navbar from './components/sections/Navbar/Navbar';
import Footer from './components/sections/Footer/Footer';
import LandingPage from './components/sections/LandingPage/LandingPage';
import MyStory from './components/sections/MyStory/MyStory';
import ServicesPage from './components/sections/ServicesPage/ServicesPage';
import ConsulenzePage from './components/sections/ConsulenzePage/ConsulenzePage';
import SitiWebPage from './components/sections/SitiWebPage/SitiWebPage';
import PresenzaOnlinePage from './components/sections/PresenzaOnline/PresenzaOnlinePage';
import MultimediaPage from './components/sections/MultimediaPage/MultimediaPage';
import Portfolio from './components/sections/Portfolio/Portfolio';
import PortfolioComponentiPage from './components/sections/Portfolio/PortfolioComponentiPage'; // ⭐ NUOVO
import Contacts from './components/sections/Contacts/Contacts';
import CustomCursor from './components/sections/Cursor/CustomCursor';
import ScrollingHeader from './components/ScrollingHeader'

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

          <ScrollingHeader 
            text= "News: +++ 22/04/2025: - ECMAScript 2025 introduce 'Temporal API'. Finalmente possiamo dire addio ai mal di testa causati dai fusi orari, dichiara John Smith, membro del comitato TC39. La nuova API promette una gestione delle date e dei tempi senza precedenti, semplificando lo sviluppo di applicazioni globali."
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

          {/* Portfolio */}
          {currentPage === 'portfolio' && (
            <Portfolio onNavigate={handleNavigate} />
          )}

          {/* ⭐ NUOVO: Portfolio - Componenti */}
          {currentPage === 'portfolio-componenti' && (
            <PortfolioComponentiPage onNavigate={handleNavigate} />
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