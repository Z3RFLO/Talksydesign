import React from 'react';
import { Home, Compass, User, Bell, Settings } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const NavItem = ({ id, icon: Icon }) => (
    <div 
      onClick={() => setActiveTab(id)} 
      className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300
        ${activeTab === id 
          ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
          : 'text-gray-500 hover:bg-white/10 hover:text-white hover:scale-105'
        }`}
    >
      <Icon size={26} strokeWidth={activeTab === id ? 3 : 2} />
    </div>
  );

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 rounded-[50px] py-8 px-3 flex flex-col gap-6 items-center z-50 w-[88px]">
      <NavItem id="home" icon={Home} />
      <NavItem id="explore" icon={Compass} />
      <NavItem id="notifications" icon={Bell} />
      <NavItem id="profile" icon={User} />
      <div className="mt-auto">
        <NavItem id="settings" icon={Settings} />
      </div>
    </div>
  );
}