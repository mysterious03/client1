import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight, ShieldCheck, CheckCircle2, Factory, Gauge, Award, Cpu, FileCheck, Layers, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

// Interactive Hover Spotlight Stat Card Component
function InteractiveStatCard({
  value,
  label,
  note,
  colorClass,
  badge,
  badgeClass,
  glowColor,
}: {
  value: string;
  label: string;
  note: string;
  colorClass: string;
  badge: string;
  badgeClass: string;
  glowColor: string;
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
      className="group relative p-8 rounded-3xl bg-white border border-[#D5DCF0] hover:border-accent shadow-lg shadow-[#1F2D5B]/5 hover:shadow-2xl hover:shadow-[#7B2CF9]/15 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between"
    >
      {/* Interactive mouse spotlight glow background */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`
            : 'none',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeClass} shadow-xs`}>
            {badge}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-text-secondary/40 group-hover:text-accent transition-colors" />
        </div>

        <div className={`font-display font-black text-4xl sm:text-5xl tracking-tight tabular-nums bg-gradient-to-r ${colorClass} bg-clip-text text-transparent leading-none`}>
          {value}
        </div>

        <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F2D5B] mt-3">
          {label}
        </div>
      </div>

      <p className="relative z-10 text-xs text-text-secondary mt-3 leading-relaxed pt-3 border-t border-[#D5DCF0]/80">
        {note}
      </p>
    </div>
  );
}

