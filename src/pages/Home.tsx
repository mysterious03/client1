import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, CheckCircle2, Cpu, ChevronDown, Zap, Target, Award, Factory, Gauge, Box } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/TiltCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Parallax } from '../components/Parallax';
import { Magnetic } from '../components/Magnetic';
import { EngineeringBentoCards } from '../components/EngineeringBentoCards';
import { ClientLogoWall } from '../components/ClientLogoWall';
import { Interactive3DCylinder } from '../components/Interactive3DCylinder';
import { DepthCarousel } from '../components/DepthCarousel';
import type { DepthCarouselItem } from '../components/DepthCarousel';
import { HydraulicCalculator } from '../components/HydraulicCalculator';
import { CinematicTextReveal } from '../components/CinematicTextReveal';
import { PRODUCTS } from '../data/catalog';

/* ──────────────────────────────────────────────
   COUNTER HOOK
   ────────────────────────────────────────────── */
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

/* ──────────────────────────────────────────────
   SMOOTH CURSOR FOLLOWER (Hero only)
   ────────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: 600,
        height: 600,
        marginLeft: -300,
        marginTop: -300,
        background: 'radial-gradient(circle, rgba(123,44,249,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}

/* ──────────────────────────────────────────────
   HORIZONTAL SCROLL PRODUCT ROW
   ────────────────────────────────────────────── */
function HorizontalProductScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  const products = [
    { name: 'Hydraulic Cylinders', tag: 'Series HD-350', slug: 'hydraulic-cylinders', img: '/images/products/cylinder.jpg', spec: 'Bore up to 500mm' },
    { name: 'Power Packs', tag: 'Up to 350 Bar', slug: 'hydraulic-power-packs', img: '/images/products/powerpack.jpg', spec: 'Continuous Duty Rated' },
    { name: 'Hydraulic Presses', tag: 'Turnkey SPM', slug: 'hydraulic-presses', img: '/images/products/press.jpg', spec: 'Up to 500-Ton Capacity' },
    { name: 'Scissor Lifts', tag: 'Safe Loading', slug: 'scissor-lifts', img: '/images/products/scissorlift.jpg', spec: 'Platform Lengths 2–12m' },
    { name: 'Dock Levelers', tag: 'Heavy Duty', slug: 'dock-levelers', img: '/images/products/dockleveler.jpg', spec: 'Capacity up to 10 Tons' },
    { name: 'Conveyor Systems', tag: 'Automated', slug: 'conveyor-systems', img: '/images/products/conveyor.jpg', spec: 'Custom Belt & Roller' },
  ];

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        style={{ x: xTranslate }}
        className="flex gap-6 px-4 sm:px-8"
      >
        {products.map((p, i) => (
          <Link
            key={i}
            to={`/products/${p.slug}`}
            className="group shrink-0 w-[320px] sm:w-[380px]"
          >
            <TiltCard className="rounded-[28px] overflow-hidden" intensity={8}>
              <div className="relative bg-white border border-[#E8ECF8] rounded-[28px] overflow-hidden shadow-lg shadow-[#1F2D5B]/[0.04] hover:shadow-2xl hover:shadow-[#7B2CF9]/[0.12] transition-shadow duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F2FA]">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl text-[11px] font-mono font-semibold text-[#1F2D5B] border border-[#E8ECF8]">
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#1F2D5B] group-hover:text-[#7B2CF9] transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="text-sm text-[#4A5578] mt-1 font-mono">{p.spec}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#7B2CF9] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN HOME COMPONENT
   ────────────────────────────────────────────── */
export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Counters
  const units = useCountUp(150, 2200);
  const years = useCountUp(35, 1800);
  const clients = useCountUp(19, 1500);

  // Industries data
  const industries = [
    { title: 'Construction', desc: 'Severe-duty hydraulic rams, piling equipment, earthmoving excavators & mobile cranes.', badge: 'L&T, Saritha Infra', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80', icon: Factory },
    { title: 'Manufacturing', desc: 'High-cycle clamping cylinders, automated stamping presses, robotic assembly lines.', badge: 'TVS Motor, Ford India', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', icon: Cpu },
    { title: 'Mining', desc: 'Underground drill jumbos, continuous tunnel boring, high-impact rock splitters.', badge: 'Continuous 350 Bar', image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80', icon: Target },
    { title: 'Agriculture', desc: 'Tractor implement steering, automated grain harvesters, forestry handling systems.', badge: 'ISO Metric Conformance', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', icon: Box },
    { title: 'Energy', desc: 'Hydroelectric sluice gates, wind turbine yaw pitch actuators, steam governors.', badge: 'Zero Bypass Leakage', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80', icon: Zap },
  ];

  const [activeIndustry, setActiveIndustry] = useState(0);
  const [productViewMode, setProductViewMode] = useState<'depth' | 'flow'>('depth');

  const depthCarouselItems: DepthCarouselItem[] = PRODUCTS.filter((p) => p.isFeatured).map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.subtitle,
    category: p.categoryName.replace(' Services', '').replace(' Equipments', ''),
    image: p.image,
    link: `/products/${p.categorySlug}/${p.slug}`,
    specBadge: p.operatingPressure || p.liftingCapacity || 'Precision Spec',
    capacity: p.liftingCapacity,
  }));

  return (
    <div className="bg-[#FBFCFF] text-[#1F2D5B] overflow-x-hidden">
      <CursorGlow />

      {/* ═══════════════════════════════════════════
          01. CINEMATIC HERO — Full Viewport
          ═══════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Layered Background — Subtle grid + gradient */}
        <div className="absolute inset-0">
          {/* Fine grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8ECF8_1px,transparent_1px),linear-gradient(to_bottom,#E8ECF8_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
          {/* Radial gradient wash */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(123,44,249,0.08),transparent)]" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FBFCFF] to-transparent" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-[15%] left-[8%] w-[300px] h-[300px] rounded-full bg-[#7B2CF9]/[0.04] blur-[80px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#D8BFD8]/[0.08] blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-[#F59E0B]/[0.04] blur-[60px]" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-24 pb-12 lg:py-0">

            {/* Left — Copy */}
            <div className="space-y-8 max-w-2xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#E8ECF8] shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B2CF9] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B2CF9]" />
                  </span>
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#4A5578] uppercase">Precision in Motion</span>
                </div>
              </motion.div>

              {/* Main Title */}
              <div>
                <CinematicTextReveal
                  as="h1"
                  text="Powering What Moves The World."
                  revealMode="words"
                  textColor="#1F2D5B"
                  lineHeight={0.95}
                  letterSpacing={-0.03}
                  direction="up"
                  distance={44}
                  blur={8}
                  easing="cinematic"
                  duration={0.85}
                  stagger={0.07}
                  delay={0.25}
                  accentEnabled={true}
                  accentText="Moves"
                  accentGradientClass="bg-gradient-to-r from-[#7B2CF9] via-[#651AE6] to-[#7B2CF9] bg-clip-text text-transparent inline-block"
                  className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-black"
                />

                <motion.p
                  className="mt-6 text-lg sm:text-xl text-[#4A5578] leading-relaxed max-w-lg font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.65 }}
                >
                  Advanced hydraulic solutions engineered with micron-level tolerances for India's most demanding industrial plants.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Magnetic strength={0.15}>
                  <Link
                    to="/products"
                    className="group relative px-8 py-4 rounded-2xl bg-[#1F2D5B] text-white font-semibold text-[15px] inline-flex items-center gap-3 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#1F2D5B]/30"
                  >
                    <span className="relative z-10">Explore Products</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.15}>
                  <Link
                    to="/contact"
                    className="group px-7 py-4 rounded-2xl bg-white border border-[#E8ECF8] text-[#1F2D5B] font-semibold text-[15px] inline-flex items-center gap-3 hover:border-[#7B2CF9]/30 hover:bg-[#F8F6FF] transition-all duration-300 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F3EBFF] flex items-center justify-center group-hover:bg-[#7B2CF9] transition-colors duration-300">
                      <Play className="w-3 h-3 text-[#7B2CF9] group-hover:text-white fill-current ml-0.5 transition-colors" />
                    </div>
                    <span>Request RFQ</span>
                  </Link>
                </Magnetic>
              </motion.div>

              {/* Trust Strip */}
              <motion.div
                className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-[#E8ECF8]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[
                  { icon: ShieldCheck, text: 'ISO 6020/2 Standard' },
                  { icon: CheckCircle2, text: '400-Bar Tested' },
                  { icon: Gauge, text: 'Direct OEM Dispatch' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-[#4A5578]">
                    <item.icon className="w-4 h-4 text-[#7B2CF9]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Interactive 3D Actuator Inspection */}
            <motion.div
              className="relative lg:pl-4"
              initial={{ opacity: 0, x: 60, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Interactive3DCylinder />
            </motion.div>

          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs font-mono text-[#4A5578] tracking-wider uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-[#7B2CF9]" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>


      {/* ═══════════════════════════════════════════
          02. STATS COUNTER BAR — Apple-style numbers
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#FBFCFF] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(232,236,248,0.5),transparent)]" />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
              {[
                { ref: units.ref, count: units.count, suffix: 'k+', label: 'Hydraulic Units Deployed', sub: 'Across automotive, mining, energy & infrastructure' },
                { ref: years.ref, count: years.count, suffix: '+', label: 'Years of Engineering', sub: 'Continuous innovation since 1991' },
                { ref: clients.ref, count: clients.count, suffix: '', label: 'MNC Partners Certified', sub: 'Including Ford, TVS, L&T, Saint-Gobain' },
              ].map((stat, i) => (
                <div key={i} ref={stat.ref} className="text-center group">
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#1F2D5B]">
                    <span className="bg-gradient-to-b from-[#1F2D5B] to-[#4A5578] bg-clip-text text-transparent">
                      {stat.count}
                    </span>
                    <span className="text-[#7B2CF9]">{stat.suffix}</span>
                  </div>
                  <div className="mt-3 font-display font-bold text-lg text-[#1F2D5B]">{stat.label}</div>
                  <div className="mt-1 text-sm text-[#4A5578] max-w-xs mx-auto">{stat.sub}</div>
                  <div className="mt-4 mx-auto w-12 h-[2px] bg-[#7B2CF9]/30 group-hover:w-24 group-hover:bg-[#7B2CF9] transition-all duration-500" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          03. ABOUT / STORY — Parallax Image + Copy
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Visual */}
            <ScrollReveal direction="left" distance={80} duration={1}>
              <div className="relative">
                <Parallax speed={0.06}>
                  <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] shadow-2xl shadow-[#1F2D5B]/10">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85"
                      alt="Precision Manufacturing Floor"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D5B]/60 via-transparent to-transparent" />
                  </div>
                </Parallax>

                {/* Floating Spec Card */}
                <div className="absolute -bottom-4 -right-4 sm:right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#E8ECF8] z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-display font-black text-[#1F2D5B]">Ra ≤ 0.2</div>
                      <div className="text-xs text-[#4A5578] font-mono mt-0.5">µm Bore Finish</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display font-black text-[#7B2CF9]">350</div>
                      <div className="text-xs text-[#4A5578] font-mono mt-0.5">Bar Continuous</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Copy */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <span className="text-xs font-mono font-bold tracking-wider text-[#7B2CF9] uppercase">Built for Real Impact</span>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <CinematicTextReveal
                  as="h2"
                  text="Engineering Fluid Possibilities."
                  revealMode="words"
                  textColor="#1F2D5B"
                  lineHeight={1.05}
                  letterSpacing={-0.02}
                  direction="up"
                  distance={32}
                  blur={6}
                  easing="cinematic"
                  duration={0.8}
                  accentEnabled={true}
                  accentText="Possibilities."
                  accentColor="#7B2CF9"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg text-[#4A5578] leading-relaxed max-w-lg">
                  From heavy infrastructure to critical 24/7 manufacturing assembly lines, our hydraulic systems keep the world moving with zero unplanned downtime.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 font-display font-bold text-[15px] text-[#1F2D5B] hover:text-[#7B2CF9] transition-colors"
                >
                  <span className="border-b-2 border-[#7B2CF9] pb-0.5">Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 text-[#7B2CF9] group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="pt-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle2, text: '100% pressure chart per cylinder' },
                    { icon: ShieldCheck, text: 'Micro-hardness tested rods' },
                    { icon: Gauge, text: 'ISO H8/f7 precision tolerances' },
                    { icon: Zap, text: '24-hour engineering support' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#4A5578]">
                      <item.icon className="w-4 h-4 text-[#7B2CF9] shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          04. PRODUCTS — 3D Depth Carousel & Flow
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#FBFCFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(123,44,249,0.04),transparent)]" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 mb-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-[#7B2CF9] uppercase">Our Products</span>
                <CinematicTextReveal
                  as="h2"
                  text="Built to Perform."
                  revealMode="words"
                  textColor="#1F2D5B"
                  lineHeight={1.05}
                  letterSpacing={-0.02}
                  direction="up"
                  distance={28}
                  blur={6}
                  easing="cinematic"
                  duration={0.75}
                  accentEnabled={true}
                  accentText="Perform."
                  accentColor="#7B2CF9"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mt-2"
                />
                <p className="text-lg text-[#4A5578] mt-3 max-w-xl">
                  High-performance hydraulic cylinders, valves and power units for every industrial challenge.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* 3D Mode Toggle */}
                <div className="flex items-center p-1 rounded-full bg-white border border-[#E8ECF8] shadow-xs">
                  <button
                    onClick={() => setProductViewMode('depth')}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                      productViewMode === 'depth'
                        ? 'bg-[#1F2D5B] text-white shadow-xs'
                        : 'text-[#4A5578] hover:text-[#1F2D5B]'
                    }`}
                  >
                    3D Depth Gallery
                  </button>
                  <button
                    onClick={() => setProductViewMode('flow')}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                      productViewMode === 'flow'
                        ? 'bg-[#1F2D5B] text-white shadow-xs'
                        : 'text-[#4A5578] hover:text-[#1F2D5B]'
                    }`}
                  >
                    Flow Reel
                  </button>
                </div>

                <Magnetic>
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8ECF8] hover:border-[#7B2CF9]/30 shadow-xs text-xs font-semibold text-[#1F2D5B] hover:text-[#7B2CF9] transition-all self-start md:self-auto"
                  >
                    <span>Full Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7B2CF9] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {productViewMode === 'depth' ? (
          <div className="relative">
            <DepthCarousel
              items={depthCarouselItems}
              tint="#E8ECF8"
              depth={160}
              spread={60}
              tilt={12}
              perspective={1600}
              blur={3}
              falloff={0.15}
              autoplay={false}
            />
            <div className="text-center mt-4">
              <span className="text-xs text-[#4A5578] font-mono">
                ← Drag cards or use arrow buttons to explore systems in 3D perspective · Click card to view full specifications →
              </span>
            </div>
          </div>
        ) : (
          <HorizontalProductScroll />
        )}
      </section>


      {/* ═══════════════════════════════════════════
          05. INDUSTRIES — Interactive Grid
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono font-bold tracking-wider text-[#7B2CF9] uppercase">Industries We Empower</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F2D5B] tracking-tight mt-2 leading-[1.05]">
                Different Industries.{' '}
                <span className="text-[#7B2CF9]">One Standard.</span>
              </h2>
              <p className="text-lg text-[#4A5578] mt-3">
                Engineered to endure 24/7 continuous duty cycles across the most demanding sectors.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Industry Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <button
                      onClick={() => setActiveIndustry(i)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-400 cursor-pointer group ${
                        activeIndustry === i
                          ? 'bg-[#1F2D5B] border-[#1F2D5B] text-white shadow-xl shadow-[#1F2D5B]/20'
                          : 'bg-white border-[#E8ECF8] hover:border-[#7B2CF9]/30 hover:shadow-md text-[#1F2D5B]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          activeIndustry === i ? 'bg-[#7B2CF9]' : 'bg-[#F3EBFF] group-hover:bg-[#7B2CF9]/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${activeIndustry === i ? 'text-white' : 'text-[#7B2CF9]'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-lg">{ind.title}</div>
                          <div className={`text-sm mt-0.5 line-clamp-1 ${activeIndustry === i ? 'text-white/70' : 'text-[#4A5578]'}`}>
                            {ind.desc}
                          </div>
                        </div>
                        <ArrowRight className={`w-5 h-5 shrink-0 transition-all ${
                          activeIndustry === i ? 'text-[#7B2CF9] translate-x-0 opacity-100' : 'text-[#7B2CF9]/0 -translate-x-2 opacity-0 group-hover:text-[#7B2CF9] group-hover:translate-x-0 group-hover:opacity-50'
                        }`} />
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Right: Active Industry Image */}
            <div className="lg:col-span-7 relative">
              <ScrollReveal direction="right" distance={60}>
                <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndustry}
                      src={industries[activeIndustry].image}
                      alt={industries[activeIndustry].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D5B]/80 via-[#1F2D5B]/20 to-transparent" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 inset-x-0 p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndustry}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="text-xs font-mono text-[#D8BFD8] uppercase tracking-wider">0{activeIndustry + 1} · Sector</div>
                        <h3 className="font-display text-3xl sm:text-4xl font-black text-white mt-2">{industries[activeIndustry].title}</h3>
                        <p className="text-sm text-gray-200 mt-2 max-w-md leading-relaxed">{industries[activeIndustry].desc}</p>
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-mono text-white">
                          <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>{industries[activeIndustry].badge}</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          06. INNOVATION — Exploded View
          ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#FBFCFF] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Visual */}
            <ScrollReveal direction="left" distance={60}>
              <TiltCard className="rounded-[32px]" intensity={5}>
                <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#E8ECF8]/60 to-white border border-[#E8ECF8] p-8 shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#E8ECF8]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#7B2CF9]" />
                      <span className="font-mono text-xs font-bold text-[#1F2D5B] uppercase tracking-wider">Component Architecture</span>
                    </div>
                    <span className="font-mono text-xs text-[#4A5578]">ISO 6020-2</span>
                  </div>

                  {/* Cylinder Image */}
                  <div className="relative aspect-[16/10] my-6 rounded-2xl overflow-hidden">
                    <img
                      src="/images/products/cylinder.jpg"
                      alt="Exploded Cylinder Architecture"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />

                    {/* Callout Pins */}
                    <div className="absolute top-[15%] left-[10%] flex items-center gap-2 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-full border border-[#E8ECF8] shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#7B2CF9] animate-pulse" />
                      <span className="font-mono text-[11px] font-semibold text-[#1F2D5B]">St52 Alloy Barrel</span>
                    </div>

                    <div className="absolute top-[25%] right-[12%] flex items-center gap-2 bg-[#7B2CF9] text-white px-3 py-1.5 rounded-full shadow-lg shadow-[#7B2CF9]/30">
                      <span className="font-mono text-[11px] font-bold">Precision Seals</span>
                    </div>

                    <div className="absolute bottom-[18%] left-[25%] flex items-center gap-2 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-full border border-[#E8ECF8] shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-mono text-[11px] font-semibold text-[#1F2D5B]">Modular Mounting</span>
                    </div>
                  </div>

                  {/* Info Bar */}
                  <div className="p-4 rounded-xl bg-white border border-[#E8ECF8] flex items-center gap-3 text-[13px]">
                    <Cpu className="w-5 h-5 text-[#7B2CF9] shrink-0" />
                    <p className="text-[#4A5578]">
                      <strong className="text-[#1F2D5B]">Multi-Lip Low-Friction Seals:</strong> Rated for -30°C to +110°C continuous duty.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Right Copy */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <span className="text-xs font-mono font-bold tracking-wider text-[#7B2CF9] uppercase">Engineered to Last</span>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <CinematicTextReveal
                  as="h2"
                  text="It's More Than a Machine. It's a Promise."
                  revealMode="words"
                  textColor="#1F2D5B"
                  lineHeight={1.05}
                  letterSpacing={-0.02}
                  direction="up"
                  distance={28}
                  blur={6}
                  easing="cinematic"
                  duration={0.8}
                  accentEnabled={true}
                  accentText="Promise."
                  accentColor="#7B2CF9"
                  className="font-display text-4xl sm:text-5xl font-black tracking-tight"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg text-[#4A5578] leading-relaxed max-w-lg">
                  We combine material science, precision engineering and real-world testing to deliver hydraulic solutions that perform in the toughest conditions.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Magnetic>
                  <Link
                    to="/technology"
                    className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#1F2D5B] hover:bg-[#7B2CF9] text-white font-semibold text-[15px] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#7B2CF9]/25"
                  >
                    <span>Our Technology</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="pt-6 border-t border-[#E8ECF8] space-y-3">
                  {[
                    '100% individual pressure chart recorded per cylinder',
                    'Micro-hardness testing on hard chrome plated piston rods',
                    'Custom engineering design support within 24 hours',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#4A5578]">
                      <CheckCircle2 className="w-4 h-4 text-[#7B2CF9] shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          07. BENTO METRICS
          ═══════════════════════════════════════════ */}
      <EngineeringBentoCards />


      {/* ═══════════════════════════════════════════
          08. INSTANT HYDRAULIC SIZING ENGINE
          ═══════════════════════════════════════════ */}
      <HydraulicCalculator />


      {/* ═══════════════════════════════════════════
          09. CLIENT TRUST WALL
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#FBFCFF]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <ClientLogoWall showTitle={true} limit={12} />
            <div className="text-center mt-10">
              <Magnetic>
                <Link
                  to="/clients"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E8ECF8] text-sm font-semibold text-[#7B2CF9] hover:border-[#7B2CF9]/40 hover:shadow-md transition-all"
                >
                  <span>View All 19 Certified Partners</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          09. CTA — Full Dark Section
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 bg-[#1F2D5B] text-white overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7B2CF9]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D8BFD8]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,78,140,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,78,140,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Copy */}
            <div className="space-y-8">
              <ScrollReveal>
                <span className="text-xs font-mono font-bold tracking-wider text-[#D8BFD8] uppercase">Let's Build What's Next</span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <CinematicTextReveal
                  as="h2"
                  text="Ready to Power Your Next Move?"
                  revealMode="words"
                  textColor="#FFFFFF"
                  lineHeight={1.05}
                  letterSpacing={-0.02}
                  direction="up"
                  distance={32}
                  blur={6}
                  easing="cinematic"
                  duration={0.85}
                  accentEnabled={true}
                  accentText="Next Move?"
                  accentGradientClass="bg-gradient-to-r from-white via-[#D8BFD8] to-[#FBFCFF] bg-clip-text text-transparent inline-block"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                  Partner with Dhanasree Hydraulics for reliable, high-performance hydraulic solutions. Our application engineers in Chennai provide technical sizing, CAD drawings, and quotes in 24 hours.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.15}>
                    <Link
                      to="/contact"
                      className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-semibold text-[15px] inline-flex items-center gap-3 shadow-xl shadow-[#7B2CF9]/30 hover:shadow-2xl hover:shadow-[#7B2CF9]/50 transition-all duration-500"
                    >
                      <span>Get in Touch</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Magnetic>

                  <Magnetic strength={0.15}>
                    <Link
                      to="/products"
                      className="px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-[15px] inline-flex items-center gap-2 hover:bg-white/20 transition-all"
                    >
                      <span>Explore Solutions</span>
                    </Link>
                  </Magnetic>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Visual */}
            <ScrollReveal direction="right" distance={60}>
              <TiltCard className="rounded-[32px]" intensity={5}>
                <div className="relative rounded-[32px] overflow-hidden border border-[#3B4E8C]/40 shadow-2xl bg-[#141D3B]">
                  <img
                    src="/images/products/powerpack.jpg"
                    alt="Hydraulic Power Pack — Engineering Real Progress"
                    className="w-full h-80 sm:h-96 object-cover mix-blend-luminosity brightness-110 opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D5B] via-transparent to-transparent" />

                  <div className="absolute bottom-8 right-8 text-right">
                    <div className="text-xs font-mono text-[#D8BFD8] tracking-wider uppercase">Fluid Power</div>
                    <div className="text-2xl font-display font-black text-white mt-1">Real Progress</div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
};
