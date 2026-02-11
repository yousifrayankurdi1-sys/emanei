
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
    <nav className="bg-white border-b relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <span className="text-white font-serif text-3xl font-black">ا</span>
            </div>
            <div className="flex flex-col leading-tight hidden xs:flex">
              <span className="text-2xl font-black text-slate-900">ايمان</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quran & Sunnah</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-reverse space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-bold transition-all px-3 py-2 rounded-xl whitespace-nowrap ${
                  currentPage === item.id 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-slate-500 hover:text-primary-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user?.isLoggedIn ? (
              <div className="flex items-center gap-3 bg-slate-50 pr-4 pl-1 py-1 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-col text-right">
                  {user.isAdmin && (
                    <span className="text-[10px] font-black text-primary-600 block leading-none mb-1 animate-pulse">المشرف</span>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-900 leading-none">{user.name}</span>
                    {user.isAdmin && <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>}
                  </div>
                  <button onClick={onLogout} className="text-[10px] text-red-500 hover:underline font-bold text-right mt-1">خروج</button>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${user.isAdmin ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-primary-100 text-primary-700'}`}>
                  {user.name[0]}
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                <Icons.Check />
                <span className="text-sm">تسجيل دخول</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
