import React, { useState, ChangeEvent } from 'react';
import { X, Save, User, MapPin, Calendar, Ghost, Briefcase, Languages, GraduationCap, Camera, LucideIcon } from 'lucide-react';

export interface ProfileData {
    avatar?: string;
    name?: string;
    handle?: string;
    bio?: string;
    currentCity?: string;
    birthCity?: string;
    birthday?: string;
    zodiac?: string;
    gender?: string;
    language?: string;
    education?: string;
    [key: string]: any;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: ProfileData;
    onSave: (data: ProfileData) => void;
}

export default function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
    const [formData, setFormData] = useState<ProfileData>(profile);
    const [activeTab, setActiveTab] = useState<'basics' | 'identity'>('basics');

    if (!isOpen) return null;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    interface InputGroupProps {
        icon: LucideIcon;
        label: string;
        name: string;
        type?: string;
    }

    const InputGroup: React.FC<InputGroupProps> = ({ icon: Icon, label, name, type = "text" }) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Icon size={14} className="text-indigo-500" /> {label}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="w-full bg-[#121214] text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-indigo-500 focus:bg-[#1a1a1c] transition-all text-sm"
                placeholder={`Enter ${label.toLowerCase()}...`}
            />
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
                    <h2 className="text-2xl font-black text-white">Edit Profile</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-8 pt-6 gap-4">
                    <button
                        onClick={() => setActiveTab('basics')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'basics' ? 'text-white border-indigo-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                    >
                        Basics
                    </button>
                    <button
                        onClick={() => setActiveTab('identity')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'identity' ? 'text-white border-indigo-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                    >
                        Identity Matrix
                    </button>
                </div>

                {/* Scrollable Form Area */}
                <div className="p-8 overflow-y-auto custom-scrollbar">

                    {activeTab === 'basics' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Avatar Preview */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-[#111] border border-white/10 flex items-center justify-center text-4xl font-bold text-white relative group cursor-pointer overflow-hidden">
                                    {formData.avatar}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-1">Profile Photo</h3>
                                    <p className="text-gray-500 text-xs mb-3">Recommended 400x400px. JPG or PNG.</p>
                                    <button className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold text-white hover:bg-white/10 transition-colors">Upload New</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup icon={User} label="Display Name" name="name" />
                                <InputGroup icon={User} label="Handle" name="handle" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={14} className="text-indigo-500" /> Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio || ''}
                                    onChange={handleChange}
                                    className="w-full bg-[#121214] text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-indigo-500 focus:bg-[#1a1a1c] transition-all text-sm h-24 resize-none"
                                    placeholder="Tell your story..."
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'identity' && (
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <InputGroup icon={MapPin} label="Current City" name="currentCity" />
                            <InputGroup icon={MapPin} label="Birth City" name="birthCity" />
                            <InputGroup icon={Calendar} label="Birthday" name="birthday" type="date" />
                            <InputGroup icon={Ghost} label="Zodiac" name="zodiac" />
                            <InputGroup icon={User} label="Gender" name="gender" />
                            <InputGroup icon={Languages} label="Mother Tongue" name="language" />
                            <div className="col-span-2">
                                <InputGroup icon={GraduationCap} label="Education" name="education" />
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}
