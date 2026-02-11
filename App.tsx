
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HadithCard from './components/HadithCard';
import QuranBrowser from './components/QuranBrowser';
import RemembranceSection from './components/RemembranceSection';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { Hadith, User, Remembrance } from './types';
import { Icons, SURAHS, SAMPLE_HADITHS, AUTHENTIC_REMEMBRANCES } from './constants';
import { searchAuthenticHadith } from './services/geminiService';
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
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // حالات نافذة تسجيل الدخول
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
      
      setAllHadiths(firebaseHadiths.length > 0 ? firebaseHadiths : SAMPLE_HADITHS);
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
    setSearchError(null);
    setCurrentPage(page);
  };

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    try {
      const results = await searchAuthenticHadith(term);
      setSearchResults(results);
      if (results.length === 0) setSearchError("لم يتم العثور على أحاديث تطابق بحثك.");
    } catch (err) {
      setSearchError("حدث خطأ في محرك البحث.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

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
      
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
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
                <button onClick={() => handleNavChange('search')} className="bg-primary-900/30 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold backdrop-blur-md text-lg">السنة النبوية</button>
                <button onClick={() => handleNavChange('remembrances')} className="bg-gold-500 text-white px-10 py-5 rounded-2xl font-black shadow-xl flex items-center gap-3 text-lg"><Icons.Sun /> الأذكار</button>
              </div>
            </section>
          </div>
        )}
        
        {currentPage === 'quran' && <QuranBrowser bookmarks={quranBookmarks} onToggleBookmark={toggleQuranBookmark} initialSurahNumber={jumpToSurah} />}
        {currentPage === 'search' && (
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-6">البحث في السنة النبوية</h2>
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن حديث..." className="w-full h-16 px-14 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary-500/20 shadow-inner transition-all text-xl text-slate-800 text-center" />
                <button type="submit" disabled={isSearching} className="absolute left-2 top-2 bottom-2 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all">{isSearching ? "جاري البحث..." : "بحث"}</button>
              </form>
            </div>
            {isSearching ? <div className="text-center py-20 animate-pulse font-bold text-slate-400">جاري استخراج الأحاديث...</div> : (
              searchResults.length > 0 ? searchResults.map(h => <HadithCard key={h.id} hadith={h} isFavorite={favorites.includes(h.id)} onToggleFavorite={toggleFavorite} onEdit={() => handleEditRequest('hadith', h)} showEdit={!!user?.isAdmin} />) : 
              allHadiths.map(h => <HadithCard key={h.id} hadith={h} isFavorite={favorites.includes(h.id)} onToggleFavorite={toggleFavorite} onEdit={() => handleEditRequest('hadith', h)} showEdit={!!user?.isAdmin} />)
            )}
          </div>
        )}
        {currentPage === 'remembrances' && <RemembranceSection favorites={remembranceFavs} onToggleFavorite={toggleRemembranceFav} initialTab={jumpToAzkarTab} onEdit={(r) => handleEditRequest('remembrance', r)} showEdit={!!user?.isAdmin} />}
        {currentPage === 'favorites' && (
          <div className="max-w-5xl mx-auto space-y-12">
             <h2 className="text-4xl font-black mb-10 text-slate-900">المفضلة والمحفوظات</h2>
             <section className="space-y-6">
               <div className="flex items-center gap-3"><div className="h-6 w-1 bg-emerald-600 rounded-full"></div><h3 className="text-xl font-black text-slate-800">أحاديث أعجبتني</h3></div>
               <div className="grid grid-cols-1 gap-6">
                 {allHadiths.filter(h => favorites.includes(h.id)).map(h => <HadithCard key={h.id} hadith={h} isFavorite={true} onToggleFavorite={toggleFavorite} onEdit={() => handleEditRequest('hadith', h)} showEdit={!!user?.isAdmin} />)}
               </div>
             </section>
          </div>
        )}
        {currentPage === 'admin' && user?.isAdmin && <AdminPanel hadiths={allHadiths} remembrances={allRemembrances} onRefresh={loadInitialData} initialEdit={editingTarget} />}
      </main>

      {/* الزر السري في الزاوية اليمنى السفلية - الترس الذي يفتح الإدارة */}
      <button 
        onClick={() => {
          if (user?.isAdmin) {
            setCurrentPage('admin');
          } else {
            setAuthModalInAdminMode(true);
            setIsAuthModalOpen(true);
          }
        }}
        className="fixed bottom-4 right-4 p-4 text-slate-200 opacity-20 hover:opacity-100 hover:text-primary-600 transition-all z-[100] scale-90 hover:scale-110"
        aria-label="Admin Access"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <footer className="bg-white border-t py-10 text-center text-slate-400 text-sm font-bold">ايمان - جميع البيانات محدثة سحابياً وموثقة</footer>
    </div>
  );
};

export default App;
