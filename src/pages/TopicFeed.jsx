import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Hash, Bell, Users, Search,
  Plus, Gift, Sticker, Smile, Send, Zap, Command
} from 'lucide-react';

/* --- CUSTOM COMPONENT: COMPACT CHAT MESSAGE --- */
const ChatMessage = ({ post, onUserClick }) => {
  return (
    // ADDED: bg-black/60 and backdrop-blur-md to ensure readability over the watermark
    <div className="group flex items-start gap-4 px-4 py-3 hover:bg-white/5 rounded-xl transition-all duration-200 border border-transparent hover:border-white/5 bg-black/40 backdrop-blur-sm mb-2">
      {/* Avatar */}
      <div
        onClick={(e) => { e.stopPropagation(); onUserClick(post); }}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20 shrink-0"
      >
        {post.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span
            onClick={(e) => { e.stopPropagation(); onUserClick(post); }}
            className="font-bold text-white hover:underline cursor-pointer text-[15px]"
          >
            {post.author}
          </span>
          {/* Verified Badge (Simulated) */}
          {post.author === "Design_God" && <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-black font-black">✓</div>}

          <span className="text-xs text-zinc-500 font-medium">{post.time}</span>
        </div>

        <p className="text-zinc-200 text-[15px] leading-relaxed break-words font-light">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default function TopicFeed({ posts = [], onPost, onUserClick }) {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Filter posts to show only those that have the current topic as a tag
  const filteredPosts = posts.filter(p => p.tags && p.tags.includes(topic));

  // Default starter message if no posts exist
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : [
    { id: 999, author: "System", handle: "@void", avatar: "S", content: `Welcome to the #${topic} channel. Be the first to transmit.`, time: "Now" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayPosts]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onPost(inputValue, [topic]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-[1200px] mx-auto bg-black relative overflow-hidden">

      {/* --- VOID WATERMARK (Fixed Background) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-20 select-none">
        <div className="relative">
          <Hash size={300} className="text-indigo-500 animate-pulse" />
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px]"></div>
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter mt-8">#{topic}</h1>
        <p className="text-xl text-zinc-400 mt-4 font-light tracking-widest uppercase">Frequency Active</p>
      </div>

      {/* --- 1. HEADER (Glassmorphism) --- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-2 rounded-full text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10">
              <Hash size={20} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-display tracking-tight leading-none">{topic}</h1>
              <p className="text-xs text-zinc-500 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live Channel
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <div className="hidden sm:flex items-center -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-xs font-bold text-zinc-500">
                U{i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
              +42
            </div>
          </div>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <Bell size={20} className="hover:text-white cursor-pointer transition-colors" />
          <Search size={20} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* --- 2. CHAT STREAM (Z-Index 10 to float over watermark) --- */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent z-10 relative">

        {/* Messages */}
        <div className="space-y-1 pb-32 pt-4">
          {displayPosts.map((post) => (
            <ChatMessage key={post.id} post={post} onUserClick={onUserClick} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- 3. INPUT AREA (Floating Command Bar) --- */}
      <div className="absolute bottom-6 left-0 right-0 px-6 z-50">
        <div className="max-w-4xl mx-auto relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur group-focus-within:opacity-50 transition duration-500"></div>

          <div className="relative bg-[#0c0c0e] rounded-2xl flex items-center p-2 border border-white/10 shadow-2xl">

            <button className="p-3 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <Plus size={20} />
            </button>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Message #${topic}...`}
              className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-base font-medium px-2"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoFocus
            />

            <div className="flex items-center gap-2 mr-2">
              <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-yellow-400 transition-colors">
                <Gift size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors">
                <Sticker size={20} />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-3 rounded-xl transition-all duration-300 ${inputValue.trim()
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
            >
              <Send size={20} fill={inputValue.trim() ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Typing Indicator (Fake) */}
          <div className="absolute -top-8 left-4 text-xs text-zinc-500 font-medium animate-pulse hidden group-focus-within:block">
            Design_God is typing...
          </div>
        </div>
      </div>

    </div>
  );
}