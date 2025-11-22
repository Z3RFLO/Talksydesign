import React from 'react';
import PostCard from '../components/PostCard';

export default function Feed({ posts = [], topic, onUserClick }) {
  return (
    // 1. Main Wrapper: Full Width + Padding Left (Keeps Headline near Sidebar)
    <div className="w-full pt-10 pb-32 px-8 animate-in fade-in duration-500">
      
      {/* 2. HEADER: Stays on the Left */}
      <div className="mb-12 flex flex-col items-start max-w-[1200px]">
        <h1 className="text-6xl font-display font-black text-white mb-2 tracking-tighter flex items-center gap-3">
          {topic && <span className="text-gray-600 text-4xl">#</span>} 
          {topic ? topic : "Feed"}
        </h1>
        <p className="text-gray-500 text-xl font-medium">
          {topic ? `Exploring transmissions about ${topic}.` : ""}
        </p>
      </div>
      
      {/* 3. POSTS CONTAINER: Centered (mx-auto) & Restricted Width */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        {(!posts || posts.length === 0) ? (
          <div className="p-10 border border-white/10 bg-[#121214] rounded-3xl text-left">
            <h2 className="text-xl font-display font-bold text-white mb-2">No signals yet.</h2>
            <p className="text-gray-500">Be the first to transmit.</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              delay={index * 0.1} 
              onUserClick={onUserClick}
            />
          ))
        )}
      </div>
    </div>
  );
}