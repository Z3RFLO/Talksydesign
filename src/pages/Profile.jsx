import React, { useState } from 'react';
import {
    MapPin, Cake, Ghost, Languages, User, GraduationCap,
    Home, Briefcase, Edit3, Grid, List, Users
} from 'lucide-react';
import CompactPost from '../components/CompactPost';
import EditProfileModal from '../components/EditProfileModal';

export default function Profile({ posts = [] }) {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'identity'
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [profile, setProfile] = useState({
        name: "Design God",
        handle: "@visuals",
        avatar: "D",
        bio: "Dark mode isn't just about black backgrounds. It's about hierarchy.",
        currentCity: "Neo Tokyo",
        birthCity: "Kyoto",
        birthday: "1998-11-24",
        zodiac: "Sagittarius",
        gender: "Male",
        language: "English, Japanese",
        education: "School of Visual Arts",
        connections: "1,842"
    });

    // Filter posts for this user (Mock logic: assuming current user is "Design_God")
    const myPosts = posts.filter(p => p.author === "Design_God");

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    // Helper: Identity Matrix Item (Read-Only)
    const MatrixItem = ({ icon: Icon, label, value, colSpan }) => (
        <div className={`bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-white/20 hover:bg-[#0a0a0a]/80 transition-all duration-300 group ${colSpan || ''}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-indigo-500/20 transition-colors">
                    <Icon size={16} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-lg font-medium text-white pl-1 break-words">
                {value || "Not set"}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-[1100px] mx-auto pt-10 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* --- 1. HEADER CARD --- */}
            <div className="relative mb-12 group">
                {/* Banner */}
                <div className="h-72 w-full rounded-[48px] bg-gradient-to-r from-indigo-900 via-purple-900 to-black relative overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Avatar & Info Wrapper */}
                <div className="flex flex-col md:flex-row items-end px-12 -mt-24 gap-8 relative z-10">

                    {/* Avatar */}
                    <div className="relative group/avatar">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-indigo-500 blur-[50px] opacity-0 group-hover/avatar:opacity-40 transition-opacity duration-700 rounded-full"></div>

                        <div className="w-44 h-44 rounded-[48px] bg-[#0a0a0a] border-[8px] border-[#000] flex items-center justify-center text-white font-bold text-7xl shadow-2xl overflow-hidden relative z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                            {profile.avatar}
                        </div>
                    </div>

                    {/* Name & Handle & Stats */}
                    <div className="flex-1 mb-4 w-full">
                        <h1 className="text-6xl font-black text-white tracking-tighter mb-1 drop-shadow-lg">{profile.name}</h1>
                        <p className="text-gray-400 text-xl font-medium mb-5">{profile.handle}</p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-8 text-sm">
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <span className="font-black text-white text-xl">{profile.connections}</span>
                                <span className="text-gray-500 font-medium group-hover:text-indigo-400 transition-colors">Connections</span>
                            </div>
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <span className="font-black text-white text-xl">{myPosts.length}</span>
                                <span className="text-gray-500 font-medium group-hover:text-indigo-400 transition-colors">Broadcasts</span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Action */}
                    <div className="flex gap-3 mb-8">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:scale-105 hover:bg-gray-100 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <Edit3 size={18} /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* --- 2. TABS --- */}
            <div className="flex items-center justify-center mb-12">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex gap-1 relative shadow-2xl">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'posts' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Grid size={16} /> My Broadcasts
                    </button>
                    <button
                        onClick={() => setActiveTab('identity')}
                        className={`px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'identity' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-500 hover:text-white'}`}
                    >
                        <List size={16} /> Identity Matrix
                    </button>
                </div>
            </div>

            {/* --- 3. CONTENT AREA --- */}
            <div className="min-h-[400px]">

                {/* POSTS TAB (Compact Grid) */}
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {myPosts.length > 0 ? (
                            myPosts.map(post => (
                                <CompactPost key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 border border-dashed border-white/10 rounded-[40px] bg-white/5">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                                    <Grid size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No broadcasts yet</h3>
                                <p className="text-gray-500">Your thoughts will appear here.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* IDENTITY TAB */}
                {activeTab === 'identity' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4">
                            <MatrixItem
                                icon={Briefcase} label="Bio"
                                value={profile.bio} colSpan="col-span-full"
                            />
                            <MatrixItem icon={Home} label="Current City" value={profile.currentCity} />
                            <MatrixItem icon={MapPin} label="City of Birth" value={profile.birthCity} />
                            <MatrixItem icon={Cake} label="Birthday" value={profile.birthday} />
                            <MatrixItem icon={Ghost} label="Zodiac" value={profile.zodiac} />
                            <MatrixItem icon={User} label="Gender" value={profile.gender} />
                            <MatrixItem icon={Languages} label="Mother Tongue" value={profile.language} />
                            <MatrixItem
                                icon={GraduationCap} label="School/College"
                                value={profile.education} colSpan="col-span-full"
                            />
                        </div>
                    </div>
                )}

            </div>

            {/* --- EDIT MODAL --- */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profile={profile}
                onSave={handleSaveProfile}
            />

        </div>
    );
}
