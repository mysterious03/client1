import React, { useState, useEffect } from 'react';
import { Activity, Clock, Gauge, ChevronRight, ShieldCheck, Zap, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const LivePlantTelemetry: React.FC = () => {
  const [time, setTime] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0F172E]/95 backdrop-blur-md text-slate-300 border-b border-white/10 text-xs relative z-40 transition-all font-mono">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
          
          {/* Left: Plant Status Signals */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-white font-semibold tracking-wider uppercase text-[10px]">
                Chennai Works: Online
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-slate-400">
              <span className="text-white/20">|</span>
              <Activity className="w-3 h-3 text-[#F59E0B]" />
              <span>Rig #1: 350-Bar Hydrostatic Bench Active</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-400">
              <span className="text-white/20">|</span>
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>Padi &amp; Melayanambakkam Plants Operating</span>
            </div>
          </div>

          {/* Right: Live IST Clock & Quick Telemetry Trigger */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-slate-400 text-[10px]">IST</span>
              <span className="text-emerald-400 font-bold tabular-nums">{time || '09:00:00 AM'}</span>
            </div>

            <span className="text-white/20">|</span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#D8BFD8] hover:text-white flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <span>{isExpanded ? 'Close Diagnostics' : 'Facility Diagnostics'}</span>
              <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expandable Diagnostic Tray */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pb-2">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#7B2CF9]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
                    <Factory className="w-3 h-3 text-[#7B2CF9]" />
                    <span>Primary Works (Melayanambakkam)</span>
                  </div>
                  <div className="text-white font-semibold mt-1">CNC Honing &amp; Cylinders</div>
                  <div className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Shift 1: High Capacity Active</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#7B2CF9]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
                    <Gauge className="w-3 h-3 text-cyan-400" />
                    <span>Secondary Works (Padi)</span>
                  </div>
                  <div className="text-white font-semibold mt-1">Heavy Presses &amp; Structural</div>
                  <div className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>500-Ton Assembly Bay Ready</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#7B2CF9]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-[#F59E0B]" />
                    <span>Hydrostatic Rig Verification</span>
                  </div>
                  <div className="text-white font-semibold mt-1">Zero-Leak Proof Testing</div>
                  <div className="text-[#F59E0B] text-[10px] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    <span>Calibration: ISO-6020/2 Pass</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between hover:border-[#7B2CF9]/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
                      <Zap className="w-3 h-3 text-[#7B2CF9]" />
                      <span>Engineering RFQ Desk</span>
                    </div>
                    <div className="text-white font-semibold mt-1">&lt; 120 Min Technical Review</div>
                  </div>
                  <Link
                    to="/contact"
                    className="text-[#D8BFD8] hover:text-white text-[11px] mt-2 inline-flex items-center gap-1 font-medium transition-colors group"
                  >
                    <span>Dispatch Blueprint</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
