import React from 'react';
import { Home, Compass, User, Bell, Settings, LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
    to: string;
    icon: LucideIcon;
}

export default function Sidebar() {
    const location = useLocation();
    const activeTab = location.pathname;

    const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon }) => {
        const isActive = activeTab === to || (to !== '/' && activeTab.startsWith(to));

        return (
            <Link
                to={to}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 relative group
          ${isActive
                        ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                        : 'text-gray-500 hover:bg-white/5 hover:text-white hover:scale-110'
                    }`}
            >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                {/* Hover Tooltip Glow */}
                {isActive && <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-50"></div>}
            </Link>
        );
    };

    return (
        // GLASS DOCK STYLE
        <div className="fixed left-6 top-1/2 -translate-y-1/2 bg-[#0c0c0e]/60 backdrop-blur-xl border border-white/10 rounded-[40px] py-6 px-3 flex flex-col gap-5 items-center z-50 w-[80px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <NavItem to="/" icon={Home} />
            <NavItem to="/explore" icon={Compass} />
            <NavItem to="/notifications" icon={Bell} />
            <NavItem to="/profile" icon={User} />

            <div className="h-px w-8 bg-white/10 my-2"></div> {/* Divider */}

            <div className="mt-auto">
                <NavItem to="/settings" icon={Settings} />
            </div>
        </div>
    );
}
