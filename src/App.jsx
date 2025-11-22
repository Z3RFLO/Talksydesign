import React, { useState, useEffect } from 'react';
import { Plus, MessageSquareText, X, MessageCircle } from 'lucide-react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import CreateModal from './components/CreateModal';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import TopicFeed from './pages/TopicFeed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import UserPopup from './components/UserPopup';
import Settings from './pages/Settings';

const INITIAL_POSTS = [
  { id: 1, author: "Design_God", handle: "@visuals", avatar: "D", content: "Dark mode isn't just about black backgrounds. It's about hierarchy.", likes: 245, comments: 12, accent: "border-l-2 border-indigo-500", time: "2h", tags: ["Design", "Void", "Cyberpunk"] },
  { id: 2, author: "CodeNinja", handle: "@dev_guy", avatar: "C", content: "Just deleted 500 lines of legacy code. Best feeling in the world.", likes: 890, comments: 45, accent: "border-l-2 border-emerald-500", time: "4h", tags: ["Coding", "React"] },
  { id: 3, author: "Minimalist", handle: "@less", avatar: "M", content: "Silence is a sound. White space is an element.", likes: 56, comments: 2, accent: "border-l-2 border-pink-500", time: "6h", tags: ["Minimalism", "Void"] },
  { id: 4, author: "Neon_Rider", handle: "@city", avatar: "N", content: "The rain on the neon lights looks different tonight. 🌧️", likes: 1200, comments: 89, accent: "border-l-2 border-purple-500", time: "8h", tags: ["Cyberpunk", "NightLife"] }
];

const StyleEngine = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    body { color: #fff; font-family: 'Outfit', sans-serif; margin: 0; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 0px; }
  `}</style>
);

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [viewingUser, setViewingUser] = useState(null);
  
  // --- THEME STATE ---
  const [isPureBlack, setIsPureBlack] = useState(false);

  const location = useLocation();

  const handleNewPost = (text) => {
    const newPost = { id: Date.now(), author: "You", handle: "@user", avatar: "Y", content: text, likes: 0, comments: 0, accent: "border-l-2 border-white", time: "Just now", tags: [] };
    setPosts([newPost, ...posts]);
  };

  const handleUserClick = (user) => {
    setViewingUser(user);
  };

  // --- TOGGLE FUNCTION ---
  const toggleTheme = () => {
    setIsPureBlack(!isPureBlack);
    // This physically changes the CSS on the body tag
    if (!isPureBlack) {
      document.body.setAttribute('data-theme', 'pure');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  const isMessagesPage = location.pathname === '/messages';

  return (
    <div className="min-h-screen flex justify-center relative overflow-hidden">
      <StyleEngine />
      
      {!isMessagesPage && <Sidebar />}
      
      <main className={`w-full ${!isMessagesPage ? 'pl-[120px] pr-10' : 'px-4'}`}>
        <Routes>
          <Route path="/" element={<Feed posts={posts} onUserClick={handleUserClick} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:topic" element={<TopicFeed posts={posts} onPost={handleNewPost} onUserClick={handleUserClick} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* PASS THEME PROPS TO SETTINGS */}
          <Route path="/settings" element={<Settings isPureBlack={isPureBlack} toggleTheme={toggleTheme} />} />
          
          <Route path="/notifications" element={<div className="text-white pt-40 text-center text-2xl">Notifications</div>} />
        </Routes>
      </main>

      <Link to={isMessagesPage ? "/" : "/messages"} className="fixed top-8 right-8 z-50">
        <div className={`w-14 h-14 backdrop-blur-xl border rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl group ${isMessagesPage ? 'bg-white border-white text-black hover:rotate-90 hover:bg-gray-200' : 'bg-[#0c0c0e]/80 border-white/10 text-white hover:bg-white hover:text-black hover:scale-110'}`}>
          {isMessagesPage ? <X size={28} strokeWidth={2.5} /> : (
            <div className="relative">
              <MessageCircle size={26} strokeWidth={2} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f91880] rounded-full border border-black group-hover:border-white"></div>
            </div>
          )}
        </div>
      </Link>

      {location.pathname === '/' && (
        <div onClick={() => setModalOpen(true)} className="fixed bottom-12 right-12 w-20 h-20 bg-white rounded-[28px] flex items-center justify-center cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] z-50 animate-in zoom-in duration-300">
          <Plus size={40} color="black" strokeWidth={2.5} />
        </div>
      )}

      <CreateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onPost={handleNewPost} />
      <UserPopup user={viewingUser} onClose={() => setViewingUser(null)} />
    </div>
  );
}