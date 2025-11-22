import React, { useState } from 'react';
import { Plus, MessageSquareText } from 'lucide-react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import CreateModal from './components/CreateModal';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import TopicFeed from './pages/TopicFeed';

const INITIAL_POSTS = [
  { id: 1, author: "Design_God", handle: "@visuals", avatar: "D", content: "Dark mode isn't just about black backgrounds. It's about hierarchy.", likes: 245, comments: 12, accent: "border-l-2 border-indigo-500", time: "2h", tags: ["Design", "Void", "Cyberpunk"] },
  { id: 2, author: "CodeNinja", handle: "@dev_guy", avatar: "C", content: "Just deleted 500 lines of legacy code. Best feeling in the world.", likes: 890, comments: 45, accent: "border-l-2 border-emerald-500", time: "4h", tags: ["Coding", "React"] },
];

const StyleEngine = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    body { background-color: #000; color: #fff; font-family: 'Outfit', sans-serif; margin: 0; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 0px; }
  `}</style>
);

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const location = useLocation();

  const handleNewPost = (text) => {
    // Create new post object
    const newPost = { 
      id: Date.now(), 
      author: "You", 
      handle: "@user", 
      avatar: "Y", 
      content: text, 
      likes: 0, 
      comments: 0, 
      accent: "border-l-2 border-white", 
      time: "Just now", 
      tags: [] 
    };
    
    // Update state correctly
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen flex justify-center bg-black relative">
      <StyleEngine />
      <Sidebar />
      
      <main className="w-full pl-[120px] pr-10">
        <Routes>
          <Route path="/" element={<Feed posts={posts} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:topic" element={<TopicFeed posts={posts} onPost={handleNewPost} />} />
        </Routes>
      </main>

      {/* FAB - Logic Check for visibility */}
      {location.pathname === '/' && (
        <button 
          onClick={() => setModalOpen(true)} 
          className="fixed bottom-12 right-12 w-20 h-20 bg-white rounded-[28px] flex items-center justify-center cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 z-50"
        >
          <Plus size={40} color="black" strokeWidth={2.5} />
        </button>
      )}

      <CreateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onPost={handleNewPost} />
    </div>
  );
}