import React from 'react';
import { Search, TrendingUp } from 'lucide-react';

const TOPICS = [
  "Technology", "Design", "Art", "Science", "Space", "Coding", "AI", "Cyberpunk", 
  "Minimalism", "Music", "Gaming", "Movies", "Anime", "Philosophy", "History"
];

export default function Explore() {
  return (
    <div className="w-full max-w-[900px] mx-auto pt-10 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-2">Explore</h1>
        <p className="text-gray-500 text-lg">Find your frequency.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12 group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={24} />
        <input 
          type="text" 
          placeholder="Search topics..." 
          className="w-full bg-[#0f0f11] border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-xl text-white outline-none focus:border-indigo-500 focus:bg-black transition-all shadow-[0_0_0_0_rgba(99,102,241,0)] focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        />
      </div>

      {/* Trending Section */}
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <TrendingUp className="text-purple-500" /> Trending
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {TOPICS.map((topic, i) => (
          <div 
            key={i} 
            className="px-6 py-3 rounded-full border border-white/10 bg-[#121214] text-gray-400 cursor-pointer hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            #{topic}
          </div>
        ))}
      </div>
    </div>
  );
}