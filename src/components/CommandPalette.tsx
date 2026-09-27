import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Layers, Wrench, ShieldCheck, ArrowRight, CornerDownLeft, Sparkles, Phone, FileDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CLIENTS, COMPANY_INFO } from '../data/catalog';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  // Global keydown for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter products
  const matchingProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(query.toLowerCase())) ||
    (p.modelName && p.modelName.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5);

  // Filter categories
  const matchingCategories = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.shortName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  // Filter clients
  const matchingClients = CLIENTS.filter((cl) =>
    cl.name.toLowerCase().includes(query.toLowerCase()) ||
    cl.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const quickActions = [
    {
      id: 'calc',
      title: 'Launch Hydraulic Cylinder Sizing Calculator',
      desc: 'Calculate thrust force, tonnage & fluid displacement',
      icon: Wrench,
      action: () => {
        onClose();
        if (onOpenCalculator) onOpenCalculator();
      },
    },
    {
      id: 'rfq',
      title: 'Request Plant Engineering RFQ',
      desc: 'Submit technical specifications for immediate quotation',
      icon: Sparkles,
      action: () => {
        onClose();
        navigate('/contact');
      },
    },
    {
      id: 'catalog-pdf',
      title: 'Download Official PDF Catalog',
      desc: 'Complete Dhanasree Hydraulics systems & dimensions',
      icon: FileDown,
      action: () => {
        window.open('/catalog-dhanasree-hydraulics.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'call',
      title: `Call Works Direct: ${COMPANY_INFO.contact.displayPhone}`,
      desc: 'Connect with technical plant engineering desk',
      icon: Phone,
      action: () => {
        window.location.href = `tel:${COMPANY_INFO.contact.phone}`;
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-2xl bg-slate-engineering border border-slate-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-gray-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-border flex items-center gap-3 bg-slate-surface">
          <Search className="w-5 h-5 text-amber-gold shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, tonnage, series code (e.g. 'cylinder', '350 bar', 'press', 'Ford')..."
            className="w-full bg-transparent text-white placeholder-gray-500 font-mono text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-gray-400 bg-slate-card border border-slate-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 divide-y divide-slate-border/50 text-xs">
          
          {/* Quick Actions */}
          {!query && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 px-3 py-1 font-semibold">
                Engineering Tools &amp; Actions
              </div>
              <div className="space-y-1 mt-1">
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.id}
                      onClick={qa.action}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-surface border border-transparent hover:border-slate-border flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#25356C] text-[#D8BFD8] group-hover:bg-[#7B2CF9] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white font-sans text-sm">{qa.title}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{qa.desc}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#D8BFD8] transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matching Products */}
          {matchingProducts.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-gold px-3 py-1 font-semibold flex items-center justify-between">
                <span>Hydraulic Systems ({matchingProducts.length})</span>
                <span className="text-[9px] text-[#D8BFD8]">Jump to Technical Spec</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchingProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      navigate(`/products/${p.categorySlug}/${p.slug}`);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-surface border border-transparent hover:border-slate-border flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-card border border-slate-border overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate font-sans text-sm">{p.name}</div>
                        <div className="text-gray-400 text-xs flex items-center gap-2 font-mono mt-0.5">
                          <span className="text-amber-gold/90">{p.categoryName.replace(' Services', '')}</span>
                          {p.operatingPressure && <span>• {p.operatingPressure}</span>}
                          {p.liftingCapacity && <span>• {p.liftingCapacity}</span>}
                        </div>
                      </div>
                    </div>
                    <CornerDownLeft className="w-3.5 h-3.5 text-gray-600 group-hover:text-white shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Categories */}
          {matchingCategories.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#D8BFD8] px-3 py-1 font-semibold">
                Divisions ({matchingCategories.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      navigate(`/products/${c.slug}`);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-surface border border-transparent hover:border-slate-border flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-medium text-white font-sans">{c.name}</span>
                        <span className="text-gray-500 font-mono text-[11px] ml-2">({c.productCount} models)</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Clients */}
          {matchingClients.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 px-3 py-1 font-semibold">
                Tier-1 Client Partners
              </div>
              <div className="space-y-1 mt-1">
                {matchingClients.map((cl) => (
                  <button
                    key={cl.id}
                    onClick={() => {
                      onClose();
                      navigate('/clients');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-surface border border-transparent hover:border-slate-border flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white">{cl.name}</span>
                      <span className="text-gray-400 font-mono text-[10px]">({cl.category})</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[10px]">Verified Partner</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchingProducts.length === 0 && matchingCategories.length === 0 && matchingClients.length === 0 && (
            <div className="p-8 text-center text-gray-400 font-mono text-xs">
              <p>No hydraulic systems found matching &quot;{query}&quot;.</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/contact');
                }}
                className="mt-3 text-amber-gold hover:underline font-sans font-medium"
              >
                Inquire about custom engineering fabrication &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Footer shortcuts strip */}
        <div className="px-4 py-2 bg-slate-surface border-t border-slate-border flex items-center justify-between text-[10px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1 bg-slate-card border border-slate-border rounded text-gray-400">↑</kbd> <kbd className="px-1 bg-slate-card border border-slate-border rounded text-gray-400">↓</kbd></span>
            <span>Select: <kbd className="px-1 bg-slate-card border border-slate-border rounded text-gray-400">ENTER</kbd></span>
          </div>
          <span className="text-gray-400">Dhanasree Engineering Directory</span>
        </div>
      </div>
    </div>
  );
};
