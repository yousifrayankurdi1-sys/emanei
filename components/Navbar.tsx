
import React from 'react';
import { Icons } from '../constants';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user, onOpenAuth, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'quran', label: 'القرآن الكريم' },
    { id: 'search', label: 'الأحاديث النبوية' },
    { id: 'remembrances', label: 'الأذكار والأدعية' },
    { id: 'feedback', label: 'آراء الزوار' },
    { id: 'favorites', label: 'المفضلة' },
    ...(user?.isAdmin ? [{ id: 'admin', label: 'لوحة التحكم' }] : [])
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-[60] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 md:w-12 md:h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <span className="text-white font-serif text-2xl md:text-3xl font-black">ا</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-black text-slate-900">ايمان</span>
              <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quran & Sunnah</span>
            </div>
          </div>
          
          {/* Desktop Menu - Visible on large screens */}
          <div className="hidden lg:flex items-center space-x-reverse space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-bold transition-all px-4 py-2 rounded-xl whitespace-nowrap ${
                  currentPage === item.id 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-slate-500 hover:text-primary-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {user?.isLoggedIn ? (
              <div className="flex items-center gap-2 md:gap-3 bg-slate-50 pr-3 md:pr-4 pl-1 py-1 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-col text-right">
                  {user.isAdmin && (
                    <span className="text-[8px] font-black text-primary-600 block leading-none mb-1 animate-pulse">المشرف</span>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-xs md:text-sm font-black text-slate-900 leading-none">{user.name}</span>
                  </div>
                  <button onClick={onLogout} className="text-[9px] text-red-500 hover:underline font-bold text-right mt-1">خروج</button>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black text-sm md:text-lg ${user.isAdmin ? 'bg-primary-600 text-white shadow-lg' : 'bg-primary-100 text-primary-700'}`}>
                  {user.name[0]}
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 md:px-6 py-2.5 rounded-xl font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                <Icons.Check />
                <span className="text-xs md:text-sm">تسجيل دخول</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation for mobile screens (Horizontal Scroll instead of hamburger) */}
      <div className="lg:hidden bg-slate-50/50 border-t border-slate-100 overflow-x-auto no-scrollbar py-2">
        <div className="flex px-4 space-x-reverse space-x-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[11px] font-black transition-all px-4 py-2 rounded-lg whitespace-nowrap shrink-0 ${
                currentPage === item.id 
                ? 'text-primary-700 bg-white shadow-sm border border-primary-100' 
                : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
