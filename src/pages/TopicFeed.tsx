import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Hash, Bell, Search,
    Smile, Send
} from 'lucide-react';
import { Post, User } from '../types';

/* --- COMPONENT: LIVE VOID BACKGROUND --- */
const LiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            hue: number;

            constructor() {
                this.x = Math.random() * (canvas!.width);
                this.y = Math.random() * (canvas!.height);
                this.size = Math.random() * 2 + 0.5; // Slightly larger for chat
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() > 0.5 ? 240 : 270; // Blue or Purple
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 60; i++) { // Fewer particles for cleaner chat
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
};

/* --- CUSTOM COMPONENT: COMPACT CHAT MESSAGE --- */
interface ChatMessageProps {
    post: Post;
    onUserClick: (user: User | Post) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ post, onUserClick }) => {
    return (
        // rounded-[32px] for extra curvy look
        <div className="group flex items-start gap-4 px-6 py-4 hover:bg-white/5 rounded-[32px] transition-all duration-200 border border-transparent hover:border-white/5 bg-black/40 backdrop-blur-md mb-3 mx-2 shadow-sm">
            {/* Avatar */}
            <div
                onClick={(e) => { e.stopPropagation(); onUserClick(post); }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20 shrink-0 border-2 border-black"
            >
                {post.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-baseline gap-2 mb-1">
                    <span
                        onClick={(e) => { e.stopPropagation(); onUserClick(post); }}
                        className="font-bold text-white hover:underline cursor-pointer text-[15px]"
                    >
                        {post.author}
                    </span>
                    {/* Verified Badge (Simulated) */}
                    {post.author === "Design_God" && <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-black font-black">✓</div>}

                    <span className="text-xs text-zinc-500 font-medium">{post.time}</span>
                </div>

                <p className="text-zinc-200 text-[15px] leading-relaxed break-words font-light">
                    {post.content}
                </p>
            </div>
        </div>
    );
};

interface TopicFeedProps {
    posts: Post[];
    onPost: (text: string, tags: string[]) => void;
    onUserClick: (user: User | Post) => void;
}

export default function TopicFeed({ posts = [], onPost, onUserClick }: TopicFeedProps) {
    const { topic } = useParams<{ topic: string }>();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Filter posts to show only those that have the current topic as a tag
    const filteredPosts = posts.filter(p => p.tags && topic && p.tags.includes(topic));

    // Default starter message if no posts exist
    const systemPost: Post = {
        id: 999,
        author: "System",
        handle: "@void",
        avatar: "S",
        content: `Welcome to the #${topic} channel. Be the first to transmit.`,
        time: "Now",
        likes: 0,
        comments: 0
    };

    const displayPosts = filteredPosts.length > 0 ? filteredPosts : [systemPost];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [displayPosts]);

    const handleSend = () => {
        if (inputValue.trim() && topic) {
            onPost(inputValue, [topic]);
            setInputValue("");
        }
    };

    return (
        <div className="flex flex-col h-screen w-full max-w-[1200px] mx-auto bg-black relative overflow-hidden">

            {/* --- LIVE BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20"></div>
                <LiveBackground />
            </div>

            {/* --- VOID WATERMARK (Fixed Background) --- */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-10 select-none">
                <div className="relative">
                    <Hash size={300} className="text-indigo-500 animate-pulse" />
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px]"></div>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter mt-8">#{topic}</h1>
                <p className="text-xl text-zinc-400 mt-4 font-light tracking-widest uppercase">Frequency Active</p>
            </div>

            {/* --- 1. HEADER (Glassmorphism) --- */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-2 rounded-full text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                            <Hash size={24} className="text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white font-display tracking-tight leading-none">{topic}</h1>
                            <p className="text-xs text-zinc-500 font-medium mt-1 flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                Live Channel
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-400">
                    <div className="hidden sm:flex items-center -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-9 h-9 rounded-full bg-zinc-800 border-[3px] border-black flex items-center justify-center text-xs font-bold text-zinc-500">
                                U{i}
                            </div>
                        ))}
                        <div className="w-9 h-9 rounded-full bg-zinc-800 border-[3px] border-black flex items-center justify-center text-xs font-bold text-white">
                            +42
                        </div>
                    </div>
                    <div className="w-px h-6 bg-white/10 mx-2"></div>
                    <Bell size={20} className="hover:text-white cursor-pointer transition-colors" />
                    <Search size={20} className="hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            {/* --- 2. CHAT STREAM (Z-Index 10 to float over watermark) --- */}
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent z-10 relative">

                {/* Messages - Added pt-24 to prevent hiding behind header */}
                <div className="space-y-1 pb-32 pt-24">
                    {displayPosts.map((post) => (
                        <ChatMessage key={post.id} post={post} onUserClick={onUserClick} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* --- 3. INPUT AREA (Floating Command Bar) --- */}
            <div className="absolute bottom-6 left-0 right-0 px-6 z-50">
                <div className="max-w-4xl mx-auto relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-md group-focus-within:opacity-50 transition duration-500"></div>

                    {/* CAPSULE INPUT CONTAINER */}
                    <div className="relative bg-[#0c0c0e]/90 backdrop-blur-xl rounded-full flex items-center p-2 border border-white/10 shadow-2xl">

                        <button className="p-3 hover:bg-white/10 rounded-full text-zinc-400 hover:text-yellow-400 transition-colors">
                            <Smile size={24} />
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-2"></div>

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Message #${topic}...`}
                            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-lg font-medium px-2"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            autoFocus
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-3.5 rounded-full transition-all duration-300 ${inputValue.trim()
                                ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-105'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                }`}
                        >
                            <Send size={20} fill={inputValue.trim() ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* Typing Indicator (Fake) */}
                    <div className="absolute -top-10 left-8 text-xs text-zinc-400 font-medium animate-pulse hidden group-focus-within:block bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        Design_God is typing...
                    </div>
                </div>
            </div>

        </div>
    );
}
