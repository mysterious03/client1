import React, { useState } from 'react';
import { CLIENTS } from '../data/catalog';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ClientLogoWallProps {
  showTitle?: boolean;
  limit?: number;
}

export const ClientLogoWall: React.FC<ClientLogoWallProps> = ({
  showTitle = true,
  limit,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = [
    { id: 'all', label: 'All Partners (19)' },
    { id: 'automotive', label: 'Automotive & OEMs', match: ['automotive'] },
    { id: 'infra', label: 'Infrastructure & EPC', match: ['infra', 'geo', 'construction'] },
    { id: 'tyre', label: 'Tyre & Polymer', match: ['tyre', 'rubber', 'polymer'] },
    { id: 'industrial', label: 'Industrial & Steel', match: ['steel', 'glass', 'energy', 'electrical'] },
  ];

  const filteredClients = CLIENTS.filter((client) => {
    if (selectedSector === 'all') return true;
    const current = sectors.find((s) => s.id === selectedSector);
    if (!current?.match) return true;
    const lower = (client.category + ' ' + (client.highlight || '')).toLowerCase();
    return current.match.some((m) => lower.includes(m));
  });

  const displayClients = limit && selectedSector === 'all'
    ? filteredClients.slice(0, limit)
    : filteredClients;

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Industrial Trust
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Trusted by Leading Global &amp; Indian Enterprises
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Supplying precision hydraulic assemblies and engineered equipment to Fortune 500 manufacturers, automotive OEMs, and heavy infrastructure leaders.
          </p>
        </div>
      )}

      {/* Interactive Sector Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {sectors.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setSelectedSector(sec.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedSector === sec.id
                ? 'bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-bold shadow-md shadow-[#7B2CF9]/25'
                : 'bg-[#E8ECF8] hover:bg-[#E8ECF8]/80 border border-border text-text-primary hover:border-accent'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Grid of Clients */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {displayClients.map((client) => (
          <div
            key={client.id}
            className="group p-4 sm:p-5 rounded-xl bg-bg-surface border border-border transition-all duration-300 hover:border-accent hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider group-hover:text-accent transition-colors font-medium">
                {client.category.split('&')[0]}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-accent/50 group-hover:text-accent transition-colors" />
            </div>

            <div className="my-2">
              <div className="font-display font-bold text-base sm:text-lg text-text-secondary group-hover:text-text-primary transition-colors tracking-tight">
                {client.name}
              </div>
            </div>

            {client.highlight && (
              <div className="text-[10px] text-text-secondary truncate font-mono">
                {client.highlight}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-text-secondary font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success"></span>
          <span>100% On-spec vendor audits cleared across automotive &amp; infrastructure sectors</span>
        </div>
        <div className="text-[11px]">
          Direct supplier to tier-1 manufacturing plants across India
        </div>
      </div>
    </div>
  );
};
