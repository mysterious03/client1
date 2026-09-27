import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Award, Building, ArrowUpRight } from 'lucide-react';
import { CLIENTS } from '../data/catalog';

export const Clients = () => {
  const [filterSector, setFilterSector] = useState<string>('all');

  const sectors = [
    'all',
    'Automotive OEM',
    'Infrastructure & Engineering',
    'Tyre & Rubber',
    'Industrial & Precision',
  ];

  const filteredClients = CLIENTS.filter((client) => {
    if (filterSector === 'all') return true;
    if (filterSector === 'Automotive OEM') {
      return (
        client.category.includes('Automotive') ||
        client.category.includes('Steering')
      );
    }
    if (filterSector === 'Infrastructure & Engineering') {
      return (
        client.category.includes('Infrastructure') ||
        client.category.includes('Construction') ||
        client.category.includes('Geotechnical') ||
        client.category.includes('Steel')
      );
    }
    if (filterSector === 'Tyre & Rubber') {
      return (
        client.category.includes('Tyre') || client.category.includes('Rubber')
      );
    }
    if (filterSector === 'Industrial & Precision') {
      return (
        client.category.includes('Precision') ||
        client.category.includes('Electronics') ||
        client.category.includes('Energy') ||
        client.category.includes('Polymer') ||
        client.category.includes('Glass') ||
        client.category.includes('Textiles')
      );
    }
    return true;
  });

  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-3">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Clients &amp; Partners</span>
          </div>

          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Proven Industrial Track Record
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mt-1">
            Certified Suppliers to Premier MNCs &amp; Industrial Giants
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
            Dhanasree Hydraulics is proud to serve tier-1 global automotive OEMs, heavy infrastructure contractors, and high-precision manufacturers with zero-defect hydraulic systems.
          </p>
        </div>

        {/* Procurement Credentials Strip */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-muted text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-text-primary">
                Pre-Qualified Vendor
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Approved vendor status for automotive, EPC, and defense tier-1 procurement portals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-muted text-accent">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-text-primary">
                100% Quality Conformance
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Zero-rejection history on major hydraulic cylinder and power pack supply contracts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-bg-muted text-accent">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-text-primary">
                Pan-India Field Support
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Field engineers available for on-site commissioning, fluid flushing, and routine maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-text-secondary mr-2">Filter By Sector:</span>
          {sectors.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setFilterSector(sec)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterSector === sec
                  ? 'bg-text-primary text-bg-base font-semibold shadow-sm'
                  : 'bg-bg-surface text-text-secondary border border-border hover:border-accent'
              }`}
            >
              {sec === 'all' ? 'All 19 Clients' : sec}
            </button>
          ))}
        </div>

        {/* Client Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-2xl bg-bg-surface border border-border hover:border-accent transition-all duration-300 group flex flex-col justify-between min-h-[140px] shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-accent uppercase font-medium">
                    {client.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-border group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-secondary group-hover:text-text-primary transition-colors tracking-tight">
                  {client.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs text-text-secondary font-mono">
                <span>{client.highlight || 'Corporate Partner'}</span>
                <span className="text-[10px] text-success font-semibold uppercase">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Vendor Registration Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-muted/70 border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Vendor Onboarding &amp; Audits
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
              Need vendor registration documents or plant audit access?
            </h3>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              Our quality and procurement team in Chennai facilitates rapid vendor registration, provides QA test certificates, and coordinates plant visits to our Melayanambakkam works.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-lg bg-text-primary text-bg-base font-semibold text-sm hover:bg-accent transition-colors shadow-sm inline-flex items-center gap-2 self-start md:self-auto flex-shrink-0"
          >
            Initiate Vendor Enrolment <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
