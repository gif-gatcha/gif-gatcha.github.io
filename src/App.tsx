import { useState } from 'react';
import { Gift, Cat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DailyReveal from './components/DailyReveal';
import CatEdition from './components/CatEdition';

export default function App() {
  const [activeTab, setActiveTab] = useState<'daily' | 'cat'>('daily');

  return (
    <div className="page-container font-sans select-none">
      {/* Responsive Header */}
      <header className="px-6 md:px-8 pt-8 pb-4 flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div 
            className="brutal-token cursor-pointer scale-90 md:scale-100 origin-left"
            onClick={() => setActiveTab('daily')}
          >
            <span className="text-xl md:text-2xl tracking-tighter uppercase font-black italic">GIF.GATCHA</span>
          </div>
          <div className="bg-[#1e1b4b] border-2 border-white/20 px-3 py-1.5 rounded-xl text-white font-black text-[10px] md:text-xs hidden md:flex items-center gap-2 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
            <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse"></div>
            <span>SYNC: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col px-4 md:px-8 pb-32 md:pb-8 max-w-7xl mx-auto w-full">
        {/* Desktop Top Nav */}
        <nav className="hidden md:flex flex-wrap gap-4 mb-8">
          <NavItem 
            id="daily" 
            label="Daily Ritual" 
            icon={<Gift size={18} />} 
            active={activeTab === 'daily'} 
            onClick={() => setActiveTab('daily')} 
          />
          <NavItem 
            id="cat" 
            label="Cat Edition" 
            icon={<Cat size={18} />} 
            active={activeTab === 'cat'} 
            onClick={() => setActiveTab('cat')} 
          />
        </nav>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {activeTab === 'daily' && <DailyReveal />}
              {activeTab === 'cat' && <CatEdition />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
        <div className="bg-white border-4 border-[#1e1b4b] rounded-[2rem] p-2 shadow-[8px_8px_0px_0px_#1e1b4b] flex justify-around items-center">
          <MobileNavItem 
            active={activeTab === 'daily'} 
            onClick={() => setActiveTab('daily')}
            icon={<Gift size={24} />}
            label="Daily"
          />
          <MobileNavItem 
            active={activeTab === 'cat'} 
            onClick={() => setActiveTab('cat')}
            icon={<Cat size={24} />}
            label="Cats"
          />
        </div>
      </div>
    </div>
  );
}

function NavItem({ id, label, icon, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold border-4 border-[#1e1b4b] transition-all
        ${active ? 'bg-[#facc15] shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0px_0px_#1e1b4b] hover:bg-[#e0e7ff]'}`}
    >
      {icon}
      <span className="uppercase text-sm italic">{label}</span>
    </button>
  );
}

function MobileNavItem({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${active ? 'bg-[#facc15] text-[#1e1b4b]' : 'text-[#1e1b4b]/40'}`}
    >
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
