import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { Home } from './pages/Home';
import { ProductsIndex } from './pages/ProductsIndex';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Clients } from './pages/Clients';
import { Contact } from './pages/Contact';
import { Technology } from './pages/Technology';

import { QuickActionBar } from './components/QuickActionBar';
import { LivePlantTelemetry } from './components/LivePlantTelemetry';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg-base text-text-primary antialiased selection:bg-accent selection:text-white relative">
        {/* Live Plant Telemetry Bar */}
        <LivePlantTelemetry />

        {/* Global ⌘K Command Palette */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Floating Quick Action Bar */}
        <QuickActionBar onOpenSearch={() => setIsSearchOpen(true)} />

        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsIndex />} />
            <Route path="/products/:categorySlug" element={<CategoryPage />} />
            <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/about" element={<About />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
