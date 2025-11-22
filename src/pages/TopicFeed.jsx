import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Hash, Send, Check } from 'lucide-react';
import PostCard from '../components/PostCard';

export default function TopicFeed({ posts = [], onPost }) {
  const { topic } = useParams(); 
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  // Filter posts: Show posts with this tag
  const filteredPosts = posts.filter(p => p.tags && p.tags.includes(topic));

  // Handle sending a message from the bottom bar
  const handleSend = () => {
    if (inputValue.trim()) {
      // We send the post back to App, but we manually add the current topic tag
      // Note: In a real app, you'd pass the tag to onPost, but for now this adds it to the main feed
      onPost(inputValue); 
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto pt-8 animate-in fade-in duration-500">
      
      {/* --- 1. COMPACT HEADER --- */}
      <div className="flex items-center justify-between mb-8 bg-[#0c0c0e] border border-white/10 p-4 rounded-[24px] sticky top-6 z-30 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
             <h1 className="text-2xl font-bold text-white flex items-center gap-2">
               <span className="text-indigo-500">#</span> {topic}
             </h1>
             <p className="text-xs text-gray-500">14.2k Members • 500 Online</p>
          </div>
        </div>

        <button 
          onClick={() => setIsJoined(!isJoined)}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${isJoined ? 'bg-green-500/10 text-green-400 border border-green-500/50' : 'bg-white text-black hover:scale-105'}`}
        >
          {isJoined ? <span className="flex items-center gap-2"><Check size={14}/> Joined</span> : 'Join'}
        </button>
      </div>

      {/* --- 2. SCROLLABLE POST LIST --- */}
      {/* Added pb-32 so the last post isn't hidden behind the input bar */}
      <div className="flex flex-col gap-6 pb-32">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} delay={index * 0.1} />
          ))
        ) : (
          <div className="text-center py-20 opacity-50">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hash size={30} />
            </div>
            <p>No signals in #{topic} yet.</p>
          </div>
        )}
      </div>

      {/* --- 3. FIXED BOTTOM INPUT (Chat Style) --- */}
      <div className="fixed bottom-6 left-[160px] right-10 z-40">
        <div className="max-w-[900px] mx-auto">
          <div className="flex gap-3 items-center p-2 pl-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)]">
             
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white font-bold shrink-0 text-xs border border-white/10">Y</div>
             
             <input 
               type="text" 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               placeholder={`Transmit to #${topic}...`}
               className="w-full bg-transparent text-lg text-white placeholder-gray-500 outline-none h-full"
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             
             <button 
               onClick={handleSend}
               className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0"
             >
                <Send size={20} />
             </button>
          </div>
        </div>
      </div>

    </div>
  );
}