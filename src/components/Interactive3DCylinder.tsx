import React, { useState, useRef } from 'react';
import { RotateCw, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: string;
  name: string;
  spec: string;
  x: number; // percentage
  y: number; // percentage
  side: 'top' | 'bottom' | 'left' | 'right';
}

export const Interactive3DCylinder: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -10, y: 18 });
  const [viewMode, setViewMode] = useState<'assembly' | 'cutaway' | 'exploded'>('assembly');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'barrel',
      name: 'St52.3 Cold-Drawn Barrel',
      spec: 'Internal finish Ra ≤ 0.2 µm · ISO H8 tolerance · Yield 520 N/mm²',
      x: 32,
      y: 28,
      side: 'top',
    },
    {
      id: 'rod',
      name: 'Induction-Hardened Rod',
      spec: 'EN8D / EN19 ground & polished · 25-30 µm hard chrome · ISO f7',
      x: 75,
      y: 42,
      side: 'top',
    },
    {
      id: 'seals',
      name: 'Zero-Bypass Multi-Lip Seals',
      spec: 'Polyurethane U-cup + double-lip wiper · Rated -30°C to +110°C · 400 Bar',
      x: 52,
      y: 68,
      side: 'bottom',
    },
    {
      id: 'mount',
      name: 'Spherical Eye Mount',
      spec: 'Forged carbon steel with bronze self-aligning bearing bushing',
      x: 12,
      y: 60,
      side: 'bottom',
    },
  ];

  // Mouse & Touch 3D Drag Control
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX - rotation.y * 4, y: e.clientY - rotation.x * 4 };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      // Subtle hover tilt when not dragging
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const offsetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setRotation({
          x: -offsetY * 12 - 8,
          y: offsetX * 16 + 15,
        });
      }
      return;
    }
    const newY = (e.clientX - startPos.current.x) / 4;
    const newX = (e.clientY - startPos.current.y) / 4;
    // Clamp X rotation to prevent flipping upside down
    setRotation({
      x: Math.max(-30, Math.min(25, newX)),
      y: newY,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const resetOrientation = () => {
    setRotation({ x: -10, y: 18 });
    setActiveHotspot(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-visible touch-none"
    >
      {/* Dynamic 3D lighting atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(123,44,249,0.12),rgba(232,236,248,0.3)_60%,transparent_80%)] rounded-full blur-3xl pointer-events-none" />

      {/* Orbit Rings & Technical Axis Grid */}
      <div className="absolute inset-4 sm:inset-8 rounded-full border border-dashed border-[#7B2CF9]/20 pointer-events-none animate-[spin_80s_linear_infinite]" />
      <div className="absolute inset-14 sm:inset-20 rounded-full border border-[#D8BFD8]/30 pointer-events-none" />

      {/* Top HUD Controls: View Modes */}
      <div className="absolute top-3 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-auto z-30">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-xl border border-[#E8ECF8] shadow-sm">
          {(['assembly', 'cutaway', 'exploded'] as const).map((mode) => (
            <button
              key={mode}
              onClick={(e) => {
                e.stopPropagation();
                setViewMode(mode);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium capitalize transition-all cursor-pointer ${
                viewMode === mode
                  ? 'bg-[#1F2D5B] text-white shadow-xs'
                  : 'text-[#4A5578] hover:text-[#1F2D5B] hover:bg-[#F3EBFF]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Live Coordinate Badge & Reset */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-[#E8ECF8] text-[10px] font-mono text-[#4A5578]">
            <Compass className="w-3 h-3 text-[#7B2CF9]" />
            <span>P:{Math.round(rotation.x)}° Y:{Math.round(rotation.y)}°</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetOrientation();
            }}
            title="Reset Orientation"
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xl border border-[#E8ECF8] flex items-center justify-center text-[#4A5578] hover:text-[#7B2CF9] hover:border-[#7B2CF9]/30 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport with true CSS perspective */}
      <div
        style={{
          transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative z-10 w-full max-w-[480px] p-3"
      >
        {/* Main Industrial Actuator Glass Card */}
        <div className="relative rounded-[28px] bg-white/90 backdrop-blur-md border border-[#E8ECF8] p-3.5 shadow-2xl shadow-[#1F2D5B]/15 transition-shadow duration-500 hover:shadow-[#7B2CF9]/20">
          
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1F2D5B] via-[#141D3B] to-[#0B1120] flex items-center justify-center">
            
            {/* Photographic Real Cylinder Asset */}
            <motion.img
              src="/images/products/cylinder.jpg"
              alt="Dhanasree High Pressure Actuator"
              className="w-full h-full object-cover mix-blend-luminosity brightness-110 contrast-125"
              animate={{
                scale: viewMode === 'exploded' ? 1.08 : viewMode === 'cutaway' ? 1.04 : 1,
                filter: viewMode === 'cutaway' ? 'contrast(135%) brightness(115%)' : 'contrast(125%) brightness(110%)',
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Glowing Accent Shimmer Layers */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2CF9]/25 via-transparent to-[#D8BFD8]/15 pointer-events-none" />

            {/* Cutaway Wireframe / Section Highlight */}
            {viewMode === 'cutaway' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(123,44,249,0.35)_0%,transparent_65%)] pointer-events-none"
              >
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[60%] border-y border-dashed border-[#7B2CF9]/50 bg-[#7B2CF9]/10 backdrop-blur-[1px]" />
                <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-2 h-[75%] bg-[#7B2CF9] shadow-[0_0_20px_#7B2CF9]" />
                <div className="absolute top-1/2 left-[58%] -translate-y-1/2 w-2 h-[65%] bg-cyan-400 shadow-[0_0_20px_#38BDF8]" />
              </motion.div>
            )}

            {/* Exploded Architecture Displacements */}
            {viewMode === 'exploded' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Simulated Exploded Rings */}
                <div className="absolute top-1/2 left-[18%] -translate-y-1/2 w-4 h-[75%] rounded-full border-2 border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <div className="absolute top-1/2 left-[48%] -translate-y-1/2 w-3 h-[70%] rounded-full border-2 border-[#7B2CF9] shadow-[0_0_15px_#7B2CF9]" />
                <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-4 h-[60%] rounded-full border-2 border-[#F59E0B] shadow-[0_0_15px_#F59E0B]" />
              </motion.div>
            )}

            {/* Interactive Technical Inspection Pins */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(isActive ? null : spot.id);
                    }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-[#1F2D5B] shadow-lg border border-[#E8ECF8] hover:scale-125 transition-transform cursor-pointer group"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B2CF9] opacity-40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7B2CF9] group-hover:bg-[#651AE6]" />
                  </button>

                  {/* Hotspot Tooltip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: spot.side === 'top' ? 8 : -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${
                          spot.side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                        } left-1/2 -translate-x-1/2 w-56 sm:w-64 p-3 rounded-xl bg-[#0F172E]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl z-30 pointer-events-none text-left`}
                      >
                        <div className="text-[10px] font-mono text-[#D8BFD8] uppercase tracking-wider">Tolerance Spec</div>
                        <div className="font-display font-bold text-xs mt-0.5 text-white">{spot.name}</div>
                        <div className="text-[11px] text-slate-300 font-mono mt-1 leading-snug">{spot.spec}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Cylinder Identity Badge */}
            <div className="absolute bottom-3 left-3 bg-[#0F172E]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SERIES HD-350 · 400-BAR PROOF</span>
            </div>

            {/* Drag hint overlay */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/70 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
              Drag to rotate 3D
            </div>
          </div>
        </div>
      </div>

      {/* Floating Reliability Pill */}
      <div className="absolute -bottom-4 left-4 sm:left-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E8ECF8] shadow-xl shadow-[#1F2D5B]/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B2CF9] to-[#1F2D5B] text-white flex items-center justify-center font-display font-black text-sm shadow-md shadow-[#7B2CF9]/20">
          35+
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-sm text-[#1F2D5B] leading-tight">
            Years of Excellence
          </span>
          <span className="text-[10px] font-mono text-[#4A5578]">
            Tier-1 MNC Certified · Chennai
          </span>
        </div>
      </div>

    </div>
  );
};
