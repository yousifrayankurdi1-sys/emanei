
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import HadithCard from './components/HadithCard';
import QuranBrowser from './components/QuranBrowser';
import RemembranceSection from './components/RemembranceSection';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import SiteFeedback from './components/SiteFeedback';
import { Hadith, User, Remembrance } from './types';
import { Icons, SAMPLE_HADITHS, AUTHENTIC_REMEMBRANCES } from './constants';
import { 
  fetchHadithsFromFirebase, 
  fetchRemembrancesFromFirebase, 
  syncUserProfile, 
  getUserProfile 
} from './services/firebaseService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quranBookmarks, setQuranBookmarks] = useState<number[]>([]);
  const [remembranceFavs, setRemembranceFavs] = useState<string[]>([]);
  
  const [allHadiths, setAllHadiths] = useState<Hadith[]>([]);
  const [allRemembrances, setAllRemembrances] = useState<Remembrance[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInAdminMode, setAuthModalInAdminMode] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);

  const [jumpToSurah, setJumpToSurah] = useState<number | null>(null);
  const [jumpToAzkarTab, setJumpToAzkarTab] = useState<'morning_evening' | 'prayer' | 'general_dua' | null>(null);
  const [editingTarget, setEditingTarget] = useState<{type: 'hadith' | 'remembrance', item: any} | null>(null);

  const loadInitialData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [firebaseHadiths, firebaseRemembrances] = await Promise.all([
        fetchHadithsFromFirebase(),
        fetchRemembrancesFromFirebase()
      ]);
      
      const combined = [...SAMPLE_HADITHS];
      firebaseHadiths.forEach(fh => {
        if (!combined.find(c => c.id === fh.id)) combined.push(fh);
      });

      setAllHadiths(combined);
      setAllRemembrances(firebaseRemembrances.length > 0 ? firebaseRemembrances : AUTHENTIC_REMEMBRANCES);
    } catch (err) {
      console.error("Firebase load failed, using local constants", err);
      setAllHadiths(SAMPLE_HADITHS);
      setAllRemembrances(AUTHENTIC_REMEMBRANCES);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
    const savedUser = localStorage.getItem('hadith_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      loadUserProfile(parsedUser.name);
    }
  }, [loadInitialData]);

  const loadUserProfile = async (name: string) => {
    const profile = await getUserProfile(name);
    if (profile) {
      if (profile.favorites) setFavorites(profile.favorites);
      if (profile.quranBookmarks) setQuranBookmarks(profile.quranBookmarks);
      if (profile.remembranceFavs) setRemembranceFavs(profile.remembranceFavs);
    }
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      syncUserProfile(user.name, {
        favorites,
        quranBookmarks,
        remembranceFavs
      });
    }
  }, [favorites, quranBookmarks, remembranceFavs, user]);

  const handleEditRequest = (type: 'hadith' | 'remembrance', item: any) => {
    if (!user?.isAdmin) return;
    setEditingTarget({ type, item });
    setCurrentPage('admin');
  };

  const toggleFavorite = (id: string) => {
    if (!user) {
      setAuthModalInAdminMode(false);
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleQuranBookmark = (number: number) => {
    if (!user) {
      setAuthModalInAdminMode(false);
      setIsAuthModalOpen(true);
      return;
    }
    setQuranBookmarks(prev => prev.includes(number) ? prev.filter(n => n !== number) : [...prev, number]);
  };

  const toggleRemembranceFav = (id: string) => {
    if (!user) {
      setAuthModalInAdminMode(false);
      setIsAuthModalOpen(true);
      return;
    }
    setRemembranceFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleLogin = async (userData: User) => {
    setUser(userData);
    localStorage.setItem('hadith_user', JSON.stringify(userData));
    await loadUserProfile(userData.name);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hadith_user');
    setFavorites([]);
    setQuranBookmarks([]);
    setRemembranceFavs([]);
    setCurrentPage('home');
  };

  const handleNavChange = (page: string) => {
    setJumpToSurah(null);
    setJumpToAzkarTab(null);
    setEditingTarget(null);
    setSearchQuery('');
    setCurrentPage(page);
  };

  const filteredHadiths = useMemo(() => {
    if (!searchQuery.trim()) return allHadiths;
    const q = searchQuery.toLowerCase();
    return allHadiths.filter(h => 
      h.text.toLowerCase().includes(q) || 
      h.narrator.toLowerCase().includes(q) || 
      h.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [allHadiths, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 relative">
      <Navbar 
        onNavigate={handleNavChange} 
        currentPage={currentPage} 
        user={user} 
        onOpenAuth={() => {
          setAuthModalInAdminMode(false);
          setIsAuthModalOpen(true);
        }} 
        onLogout={handleLogout} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
        isAdminModeInitially={authModalInAdminMode}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {currentPage === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-700 text-center">
            <section className="py-12 md:py-24 gradient-bg rounded-[2rem] text-white px-6 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none transform rotate-12 scale-150"><Icons.Book /></div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-white">ايمان</h1>
              <p className="text-lg md:text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 font-light">
                منصتك المتكاملة لتدبر آيات الذكر الحكيم والوصول للأحاديث النبوية الصحيحة والأدعية الموثقة.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <button onClick={() => handleNavChange('quran')} className="bg-white text-primary-900 px-10 py-5 rounded-2xl font-black shadow-xl flex items-center gap-3 text-lg"><Icons.Book /> تصفح القرآن</button>
                <button onClick={() => handleNavChange('search')} className="bg-primary-900/30 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold backdrop-blur-md text-lg">الأحاديث النبوية</button>
                <button onClick={() => handleNavChange('remembrances')} className="bg-gold-500 text-white px-10 py-5 rounded-2xl font-black shadow-xl flex items-center gap-3 text-lg"><Icons.Sun /> الأذكار</button>
              </div>
            </section>
          </div>
        )}
        
        {currentPage === 'quran' && <QuranBrowser bookmarks={quranBookmarks} onToggleBookmark={toggleQuranBookmark} initialSurahNumber={jumpToSurah} />}
        
        {currentPage === 'search' && (
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="bg-white p-8 rounded-t-[2rem] border-x border-t border-slate-100 text-center mb-0 shadow-sm sticky top-0 z-30">
              <h2 className="text-3xl font-black text-slate-900 mb-2">الأحاديث النبوية</h2>
              <div className="relative group max-w-xl mx-auto">
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="فلترة الأحاديث بالكلمة..." 
                  className="w-full h-14 px-12 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary-500/10 shadow-inner transition-all text-lg text-slate-800 text-center font-bold" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                  <Icons.Search />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="space-y-0.5">
                {filteredHadiths.map((h, index, arr) => (
                  <div key={h.id} className={index === arr.length - 1 ? "rounded-b-[2rem] overflow-hidden border-b border-x border-slate-100 shadow-sm" : ""}>
                    <HadithCard 
                      hadith={h} 
                      isFavorite={favorites.includes(h.id)} 
                      onToggleFavorite={toggleFavorite} 
                      onEdit={() => handleEditRequest('hadith', h)} 
                      showEdit={!!user?.isAdmin} 
                      currentUser={user}
                    />
                  </div>
                ))}
                
                {filteredHadiths.length === 0 && (
                  <div className="text-center py-32 bg-white border border-slate-100 rounded-b-[2rem]">
                    <p className="text-slate-300 font-black text-xl">لا توجد نتائج لهذا البحث.</p>
                    <button onClick={() => setSearchQuery('')} className="mt-4 text-primary-600 underline font-bold">إظهار كافة الأحاديث</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'remembrances' && <RemembranceSection favorites={remembranceFavs} onToggleFavorite={toggleRemembranceFav} initialTab={jumpToAzkarTab} onEdit={(r) => handleEditRequest('remembrance', r)} showEdit={!!user?.isAdmin} />}
        
        {currentPage === 'feedback' && <SiteFeedback currentUser={user} onOpenAuth={() => setIsAuthModalOpen(true)} />}

        {currentPage === 'favorites' && (
          <div className="max-w-4xl mx-auto space-y-6">
             <h2 className="text-3xl font-black mb-6 text-slate-900">المفضلة والمحفوظات</h2>
             <section className="space-y-1">
               <div className="flex items-center gap-2 mb-4"><div className="h-4 w-1 bg-emerald-600 rounded-full"></div><h3 className="text-lg font-black text-slate-800">أحاديث محفوظة</h3></div>
               <div className="flex flex-col space-y-0.5">
                 {allHadiths.filter(h => favorites.includes(h.id)).map((h, idx, arr) => (
                   <div key={h.id} className={idx === arr.length - 1 ? "rounded-b-2xl overflow-hidden shadow-sm" : idx === 0 ? "rounded-t-2xl overflow-hidden" : ""}>
                     <HadithCard 
                        hadith={h} 
                        isFavorite={true} 
                        onToggleFavorite={toggleFavorite} 
                        onEdit={() => handleEditRequest('hadith', h)} 
                        showEdit={!!user?.isAdmin} 
                        currentUser={user}
                      />
                   </div>
                 ))}
                 {favorites.length === 0 && <div className="p-16 text-center bg-white rounded-2xl border border-dashed text-slate-300 font-bold">المفضلة فارغة حالياً.</div>}
               </div>
             </section>
          </div>
        )}
        
        {currentPage === 'admin' && user?.isAdmin && <AdminPanel hadiths={allHadiths} remembrances={allRemembrances} onRefresh={loadInitialData} initialEdit={editingTarget} />}
      </main>

      <button 
        onClick={() => {
          if (user?.isAdmin) {
            setCurrentPage('admin');
          } else {
            setAuthModalInAdminMode(true);
            setIsAuthModalOpen(true);
          }
        }}
        className="fixed bottom-4 right-4 p-4 text-slate-200 opacity-20 hover:opacity-100 hover:text-primary-600 transition-all z-[100] scale-75 hover:scale-100"
        aria-label="Admin Access"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <footer className="bg-white border-t py-6 text-center text-slate-300 text-[10px] font-black tracking-widest uppercase">ايمان - الأحاديث مأخوذة من المصادر المعتمدة</footer>
    </div>
  );
};

export default App;
