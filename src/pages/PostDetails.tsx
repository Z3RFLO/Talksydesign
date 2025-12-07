import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, MoreHorizontal, Send } from 'lucide-react';
import PostCard from '../components/PostCard';
import { Post, Comment, User } from '../types';

// --- MOCK COMMENTS DATA ---
const INITIAL_COMMENTS: Comment[] = [
    {
        id: 101,
        author: "CodeNinja",
        avatar: "C",
        content: "This design is absolutely stunning. The hierarchy is on point.",
        time: "1h",
        likes: 45,
        replies: [
            {
                id: 102,
                author: "Design_God",
                avatar: "D",
                content: "Thanks! I spent way too long tweaking the gradients.",
                time: "45m",
                likes: 12,
                replies: []
            },
            {
                id: 103,
                author: "Neon_Rider",
                avatar: "N",
                content: "The glow effects are subtle but effective. Nice work.",
                time: "30m",
                likes: 8,
                replies: [
                    {
                        id: 104,
                        author: "Minimalist",
                        avatar: "M",
                        content: "Agreed. Less is more.",
                        time: "15m",
                        likes: 3,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 105,
        author: "Web_Wizard",
        avatar: "W",
        content: "Is this built with Tailwind? The classes must be wild.",
        time: "2h",
        likes: 20,
        replies: []
    }
];

interface CommentNodeProps {
    comment: Comment;
    depth?: number;
}

// --- RECURSIVE COMMENT COMPONENT ---
const CommentNode: React.FC<CommentNodeProps> = ({ comment, depth = 0 }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
        <div className={`relative ${depth > 0 ? 'ml-6 sm:ml-10' : ''} animate-in fade-in duration-500`}>

            {/* CONNECTION LINES (Aesthetic Tree) */}
            {depth > 0 && (
                <>
                    {/* Vertical Line from Parent */}
                    <div className="absolute -left-6 sm:-left-10 top-0 w-px h-full bg-white/10 group-hover:bg-indigo-500/30 transition-colors"></div>
                    {/* Curved Connector */}
                    <div className="absolute -left-6 sm:-left-10 top-6 w-6 sm:w-10 h-6 border-b border-l border-white/10 rounded-bl-2xl"></div>
                </>
            )}

            <div className="group relative">
                {/* Comment Card */}
                <div className={`bg-[#0c0c0e] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all ${isCollapsed ? 'opacity-60' : ''}`}>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                {comment.avatar}
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-sm text-white hover:text-indigo-400 cursor-pointer transition-colors">{comment.author}</span>
                                <span className="text-[10px] text-zinc-500 font-medium">{comment.time}</span>
                            </div>
                        </div>

                        {/* Collapse Toggle */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="text-zinc-600 hover:text-white transition-colors"
                        >
                            {isCollapsed ? <MoreHorizontal size={14} /> : <div className="w-1 h-1 rounded-full bg-zinc-600"></div>}
                        </button>
                    </div>

                    {/* Content */}
                    {!isCollapsed && (
                        <>
                            <p className="text-zinc-300 text-sm leading-relaxed pl-11">
                                {comment.content}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-3 pl-11">
                                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-pink-500 transition-colors text-xs font-medium group/btn">
                                    <Heart size={14} className="group-hover/btn:scale-110 transition-transform" /> {comment.likes}
                                </button>
                                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-indigo-400 transition-colors text-xs font-medium">
                                    <MessageCircle size={14} /> Reply
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {!isCollapsed && hasReplies && (
                <div className="mt-3 relative">
                    {/* Vertical Thread Line for Children */}
                    <div className="absolute -left-6 sm:-left-10 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent"></div>

                    <div className="flex flex-col gap-3">
                        {comment.replies!.map(reply => (
                            <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface PostDetailsProps {
    posts: Post[];
    onUserClick: (user: User | Post) => void;
}

export default function PostDetails({ posts, onUserClick }: PostDetailsProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
    const [inputValue, setInputValue] = useState("");

    // Find post (ensure ID types match)
    const post = posts.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500">
                Post not found.
            </div>
        );
    }

    const handlePostComment = () => {
        if (!inputValue.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            author: "You", // In a real app, this would be the current user
            avatar: "Y",
            content: inputValue,
            time: "Just now",
            likes: 0,
            replies: []
        };

        setComments([newComment, ...comments]);
        setInputValue("");
    };

    return (
        <div className="w-full max-w-[800px] mx-auto pt-8 pb-32 px-4 animate-in fade-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-white">Thread</h1>
            </div>

            {/* Main Post (Reusing PostCard but slightly modified context could be passed if needed) */}
            <div className="mb-8">
                <PostCard post={post} onUserClick={onUserClick} />
            </div>

            {/* Comment Section */}
            <div className="relative">
                <div className="flex items-center gap-2 mb-6 text-zinc-400 text-sm font-bold uppercase tracking-wider">
                    <MessageCircle size={16} /> Comments <span className="bg-white/10 px-2 py-0.5 rounded text-white text-xs">{comments.length}</span>
                </div>

                {/* Thread Container */}
                <div className="flex flex-col gap-4 relative">
                    {/* Main Thread Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5 hidden sm:block"></div>

                    {comments.map(comment => (
                        <CommentNode key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>

            {/* Floating Reply Input */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-40">
                <div className="max-w-[800px] mx-auto bg-[#18181b] border border-white/10 rounded-full p-2 flex items-center shadow-2xl group focus-within:border-indigo-500/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white ml-1">
                        Y
                    </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                        placeholder="Add a comment..."
                        className="flex-1 bg-transparent border-none outline-none text-white px-4 text-sm placeholder-zinc-500"
                    />
                    <button
                        onClick={handlePostComment}
                        disabled={!inputValue.trim()}
                        className={`p-2 rounded-full font-bold text-xs transition-all duration-300 ${inputValue.trim() ? 'bg-white text-black hover:scale-105' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}
