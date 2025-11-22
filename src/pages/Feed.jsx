import React from 'react';
import PostCard from '../components/PostCard';

// Fallback data in case App.jsx fails to pass props
const BACKUP_POSTS = [
  { id: 101, author: "Backup_System", handle: "@sys", avatar: "B", content: "If you see this, the component connection is working, but App.jsx data is missing.", likes: 0, comments: 0, accent: "border-l-2 border-red-500", time: "Now" }
];

export default function Feed({ posts }) {
  // Use passed posts, or use backup if empty/undefined
  const finalPosts = (posts && posts.length > 0) ? posts : BACKUP_POSTS;

  return (
    <div className="w-full max-w-[900px] mx-auto pt-10 pb-32">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Feed</h1>
        <p className="text-gray-500 text-lg">Live transmissions.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {finalPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}