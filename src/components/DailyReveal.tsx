import { useState, useEffect } from 'react';
import { DailyConfig } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';
import dailyData from '../daily.json';

export default function DailyReveal() {
  const [daily, setDaily] = useState<DailyConfig>(dailyData as DailyConfig);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setDaily(dailyData as DailyConfig);
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 animate-pulse">
      <div className="w-64 h-64 bg-gray-300 brutal-border mb-4"></div>
      <div className="h-8 bg-gray-300 w-48 mb-2"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-2 tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_#1e1b4b]">
          The Daily Ritual
        </h2>
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white font-bold text-[10px] md:text-sm uppercase tracking-widest leading-none">
          <Calendar size={14} className="md:w-4 md:h-4" /> <span>{daily?.date}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div 
            key="sealed"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="flex flex-col items-center"
          >
            <button 
              onClick={() => setRevealed(true)}
              className="w-full max-w-sm md:max-w-lg aspect-square bg-[#facc15] border-4 border-[#1e1b4b] rounded-[2.5rem] md:rounded-[40px] shadow-[8px_8px_0px_0px_#1e1b4b] md:shadow-[12px_12px_0px_0px_#1e1b4b] flex flex-col items-center justify-center text-[#1e1b4b] cursor-pointer hover:bg-[#eab308] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b4b] md:hover:shadow-[8px_8px_0px_0px_#1e1b4b] transition-all group"
            >
              <motion.div
                animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Sparkles size={100} className="md:w-[120px] md:h-[120px]" strokeWidth={2.5} />
              </motion.div>
              <div className="mt-6 md:mt-8 text-2xl md:text-4xl font-black italic uppercase text-center px-8 md:px-12 group-hover:scale-105 transition-transform tracking-tighter">
                Click to Reveal Today's GIF
              </div>
              <div className="mt-4 bg-[#1e1b4b] text-white px-3 md:px-4 py-1 rounded-full text-[8px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap">
                Untripped Seal
              </div>
            </button>
            <p className="mt-8 font-black uppercase text-[#1e1b4b]/60 italic tracking-widest text-[10px]">Curated fresh every 24 hours</p>
          </motion.div>
        ) : (
          <motion.div 
            key="revealed"
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white border-4 border-[#1e1b4b] rounded-[2.5rem] md:rounded-[40px] p-6 md:p-8 shadow-[8px_8px_0px_0px_#1e1b4b] md:shadow-[12px_12px_0px_0px_#1e1b4b] w-full max-w-2xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-6 min-w-0">
                <div className="min-w-0 flex-1">
                  <span className="bg-[#4ade80] border-2 border-[#1e1b4b] px-3 py-1 rounded-lg text-[9px] font-black uppercase mb-2 inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#1e1b4b]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    GIF_OF_THE_DAY
                  </span>
                  <h3 className="text-xl md:text-4xl font-black italic tracking-tighter uppercase truncate pr-4 text-[#1e1b4b]">
                    {daily?.title}
                  </h3>
                  <div className="mt-1 text-[#6366f1] font-bold text-xs uppercase tracking-tighter">Verified Protocol Data</div>
                </div>
                <div className="text-3xl md:text-6xl font-black opacity-10 flex-shrink-0 tracking-tighter italic">
                  #{daily?.date.replace(/-/g, '').slice(-4)}
                </div>
              </div>

              <div className="w-full bg-[#1e1b4b] rounded-2xl border-4 border-[#1e1b4b] overflow-hidden shadow-inner relative group">
                <img 
                  src={daily?.url} 
                  alt={daily?.title} 
                  className="w-full h-auto object-contain max-h-[45vh] md:max-h-[55vh]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <span className="bg-black/50 text-white px-2 py-1 text-[8px] rounded uppercase font-bold">TYPE: GIF</span>
                    <span className="bg-black/50 text-white px-2 py-1 text-[8px] rounded uppercase font-bold">MODE: LOOP</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row justify-end items-center gap-6">
                <button 
                  onClick={() => setRevealed(false)}
                  className="w-full md:w-auto bg-[#fb7185] border-4 border-[#1e1b4b] px-10 py-3 rounded-2xl text-white font-black italic uppercase shadow-[6px_6px_0px_0px_#1e1b4b] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                >
                  Close Archive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
