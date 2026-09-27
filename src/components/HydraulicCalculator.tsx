import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Preset {
  name: string;
  bore: number;
  rod: number;
  pressure: number;
  stroke: number;
}

const PRESETS: Preset[] = [
  { name: '10T Dock/Lift Cylinder', bore: 80, rod: 45, pressure: 200, stroke: 400 },
  { name: '25T Earthmoving Ram', bore: 125, rod: 70, pressure: 250, stroke: 600 },
  { name: '50T Hydraulic Press Ram', bore: 160, rod: 90, pressure: 250, stroke: 500 },
  { name: '100T High-Tonnage Ram', bore: 220, rod: 125, pressure: 300, stroke: 800 },
];

export const HydraulicCalculator: React.FC = () => {
  const [bore, setBore] = useState<number>(125);
  const [rod, setRod] = useState<number>(70);
  const [pressure, setPressure] = useState<number>(250);
  const [stroke, setStroke] = useState<number>(600);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Calculations
  const pistonAreaCm2 = (Math.PI * Math.pow(bore / 10, 2)) / 4;
  const rodAreaCm2 = (Math.PI * Math.pow(rod / 10, 2)) / 4;
  const annulusAreaCm2 = Math.max(0, pistonAreaCm2 - rodAreaCm2);

  // Force in Metric Tons = (Pressure in Bar * Area in cm²) / 1000
  const pushForceTons = (pressure * pistonAreaCm2) / 1000;
  const pullForceTons = (pressure * annulusAreaCm2) / 1000;

  // Force in kN
  const pushForceKN = pushForceTons * 9.80665;
  const pullForceKN = pullForceTons * 9.80665;

  // Fluid displacement (Liters) = Area (cm²) * Stroke (cm) / 1000
  const fluidVolumeLiters = (pistonAreaCm2 * (stroke / 10)) / 1000;

  const handleApplyPreset = (p: Preset) => {
    setBore(p.bore);
    setRod(p.rod);
    setPressure(p.pressure);
    setStroke(p.stroke);
  };

  const handleSendToRFQ = () => {
    const summary = `Cylinder Spec: Bore Ø${bore}mm x Rod Ø${rod}mm x Stroke ${stroke}mm @ ${pressure} Bar (Push: ${pushForceTons.toFixed(1)}T / Pull: ${pullForceTons.toFixed(1)}T)`;
    sessionStorage.setItem('dhanasree_rfq_prefill', summary);
    navigate('/contact');
  };

  return (
    <section id="calculator" className="py-16 bg-slate-engineering text-gray-200 border-t border-b border-slate-border relative overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 dark-engineering-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-surface border border-thistle/50 text-xs font-mono text-[#D8BFD8] mb-3 shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-amber-gold" />
              <span>Engineering Sizing Tool • Live Telemetry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Interactive Hydraulic Cylinder Force Calculator
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Compute theoretical push/pull thrust tonnage, required pump displacement volume, and structural hydraulic parameters under actual industrial pressures.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-gray-400 mr-1">Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 text-xs font-mono rounded bg-slate-surface hover:bg-slate-card border border-slate-border hover:border-amber-gold/50 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Workspace: Controls on Left, Live Telemetry Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (6 cols) */}
          <div className="lg:col-span-6 bg-slate-surface p-6 sm:p-8 rounded-2xl border border-slate-border space-y-6">
            <div className="flex items-center justify-between border-b border-slate-border pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Adjust Cylinder Dimensions
              </span>
              <button
                onClick={() => handleApplyPreset(PRESETS[1])}
                className="text-xs font-mono text-gray-400 hover:text-amber-gold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Slider 1: Bore Diameter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="text-gray-300 font-medium">Bore Diameter (Inner Tube ID):</label>
                <span className="text-amber-gold font-bold text-sm tabular-nums">Ø {bore} mm</span>
              </div>
              <input
                type="range"
                min="40"
                max="400"
                step="5"
                value={bore}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBore(val);
                  if (rod >= val) setRod(Math.round(val * 0.56));
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-card rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>40 mm (Light)</span>
                <span>200 mm (Industrial)</span>
                <span>400 mm (Severe Press)</span>
              </div>
            </div>

            {/* Slider 2: Piston Rod Diameter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="text-gray-300 font-medium">Piston Rod Diameter (Chrome Bar):</label>
                <span className="text-amber-gold font-bold text-sm tabular-nums">Ø {rod} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max={Math.max(25, bore - 10)}
                step="5"
                value={rod}
                onChange={(e) => setRod(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-card rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>20 mm (Min)</span>
                <span>Buckling Ratio: {(bore / rod).toFixed(1)}:1</span>
                <span>{bore - 10} mm (Max)</span>
              </div>
            </div>

            {/* Slider 3: Working Pressure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="text-gray-300 font-medium">Operating Pressure:</label>
                <span className="text-cyan-400 font-bold text-sm tabular-nums">{pressure} Bar ({Math.round(pressure * 14.5038)} PSI)</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-card rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>50 Bar (Standard)</span>
                <span>210 Bar (Continuous)</span>
                <span>400 Bar (Severe Hydrostatic)</span>
              </div>
            </div>

            {/* Slider 4: Stroke Length */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label className="text-gray-300 font-medium">Stroke Travel Distance:</label>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">{stroke} mm ({(stroke / 1000).toFixed(2)} m)</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={stroke}
                onChange={(e) => setStroke(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-card rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>50 mm</span>
                <span>1500 mm</span>
                <span>3000 mm (Long-Stroke Telescopic)</span>
              </div>
            </div>

          </div>

          {/* Results Visualizer (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Real-time Tonnage Readout Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Push / Extension Force */}
              <div className="p-6 rounded-2xl bg-slate-surface border border-thistle/40 relative overflow-hidden shadow-lg shadow-[#7B2CF9]/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#7B2CF9]/20 rounded-full blur-2xl"></div>
                <div className="text-[11px] font-mono text-gray-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Push / Extension Force</span>
                  <span className="text-[#D8BFD8] font-semibold">→ Full Bore</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight tabular-nums">
                    {pushForceTons.toFixed(1)}
                  </span>
                  <span className="text-sm font-mono text-[#D8BFD8] font-bold">Tons</span>
                </div>
                <div className="mt-2 text-xs font-mono text-gray-300 tabular-nums">
                  ≈ {pushForceKN.toFixed(1)} kN of thrust
                </div>
              </div>

              {/* Pull / Retraction Force */}
              <div className="p-6 rounded-2xl bg-slate-surface border border-amber-500/30 relative overflow-hidden shadow-lg shadow-amber-500/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/15 rounded-full blur-2xl"></div>
                <div className="text-[11px] font-mono text-gray-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Pull / Retraction Force</span>
                  <span className="text-amber-gold font-semibold">← Annulus</span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight tabular-nums">
                    {pullForceTons.toFixed(1)}
                  </span>
                  <span className="text-sm font-mono text-amber-gold font-bold">Tons</span>
                </div>
                <div className="mt-2 text-xs font-mono text-gray-300 tabular-nums">
                  ≈ {pullForceKN.toFixed(1)} kN of return pull
                </div>
              </div>

            </div>

            {/* Engineering Parameter Details Grid */}
            <div className="p-6 rounded-2xl bg-slate-surface border border-slate-border space-y-4">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider font-semibold border-b border-slate-border pb-2">
                Hydraulic Circuit &amp; Volume Parameters
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px]">Piston Area (A₁)</span>
                  <span className="text-white font-semibold tabular-nums">{pistonAreaCm2.toFixed(1)} cm²</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Rod Area (A₂)</span>
                  <span className="text-white font-semibold tabular-nums">{rodAreaCm2.toFixed(1)} cm²</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Stroke Volume (Full)</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">{fluidVolumeLiters.toFixed(2)} Liters</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Recommended Port</span>
                  <span className="text-white font-semibold">
                    {bore > 160 ? 'G 3/4" BSPP' : bore > 100 ? 'G 1/2" BSPP' : 'G 3/8" BSPP'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Test Proof Pressure</span>
                  <span className="text-amber-gold font-semibold tabular-nums">{Math.round(pressure * 1.5)} Bar (1.5x)</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">ISO Standard</span>
                  <span className="text-cyan-400 font-semibold">ISO 6020/2</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const text = `Bore: ${bore}mm, Rod: ${rod}mm, Stroke: ${stroke}mm, Pressure: ${pressure}bar => Push: ${pushForceTons.toFixed(1)}T`;
                    navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-card hover:bg-slate-border border border-slate-border text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Parameters!</span>
                    </>
                  ) : (
                    <span>Copy Engineering Specs</span>
                  )}
                </button>

                <button
                  onClick={handleSendToRFQ}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] hover:from-[#651AE6] hover:to-[#5310C7] text-white font-semibold text-xs transition-all shadow-md shadow-[#7B2CF9]/25 hover:shadow-lg hover:shadow-[#7B2CF9]/40 flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-gold" />
                  <span>Pre-fill Plant RFQ with Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
