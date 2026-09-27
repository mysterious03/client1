import React, { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SeriesData {
  series: string;
  category: string;
  boreRange: string;
  pressure: string;
  testPressure: string;
  rodPlating: string;
  sealSystem: string;
  targetDuty: string;
}

const SERIES_CATALOG: SeriesData[] = [
  {
    series: 'Series HD-250 (Standard Heavy)',
    category: 'Hydraulic Cylinder',
    boreRange: 'Ø 40 mm – Ø 350 mm',
    pressure: '210 – 250 Bar',
    testPressure: '375 Bar Hydrostatic',
    rodPlating: 'Hard Chrome (min 25 µm, Ra 0.2)',
    sealSystem: 'Polyurethane + Nitrile NBR 85',
    targetDuty: 'Industrial presses, scrap balers, earthmoving',
  },
  {
    series: 'Series ML-350 (Mill Severe Duty)',
    category: 'Steel Mill & Mining',
    boreRange: 'Ø 63 mm – Ø 500 mm',
    pressure: '250 – 350 Bar',
    testPressure: '500 Bar Hydrostatic',
    rodPlating: 'Induction Hardened Chrome 50 µm',
    sealSystem: 'FKM Viton® + Bronze-filled PTFE',
    targetDuty: 'Continuous steel rolling, continuous caster, forging',
  },
  {
    series: 'Series TP-400 (Telescopic Multi-Stage)',
    category: 'Mobile & Tippers',
    boreRange: 'Ø 90 mm – Ø 280 mm',
    pressure: '160 – 200 Bar',
    testPressure: '300 Bar Hydrostatic',
    rodPlating: 'Chrome Plated Sleeves 25 µm',
    sealSystem: 'V-Packing Fabric Reinforced Chevron',
    targetDuty: 'Heavy tipping trailers, container side loaders',
  },
  {
    series: 'Series HPU-Custom (Hydraulic Power Unit)',
    category: 'Power Packs',
    boreRange: 'Tank: 25L – 2000L',
    pressure: '70 – 350 Bar Continuous',
    testPressure: '100% Manifold Block Pressure Checked',
    rodPlating: 'N/A (CNC Manifold Block)',
    sealSystem: 'O-Ring NBR / Viton with Anti-Extrusion Rings',
    targetDuty: 'Robotic clamping, elevator drive, injection moulding',
  },
  {
    series: 'Series SL-500 (Heavy Scissor Platform)',
    category: 'Material Handling',
    boreRange: 'Single / Dual / Tandem Rams',
    pressure: '160 – 210 Bar',
    testPressure: '280 Bar Static Proof Load',
    rodPlating: 'Hard Chrome Ground Shafts',
    sealSystem: 'Low-friction PTFE Stepseal',
    targetDuty: 'Dock levelers, 10-Ton cargo platforms, car stackers',
  },
];

export const SpecComparisonTable: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredData = selectedFilter === 'all'
    ? SERIES_CATALOG
    : SERIES_CATALOG.filter((item) =>
        item.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        item.series.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <section className="py-20 bg-bg-base border-t border-border">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Specification Sheet • Cross-Series Matrix</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Engineering Comparison Matrix
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-2xl">
              Direct technical parameter comparison across Dhanasree Hydraulics standard and severe-duty manufacturing series. All units manufactured to ISO tolerances with proof hydrostatic certification.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#E8ECF8] border border-border text-xs font-mono self-start lg:self-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-white text-accent font-bold border border-thistle shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              All Series
            </button>
            <button
              onClick={() => setSelectedFilter('cylinder')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedFilter === 'cylinder'
                  ? 'bg-white text-accent font-bold border border-thistle shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cylinders
            </button>
            <button
              onClick={() => setSelectedFilter('power')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedFilter === 'power'
                  ? 'bg-white text-accent font-bold border border-thistle shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Power Packs
            </button>
          </div>
        </div>

        {/* Tabular Spec Sheet - Inspo Table Style: Thin Rules, No Loud Zebras, Smooth Hover Tracking */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-border bg-[#E8ECF8]/80 text-text-primary uppercase text-[11px] tracking-wider font-semibold">
                  <th className="py-4 px-5">Series Designation</th>
                  <th className="py-4 px-4">Bore / Tank Range</th>
                  <th className="py-4 px-4">Working Pressure</th>
                  <th className="py-4 px-4">Proof Hydrostatic</th>
                  <th className="py-4 px-4">Rod Plating / Tube ID</th>
                  <th className="py-4 px-4">Sealing Media</th>
                  <th className="py-4 px-5 text-right">Inquire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((row) => (
                  <tr
                    key={row.series}
                    className="hover:bg-[#7B2CF9]/5 transition-colors group cursor-default"
                  >
                    <td className="py-4 px-5 font-sans font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">
                      {row.series}
                      <span className="block font-mono text-[10px] text-text-secondary mt-0.5">
                        {row.targetDuty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-primary tabular-nums font-medium">
                      {row.boreRange}
                    </td>
                    <td className="py-4 px-4 text-amber-gold font-bold tabular-nums">
                      {row.pressure}
                    </td>
                    <td className="py-4 px-4 text-text-primary tabular-nums">
                      {row.testPressure}
                    </td>
                    <td className="py-4 px-4 text-text-secondary">
                      {row.rodPlating}
                    </td>
                    <td className="py-4 px-4 text-text-secondary">
                      {row.sealSystem}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-sans font-semibold text-xs shadow-xs hover:shadow-md hover:shadow-[#7B2CF9]/30 transition-all"
                      >
                        RFQ <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Annotation */}
          <div className="px-6 py-3.5 bg-bg-muted/50 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span>All cylinders 100% individual hydrostatic tested at Chennai facility prior to crate shipment</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Standard Warranty: 12-24 Months</span>
              <span>•</span>
              <span>ISO 6020/2 Metric Heavy Duty</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
