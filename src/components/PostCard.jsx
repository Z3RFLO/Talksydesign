import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle2, Zap } from 'lucide-react';

const Avatar = ({ char, isBoosted }) => (
  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-white font-bold shadow-lg shrink-0 transition-all duration-300
    ${isBoosted
      ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
      : 'bg-gradient-to-br from-[#222] to-[#111] border-white/10'}`
  }>
    {char}
  </div>
);

export default function PostCard({ post, onUserClick }) {
  // Dynamic Styles based on "Boost"
  const isBoosted = post.isBoosted;

  return (
    <div className={`bg-[#0a0a0a]/80 backdrop-blur-sm border rounded-3xl p-5 relative overflow-hidden transition-all duration-300 group
      ${isBoosted
        ? 'border-yellow-500/40 shadow-[0_0_40px_rgba(234,179,8,0.05)] hover:border-yellow-500/60'
        : `border-white/10 hover:border-white/20 hover:bg-[#111] shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]`}`
    }>

      {/* --- SIDE GLOW ACCENT --- */}
      {!isBoosted && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] opacity-80 group-hover:opacity-100 group-hover:w-1.5 transition-all duration-300"></div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={(e) => { e.stopPropagation(); if (onUserClick) onUserClick(post); }}
        >
          <Avatar char={post.avatar} isBoosted={isBoosted} />
          <div>
            <div className="flex items-center gap-1.5">
              <div className={`font-bold text-base transition-colors ${isBoosted ? 'text-yellow-100' : 'text-white group-hover:text-indigo-400'}`}>{post.author}</div>
              {/* Verified Badge */}
              <CheckCircle2 size={12} className="text-blue-500" fill="black" />
            </div>
            <div className="text-xs text-gray-500">{post.handle} • {post.time}</div>
          </div>
        </div>

        {/* Top Right Icon (Menu or Boost Badge) */}
        {isBoosted ? (
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-yellow-400 flex items-center gap-1">
            <Zap size={10} fill="currentColor" /> PROMOTED
          </div>
        ) : (
          <button className="text-gray-600 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
        )}
      </div>

      {/* Content */}
      <p className="text-[15px] text-gray-200 font-normal leading-relaxed mb-3 pl-[52px]">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="pl-[52px] mb-3 flex gap-2 flex-wrap">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-[11px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 hover:text-indigo-400 transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-between pl-[52px] pt-3 border-t border-white/5">
        <div className="flex gap-6">
          <Btn icon={Heart} count={post.likes} color="hover:text-pink-500" />
          <Btn icon={MessageCircle} count={post.comments} color="hover:text-blue-400" />
          <Btn icon={Share2} color="hover:text-green-400" />
        </div>
      </div>
    </div>
  );
}

const Btn = ({ icon: Icon, count, color }) => (
  <button className={`flex items-center gap-1.5 text-gray-500 ${color} transition-all group/btn`}>
    <Icon size={18} className="group-hover/btn:scale-110 transition-transform" />
    {count && <span className="text-xs font-medium">{count}</span>}
  </button>
);