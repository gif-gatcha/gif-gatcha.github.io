import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cat, Heart, Sparkles } from 'lucide-react';

interface CatGif {
  url: string;
  id: string;
}

export default function CatEdition() {
  const [cat, setCat] = useState<CatGif | null>(null);
  const [loading, setLoading] = useState(true);
  const [purring, setPurring] = useState(false);

  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif');
      const data = await response.json();
      if (data && data.length > 0) {
        setCat({
          url: data[0].url,
          id: data[0].id
        });
      }
    } catch (error) {
      console.error('Failed to fetch cat:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const handlePurr = () => {
    setPurring(true);
    setTimeout(() => setPurring(false), 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white border-4 border-[#1e1b4b] rounded-[2.5rem] md:rounded-[40px] p-6 md:p-8 shadow-[8px_8px_0px_0px_#1e1b4b] md:shadow-[12px_12px_0px_0px_#1e1b4b] relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <span className="bg-[#facc15] border-2 border-[#1e1b4b] px-3 py-1 rounded-lg text-[9px] font-black uppercase mb-2 inline-flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#1e1b4b]">
              <Cat size={10} />
              FELINE_RITUAL_V1
            </span>
            <h3 className="text-xl md:text-4xl font-black italic tracking-tighter uppercase text-[#1e1b4b]">
              CAT EDITION
            </h3>
            <div className="mt-1 text-[#6366f1] font-bold text-xs uppercase tracking-tighter">Live Stream from Cat-Verse</div>
          </div>
          <div className="text-3xl md:text-6xl font-black opacity-10 flex-shrink-0 tracking-tighter italic">
            MEOW
          </div>
        </div>

        <div className="w-full bg-[#1e1b4b] rounded-2xl border-4 border-[#1e1b4b] overflow-hidden shadow-inner relative group min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-black text-[8px] uppercase tracking-widest">Scanning Galaxy for Cats...</p>
              </motion.div>
            ) : (
              <motion.div
                key={cat?.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <img 
                  src={cat?.url} 
                  className="w-full h-auto object-contain max-h-[45vh] md:max-h-[55vh]"
                  alt="Daily Cat"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {purring && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-white/90 border-2 border-[#1e1b4b] px-4 py-2 rounded-full font-black text-[#1e1b4b] shadow-[4px_4px_0px_0px_#1e1b4b] italic flex items-center gap-2">
                  <Heart className="text-[#fb7185] fill-[#fb7185]" size={16} />
                  PURRRRRRRRRRR
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-end items-center gap-6">
          <button 
            onClick={fetchCat}
            disabled={loading}
            className="w-full md:w-auto bg-[#facc15] border-4 border-[#1e1b4b] px-10 py-3 rounded-2xl text-[#1e1b4b] font-black italic uppercase shadow-[6px_6px_0px_0px_#1e1b4b] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Summon Next Cat
          </button>
        </div>
      </div>

      <div className="mt-12 text-[#1e1b4b]/40 font-black italic text-[8px] md:text-[10px] uppercase tracking-widest text-center">
        Powered by Feline Intelligence Protocol // Infinite Meow Stream
      </div>
    </div>
  );
}
