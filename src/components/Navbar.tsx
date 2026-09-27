import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, FileDown, ChevronDown } from 'lucide-react';
import { CATEGORIES, COMPANY_INFO } from '../data/catalog';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'About Us', path: '/about' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Engineering & Contact Notification Strip */}
      <div className="bg-bg-muted border-b border-border text-xs text-text-secondary py-1.5 px-4 hidden md:block">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-text-primary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Manufacturing Units: Padi &amp; Melayanambakkam, Chennai
            </span>
            <span className="text-[#8A6A38] font-medium">
              ISO Precision Standards • Up to 350 Bar Systems
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="flex items-center gap-1.5 text-text-primary hover:text-accent font-mono font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-accent" />
              {COMPANY_INFO.contact.displayPhone}
            </a>
            <span className="text-border">|</span>
            <a
              href="/catalog-dhanasree-hydraulics.pdf"
              download
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <FileDown className="w-3 h-3 text-accent" />
              <span>Catalog PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-bg-surface/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-bg-base/95 backdrop-blur-md border-b border-border/80'
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Emblem */}
              <div className="w-10 h-10 rounded-lg bg-text-primary flex items-center justify-center text-bg-base font-display font-bold text-xl tracking-tight group-hover:bg-accent transition-colors shadow-sm">
                DH
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-text-primary tracking-tight leading-tight">
                  Dhanasree Hydraulics
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary">
                  &amp; Equipments • Chennai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                          isActive
                            ? 'text-accent font-semibold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-muted/60'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </Link>

                      {/* Dropdown for Categories */}
                      {productsOpen && (
                        <div className="absolute top-full left-0 w-80 bg-bg-surface rounded-xl border border-border shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-text-secondary border-b border-border/80 mb-2">
                            Product Divisions
                          </div>
                          <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/products/${cat.slug}`}
                                className="block px-3 py-2 rounded-lg text-xs font-medium text-text-primary hover:bg-bg-muted hover:text-accent transition-colors"
                              >
                                <div className="font-display font-medium text-sm">
                                  {cat.shortName}
                                </div>
                                <div className="text-[11px] text-text-secondary truncate mt-0.5">
                                  {cat.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-border px-3 py-1 flex items-center justify-between text-xs">
                            <Link
                              to="/products"
                              className="font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1"
                            >
                              All 8 Categories <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-muted/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="px-3.5 py-2 text-xs font-mono font-semibold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>Call Plant</span>
              </a>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/contact"
                className="px-3 py-1.5 rounded-md bg-accent text-white text-xs font-semibold mr-1"
              >
                RFQ
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-text-primary hover:bg-bg-muted transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-bg-surface border-b border-border px-4 pt-2 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-text-primary hover:bg-bg-muted"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-text-secondary px-3 mb-2">
                Product Categories
              </div>
              <div className="grid grid-cols-2 gap-1 px-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products/${cat.slug}`}
                    className="px-2 py-1.5 text-xs text-text-secondary hover:text-accent rounded"
                  >
                    {cat.shortName}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="w-full py-2.5 rounded-lg bg-bg-muted text-text-primary font-mono text-center text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent" />
                Call Plant: {COMPANY_INFO.contact.phone}
              </a>
              <Link
                to="/contact"
                className="w-full py-2.5 rounded-lg bg-accent text-white text-center text-sm font-semibold"
              >
                Submit Technical RFQ
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
