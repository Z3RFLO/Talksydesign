import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle2 } from 'lucide-react';

const Avatar = ({ char }) => (
  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-bold shadow-lg shrink-0 backdrop-blur-sm">
    {char}
  </div>
);

export default function PostCard({ post, onUserClick }) {
  return (
    // GLASSMORPHISM CARD
    <div className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
      
      {/* Subtle Gradient Glow on Hover */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div 
          className="flex gap-4 items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); 
            if(onUserClick) onUserClick(post);
          }}
        >
          <Avatar char={post.avatar} />
          <div>
            <div className="flex items-center gap-2">
              <div className="font-display font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">
                {post.author}
              </div>
              {/* Verification Badge for fun */}
              <CheckCircle2 size={14} className="text-blue-500" fill="black" />
            </div>
            <div className="text-sm text-gray-500 font-medium">{post.handle} • {post.time}</div>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <p className="text-xl text-gray-100 font-light leading-relaxed mb-6 pl-[64px]">
        {post.content}
      </p>

      {/* Tags (If they exist) */}
      {post.tags && post.tags.length > 0 && (
        <div className="pl-[64px] mb-6 flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pl-[64px] pt-6 border-t border-white/5">
        <div className="flex gap-6">
          <ActionButton icon={Heart} count={post.likes} color="hover:text-pink-500 hover:bg-pink-500/10" />
          <ActionButton icon={MessageCircle} count={post.comments} color="hover:text-blue-400 hover:bg-blue-500/10" />
          <ActionButton icon={Share2} color="hover:text-green-400 hover:bg-green-500/10" />
        </div>
      </div>
    </div>
  );
}

// Helper for buttons
const ActionButton = ({ icon: Icon, count, color }) => (
  <button className={`flex items-center gap-2 text-gray-500 transition-all group/btn ${color} px-3 py-1.5 rounded-full`}>
    <Icon size={20} className="group-hover/btn:scale-110 transition-transform" />
    {count && <span className="text-sm font-medium">{count}</span>}
  </button>
);