// Interactive Spotlight Sticky Parallax Card
function InteractiveStickyCard({
  card,
  index,
}: {
  card: {
    id: string;
    num: string;
    badge: string;
    title: string;
    titleGradient: string;
    subtitle: string;
    subColor: string;
    description: string;
    highlights: string[];
    tag: string;
    icon: React.ElementType;
    cardBg: string;
    badgeBg: string;
    pillBg: string;
    iconBg: string;
    checkColor: string;
    statVal: string;
    statGradient: string;
    statLabel: string;
    cardShadow: string;
    glowColor: string;
  };
  index: number;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = card.icon;

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
      className={`sticky rounded-3xl p-8 sm:p-12 border transition-all duration-300 ${card.cardBg} ${card.cardShadow} group overflow-hidden`}
      style={{
        // STICKY CASCADE: Pins sequentially as the user scrolls down!
        top: `calc(100px + ${index * 32}px)`,
        zIndex: index + 10,
      }}
    >
      {/* Interactive mouse spotlight glow background */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${card.glowColor}, transparent 70%)`
            : 'none',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Number, Title, Body & Highlights */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display font-black text-4xl sm:text-5xl opacity-40 tabular-nums">
              {card.num}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${card.badgeBg}`}>
              {card.badge}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-mono border hidden sm:inline-block ${card.pillBg}`}>
              {card.tag}
            </span>
          </div>

          <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight bg-clip-text text-transparent ${card.titleGradient}`}>
            {card.title}
          </h3>

          <div className={`font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider ${card.subColor}`}>
            {card.subtitle}
          </div>

          <p className="text-sm sm:text-base opacity-90 leading-relaxed font-normal max-w-2xl">
            {card.description}
          </p>

          {/* Highlights checklist */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {card.highlights.map((item, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm opacity-95">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${card.checkColor}`} />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Metric & Icon Box */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between self-stretch">
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
            <IconComp className="w-7 h-7" />
          </div>

          <div className="mt-8 lg:mt-auto p-6 rounded-2xl bg-black/25 backdrop-blur-md border border-white/15 w-full lg:w-auto text-left lg:text-right shadow-xl group-hover:border-white/30 transition-colors">
            <div className={`font-display font-black text-3xl sm:text-4xl tracking-tight bg-gradient-to-r ${card.statGradient} bg-clip-text text-transparent`}>
              {card.statVal}
            </div>
            <div className="text-xs font-mono opacity-80 uppercase tracking-wider mt-1">
              {card.statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const About: React.FC = () => {
  // 6-stat grid with real verified industrial benchmarks and colored typography
  const stats = [
    {
      value: '35+',
      label: 'Years of Heritage',
      note: 'Precision hydraulic fabrication & service in Chennai since 1990.',
      colorClass: 'from-[#7B2CF9] to-[#5310C7]',
      badge: 'SINCE 1990',
      badgeClass: 'bg-[#F3EBFF] text-[#7B2CF9] border-[#D8BFD8]',
      glowColor: 'rgba(123, 44, 249, 0.18)',
    },
    {
      value: '350 Bar',
      label: 'Continuous Envelope',
      note: 'High-pressure hydraulic power units & severe-duty rams.',
      colorClass: 'from-[#F59E0B] to-[#D97706]',
      badge: 'SEVERE DUTY',
      badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
      glowColor: 'rgba(245, 158, 11, 0.18)',
    },
    {
      value: '19',
      label: 'Tier-1 MNC Clients',
      note: 'Direct supplier to Ford, TVS, Saint-Gobain, Apollo & L&T.',
      colorClass: 'from-[#1F2D5B] via-[#7B2CF9] to-[#1F2D5B]',
      badge: 'CERTIFIED OEM',
      badgeClass: 'bg-[#E8ECF8] text-[#1F2D5B] border-[#B8C6E8]',
      glowColor: 'rgba(31, 45, 91, 0.18)',
    },
    {
      value: 'Ra ≤ 0.2µm',
      label: 'Internal Micro-Finish',
      note: 'Deep-hole cylinder bore honing ensuring 5M+ cycle seal life.',
      colorClass: 'from-[#10B981] to-[#047857]',
      badge: 'MICRON TOLERANCE',
      badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      glowColor: 'rgba(16, 185, 129, 0.18)',
    },
    {
      value: '2 Plants',
      label: 'Chennai Facilities',
      note: 'Twin manufacturing works in Padi & Melayanambakkam.',
      colorClass: 'from-[#EC4899] to-[#7B2CF9]',
      badge: 'DUAL CAMPUS',
      badgeClass: 'bg-pink-50 text-pink-600 border-pink-200',
      glowColor: 'rgba(236, 72, 153, 0.18)',
    },
    {
      value: '100%',
      label: 'Hydrostatic QA Test',
      note: 'Individual 1.5x proof pressure testing with digital logging.',
      colorClass: 'from-[#3B82F6] to-[#1D4ED8]',
      badge: 'ZERO LEAK',
      badgeClass: 'bg-blue-50 text-blue-600 border-blue-200',
      glowColor: 'rgba(59, 130, 246, 0.18)',
    },
  ];

  // Sticky Parallax Cards with Vibrant Palette Color Stacking, High-Contrast Typography & Drop Shadows
  const stickyParallaxCards = [
    {
      id: 'facility',
      num: '01',
      badge: 'Twin Infrastructure',
      title: 'Twin Manufacturing Facilities in Chennai',
      titleGradient: 'from-white via-cyan-100 to-thistle',
      subtitle: 'Padi & Melayanambakkam Engineering Works • Chennai',
      subColor: 'text-cyan-300',
      description:
        'Our twin industrial facilities in Chennai span over 15,000 sq.ft of specialized precision manufacturing. Featuring deep-hole horizontal cylinder boring rigs, multi-axis CNC lathe turning centers, automated cylinder micro-honing, heavy structural welding bays, and 10-ton overhead cranes for giant hydraulic presses.',
      highlights: [
        '15,000+ sq.ft combined manufacturing & assembly floor space',
        'In-house deep-hole boring for cylinders up to 500mm diameter',
        'Clean-room manifold block assembly & ultrasonic flushing station',
        'Heavy overhead gantry cranes handling up to 10 tons',
      ],
      tag: 'ISO 6020/2 Metric Standard',
      icon: Factory,
      cardBg: 'bg-gradient-to-br from-[#1F2D5B] via-[#162145] to-[#0F172E] text-white border-[#3B4E8C]',
      badgeBg: 'bg-[#7B2CF9]/30 text-cyan-200 border-[#7B2CF9]/60 shadow-[0_0_12px_rgba(123,44,249,0.4)]',
      pillBg: 'bg-white/10 text-cyan-100 border-cyan-400/30',
      iconBg: 'bg-[#7B2CF9]/30 text-cyan-200 border-[#7B2CF9]/60 shadow-lg shadow-[#7B2CF9]/30',
      checkColor: 'text-cyan-300',
      statVal: '15,000+',
      statGradient: 'from-cyan-300 via-white to-purple-200',
      statLabel: 'Sq.Ft Manufacturing Area',
      cardShadow: 'shadow-[0_20px_50px_-10px_rgba(31,45,91,0.5)] hover:shadow-[0_30px_70px_-10px_rgba(56,189,248,0.3)]',
      glowColor: 'rgba(56, 189, 248, 0.25)',
    },
    {
      id: 'metallurgy',
      num: '02',
      badge: 'Certified Metallurgy',
      title: 'Certified Raw Materials & Zero-Friction Sealing',
      titleGradient: 'from-white via-amber-100 to-pink-200',
      subtitle: 'Engineered for 5 Million+ Continuous Duty Cycles',
      subColor: 'text-amber-300',
      description:
        'Every hydraulic cylinder begins with certified seamless cold-drawn steel tubes conforming to DIN 2391 / St52, honed to Ra ≤ 0.2 µm. Piston rods are crafted from high-tensile induction-hardened EN8D/EN19 with 25-50 micron micro-crack-free hard chrome plating. Fitted exclusively with genuine Parker, Merkel, and Hallite polyurethane packings.',
      highlights: [
        'Cold-drawn barrel micro-honing Ra ≤ 0.2 µm for zero seal wear',
        'Min 25 µm hard chrome plating with 50-hour salt spray resistance',
        'Multi-lip polyurethane chevron packings rated up to 110°C',
        'Special Viton sealing packages for high-temp steel mill duty up to 200°C',
      ],
      tag: 'DIN 24554 Tie-Rod Class',
      icon: ShieldCheck,
      cardBg: 'bg-gradient-to-br from-[#7B2CF9] via-[#651AE6] to-[#490DB0] text-white border-[#9D5EFF]/60',
      badgeBg: 'bg-white/20 text-amber-200 border-white/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      pillBg: 'bg-black/25 text-amber-100 border-amber-300/30',
      iconBg: 'bg-white/20 text-amber-300 border-white/40 shadow-lg shadow-[#7B2CF9]/40',
      checkColor: 'text-amber-300',
      statVal: 'Ra ≤ 0.2 µm',
      statGradient: 'from-amber-200 via-white to-pink-200',
      statLabel: 'Bore Micro-Finish',
      cardShadow: 'shadow-[0_20px_50px_-10px_rgba(123,44,249,0.5)] hover:shadow-[0_30px_70px_-10px_rgba(245,158,11,0.35)]',
      glowColor: 'rgba(245, 158, 11, 0.25)',
    },
    {
      id: 'testing',
      num: '03',
      badge: 'Zero-Defect QA',
      title: '100% Calibrated 400-Bar Hydrostatic QA Test',
      titleGradient: 'from-[#1F2D5B] via-[#7B2CF9] to-[#1F2D5B]',
      subtitle: 'Traceable Pressure Certification per Unit',
      subColor: 'text-accent',
      description:
        'Before any cylinder, power unit, or valve manifold leaves our Chennai plant, it undergoes mandatory hydrostatic proof testing at 1.5 times the operating pressure envelope on our 400-bar test bench. High-precision digital pressure transducers log holding times, internal bypass leakage, and seal retention.',
      highlights: [
        'Proof tested to 375-400 Bar with zero permissible pressure drop',
        'Full dimensional inspection report per ISO tolerance tables',
        'Internal seal bypass leakage test under full working temperature',
        'Individual serialized QA certificate dispatched with each assembly',
      ],
      tag: '100% Transducer Verified',
      icon: Gauge,
      cardBg: 'bg-gradient-to-br from-[#FBFCFF] via-[#E8ECF8] to-[#D5DCF0] text-text-primary border-[#B8C6E8]',
      badgeBg: 'bg-white text-accent border-[#7B2CF9]/40 shadow-md shadow-[#7B2CF9]/15',
      pillBg: 'bg-white/90 text-text-primary border-[#B8C6E8] shadow-xs',
      iconBg: 'bg-white text-accent border-thistle shadow-md shadow-[#7B2CF9]/20',
      checkColor: 'text-accent',
      statVal: '400 Bar',
      statGradient: 'from-[#7B2CF9] via-[#651AE6] to-[#1F2D5B]',
      statLabel: 'Proof Bench Envelope',
      cardShadow: 'shadow-[0_20px_50px_-10px_rgba(184,198,232,0.6)] hover:shadow-[0_30px_70px_-10px_rgba(123,44,249,0.3)]',
      glowColor: 'rgba(123, 44, 249, 0.25)',
    },
    {
      id: 'tier1',
      num: '04',
      badge: 'Tier-1 MNC Supplier',
      title: 'MNC Client Validation & Turnkey SPM Commissioning',
      titleGradient: 'from-white via-amber-200 to-amber-400',
      subtitle: 'Direct Supplier to 19 Multinational Leaders',
      subColor: 'text-amber-400',
      description:
        'Dhanasree Hydraulics is an approved Tier-1 vendor for Ford India, TVS Motor, Saint-Gobain Glass, Apollo Tyres, and L&T GeoStructure. Beyond components, we design and commission custom turnkey hydraulic presses, freight cargo lifts, scissor work platforms, and automated dock levelers with on-site support across India.',
      highlights: [
        '19 certified multinational manufacturing client partners',
        'Complete mechanical, electrical, and hydraulic control integration',
        'Custom 3D CAD modeling & tonnage sizing within 24 hours',
        'Comprehensive 12-month industrial performance warranty & AMC',
      ],
      tag: 'Pan-India On-Site Support',
      icon: Award,
      cardBg: 'bg-gradient-to-br from-[#141D3B] via-[#1E294B] to-[#141D3B] text-white border-[#F59E0B]/50',
      badgeBg: 'bg-[#F59E0B]/25 text-amber-300 border-[#F59E0B]/60 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      pillBg: 'bg-white/10 text-amber-100 border-amber-400/30',
      iconBg: 'bg-[#F59E0B]/20 text-amber-400 border-[#F59E0B]/50 shadow-lg shadow-[#F59E0B]/30',
      checkColor: 'text-amber-400',
      statVal: '19 MNCs',
      statGradient: 'from-[#F59E0B] via-amber-200 to-white',
      statLabel: 'Verified Partner Roster',
      cardShadow: 'shadow-[0_20px_50px_-10px_rgba(245,158,11,0.3)] hover:shadow-[0_30px_70px_-10px_rgba(245,158,11,0.5)]',
      glowColor: 'rgba(245, 158, 11, 0.3)',
    },
  ];

  // Chronological timeline milestones
  const milestones = [
    {
      year: '1990',
      title: 'Founding & Precision Tooling',
      desc: 'Established in Chennai to provide indigenous, precision hydraulic components and cylinder repair services for South Indian automotive plants.',
      badgeClass: 'from-[#7B2CF9] to-[#651AE6]',
    },
    {
      year: '2004',
      title: 'Plant Expansion & OEM Supplier',
      desc: 'Expanded into our Melayanambakkam works; secured Tier-1 vendor codes for Ford India, TVS Motor, and Saint-Gobain Glass.',
      badgeClass: 'from-[#3B82F6] to-[#1D4ED8]',
    },
    {
      year: '2015',
      title: 'Automated Presses & Turnkey SPM',
      desc: 'Designed high-tonnage four-column hydraulic presses, automated dock levelers, and custom multi-deck car parking elevator systems.',
      badgeClass: 'from-[#10B981] to-[#059669]',
    },
    {
      year: '2026',
      title: 'Smart Telemetry & 400-Bar Bench',
      desc: 'Commissioned new high-pressure automated hydrostatic test rig with digital pressure logging and expanded export engineering capacity.',
      badgeClass: 'from-[#F59E0B] to-[#D97706]',
    },
  ];

  return (
    <div className="bg-[#FBFCFF] text-text-primary min-h-screen selection:bg-accent selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL MARQUEE HERO WITH VIBRANT TYPOGRAPHY                         */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 border-b border-[#D5DCF0] bg-gradient-to-b from-[#E8ECF8]/50 via-[#FBFCFF] to-[#FBFCFF]">
        
        {/* Subtle coordinate grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8ECF8_1px,transparent_1px),linear-gradient(to_bottom,#E8ECF8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

        {/* Ambient radial glow */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#7B2CF9]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Dateline & Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-secondary mb-8 border-b border-[#D5DCF0] pb-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-primary font-semibold">About Us</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]"></span>
              <span className="text-[#1F2D5B] font-bold">EST. 1990 • CHENNAI, INDIA • ISO 6020-2 SPEC</span>
            </div>
          </div>

          {/* Main Editorial Headline */}
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D8BFD8] text-xs font-mono font-bold text-accent shadow-md shadow-[#7B2CF9]/10">
              <Award className="w-4 h-4 text-amber-gold" />
              <span>35+ Years of Engineering Excellence</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.04]">
              POWERING CRITICAL INDUSTRY WITH{' '}
              <span className="bg-gradient-to-r from-[#1F2D5B] via-[#7B2CF9] to-[#651AE6] bg-clip-text text-transparent drop-shadow-sm">
                UNCOMPROMISING PRECISION.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary font-normal leading-relaxed max-w-3xl">
              Dhanasree Hydraulics manufactures and supplies complete industrial engineering systems, high-pressure hydraulic cylinders, custom power packs, and heavy-duty material handling machinery for multinational leaders across India.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. DENSE 6-STAT GRID WITH INTERACTIVE MOUSE SPOTLIGHT HOVER EFFECTS       */}
      {/* ========================================================================= */}
      <section className="border-b border-[#D5DCF0] bg-white py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s) => (
              <InteractiveStatCard
                key={s.label}
                value={s.value}
                label={s.label}
                note={s.note}
                colorClass={s.colorClass}
                badge={s.badge}
                badgeClass={s.badgeClass}
                glowColor={s.glowColor}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. STICKY PARALLAX STACKING CARDS (CRITICAL: NO overflow-hidden ON PARENT)*/}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FBFCFF] border-b border-[#D5DCF0] relative">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8ECF8] border border-thistle text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3 shadow-xs">
              <Layers className="w-4 h-4 text-accent" />
              <span>Scroll to Explore Capabilities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.06]">
              ENGINEERING EXCELLENCE, <br />
              <span className="bg-gradient-to-r from-[#1F2D5B] via-[#7B2CF9] to-[#1F2D5B] bg-clip-text text-transparent">
                LAYER BY LAYER.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary mt-3">
              Scroll through our four pillars of industrial competence — from high-tonnage Chennai manufacturing plants to micro-honed metallurgy, 400-bar test rigs, and Tier-1 MNC OEM accreditation.
            </p>
          </div>

          {/* Sticky Stacking Deck: Each card stacks on top with smooth parallax layering and spotlight glow */}
          <div className="relative space-y-20 pb-36">
            {stickyParallaxCards.map((card, idx) => (
              <InteractiveStickyCard
                key={card.id}
                card={card}
                index={idx}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. WHO WE ARE & MISSION MANIFESTO WITH ENHANCED SHADOWS                   */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#FBFCFF] border-b border-[#D5DCF0]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left: Who We Are Block with Drop Shadow */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#D5DCF0] shadow-xl shadow-[#1F2D5B]/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  WHO WE ARE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mt-2 mb-4">
                  Indigenous Engineering with Global Standards
                </h2>
                
                {/* Colorful quote box */}
                <blockquote className="p-5 rounded-2xl bg-gradient-to-r from-[#E8ECF8]/70 via-[#FBFCFF] to-transparent border-l-4 border-accent text-sm text-text-primary font-medium italic leading-relaxed mb-6 shadow-xs">
                  &ldquo;{COMPANY_INFO.whoWeAre}&rdquo;
                </blockquote>
                
                <p className="text-sm text-text-secondary leading-relaxed">
                  Headquartered in Chennai, Tamil Nadu, we operate modern fabrication and testing centers in Padi and Melayanambakkam. Our facility supports turnkey projects from initial 3D mechanical CAD drafting and hydraulic flow calculation, through CNC machining, fabrication, assembly, and on-site plant commissioning.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D5DCF0] flex items-center justify-between text-xs font-mono text-text-secondary">
                <span>Facilities: Padi &amp; Melayanambakkam</span>
                <span className="text-accent font-semibold">Tier-1 OEM Approved</span>
              </div>
            </div>

            {/* Right: Mission & Vision Manifesto (Midnight Navy #1F2D5B with Deep Shadow) */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#1F2D5B] text-white border border-[#3B4E8C] shadow-2xl shadow-[#1F2D5B]/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#7B2CF9]/25 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* Mission */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-amber-gold" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-thistle">
                      Our Corporate Mission
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200">
                    {COMPANY_INFO.mission.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-gold font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#314275] pt-6">
                  {/* Vision */}
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-accent" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-thistle">
                      Our Long-Term Vision
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200">
                    {COMPANY_INFO.vision.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400 relative z-10">
                Dhanasree Hydraulics &amp; Equipments Corporate Manifesto
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. HISTORICAL MILESTONES TIMELINE WITH COLORFUL BADGES                   */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-[#D5DCF0]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              COMPANY EVOLUTION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-text-primary tracking-tight mt-1">
              35+ Years of Fluid Power Progress
            </h2>
            <p className="text-base text-text-secondary mt-2">
              From our origins as a specialized hydraulic machining outfit to a full turnkey fluid power manufacturer serving global OEMs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#D5DCF0] hover:border-accent shadow-md hover:shadow-xl hover:shadow-[#7B2CF9]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r ${m.badgeClass} shadow-md`}>
                      {m.year}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-text-primary mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D5DCF0] text-[10px] font-mono text-text-secondary flex items-center justify-between">
                  <span>Milestone 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. BOTTOM CALL TO ACTION & TESTING SUITE SHORTCUT                         */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#E8ECF8]/50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5DCF0] text-xs font-mono text-text-primary mb-4 shadow-sm">
            <FileCheck className="w-3.5 h-3.5 text-accent" />
            <span>Ready for Technical Audit &amp; Plant Visits</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Review Our Engineering Capabilities In Person
          </h3>

          <p className="mt-3 text-sm sm:text-base text-text-secondary">
            Visit our manufacturing plants in Padi and Melayanambakkam, Chennai or schedule a technical review with our hydraulic design engineers.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] hover:from-[#651AE6] hover:to-[#5310C7] text-white font-semibold text-sm transition-all shadow-lg shadow-[#7B2CF9]/30 hover:shadow-xl hover:shadow-[#7B2CF9]/45 inline-flex items-center gap-2 hover:scale-105"
            >
              <span>Schedule Plant Visit / RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/technology"
              className="px-6 py-3.5 rounded-xl bg-white border border-[#D5DCF0] text-text-primary font-semibold text-sm hover:border-accent hover:bg-white transition-all inline-flex items-center gap-2 shadow-sm hover:scale-105"
            >
              <Cpu className="w-4 h-4 text-accent" />
              <span>Launch Sizing Calculator &amp; CAD Viewer</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
