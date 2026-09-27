import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

export const About = () => {
  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-3">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-text-primary">About Us</span>
          </div>

          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Corporate Background &amp; Philosophy
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mt-1">
            Precision Engineering &amp; Hydraulic Systems
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
            Founded to provide indigenous, high-durability hydraulic cylinders, specialized power units, and automated industrial machinery for global OEMs and manufacturing facilities.
          </p>
        </div>

        {/* Who We Are Hero Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-surface border border-border mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                About Us — Who We Are...
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                Excellence in Hydraulic Power Units &amp; Turnkey Systems
              </h2>
              <blockquote className="p-4 rounded-xl bg-bg-muted/70 border-l-4 border-accent text-sm sm:text-base text-text-primary font-medium italic leading-relaxed">
                &ldquo;{COMPANY_INFO.whoWeAre}&rdquo;
              </blockquote>
              <p className="text-sm text-text-secondary leading-relaxed">
                Operating across two primary manufacturing and service centers in Padi and Melayanambakkam, Chennai, we maintain end-to-end design, CNC machining, micro-honing, manifold fabrication, assembly, and testing under one corporate governance umbrella.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-bg-muted border border-border space-y-4">
              <h3 className="font-display font-semibold text-base text-text-primary">
                Operational Overview
              </h3>
              <div className="space-y-3 text-xs font-mono text-text-secondary">
                <div className="pb-2 border-b border-border/80 flex justify-between">
                  <span>Headquarters</span>
                  <span className="text-text-primary font-semibold">Chennai, India</span>
                </div>
                <div className="pb-2 border-b border-border/80 flex justify-between">
                  <span>Manufacturing</span>
                  <span className="text-text-primary font-semibold">Padi &amp; Melayanambakkam</span>
                </div>
                <div className="pb-2 border-b border-border/80 flex justify-between">
                  <span>Max Pressure</span>
                  <span className="text-text-primary font-semibold">350 Bar Continuous</span>
                </div>
                <div className="flex justify-between">
                  <span>Key Clients</span>
                  <span className="text-text-primary font-semibold">Ford, Samsung, TVS, L&amp;T</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section (Verbatim from PDF Page 3) */}
        <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-bg-surface border border-border flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bg-muted flex items-center justify-center text-accent mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent block mb-1">
                Who We Are, What We Do
              </span>
              <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
                Our Mission
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {COMPANY_INFO.mission.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-3xl bg-bg-surface border border-border flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bg-muted flex items-center justify-center text-accent mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent block mb-1">
                What We Aspire To Be
              </span>
              <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
                Our Vision
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                {COMPANY_INFO.vision.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Manufacturing Facilities & Quality Manifesto */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-muted/70 border border-border mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Plant Infrastructure &amp; Rigorous QA
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
              Zero-Compromise Engineering &amp; Testing
            </h2>
            <p className="text-sm text-text-secondary mt-2">
              Every hydraulic component is produced under strict metallurgical control, micro-honed for minimum seal wear, and proof-tested under certified hydrostatic pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <div className="font-mono text-xs font-semibold text-accent">01. Metallurgy</div>
              <h4 className="font-display font-semibold text-base text-text-primary">Certified Raw Materials</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Seamless cold-drawn tubes conforming to DIN2391 / ST52 standards and induction-hardened EN8D/EN19 piston rods with 30-50 micron chrome plating.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <div className="font-mono text-xs font-semibold text-accent">02. Sealing Integrity</div>
              <h4 className="font-display font-semibold text-base text-text-primary">MNC-Tier Sealing Systems</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Fitted with genuine Parker, Merkel, or Hallite precision polyurethane and Viton chevron packings for zero leakage over severe cyclic loads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <div className="font-mono text-xs font-semibold text-accent">03. Calibration</div>
              <h4 className="font-display font-semibold text-base text-text-primary">Hydrostatic Certification</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                100% individual pressure testing up to 1.5x working envelope with digital transducer logging and physical seal inspection.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate CTA */}
        <div className="text-center py-10 bg-bg-surface rounded-2xl border border-border p-8">
          <h3 className="font-display text-2xl font-semibold text-text-primary">
            Partner With Dhanasree For Your Next Engineering Program
          </h3>
          <p className="text-sm text-text-secondary mt-2 max-w-xl mx-auto">
            Contact our engineering headquarters at Melayanambakkam, Chennai for turnkey development, custom fabrication, and annual maintenance contracts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
            >
              Contact Engineering Team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/clients"
              className="px-6 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary font-semibold text-sm hover:border-accent transition-colors"
            >
              View Client Partner Roster
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
