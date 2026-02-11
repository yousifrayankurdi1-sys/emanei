
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
          
          <div className="hidden lg:flex items-center space-x-reverse space-x-6">
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'quran', label: 'القرآن الكريم' },
              { id: 'search', label: 'السنة النبوية' },
              { id: 'remembrances', label: 'الأذكار والأدعية' },
              { id: 'favorites', label: 'المفضلة' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-bold transition-all px-3 py-2 rounded-xl ${
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
              <div className="flex items-center gap-3 bg-slate-50 pr-4 pl-1 py-1 rounded-2xl border border-slate-100">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-black text-slate-900 leading-none">{user.name}</span>
                  <button onClick={onLogout} className="text-[10px] text-red-500 hover:underline font-bold text-right">خروج</button>
                </div>
                <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center font-black">
                  {user.name[0]}
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-black transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
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
