import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import BootScreen from './components/sections/BootScreen/BootScreen';
import Navbar from './components/sections/Navbar/Navbar';
import Footer from './components/sections/Footer/Footer';
import CustomCursor from './components/sections/Cursor/CustomCursor';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import ScrollingHeader from './components/ScrollingHeader';
import CookieConsentBanner from './components/global/CookieConsent/CookieConsent';
import PageTransition from './components/PageTransition/PageTransition';

// 🚀 LAZY LOADING - Carica componenti solo quando necessario
const LandingPage = lazy(() => import('./components/sections/LandingPage/LandingPage'));
const MyStory = lazy(() => import('./components/sections/MyStory/MyStory'));
const ServicesPage = lazy(() => {
  console.log('📦 [LAZY] Starting to load ServicesPage chunk...');
  const start = performance.now();
  return import('./components/sections/ServicesPage/ServicesPage').then(module => {
    const duration = performance.now() - start;
    console.log(`✅ [LAZY] ServicesPage chunk loaded in ${duration.toFixed(2)}ms`);
    return module;
  });
});
const ConsulenzePage = lazy(() => import('./components/sections/ConsulenzePage/ConsulenzePage'));
const SitiWebPage = lazy(() => import('./components/sections/SitiWebPage/SitiWebPage'));
const PresenzaOnlinePage = lazy(() => import('./components/sections/PresenzaOnline/PresenzaOnlinePage'));
const MultimediaPage = lazy(() => import('./components/sections/MultimediaPage/MultimediaPage'));
const Portfolio = lazy(() => import('./components/sections/Portfolio/Portfolio'));
const ComponentShowcase = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/ComponentShowcase'));
const GraficheShowcase = lazy(() => import('./components/sections/Portfolio/GraficheShowcase/GraficheShowcase'));
const SitiWebShowcase = lazy(() => import('./components/sections/Portfolio/SitiWebShowcase/SitiWebShowcase'));
const SliderPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/SliderPage/SliderPage'));
const TextSamplerPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/TextSamplerPage/TextSamplerPage'));
const Cubo3DPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/Cubo3DPage/Cubo3DPage'));
const MusicPlayerPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/MusicPlayerPage/MusicPlayerPage'));
const CRUDSimulatorPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/CRUDSimulatorPage/CRUDSimulatorPage'));
const FemosBlackMarketPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/FemosBlackMarketPage/FemosBlackMarketPage'));
const QuizPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/QuizPage/QuizPage'));
const ImageCheckerPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/ImageCheckerPage/ImageCheckerPage'));
const PatternMatcherPage = lazy(() => import('./components/sections/Portfolio/ComponentShowcase/PatternMatcherPage/PatternMatcherPage'));
const Contacts = lazy(() => import('./components/sections/Contacts/Contacts'));
const PrivacyPolicy = lazy(() => import('./components/sections/PrivacyPolicy/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./components/sections/CookiePolicy/CookiePolicy'));
const TermsAndConditions = lazy(() => import('./components/sections/TermsAndConditions/TermsAndConditions'));

// 🎨 Loading Spinner Component
const LoadingSpinner = () => {
  console.log('⏳ [SUSPENSE] LoadingSpinner shown - Lazy loading in progress...');
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      color: '#0ff',
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '1.2rem'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '3px solid rgba(0, 255, 255, 0.2)',
          borderTop: '3px solid #0ff',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Caricamento...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [startTime] = useState(Date.now());

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <ErrorBoundary>
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
                text="News: +++ 22/04/2025: - ECMAScript 2025 introduce 'Temporal API'. Finalmente possiamo dire addio ai mal di testa causati dai fusi orari, secondo il comitato TC39. La nuova API promette una gestione delle date e dei tempi senza precedenti, semplificando lo sviluppo di applicazioni globali."
              />

              <main role="main" aria-label="Contenuto principale">
                {/* 🚀 Suspense wrapper per lazy loading */}
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
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
                      <Route path="/portfolio/sitiweb" element={<SitiWebShowcase />} />

                      {/* Portfolio Component Details */}
                      <Route path="/portfolio/componenti/slider" element={<SliderPage />} />
                      <Route path="/portfolio/componenti/text-sampler" element={<TextSamplerPage />} />
                      <Route path="/portfolio/componenti/cubo-3d" element={<Cubo3DPage />} />
                      <Route path="/portfolio/componenti/music-player" element={<MusicPlayerPage />} />
                      <Route path="/portfolio/componenti/crud-simulator" element={<CRUDSimulatorPage />} />
                      <Route path="/portfolio/componenti/black-market" element={<FemosBlackMarketPage />} />
                      <Route path="/portfolio/componenti/quiz" element={<QuizPage />} />
                      <Route path="/portfolio/componenti/image-checker" element={<ImageCheckerPage />} />
                      <Route path="/portfolio/componenti/pattern-matcher" element={<PatternMatcherPage />} />

                      {/* Contacts */}
                      <Route path="/contatti" element={<Contacts />} />

                      {/* Privacy & Cookie Policy */}
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/cookie-policy" element={<CookiePolicy />} />
                      <Route path="/termini-e-condizioni" element={<TermsAndConditions />} />
                    </Routes>
                  </PageTransition>
                </Suspense>
              </main>

              <Footer />
            </>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
