import React, { useState } from 'react';
import { Plus } from 'lucide-react';

// Imports from our new folders
import Sidebar from './components/Sidebar';
import CreateModal from './components/CreateModal';
import Feed from './pages/Feed';
import Explore from './pages/Explore'; // (Create this file similar to Feed if you want)

/* --- GLOBAL STYLES --- */
const StyleEngine = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    body { background-color: #000; color: #fff; font-family: 'Outfit', sans-serif; margin: 0; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 0px; }
    @keyframes floatUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex justify-center bg-black">
      <StyleEngine />
      
      {/* 1. Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content */}
      <main className="w-full pl-[120px] pr-10">
        {activeTab === 'home' && <Feed />}
        {activeTab === 'explore' && <div className="text-white pt-20 text-center text-2xl">Explore View (Create pages/Explore.jsx)</div>}
        {activeTab === 'profile' && <div className="text-white pt-20 text-center text-2xl">Profile View</div>}
      </main>

      {/* 3. FAB (Floating Action Button) */}
      {/* FIX: Removed rotation, added scale pop */}
      <div 
        onClick={() => setModalOpen(true)}
        className="fixed bottom-12 right-12 w-20 h-20 bg-white rounded-[28px] flex items-center justify-center cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] z-[100]"
      >
        <Plus size={40} color="black" strokeWidth={2.5} />
      </div>

      {/* 4. Modal */}
      <CreateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}