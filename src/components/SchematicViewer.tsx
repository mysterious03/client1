import React, { useState } from 'react';
import { Eye, Cpu, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SchematicViewerProps {
  imageSrc?: string;
  title?: string;
  seriesCode?: string;
}

export const SchematicViewer: React.FC<SchematicViewerProps> = ({
  imageSrc = '/images/products/cylinder.jpg',
  title = 'Precision Hydraulic Cylinder Assembly',
  seriesCode = 'Series HD-250 • Hydrostatic 350 Bar',
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'cad' | 'circuit'>('photo');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      top: '48%',
      left: '25%',
      label: 'Hard-Chrome Piston Rod',
      desc: 'Ground & polished alloy steel rod, chrome plating min 25-30 µm, corrosion-resistant surface hardness 60 HRC.',
    },
    {
      id: 2,
      top: '35%',
      left: '55%',
      label: 'Cold-Drawn Seamless Barrel',
      desc: 'ST52 / E355 micro-honed tube ID tolerance ISO H8, surface roughness Ra ≤ 0.2 µm for zero seal abrasion.',
    },
    {
      id: 3,
      top: '65%',
      left: '70%',
      label: 'SAE / BSPP Fluid Ports',
      desc: 'Dual SAE 4-bolt flange or BSPP ports machined directly into heavy forged end caps with zero turbulence loss.',
    },
    {
      id: 4,
      top: '72%',
      left: '85%',
      label: 'Trunnion / Clevis Mount',
      desc: 'High-tensile spherical bearing or rigid pin clevis designed to absorb severe cyclic bending stresses.',
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-engineering border border-slate-border p-3 sm:p-4 text-gray-200 shadow-xl overflow-hidden relative">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-border/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-xs text-gray-300 font-semibold">{seriesCode}</span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-surface p-1 rounded-xl border border-slate-border text-xs font-mono">
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-bold shadow-md shadow-[#7B2CF9]/30'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Studio Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('cad')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'cad'
                ? 'bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-bold shadow-md shadow-[#7B2CF9]/30'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>CAD Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('circuit')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'circuit'
                ? 'bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-bold shadow-md shadow-[#7B2CF9]/30'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Circuit Diagram</span>
          </button>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-surface border border-slate-border flex items-center justify-center">
        
        {/* VIEW 1: Photographic with Interactive Hotspots */}
        {activeTab === 'photo' && (
          <div className="relative w-full h-full">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-engineering/70 via-transparent to-transparent pointer-events-none"></div>

            {/* Hotspots with Electric Purple Pin & Thistle Glow */}
            {hotspots.map((hs) => (
              <div
                key={hs.id}
                style={{ top: hs.top, left: hs.left }}
                className="absolute z-20"
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                  className="relative group cursor-pointer focus:outline-none"
                  aria-label={hs.label}
                >
                  <span className="animate-ping absolute -inset-1 rounded-full bg-[#7B2CF9] opacity-75"></span>
                  <span className="relative flex h-6 w-6 rounded-full bg-[#7B2CF9] text-white font-mono font-bold text-[11px] items-center justify-center border-2 border-white shadow-lg shadow-[#7B2CF9]/40">
                    {hs.id}
                  </span>
                </button>

                {/* Tooltip Card */}
                {activeHotspot === hs.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-xl bg-slate-card/95 backdrop-blur-md border border-thistle/70 shadow-2xl text-xs font-mono z-30 animate-in fade-in zoom-in-95">
                    <div className="text-[#D8BFD8] font-bold flex items-center justify-between">
                      <span>{hs.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-gray-200 text-[11px] mt-1 font-sans leading-tight">
                      {hs.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-gray-300 border border-slate-border">
              Click pins 1-4 to view component specifications
            </div>
          </div>
        )}

        {/* VIEW 2: CAD Blueprint Wireframe */}
        {activeTab === 'cad' && (
          <div className="w-full h-full bg-[#0a1120] p-6 relative flex flex-col items-center justify-center text-cyan-400 font-mono">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

            {/* SVG Engineering Drawing */}
            <svg
              viewBox="0 0 700 280"
              className="w-full max-h-full stroke-cyan-400 fill-none relative z-10"
              style={{ strokeWidth: 1.5 }}
            >
              {/* Outer Cylinder Barrel */}
              <rect x="180" y="80" width="360" height="120" rx="4" stroke="currentColor" strokeDasharray="none" />
              
              {/* Internal Piston Head */}
              <rect x="230" y="86" width="50" height="108" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" />
              
              {/* Piston Rod extending out left */}
              <rect x="60" y="110" width="170" height="60" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" />
              
              {/* Rod Eye Clevis */}
              <circle cx="50" cy="140" r="28" stroke="currentColor" />
              <circle cx="50" cy="140" r="14" fill="#0a1120" stroke="currentColor" />

              {/* Rear Cap Mounting */}
              <rect x="540" y="70" width="50" height="140" rx="4" stroke="currentColor" fill="#0284c7" fillOpacity="0.2" />
              <circle cx="565" cy="140" r="14" fill="#0a1120" stroke="currentColor" />

              {/* Ports */}
              <rect x="200" y="55" width="28" height="25" stroke="#f59e0b" fill="#f59e0b" fillOpacity="0.2" />
              <text x="214" y="45" fill="#f59e0b" fontSize="10" textAnchor="middle">PORT A</text>

              <rect x="480" y="55" width="28" height="25" stroke="#f59e0b" fill="#f59e0b" fillOpacity="0.2" />
              <text x="494" y="45" fill="#f59e0b" fontSize="10" textAnchor="middle">PORT B</text>

              {/* Dimension Lines */}
              <line x1="180" y1="225" x2="540" y2="225" stroke="#94a3b8" strokeDasharray="3 3" />
              <text x="360" y="240" fill="#94a3b8" fontSize="11" textAnchor="middle">STROKE LENGTH = 500 mm ± 0.5</text>
              <line x1="180" y1="220" x2="180" y2="230" stroke="#94a3b8" />
              <line x1="540" y1="220" x2="540" y2="230" stroke="#94a3b8" />

              {/* Diameter callouts */}
              <text x="360" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                BORE Ø 125 H8 (Ra 0.2 µm)
              </text>
              <text x="135" y="144" fill="#f59e0b" fontSize="10" textAnchor="middle">
                ROD Ø 70 f7
              </text>
            </svg>

            <div className="absolute top-3 right-3 text-right text-[10px] font-mono text-gray-400 bg-slate-card/80 p-2 rounded border border-slate-border">
              <div>DWG NO: DH-CYL-125/70-500</div>
              <div>CAD SPEC: ISO 6020-2 / DIN 24554</div>
              <div>PROOF TEST: 350 BAR HYDRAULIC</div>
            </div>
          </div>
        )}

        {/* VIEW 3: Hydraulic Circuit Diagram */}
        {activeTab === 'circuit' && (
          <div className="w-full h-full bg-[#0d141f] p-6 relative flex flex-col items-center justify-center font-mono">
            {/* Circuit graphic */}
            <svg viewBox="0 0 600 240" className="w-full max-h-full stroke-emerald-400 fill-none" style={{ strokeWidth: 1.5 }}>
              {/* Cylinder Symbol */}
              <rect x="300" y="40" width="180" height="60" stroke="#38bdf8" />
              <rect x="360" y="45" width="20" height="50" fill="#38bdf8" fillOpacity="0.4" />
              <line x1="370" y1="70" x2="520" y2="70" stroke="#38bdf8" strokeWidth="4" />
              <text x="390" y="30" fill="#38bdf8" fontSize="11">DOUBLE-ACTING ACTUATOR</text>

              {/* Lines from 4/3 Directional Valve */}
              <path d="M 330 100 L 330 140 L 370 140 L 370 160" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 450 100 L 450 140 L 410 140 L 410 160" stroke="#38bdf8" strokeWidth="2" />

              {/* 4/3 Valve Symbol Box */}
              <rect x="350" y="160" width="80" height="50" stroke="#f59e0b" fill="#f59e0b" fillOpacity="0.1" />
              <text x="390" y="190" fill="#f59e0b" fontSize="10" textAnchor="middle">4/3 SOLENOID</text>

              {/* Pump Symbol */}
              <circle cx="160" cy="180" r="22" stroke="#10b981" />
              <polygon points="160,165 152,185 168,185" fill="#10b981" stroke="none" />
              <text x="160" y="220" fill="#10b981" fontSize="10" textAnchor="middle">PUMP 250 BAR</text>
              <line x1="182" y1="180" x2="350" y2="180" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

              {/* Relief Valve */}
              <rect x="230" y="120" width="30" height="30" stroke="#ef4444" fill="#ef4444" fillOpacity="0.1" />
              <text x="245" y="110" fill="#ef4444" fontSize="9" textAnchor="middle">RELIEF 300B</text>
              <line x1="245" y1="150" x2="245" y2="180" stroke="#ef4444" />
            </svg>

            <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 bg-slate-card/90 px-3 py-1 rounded border border-slate-border">
              Schematic: Proportional Fluid Manifold • Manifold Integrated
            </div>
          </div>
        )}

      </div>

      {/* Bottom Technical Spec Highlight Bar */}
      <div className="mt-3 pt-3 border-t border-slate-border/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-gold" />
            Tolerances: ISO H8 / f7
          </span>
          <span className="text-slate-border">|</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Hydrostatic Bench Tested
          </span>
        </div>

        <div className="text-gray-400 text-[11px]">
          Chennai Units: Padi &amp; Melayanambakkam Engineering Works
        </div>
      </div>
    </div>
  );
};
