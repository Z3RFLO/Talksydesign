import React from 'react';
import PostCard from '../components/PostCard';

export default function Feed({ posts = [], topic, onUserClick }) {
  return (
    <div className="w-full max-w-[900px] mx-auto pt-10 pb-32 animate-in fade-in duration-500">
      <div className="mb-12">
        {/* APPLIED NEW FONT HERE: font-display */}
        <h1 className="text-5xl font-display font-black text-white mb-2 tracking-tight flex items-center gap-4">
          {topic && <span className="text-gray-500 text-3xl">#</span>} 
          {topic ? topic : "Feed"}
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          {topic ? `Exploring transmissions about ${topic}.` : "Live transmissions from the void."}
        </p>
      </div>
      
      <div className="flex flex-col gap-6">
        {(!posts || posts.length === 0) ? (
          <div className="p-10 border border-white/10 bg-[#121214] rounded-3xl text-center">
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