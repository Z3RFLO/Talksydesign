import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Hash, Bell, Users, Search, HelpCircle, 
  PlusCircle, Gift, Sticker, Smile, Send 
} from 'lucide-react';
import PostCard from '../components/PostCard';

export default function TopicFeed({ posts = [], onPost, onUserClick }) {
  const { topic } = useParams(); 
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  // Filter posts to show only those that have the current topic as a tag
  const filteredPosts = posts.filter(p => p.tags && p.tags.includes(topic));
  
  // Default starter message if no posts exist
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : [
    { id: 999, author: "System", handle: "@void", avatar: "S", content: `Welcome to the #${topic} channel. Be the first to transmit.`, likes: 0, comments: 0, accent: "border-l-2 border-gray-700", time: "Now" }
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      // CRITICAL FIX: Pass the current topic as a tag so the post appears in this feed
      onPost(inputValue, [topic]); 
      setInputValue("");
    }
  };

  return (
    // WIDTH FIXED: 1200px
    <div className="flex flex-col h-[calc(100vh-20px)] w-full max-w-[1200px] mx-auto animate-in fade-in duration-300">
      
      {/* --- 1. HEADER (Sticky) --- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-2 rounded-full text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <Hash size={24} className="text-gray-400" />
            <h1 className="text-xl font-bold text-white font-display tracking-tight">{topic}</h1>
          </div>
          
          <div className="h-6 w-px bg-white/10 hidden md:block"></div>
          <p className="text-sm text-gray-400 hidden md:block truncate max-w-xs cursor-default">
            Official frequency for {topic}.
          </p>
        </div>

        <div className="flex items-center gap-5 text-gray-400">
          <Bell size={22} className="hover:text-white cursor-pointer transition-colors" />
          <Users size={22} className="hover:text-white cursor-pointer transition-colors hidden sm:block" />
          <div className="hidden lg:flex items-center bg-[#111] px-3 py-1.5 rounded border border-white/5">
            <input placeholder="Search" className="bg-transparent text-sm text-white outline-none w-24 placeholder-gray-600" />
            <Search size={14} />
          </div>
        </div>
      </div>

      {/* --- 2. CHAT STREAM (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide pb-24">
        {/* Welcome Graphic */}
        <div className="mt-8 mb-12 px-4 border-b border-white/5 pb-8">
          <div className="w-16 h-16 bg-[#202225] rounded-full flex items-center justify-center mb-4">
            <Hash size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Welcome to #{topic}!</h2>
          <p className="text-gray-400">This is the start of the <span className="font-bold text-white">#{topic}</span> channel.</p>
        </div>

        {displayPosts.map((post, index) => (
          <div key={post.id} className="hover:bg-[#2f3136]/30 px-2 py-2 rounded-lg transition-colors">
             <PostCard key={post.id} post={post} delay={0} onUserClick={onUserClick} />
          </div>
        ))}
      </div>

      {/* --- 3. INPUT AREA (Sticky Bottom) --- */}
      <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-black via-black to-transparent z-30">
        <div className="bg-[#202225] rounded-2xl flex items-center px-4 py-3 border border-white/5 shadow-2xl">
          
          <button className="bg-gray-400 text-[#202225] rounded-full p-1 hover:text-white hover:bg-gray-500 transition-colors mr-4">
            <PlusCircle size={20} fill="currentColor" className="text-[#202225]" />
          </button>

          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message #${topic}`} 
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 outline-none text-base font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <div className="flex items-center gap-4 text-gray-400 mx-2">
            <Gift size={24} className="hover:text-yellow-400 cursor-pointer transition-colors hidden sm:block" />
            <Sticker size={24} className="hover:text-blue-400 cursor-pointer transition-colors" />
            <Smile size={24} className="hover:text-yellow-400 cursor-pointer transition-colors" />
          </div>

          {inputValue.trim() && (
             <button onClick={handleSend} className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors">
               <Send size={24} />
             </button>
          )}
        </div>
      </div>

    </div>
  );
}