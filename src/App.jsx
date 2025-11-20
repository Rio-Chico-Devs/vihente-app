import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider';
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
import ComponentShowcase from './components/sections/Portfolio/ComponentShowcase/ComponentShowcase';
import GraficheShowcase from './components/sections/Portfolio/GraficheShowcase/GraficheShowcase';
import SliderPage from './components/sections/Portfolio/ComponentShowcase/SliderPage/SliderPage';
import TextSamplerPage from './components/sections/Portfolio/ComponentShowcase/TextSamplerPage/TextSamplerPage';
import Cubo3DPage from './components/sections/Portfolio/ComponentShowcase/Cubo3DPage/Cubo3DPage';
import Contacts from './components/sections/Contacts/Contacts';
import CustomCursor from './components/sections/Cursor/CustomCursor';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import ScrollingHeader from './components/ScrollingHeader';
import PrivacyPolicy from './components/sections/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from './components/sections/CookiePolicy/CookiePolicy';
import CookieConsentBanner from './components/global/CookieConsent/CookieConsent';
import NavigationDebugPanel from './components/NavigationDebugPanel';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [startTime] = useState(Date.now());

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/vihente-app'}>
        <CustomCursor />
        <CookieConsentBanner isBooting={isBooting} />
        <ThemeToggle />

        {isBooting ? (
          <BootScreen onBootComplete={handleBootComplete} />
        ) : (
          <>
            <Navbar />

            <ScrollingHeader
              text="News: +++ 22/04/2025: - ECMAScript 2025 introduce 'Temporal API'. Finalmente possiamo dire addio ai mal di testa causati dai fusi orari, dichiara John Smith, membro del comitato TC39. La nuova API promette una gestione delle date e dei tempi senza precedenti, semplificando lo sviluppo di applicazioni globali."
            />

            <main role="main" aria-label="Contenuto principale">
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage startTime={startTime} />} />

                {/* La Mia Storia */}
                <Route path="/storia" element={<MyStory />} />

                {/* Services Main Page */}
                <Route path="/services" element={<ServicesPage />} />

                {/* Service Details Pages */}
                <Route path="/services/consulenze" element={<ConsulenzePage />} />
                <Route path="/services/sitiweb" element={<SitiWebPage />} />
                <Route path="/services/presenza" element={<PresenzaOnlinePage />} />
                <Route path="/services/multimedia" element={<MultimediaPage />} />

                {/* Portfolio */}
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/componenti" element={<ComponentShowcase />} />
                <Route path="/portfolio/grafiche" element={<GraficheShowcase />} />

                {/* Portfolio Component Details */}
                <Route path="/portfolio/componenti/slider" element={<SliderPage />} />
                <Route path="/portfolio/componenti/text-sampler" element={<TextSamplerPage />} />
                <Route path="/portfolio/componenti/cubo-3d" element={<Cubo3DPage />} />

                {/* Contacts */}
                <Route path="/contatti" element={<Contacts />} />

                {/* Privacy & Cookie Policy */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </main>

            <Footer />

            {/* 🔍 DEBUG PANEL - Remove in production */}
            <NavigationDebugPanel />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;