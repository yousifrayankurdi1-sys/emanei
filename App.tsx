
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import HadithCard from './components/HadithCard';
import QuranBrowser from './components/QuranBrowser';
import RemembranceSection from './components/RemembranceSection';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import SiteFeedback from './components/SiteFeedback';
import { Hadith, User, Remembrance, Source } from './types';
import { Icons, SAMPLE_HADITHS, AUTHENTIC_REMEMBRANCES } from './constants';
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
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [sourceFilter, setSourceFilter] = useState<'all' | Source>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInAdminMode, setAuthModalInAdminMode] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);

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
      console.error("Firebase load failed", err);
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

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchAuthenticHadith(searchQuery);
      setSearchResults(results);
    } catch (err) {
      alert("تعذر الاتصال بالمكتبة الشاملة حالياً.");
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = (id: string) => {
    if (!user) {
      setAuthModalInAdminMode(false);
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleNavChange = (page: string) => {
    setSearchQuery('');
    setSearchResults([]);
    setSourceFilter('all');
    setCurrentPage(page);
  };

  const handleAdminFabClick = () => {
    if (user?.isAdmin) {
      setCurrentPage('admin');
    } else {
      setAuthModalInAdminMode(true);
      setIsAuthModalOpen(true);
    }
  };

  const displayedHadiths = useMemo(() => {
    const list = searchResults.length > 0 ? searchResults : allHadiths;
    if (sourceFilter === 'all') return list;
    return list.filter(h => h.source === sourceFilter);
  }, [allHadiths, searchResults, sourceFilter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 relative">
      <Navbar 
        onNavigate={handleNavChange} 
        currentPage={currentPage} 
        user={user} 
        onOpenAuth={() => { setAuthModalInAdminMode(false); setIsAuthModalOpen(true); }} 
        onLogout={() => { setUser(null); localStorage.removeItem('hadith_user'); setCurrentPage('home'); }} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={(u) => { setUser(u); localStorage.setItem('hadith_user', JSON.stringify(u)); loadUserProfile(u.name); }} 
        isAdminModeInitially={authModalInAdminMode}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {currentPage === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <section className="py-20 md:py-32 gradient-bg rounded-[3rem] text-white px-6 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 space-y-8">
                <h1 className="text-7xl md:text-9xl font-black mb-4">ايمان</h1>
                <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed opacity-90 font-light">
                  منصة متخصصة في عرض الأحاديث النبوية الصحيحة والقرآن الكريم مع واجهة قراءة عصرية ومريحة.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <button 
                    onClick={() => setCurrentPage('search')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-[2rem] font-black shadow-xl shadow-blue-900/40 hover:scale-105 transition-all text-xl border-b-4 border-blue-800"
                  >
                    الأحاديث النبوية
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage('quran')} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-6 rounded-[2rem] font-black shadow-xl shadow-emerald-900/40 hover:scale-105 transition-all text-xl border-b-4 border-emerald-800"
                  >
                    المصحف الإلكتروني
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage('remembrances')} 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-6 rounded-[2rem] font-black shadow-xl shadow-amber-900/40 hover:scale-105 transition-all text-xl border-b-4 border-amber-700"
                  >
                    الأذكار والأدعية
                  </button>

                  <button 
                    onClick={() => setCurrentPage('feedback')} 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-6 rounded-[2rem] font-black shadow-xl shadow-red-900/40 hover:scale-105 transition-all text-xl border-b-4 border-red-800"
                  >
                    آراء الزوار
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {currentPage === 'search' && (
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                <Icons.Book />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">الموسوعة الحديثية</h2>
              <p className="text-slate-500 font-bold mb-8">ابحث عن أي حديث أو اختر مصدراً محدداً من القائمة أدناه</p>
              
              <form onSubmit={handleGlobalSearch} className="relative max-w-2xl mx-auto mb-10">
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="ابحث عن: الصلاة، بر الوالدين، النية..." 
                  className="w-full h-20 px-12 rounded-[2rem] bg-slate-50 border-2 border-slate-100 focus:border-primary-500 focus:ring-8 focus:ring-primary-500/5 transition-all text-2xl text-slate-800 text-center font-bold" 
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                  {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Icons.Search />}
                </button>
              </form>

              {/* فلاتر المصادر */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: Source.BUKHARI, label: 'صحيح البخاري' },
                  { id: Source.MUSLIM, label: 'صحيح مسلم' },
                  { id: Source.AGREED, label: 'متفق عليه' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSourceFilter(s.id as any)}
                    className={`px-6 py-2 rounded-xl font-black text-sm transition-all border ${
                      sourceFilter === s.id 
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md' 
                      : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {isSearching ? (
                <div className="py-32 text-center space-y-4">
                   <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                   <p className="text-slate-400 font-black text-xl">جاري البحث في آلاف الأحاديث...</p>
                </div>
              ) : (
                <>
                  {displayedHadiths.map((h) => (
                    <div key={h.id} className="rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <HadithCard 
                        hadith={h} 
                        isFavorite={favorites.includes(h.id)} 
                        onToggleFavorite={toggleFavorite} 
                        currentUser={user}
                      />
                    </div>
                  ))}
                  
                  {displayedHadiths.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                      <p className="text-slate-300 font-black text-2xl">لا توجد أحاديث مطابقة لهذا الفلتر.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {currentPage === 'quran' && <QuranBrowser bookmarks={quranBookmarks} onToggleBookmark={(n) => setQuranBookmarks(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} />}
        {currentPage === 'remembrances' && <RemembranceSection favorites={remembranceFavs} onToggleFavorite={(id) => setRemembranceFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])} />}
        {currentPage === 'feedback' && <SiteFeedback currentUser={user} onOpenAuth={() => { setAuthModalInAdminMode(false); setIsAuthModalOpen(true); }} />}
        {currentPage === 'admin' && user?.isAdmin && <AdminPanel hadiths={allHadiths} remembrances={allRemembrances} onRefresh={loadInitialData} />}
      </main>

      <button 
        onClick={handleAdminFabClick}
        className={`fixed bottom-8 right-8 w-14 h-14 gradient-bg text-white rounded-full flex items-center justify-center shadow-2xl transition-all z-50 group border-2 border-white/20 
          ${user?.isAdmin ? 'opacity-100 scale-100' : 'opacity-0 scale-75 hover:opacity-10'}
        `}
        title="وضع المشرف"
      >
        <div className="group-hover:rotate-90 transition-transform duration-500">
          <Icons.Settings />
        </div>
      </button>

      <footer className="bg-white border-t py-10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-400 text-sm font-black uppercase tracking-widest mb-2">ايمان - الموسوعة الحديثية الكاملة</p>
          <p className="text-slate-300 text-[10px] font-bold">كافة الأحاديث مستخرجة من أصح الكتب المصنفة في الإسلام</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
