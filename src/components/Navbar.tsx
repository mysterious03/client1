import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ArrowUpRight, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'Technology', path: '/technology' },
    { name: 'About Us', path: '/about' },
    { name: 'Clients', path: '/clients' },
  ];

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav className="flex items-center justify-between border border-[#D5DCF0] bg-white/95 backdrop-blur-md shadow-lg shadow-[#1F2D5B]/5 px-5 sm:px-6 py-3 rounded-full text-text-primary text-sm relative">
        
        {/* Brand Logo & Geometric Nodes Emblem */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2CF9] to-[#1F2D5B] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.706" cy="16" r="4.706" fill="#D8BFD8" />
              <circle cx="16.001" cy="4.706" r="4.706" fill="#FFFFFF" />
              <circle cx="16.001" cy="27.294" r="4.706" fill="#FFFFFF" />
              <circle cx="27.294" cy="16" r="4.706" fill="#D8BFD8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-tight text-[#1F2D5B] group-hover:text-accent transition-colors leading-none">
              DHANASREE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-text-secondary uppercase">
              Hydraulics
            </span>
          </div>
        </Link>

        {/* Sliding Text Navigation Links (Animated Hover Effect) */}
        <div className="hidden lg:flex items-center gap-7 ml-8">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);

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
                    className={`relative overflow-hidden h-6 group inline-flex items-center gap-1 font-medium ${
                      isActive ? 'text-accent font-semibold' : 'text-text-primary'
                    }`}
                  >
                    <div className="relative overflow-hidden h-5">
                      <span className="block group-hover:-translate-y-full transition-transform duration-300">
                        {link.name}
                      </span>
                      <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-accent font-semibold">
                        {link.name}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent transition-colors" />
                  </Link>

                  {/* Dropdown for Product Divisions */}
                  {productsOpen && (
                    <div className="absolute top-full left-0 -ml-4 mt-2 w-72 bg-white rounded-2xl border border-[#D5DCF0] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary border-b border-[#D5DCF0] mb-2">
                        Product Divisions
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.slice(0, 5).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products/${cat.slug}`}
                            className="block px-3 py-2 rounded-xl text-xs font-medium text-text-primary hover:bg-[#E8ECF8] hover:text-accent transition-colors"
                          >
                            <div className="font-display font-semibold text-xs">
                              {cat.shortName}
                            </div>
                            <div className="text-[10px] text-text-secondary truncate mt-0.5">
                              {cat.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#D5DCF0] px-3 py-1 flex items-center justify-between">
                        <Link
                          to="/products"
                          className="font-bold text-accent hover:text-[#651AE6] text-xs inline-flex items-center gap-1"
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
                className={`relative overflow-hidden h-5 group font-medium ${
                  isActive ? 'text-accent font-semibold' : 'text-text-primary'
                }`}
              >
                <span className="block group-hover:-translate-y-full transition-transform duration-300">
                  {link.name}
                </span>
                <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-accent font-semibold">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Action Buttons on the Right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Trigger */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8ECF8]/70 hover:bg-[#E8ECF8] border border-[#D5DCF0] text-xs text-text-secondary hover:text-text-primary transition-all cursor-pointer group"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs hidden xl:inline">Search</span>
              <kbd className="px-1.5 py-0.2 rounded bg-white border border-[#D5DCF0] font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Contact Button */}
          <Link
            to="/contact"
            className="border border-[#D5DCF0] hover:border-accent hover:bg-[#E8ECF8]/50 px-4 py-2 rounded-full text-xs font-semibold text-text-primary transition-colors"
          >
            Contact
          </Link>

          {/* Glowing Get Started / Request Quote Button */}
          <Link
            to="/contact"
            className="bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white hover:shadow-[0px_0px_25px_6px] shadow-[0px_0px_15px_3px] hover:shadow-[#7B2CF9]/50 shadow-[#7B2CF9]/30 px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all duration-300 inline-flex items-center gap-1.5"
          >
            <span>Request Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-1.5 rounded-full text-text-secondary hover:text-accent bg-[#E8ECF8]"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-accent" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-text-primary hover:text-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D5DCF0] shadow-2xl p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/products"
            className="font-medium text-sm text-text-primary hover:text-accent transition-colors py-1"
          >
            Products
          </Link>
          <Link
            to="/technology"
            className="font-medium text-sm text-text-primary hover:text-accent transition-colors py-1"
          >
            Technology &amp; Testing Suite
          </Link>
          <Link
            to="/about"
            className="font-medium text-sm text-text-primary hover:text-accent transition-colors py-1"
          >
            About Us &amp; Facilities
          </Link>
          <Link
            to="/clients"
            className="font-medium text-sm text-text-primary hover:text-accent transition-colors py-1"
          >
            Verified Clients (19 MNCs)
          </Link>

          <div className="pt-3 border-t border-[#D5DCF0] flex flex-col gap-2">
            <Link
              to="/contact"
              className="w-full text-center border border-[#D5DCF0] hover:bg-[#E8ECF8] py-2.5 rounded-full text-xs font-semibold text-text-primary transition-colors"
            >
              Contact Direct
            </Link>
            <Link
              to="/contact"
              className="w-full text-center bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#7B2CF9]/30"
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
