import React from 'react';
import { X, MapPin, User, Languages, MessageCircle, UserPlus, CheckCircle, Sparkles, Users, ArrowRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const USER_DETAILS = {
  "Design_God": { bio: "Obsessed with pixels and dark mode.", city: "Berlin, DE", gender: "Male", lang: "German", connections: "12.5K", posts: "420" },
  "CodeNinja": { bio: "I dream in JavaScript.", city: "SF, USA", gender: "Female", lang: "English", connections: "8.2K", posts: "150" },
  "Minimalist": { bio: "Less is more.", city: "Tokyo, JP", gender: "NB", lang: "Japanese", connections: "45.1K", posts: "12" },
  "Neon_Rider": { bio: "Chasing the synthwave sunset.", city: "Miami, USA", gender: "Male", lang: "Spanish", connections: "3.8K", posts: "900" },
  "You": { bio: "Developer. Dreamer.", city: "Patna, IN", gender: "Male", lang: "Hindi", connections: "1.2K", posts: "350" }
};

export default function UserPopup({ user, onClose }) {
  if (!user) return null;

  const details = USER_DETAILS[user.author] || { bio: "Traveler of the void.", city: "Unknown", gender: "Unknown", lang: "Universal", connections: "0", posts: "0" };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>

      {/* CARD CONTAINER - WIDER & BLURRIER */}
      <div
        className="bg-[#0c0c0e]/60 backdrop-blur-[50px] w-full max-w-[450px] rounded-[48px] border border-white/10 p-1.5 relative shadow-[0_0_80px_rgba(79,70,229,0.2)] transform transition-all scale-100 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >

        {/* Inner Content */}
        <div className="bg-black/40 rounded-[42px] p-8 relative overflow-hidden h-full">

          {/* GRADIENT BANNER */}
          <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-100">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 text-white border border-white/20 group">
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Avatar & Header */}
          <div className="flex flex-col items-center text-center mt-20 relative z-10">
            {/* Avatar Container with Glow */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="w-32 h-32 rounded-full bg-[#111] border-[4px] border-[#0c0c0e] flex items-center justify-center text-white font-bold text-6xl shadow-2xl relative z-10">
                {user.avatar}
              </div>
              <div className="absolute bottom-2 right-2 bg-[#0c0c0e] rounded-full p-1.5 z-20 border border-[#0c0c0e]">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0c0c0e] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 flex items-center gap-2 justify-center tracking-tight">
                {user.author}
                <CheckCircle size={22} className="text-blue-500" fill="black" strokeWidth={2.5} />
              </h2>
              <p className="text-indigo-300/80 text-sm font-bold tracking-widest uppercase mt-1">{user.handle}</p>
            </div>
          </div>

          {/* Stats Row - UPDATED */}
          <div className="flex justify-center gap-8 mt-8 border-b border-white/5 pb-6 mx-4">
            <div className="text-center group cursor-pointer">
              <div className="text-white font-black text-xl group-hover:text-indigo-400 transition-colors">{details.connections}</div>
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-zinc-300 transition-colors">Connections</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center group cursor-pointer">
              <div className="text-white font-black text-xl group-hover:text-pink-400 transition-colors">{details.posts}</div>
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-zinc-300 transition-colors">Total Posts</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 text-center px-4">
            <p className="text-zinc-300 text-[15px] font-medium leading-relaxed">"{details.bio}"</p>
          </div>

          {/* Info Pills (Capsule Style) */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <InfoPill icon={MapPin} text={details.city} color="text-indigo-400" />
            <InfoPill icon={User} text={details.gender} color="text-pink-400" />
            <InfoPill icon={Languages} text={details.lang} color="text-emerald-400" />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-white/10 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <UserPlus size={18} className="group-hover:rotate-12 transition-transform relative z-10" /> <span className="relative z-10">Connect</span>
            </button>
            <Link to="/messages" className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-bold text-sm hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 group">
              <MessageCircle size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Message
            </Link>
          </div>

          {/* View Full Profile Link */}
          <Link to="/profile" className="w-full py-3 mt-4 rounded-xl border border-white/5 hover:bg-white/5 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group">
            View Full Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </div>
  );
}

const InfoPill = ({ icon: Icon, text, color }) => (
  <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:bg-white/10 hover:border-white/10 transition-colors cursor-default">
    <Icon size={12} className={color} /> {text}
  </div>
);