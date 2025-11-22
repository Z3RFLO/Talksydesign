import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const Avatar = ({ char }) => (
  <div className="w-12 h-12 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-white font-bold shadow-lg shrink-0">
    {char}
  </div>
);

export default function PostCard({ post }) {
  return (
    <div className={`bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 relative overflow-hidden hover:border-white/20 hover:bg-[#0f0f0f] transition-all duration-300 group ${post.accent || 'border-l-2 border-gray-700'}`}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <Avatar char={post.avatar} />
          <div>
            <div className="font-bold text-xl text-white">{post.author}</div>
            <div className="text-sm text-gray-500">{post.handle} • {post.time}</div>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors">
          <MoreHorizontal />
        </button>
      </div>

      {/* Content */}
      <p className="text-xl text-gray-200 font-light leading-relaxed mb-8 pl-[64px]">
        {post.content}
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-between pl-[64px] pt-6 border-t border-white/5">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:bg-[#f91880]/10 hover:text-[#f91880] transition-all group/btn">
            <Heart size={20} className="group-hover/btn:scale-110 transition-transform" />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:bg-blue-500/10 hover:text-blue-400 transition-all group/btn">
            <MessageCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:bg-green-500/10 hover:text-green-400 transition-all group/btn">
            <Share2 size={20} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}