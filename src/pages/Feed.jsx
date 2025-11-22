import React from 'react';
import PostCard from '../components/PostCard';

const MOCK_POSTS = [
  { id: 1, author: "Design_God", handle: "@visuals", avatar: "D", content: "Dark mode isn't just about black backgrounds. It's about hierarchy, depth, and managing light.", likes: 245, comments: 12, accent: "border-l-2 border-indigo-500", time: "2h" },
  { id: 2, author: "CodeNinja", handle: "@dev_guy", avatar: "C", content: "Just deleted 500 lines of legacy code. Best feeling in the world.", likes: 890, comments: 45, accent: "border-l-2 border-emerald-500", time: "4h" },
  { id: 3, author: "Minimalist", handle: "@less", avatar: "M", content: "Silence is a sound. White space is an element.", likes: 56, comments: 2, accent: "border-l-2 border-pink-500", time: "6h" },
];

export default function Feed() {
  return (
    <div className="w-full max-w-[900px] mx-auto pt-10 pb-32">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Feed</h1>
        <p className="text-gray-500 text-lg">Live transmissions.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {MOCK_POSTS.map((post, index) => (
          <PostCard key={post.id} post={post} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}
