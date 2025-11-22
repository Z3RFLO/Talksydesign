import React, { useState } from 'react';
import { 
  MapPin, Cake, Ghost, Languages, User, GraduationCap, 
  Home, Briefcase, Edit3, Save, X, Camera 
} from 'lucide-react';

export default function Profile() {
  // --- STATE: Holds all your profile data ---
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "User",
    handle: "@user",
    avatar: "x",
    bio: "",
    currentCity: "",
    birthCity: "",
    birthday: "",
    zodiac: "",
    gender: "",
    language: "",
    education: ""
  });

  // Function to handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Helper component for Grid Items
  const MatrixItem = ({ icon: Icon, label, name, value, colSpan }) => (
    <div className={`bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group ${colSpan || ''}`}>
      <div className="flex items-center gap-3 mb-3">
         <Icon size={18} className="text-indigo-500 group-hover:text-white transition-colors" />
         <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      
      {isEditing ? (
        <input 
          type="text" 
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full bg-[#121214] text-white px-3 py-2 rounded-lg outline-none border border-white/10 focus:border-indigo-500 transition-all"
        />
      ) : (
        <div className="text-xl font-medium text-white pl-8 break-words">
          {value}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto pt-10 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* --- 1. HEADER CARD --- */}
      <div className="relative mb-12 group">
        {/* Banner */}
        <div className="h-60 w-full rounded-[40px] bg-gradient-to-r from-indigo-900 via-purple-900 to-black relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
          {isEditing && (
            <button className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all">
              <Camera size={16} /> Change Banner
            </button>
          )}
        </div>

        {/* Avatar & Info Wrapper */}
        <div className="flex flex-col md:flex-row items-end px-10 -mt-16 gap-6 relative z-10">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-[30px] bg-[#0a0a0a] border-4 border-[#0a0a0a] flex items-center justify-center text-white font-bold text-5xl shadow-2xl">
              {profile.avatar}
            </div>
            {isEditing && (
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white hover:scale-110 border border-black">
                 <Edit3 size={14} />
               </button>
            )}
          </div>

          {/* Name & Handle */}
          <div className="flex-1 mb-2 w-full">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <input 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange}
                  className="text-4xl font-black text-white bg-transparent outline-none border-b border-white/20 focus:border-white w-full"
                />
                <input 
                  name="handle" 
                  value={profile.handle} 
                  onChange={handleChange}
                  className="text-lg text-gray-500 bg-transparent outline-none border-b border-white/10 focus:border-gray-400 w-1/2"
                />
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-black text-white">{profile.name}</h1>
                <p className="text-gray-500 text-lg">{profile.handle}</p>
              </>
            )}
          </div>

          {/* Edit/Save Actions */}
          <div className="flex gap-3 mb-4">
             {isEditing ? (
               <>
                 <button 
                   onClick={() => setIsEditing(false)} 
                   className="px-6 py-3 rounded-full bg-green-500 text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                 >
                   <Save size={18} /> Save Identity
                 </button>
                 <button 
                   onClick={() => setIsEditing(false)} 
                   className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                 >
                   <X size={20} />
                 </button>
               </>
             ) : (
               <button 
                 onClick={() => setIsEditing(true)} 
                 className="px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2"
               >
                 <Edit3 size={18} /> Edit Identity
               </button>
             )}
          </div>
        </div>
      </div>

      {/* --- 2. IDENTITY MATRIX (Editable Grid) --- */}
      <h3 className="text-2xl font-bold text-white mb-6 px-4 flex items-center gap-2">
         Identity Matrix <span className="text-xs font-normal text-gray-500 bg-white/10 px-2 py-1 rounded-md">Public</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <MatrixItem 
          icon={Briefcase} label="Bio" name="bio" 
          value={profile.bio} colSpan="col-span-full" 
        />
        <MatrixItem icon={Home} label="Current City" name="currentCity" value={profile.currentCity} />
        <MatrixItem icon={MapPin} label="City of Birth" name="birthCity" value={profile.birthCity} />
        <MatrixItem icon={Cake} label="Birthday" name="birthday" value={profile.birthday} />
        <MatrixItem icon={Ghost} label="Zodiac" name="zodiac" value={profile.zodiac} />
        <MatrixItem icon={User} label="Gender" name="gender" value={profile.gender} />
        <MatrixItem icon={Languages} label="Mother Tongue" name="language" value={profile.language} />
        <MatrixItem 
          icon={GraduationCap} label="School/College" name="education" 
          value={profile.education} colSpan="col-span-full" 
        />
      </div>

    </div>
  );
}