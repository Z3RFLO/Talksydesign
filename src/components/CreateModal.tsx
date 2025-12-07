import { useState, KeyboardEvent, useEffect } from 'react';
import { X, Zap, Hash, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPost: (text: string, tags: string[], options: { isBoosted: boolean }) => void;
    mode?: 'focus' | 'quick';
}

// --- THE VOID BRAIN: KEYWORD MAPPING ---
// A pure client-side associative array for tag detection.
const KEYWORDS: Record<string, string> = {
    // DESIGN & UI
    "design": "design", "ui": "design", "ux": "design", "figma": "design", "color": "art",
    "font": "typography", "sketch": "art", "draw": "art", "create": "create", "make": "create",
    "build": "create", "craft": "art", "pixel": "design", "vector": "design",

    // --- DEV & TECH ---
    "code": "dev", "bug": "dev", "react": "dev", "api": "dev", "typescript": "dev",
    "js": "dev", "javascript": "dev", "node": "dev", "deploy": "dev", "git": "dev",
    "web": "web", "app": "app", "mobile": "app", "server": "tech", "database": "tech",
    "ai": "tech", "gpt": "tech", "llm": "tech", "robot": "tech", "future": "tech",
    "crypto": "crypto", "btc": "crypto", "eth": "crypto", "nft": "crypto", "wallet": "crypto",

    // --- VIBES & ATMOSPHERE ---
    "music": "vibe", "song": "vibe", "listen": "vibe", "chill": "vibe", "mood": "vibe",
    "night": "nightowl", "sleep": "nightowl", "dream": "nightowl", "dark": "dark", "void": "void",
    "star": "space", "space": "space", "galaxy": "space", "moon": "nightowl", "sun": "day",

    // --- EMOTIONS (POSITIVE) ---
    "good": "positivity", "happy": "positivity", "great": "positivity", "awesome": "positivity",
    "love": "love", "like": "love", "best": "winning", "win": "winning", "success": "winning",
    "excitement": "hype", "hype": "hype", "cool": "vibe", "nice": "vibe", "wow": "hype",

    // --- EMOTIONS (NEGATIVE / VENT) ---
    "bad": "vent", "sad": "mood", "angry": "vent", "hate": "vent", "tired": "tired",
    "fail": "learning", "stupid": "vent", "hard": "struggle", "pain": "vent", "sick": "life",
    "wtf": "wtf", "f*ck": "nsfw", "fuck": "nsfw", "shit": "nsfw", "hell": "vent", "damn": "vent",

    // --- CASUAL / DAILY ---
    "hello": "connect", "hi": "connect", "hey": "connect", "yo": "connect", "sup": "connect",
    "morning": "gm", "gm": "gm", "evening": "gn", "gn": "gn",
    "today": "journal", "day": "journal", "now": "status", "feeling": "mood",
    "eat": "food", "food": "food", "lunch": "food", "dinner": "food", "coffee": "coffee",
    "drink": "beverage", "beer": "cheers", "water": "hydration",
    "walk": "active", "run": "active", "gym": "fitness", "workout": "fitness",
    "read": "learning", "book": "reading", "watch": "media", "movie": "media",

    // --- INTERNET / SLANG ---
    "lol": "funny", "lmao": "funny", "haha": "funny", "meme": "meme",
    "cringe": "cringe", "based": "based", "ratio": "ratio", "cap": "truth", "fr": "real",
    "bruh": "bruh", "yeet": "random", "drip": "style", "swag": "style",
    "fire": "hype", "lit": "hype", "slay": "winning", "bet": "agreement"
};

// --- ALGORITHM: TEXT ANALYZER ---
const analyzeText = (text: string, currentTags: string[]): string[] => {
    const words = text.toLowerCase().split(/[\s\.,!?]+/); // Split by non-word chars
    const candidates = new Set<string>();

    words.forEach(word => {
        if (KEYWORDS[word]) {
            // Only add if not already in current tags and not already suggested
            if (!currentTags.includes(KEYWORDS[word])) {
                candidates.add(KEYWORDS[word]);
            }
        }
    });

    // Return top 3 unique suggestions
    return Array.from(candidates).slice(0, 3);
};

