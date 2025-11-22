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

  const filteredPosts = posts.filter(p => p.tags && p.tags.includes(topic));
  
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : [
    { id: 999, author: "System", handle: "@void", avatar: "S", content: `Welcome to #${topic}. This is the start of the channel.`, likes: 0, comments: 0, accent: "border-l-2 border-gray-700", time: "Today" }
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      onPost(inputValue);
      setInputValue("");
    }
  };

  return (
    // DISCORD LAYOUT: Flex Column with Fixed Height behavior
    <div className="flex flex-col h-[calc(100vh-40px)] w-full max-w-[1200px] mx-auto animate-in fade-in duration-300">
      
      {/* --- 1. DISCORD HEADER (Sticky Top) --- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-30 shadow-md">
        {/* Left: Channel Name */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-1 rounded text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <Hash size={24} className="text-gray-400" />
            <h1 className="text-xl font-bold text-white font-display tracking-tight">{topic}</h1>
          </div>
          
          {/* Divider */}
          <div className="h-6 w-px bg-white/10 hidden md:block"></div>
          <p className="text-sm text-gray-400 hidden md:block truncate max-w-xs cursor-default">
            The official frequency for {topic} enthusiasts.
          </p>
        </div>

        {/* Right: Toolbar Icons */}
        <div className="flex items-center gap-5 text-gray-400">
          <Bell size={22} className="hover:text-white cursor-pointer transition-colors" />
          <Users size={22} className="hover:text-white cursor-pointer transition-colors hidden sm:block" />
          
          {/* Search Box Mini */}
          <div className="hidden lg:flex items-center bg-[#111] px-2 py-1 rounded border border-white/5">
            <input placeholder="Search" className="bg-transparent text-sm text-white outline-none w-24 placeholder-gray-600" />
            <Search size={14} />
          </div>
          
          <HelpCircle size={22} className="hover:text-white cursor-pointer transition-colors hidden sm:block" />
        </div>
      </div>

      {/* --- 2. SCROLLABLE CHAT STREAM --- */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide">
        {/* Welcome Message */}
        <div className="mt-10 mb-16 px-4">
          <div className="w-16 h-16 bg-[#202225] rounded-full flex items-center justify-center mb-4">
            <Hash size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Welcome to #{topic}!</h2>
          <p className="text-gray-400">This is the start of the <span className="font-bold text-white">#{topic}</span> channel.</p>
        </div>

        {displayPosts.map((post, index) => (
          <div key={post.id} className="hover:bg-[#2f3136]/30 -mx-4 px-4 py-2 rounded-lg transition-colors">
             {/* We reuse PostCard but you could simplify it here to look more like a chat message if you wanted */}
             <PostCard key={post.id} post={post} delay={0} onUserClick={onUserClick} />
          </div>
        ))}
        
        {/* Invisible div to push content up so it's not hidden behind input */}
        <div className="h-4"></div> 
      </div>

      {/* --- 3. DISCORD INPUT BAR (Sticky Bottom) --- */}
      <div className="px-4 pb-6 pt-2 bg-[#000] z-30">
        <div className="bg-[#202225] rounded-xl flex items-center px-4 py-3 border-t border-white/5 shadow-lg">
          
          {/* Upload Button */}
          <button className="bg-gray-400 text-[#202225] rounded-full p-0.5 hover:text-white hover:bg-gray-500 transition-colors mr-4">
            <PlusCircle size={24} fill="currentColor" className="text-[#202225]" />
          </button>

          {/* Text Input */}
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message #${topic}`} 
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 outline-none text-base font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          {/* Right Icons (Gift, GIF, Emoji) */}
          <div className="flex items-center gap-4 text-gray-400 mx-2">
            <Gift size={24} className="hover:text-yellow-400 cursor-pointer transition-colors hidden sm:block" />
            <Sticker size={24} className="hover:text-blue-400 cursor-pointer transition-colors" />
            <Smile size={24} className="hover:text-yellow-400 cursor-pointer transition-colors" />
          </div>

          {/* Send Button (Only visible when typing) */}
          {inputValue.trim() && (
             <button onClick={handleSend} className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors">
               <Send size={24} />
             </button>
          )}

        </div>
        
        {/* Typing Indicator (Visual flair) */}
        {inputValue.length > 0 && (
           <div className="absolute bottom-1 left-6 text-[10px] font-bold text-gray-500 animate-pulse">
             You are typing...
           </div>
        )}
      </div>

    </div>
  );
}