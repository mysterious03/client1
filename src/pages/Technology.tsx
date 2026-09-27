import React from 'react';
import { Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HydraulicCalculator } from '../components/HydraulicCalculator';
import { SchematicViewer } from '../components/SchematicViewer';
import { SpecComparisonTable } from '../components/SpecComparisonTable';

export const Technology: React.FC = () => {
  return (
    <div className="bg-[#FBFCFF] min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-16 pb-20 border-b border-[#D5DCF0] overflow-hidden bg-gradient-to-b from-[#E8ECF8]/50 to-[#FBFCFF]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-thistle text-xs font-mono font-medium text-text-primary shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span>Proprietary Hydraulic Engineering &amp; Testing Suite</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
              Engineering <span className="bg-gradient-to-r from-[#1F2D5B] via-[#7B2CF9] to-[#1F2D5B] bg-clip-text text-transparent">Science &amp; Technology</span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Explore our CAD blueprint diagnostics, interactive cylinder sizing calculation engine, and cross-series proof pressure testing parameters.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Interactive CAD & Hydraulic Flow Inspector */}
      <section className="py-16 border-b border-[#D5DCF0] bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                Inspection System
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary tracking-tight">
                Triple-Mode CAD &amp; Circuit Visualizer
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Toggle between studio photography, micron-tolerance CAD blueprints conforming to ISO 6020-2, and hydraulic fluid circuit flow schematics.
              </p>

              <div className="pt-2 space-y-2 text-xs font-mono text-text-secondary">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Ra ≤ 0.2 µm Cold-Drawn Barrel Micro-Finish</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Min 25 µm Hard-Chrome Plated Alloy Rods</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>100% Proof Pressure Testing at 1.5x Rating</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SchematicViewer
                imageSrc="/images/products/cylinder.jpg"
                title="ISO-6020/2 Heavy Duty Hydraulic Cylinder"
                seriesCode="Series HD-250 • Proof Tested 375 Bar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Sizing & Force Calculator */}
      <HydraulicCalculator />

      {/* 3. Specification Sheet Comparison */}
      <SpecComparisonTable />

      {/* Bottom CTA to Plant RFQ */}
      <section className="py-16 bg-[#E8ECF8]/60 border-t border-[#D5DCF0]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
            Need a Custom Non-Standard Cylinder or Power Unit?
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Our engineering team in Melayanambakkam, Chennai customizes bore sizes up to 500mm and strokes up to 6 meters.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#7B2CF9]/30 transition-all inline-flex items-center gap-2"
            >
              Submit Custom Specs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-white border border-[#D5DCF0] text-text-primary font-semibold text-sm hover:border-[#7B2CF9] transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
