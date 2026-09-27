import React, { useState, useEffect } from 'react';
import { Bot, Gauge, CheckCircle2, ArrowUpRight, Award, Activity, FileCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function BentoCard({
  children,
  className = '',
  glowColor = 'rgba(123, 44, 249, 0.15)',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative h-full w-full overflow-hidden rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}
    >
      {/* Interactive mouse spotlight glow background */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`
            : 'none',
        }}
      />

      {/* Shimmer gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Card Content with z-10 */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export const EngineeringBentoCards: React.FC = () => {
  // Counter animation simulation
  const [count, setCount] = useState(120);
  const [typingIndex, setTypingIndex] = useState(0);
  const answer = "100% Zero-Leak Test Passed at 400 Bar";

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev >= 175 ? 120 : prev + 1));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const typeTimer = setInterval(() => {
      setTypingIndex((prev) => (prev >= answer.length ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(typeTimer);
  }, [answer.length]);

  return (
    <section className="py-24 bg-[#FBFCFF] border-t border-[#D5DCF0] relative overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#7B2CF9]/5 via-[#E8ECF8]/30 to-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8ECF8] border border-[#D5DCF0] text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Engineering Intelligence &amp; Quality Metrics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-text-primary mt-1 tracking-tight">
              Precision By The Numbers
            </h2>
            <p className="text-base text-text-secondary mt-2 max-w-xl">
              Real-time operational telemetry, verified QA benchmarks, and automated proof pressure test data from our Chennai plants.
            </p>
          </div>
          <Link
            to="/technology"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-[#651AE6] font-mono transition-colors self-start md:self-auto px-4 py-2 rounded-full bg-white border border-[#D5DCF0] hover:border-accent shadow-xs group"
          >
            <span>Launch Testing Suite</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid (Interactive Hover Background Effects on every card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Highly Rated & Quality Audit Score */}
          <BentoCard
            className="bg-white border-[#D5DCF0] hover:border-[#7B2CF9] shadow-lg shadow-[#1F2D5B]/5 hover:shadow-[#7B2CF9]/20"
            glowColor="rgba(123, 44, 249, 0.18)"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent bg-[#F3EBFF] px-2.5 py-1 rounded-full border border-[#D8BFD8]">
                Tier-1 Audit Rating
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-gold" />
              </div>
            </div>

            <div className="my-6">
              <div className="text-5xl font-black text-text-primary tracking-tight font-display flex items-baseline gap-1">
                <span className="bg-gradient-to-r from-[#1F2D5B] via-[#7B2CF9] to-[#1F2D5B] bg-clip-text text-transparent">
                  4.9
                </span>
                <span className="text-2xl text-amber-gold">★</span>
              </div>
              <p className="text-xs text-text-secondary mt-1 font-mono">
                Across 19 certified MNC plant audits
              </p>
            </div>

            <div className="pt-3 border-t border-[#D5DCF0] text-xs font-mono text-emerald-600 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Audit Compliance</span>
            </div>
          </BentoCard>

          {/* Card 2: Units Delivered Counter (Spans 2 cols on sm) */}
          <BentoCard
            className="bg-gradient-to-br from-[#1F2D5B] via-[#162145] to-[#0F172E] text-white border-[#3B4E8C] sm:col-span-2 shadow-xl hover:border-cyan-400 hover:shadow-cyan-500/20"
            glowColor="rgba(56, 189, 248, 0.2)"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                Manufactured &amp; Field Proven
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#7B2CF9]/30 text-thistle text-[10px] font-mono border border-thistle/40">
                Padi &amp; Melayanambakkam
              </span>
            </div>

            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white flex items-baseline gap-2">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-thistle bg-clip-text text-transparent">
                  {count}k+
                </span>
                <span className="text-base text-thistle font-mono font-normal">
                  Hydraulic Units Deployed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-md leading-relaxed">
                Supplied to Ford, TVS, Saint-Gobain, Apollo Tyres, L&amp;T, and 14 other multinational manufacturing leaders.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
              <span className="text-cyan-200">Continuous Severe Duty</span>
              <span className="text-amber-gold font-bold">Up to 350 Bar Continuous</span>
            </div>
          </BentoCard>

          {/* Card 3: Automated Diagnostic Check */}
          <BentoCard
            className="bg-white border-[#D5DCF0] hover:border-accent shadow-lg shadow-[#1F2D5B]/5 hover:shadow-purple-500/15"
            glowColor="rgba(123, 44, 249, 0.2)"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-[#F3EBFF] text-accent flex items-center justify-center border border-thistle">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#E8ECF8] text-text-primary border border-[#D5DCF0]">
                Live Telemetry
              </span>
            </div>

            <div className="my-4">
              <div className="text-xs font-mono text-text-secondary">Hydrostatic Bench Query:</div>
              <div className="text-xs font-mono font-bold text-text-primary mt-1">Rig #2 Pressure Seal State?</div>
              <div className="mt-3 p-3 rounded-xl bg-[#E8ECF8]/70 border border-[#D5DCF0] text-xs font-mono text-accent min-h-[50px] flex items-center shadow-inner">
                <span className="font-semibold">{answer.slice(0, typingIndex)}</span>
                <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-pulse"></span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-text-secondary flex items-center justify-between pt-2 border-t border-[#D5DCF0]">
              <span>Bench Calibrated:</span>
              <span className="text-accent font-bold">ISO 6020/2</span>
            </div>
          </BentoCard>

          {/* Card 4: Inspection Certificate & Report Card (Spans 2 cols on sm) */}
          <BentoCard
            className="bg-gradient-to-br from-[#E8ECF8]/70 via-[#FBFCFF] to-[#E8ECF8]/90 border-[#D5DCF0] hover:border-accent sm:col-span-2 shadow-lg shadow-[#1F2D5B]/5 hover:shadow-2xl hover:shadow-[#7B2CF9]/15"
            glowColor="rgba(123, 44, 249, 0.25)"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent bg-white px-3 py-1 rounded-full border border-thistle shadow-xs">
                Zero-Defect Quality Assurance
              </span>
              <div className="w-8 h-8 rounded-full bg-white text-accent border border-thistle flex items-center justify-center shadow-xs">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  100% Individual Hydrostatic Proof Test
                </h3>
                <p className="text-xs text-text-secondary mt-1 max-w-sm leading-relaxed">
                  Every single actuator, power pack manifold, and valve block undergoes 1.5x proof pressure holding test with recorded test certificates before packaging.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#D5DCF0] shadow-md font-mono text-xs text-text-primary space-y-1.5 shrink-0 w-full sm:w-auto">
                <div className="text-[10px] uppercase font-bold text-text-secondary">Certificate QA-2026</div>
                <div className="font-black text-accent text-sm">Tested to 375 Bar</div>
                <div className="text-emerald-600 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASS • Zero Drop
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D5DCF0] flex items-center justify-between text-xs font-mono text-text-secondary">
              <span>Micron Surface Finish: <strong className="text-text-primary">Ra ≤ 0.2 µm</strong></span>
              <span className="text-accent font-bold">Tolerances: ISO H8 / f7</span>
            </div>
          </BentoCard>

          {/* Card 5: Weekly Hydrostatic Pressure Run Chart */}
          <BentoCard
            className="bg-white border-[#D5DCF0] hover:border-emerald-500 shadow-lg shadow-[#1F2D5B]/5 hover:shadow-emerald-500/15"
            glowColor="rgba(16, 185, 129, 0.18)"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase text-text-secondary">
                Proof Pressure Bench
              </span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Micro Bar Chart */}
            <div className="py-2">
              <div className="flex items-end justify-between gap-1.5 h-20 pt-2">
                {[
                  { label: 'M', val: 75 },
                  { label: 'T', val: 90 },
                  { label: 'W', val: 65 },
                  { label: 'Th', val: 95 },
                  { label: 'F', val: 85 },
                  { label: 'Sa', val: 100 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${bar.val}%` }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        bar.val === 100
                          ? 'bg-gradient-to-t from-[#7B2CF9] to-[#651AE6] shadow-sm shadow-[#7B2CF9]/40'
                          : 'bg-[#D8BFD8] group-hover:bg-[#7B2CF9]/40'
                      }`}
                    ></div>
                    <span className="text-[9px] font-mono text-text-secondary">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center font-mono text-xs font-bold text-text-primary pt-2 border-t border-[#D5DCF0]">
              Weekly Peak: <span className="text-accent">400-Bar</span>
            </div>
          </BentoCard>

          {/* Card 6: Standards Pill Badges */}
          <BentoCard
            className="bg-gradient-to-br from-white to-[#E8ECF8]/50 border-[#D5DCF0] hover:border-accent shadow-lg shadow-[#1F2D5B]/5 hover:shadow-purple-500/15"
            glowColor="rgba(123, 44, 249, 0.2)"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-text-secondary">
                Global Standards
              </span>
              <Gauge className="w-4 h-4 text-accent" />
            </div>

            <div className="space-y-2 my-3">
              <div className="w-full py-2 px-3 rounded-xl bg-white border border-[#D5DCF0] text-center text-xs font-mono font-bold text-text-primary shadow-xs group-hover:border-accent transition-colors">
                ISO 6020/2 Metric Cylinders
              </div>
              <div className="w-full py-2 px-3 rounded-xl bg-[#1F2D5B] text-white text-center text-xs font-mono font-bold shadow-md">
                DIN 24554 Tie-Rod Class
              </div>
              <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white text-center text-xs font-mono font-bold shadow-md shadow-[#7B2CF9]/25">
                CE Machinery Compliant
              </div>
            </div>

            <div className="text-[10px] font-mono text-text-secondary text-center pt-1 border-t border-[#D5DCF0]">
              100% Interchangeability
            </div>
          </BentoCard>

        </div>

      </div>
    </section>
  );
};
