import React from 'react';
import { Home, Compass, User, Bell, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Use Link for real URLs

export default function Sidebar() {
  const location = useLocation(); // Gets current URL
  const activeTab = location.pathname; // Checks current URL

  const NavItem = ({ to, icon: Icon }) => {
    // Check if this link is active
    const isActive = activeTab === to || (to !== '/' && activeTab.startsWith(to));

    return (
      <Link 
        to={to} 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300
          ${isActive 
            ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
            : 'text-gray-500 hover:bg-white/10 hover:text-white hover:scale-105'
          }`}
      >
        <Icon size={26} strokeWidth={isActive ? 3 : 2} />
      </Link>
    );
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 rounded-[50px] py-8 px-3 flex flex-col gap-6 items-center z-50 w-[88px]">
      <NavItem to="/" icon={Home} />
      <NavItem to="/explore" icon={Compass} />
      <NavItem to="/notifications" icon={Bell} />
      <NavItem to="/profile" icon={User} />
      <div className="mt-auto">
        <NavItem to="/settings" icon={Settings} />
      </div>
    </div>
  );
}