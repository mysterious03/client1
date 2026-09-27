import React from 'react';
import { Search, Calculator, Sparkles, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionBarProps {
  onOpenSearch: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenSearch }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Floating Pill Menu in Deep Navy with Electric Purple RFQ */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#141D3B]/95 backdrop-blur-md border border-[#3B4E8C] text-xs font-mono shadow-2xl shadow-black/40">
        {/* Quick Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-200 hover:text-white hover:bg-[#1F2D5B] transition-colors cursor-pointer"
          title="Search Systems (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-amber-gold" />
          <span className="hidden sm:inline">Search</span>
        </button>

        <span className="w-px h-4 bg-[#3B4E8C]"></span>

        {/* Quick Sizing Calculator */}
        <Link
          to="/#calculator"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-200 hover:text-white hover:bg-[#1F2D5B] transition-colors"
          title="Launch Hydraulic Calculator"
        >
          <Calculator className="w-3.5 h-3.5 text-[#D8BFD8]" />
          <span className="hidden sm:inline">Calculator</span>
        </Link>

        <span className="w-px h-4 bg-[#3B4E8C]"></span>

        {/* RFQ */}
        <Link
          to="/contact"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] hover:from-[#651AE6] hover:to-[#5310C7] text-white font-semibold font-sans transition-all shadow-md shadow-[#7B2CF9]/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-gold" />
          <span>RFQ</span>
        </Link>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="p-3 rounded-2xl bg-white hover:bg-[#E8ECF8] border border-border shadow-lg text-[#1F2D5B] hover:text-[#7B2CF9] transition-colors cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};
