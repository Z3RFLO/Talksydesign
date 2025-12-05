import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export default function CompactPost({ post }) {
    return (
        <div className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/5 rounded-[24px] p-5 hover:border-white/10 hover:bg-[#111] transition-all duration-300 group cursor-pointer flex flex-col h-full">

            {/* Header: Minimal */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {post.avatar}
                    </div>
                    <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                        {post.time}
                    </div>
                </div>
            </div>

            {/* Content: Truncated if too long (visually handled by height/overflow if needed, but keeping simple for now) */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                {post.content}
            </p>

            {/* Footer: Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-pink-400 transition-colors">
                    <Heart size={14} /> {post.likes}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
                    <MessageCircle size={14} /> {post.comments}
                </div>
            </div>
        </div>
    );
}