export default function CreateModal({ isOpen, onClose, onPost, mode = 'focus' }: CreateModalProps) {
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [showTagInput, setShowTagInput] = useState(false);
    const [tagInput, setTagInput] = useState("");

    // Suggestion State
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

    // --- THE VOLTAGE STATE ---
    const [isBoosted, setIsBoosted] = useState(false);

    // --- INTERNAL MODE STATE (For minimizing) ---
    const [activeMode, setActiveMode] = useState<'focus' | 'quick'>(mode);

    // Sync internal mode with prop when it opens, effectively resetting it
    useEffect(() => {
        if (isOpen) {
            setActiveMode(mode);
        }
    }, [isOpen, mode]);

    // --- EFFECT: REAL-TIME ANALYSIS ---
    useEffect(() => {
        if (!text.trim()) {
            setSuggestedTags([]);
            return;
        }

        // Debouce slightly for performance (optional, but good practice)
        const timer = setTimeout(() => {
            const suggestions = analyzeText(text, tags);
            setSuggestedTags(suggestions);
        }, 200);

        return () => clearTimeout(timer);
    }, [text, tags]);

    if (!isOpen) return null;

    const handleAddTag = (tagToAdd: string = tagInput) => {
        const cleanTag = tagToAdd.trim().replace(/^#/, '');
        if (cleanTag && tags.length < 5 && !tags.includes(cleanTag)) {
            setTags([...tags, cleanTag]);
            setTagInput("");
            setSuggestedTags(prev => prev.filter(t => t !== cleanTag)); // Remove from suggestions
            if (tags.length >= 4) setShowTagInput(false);
        }
    };

    const handleSubmit = () => {
        if (text.trim()) {
            // Send text, tags, and the boost status
            onPost(text, tags, { isBoosted });

            // Reset
            setText("");
            setTags([]);
            setIsBoosted(false);
            onClose();
        }
    };

    // --- MODE STYLES ---
    const isQuick = activeMode === 'quick';

    // Focus Mode: Full Screen Overlay
    // Quick Mode: Bottom Right Popup (No Backdrop)
    const containerClasses = isQuick
        ? "fixed bottom-24 right-8 z-[200] w-[400px] animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto"
        : "fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200";

    const cardClasses = isQuick
        ? `bg-[#0a0a0a] w-full rounded-2xl border transition-all duration-500 p-5 relative shadow-2xl ${isBoosted ? 'border-yellow-500/50 shadow-[0_0_60px_rgba(234,179,8,0.2)]' : 'border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'}`
        : `bg-[#0a0a0a] w-full max-w-4xl rounded-2xl border transition-all duration-500 p-6 relative shadow-2xl ${isBoosted ? 'border-yellow-500/50 shadow-[0_0_80px_rgba(234,179,8,0.2)]' : 'border-white/10 shadow-2xl shadow-black/50'}`; // Sleek design

    return (
        <div className={isQuick ? "fixed inset-0 z-[200] pointer-events-none" : containerClasses}>

            {/* IN QUICK MODE: Invisible container needed for positioning, backdrop removed */}

            {/* The Modal Card */}
            <div className={isQuick ? containerClasses : ""}>
                <div className={cardClasses}>

                    {/* Header: Simplified for Quick Mode */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h2 className={`font-black tracking-tight flex items-center gap-2 transition-colors ${isQuick ? 'text-lg' : 'text-2xl'} ${isBoosted ? 'text-yellow-400' : 'text-white'}`}>
                                {isBoosted ? 'PRIORITY' : (isQuick ? 'New Signal' : 'Create Signal')}
                            </h2>
                            {!isQuick && (
                                <p className="text-sm text-gray-500 font-medium tracking-wide">
                                    {isBoosted ? 'Priority Broadcast' : 'Broadcast to the network'}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            {/* MINIMIZE / MAXIMIZE BUTTON */}
                            <button
                                onClick={() => setActiveMode(isQuick ? 'focus' : 'quick')}
                                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all pointer-events-auto"
                                title={isQuick ? "Expand" : "Minimize"}
                            >
                                {isQuick ? <Maximize2 size={16} /> : <Minimize2 size={18} />}
                            </button>

                            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all pointer-events-auto">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Main Input */}
                    <div className="flex gap-5 mb-4">
                        {/* Avatar Pulse Effect if Boosted (Hidden in Quick Mode for space) */}
                        {!isQuick && (
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0 transition-all duration-500 border ${isBoosted ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-[#18181b] border-white/10'}`}>
                                Y
                            </div>
                        )}

                        <div className="flex-1 space-y-4">
                            <textarea
                                autoFocus
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="What is happening in the void?"
                                className={`w-full bg-transparent text-white placeholder-gray-600 outline-none resize-none border-none p-0 leading-relaxed font-medium ${isQuick ? 'h-24 text-lg' : 'h-48 text-xl'}`}
                            />

                            {/* SMART SUGGESTIONS */}
                            {suggestedTags.length > 0 && (
                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <Sparkles size={14} className="text-indigo-400" />
                                    <div className="flex gap-2">
                                        {suggestedTags.map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => handleAddTag(tag)}
                                                className="text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1 rounded-md transition-colors border border-indigo-500/20"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags Display */}
                            {tags.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="bg-[#1a1a1a] text-gray-300 border border-white/10 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 group">
                                            #{tag}
                                            <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-red-400 transition-colors"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tag Input Area (Slide Down) */}
                    {showTagInput && (
                        <div className="mb-4 flex gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
                            <div className="flex-1 bg-[#111] border border-white/10 rounded-lg flex items-center px-4 focus-within:border-indigo-500 transition-colors">
                                <span className="text-gray-500 mr-1">#</span>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTag()}
                                    placeholder="Tag (e.g. Design)"
                                    className="bg-transparent text-white text-sm py-2.5 outline-none w-full font-medium"
                                    autoFocus
                                />
                            </div>
                            <button onClick={() => handleAddTag()} className="bg-white text-black px-4 rounded-lg font-bold text-xs hover:bg-gray-200 pointer-events-auto">Add</button>
                        </div>
                    )}

                    {/* Footer Toolbar */}
                    <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
                        <div className="flex gap-2 text-gray-500">

                            {/* 1. THUNDER (BOOST) */}
                            <button
                                onClick={() => setIsBoosted(!isBoosted)}
                                className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all font-bold text-xs tracking-wide pointer-events-auto ${isBoosted ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                                title="Boost Visibility"
                            >
                                <Zap size={14} fill={isBoosted ? "currentColor" : "none"} />
                                {isBoosted ? 'BOOST' : 'Boost'}
                            </button>

                            {/* 2. HASH (TAGS) */}
                            <button
                                onClick={() => setShowTagInput(!showTagInput)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all pointer-events-auto ${showTagInput || tags.length > 0 ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/5 hover:text-white'}`}
                                title="Add Tags"
                            >
                                <Hash size={16} />
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!text.trim()}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all pointer-events-auto ${text.trim() ? 'bg-white text-black hover:scale-105 shadow-xl' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
                        >
                            Post
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
