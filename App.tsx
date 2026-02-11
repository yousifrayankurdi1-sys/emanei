
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HadithCard from './components/HadithCard';
import QuranBrowser from './components/QuranBrowser';
import RemembranceSection from './components/RemembranceSection';
import AuthModal from './components/AuthModal';
import { Hadith, Category, User, Remembrance, Surah } from './types';
import { SAMPLE_HADITHS, Icons, AUTHENTIC_REMEMBRANCES, SURAHS } from './constants';
import { searchAuthenticHadith } from './services/geminiService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quranBookmarks, setQuranBookmarks] = useState<number[]>([]);
  const [remembranceFavs, setRemembranceFavs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [dailyHadith, setDailyHadith] = useState<Hadith>(SAMPLE_HADITHS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // حالات التنقل المباشر
  const [jumpToSurah, setJumpToSurah] = useState<number | null>(null);
  const [jumpToAzkarTab, setJumpToAzkarTab] = useState<'morning_evening' | 'prayer' | 'general_dua' | null>(null);

  useEffect(() => {
    const savedFavs = localStorage.getItem('hadith_favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    const savedQuran = localStorage.getItem('quran_bookmarks');
    if (savedQuran) setQuranBookmarks(JSON.parse(savedQuran));

    const savedAzkar = localStorage.getItem('remembrance_favorites');
    if (savedAzkar) setRemembranceFavs(JSON.parse(savedAzkar));

    const savedUser = localStorage.getItem('hadith_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // منطق اختيار حديث اليوم بناءً على التاريخ لضمان تغيره كل 24 ساعة
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    // توليد رقم فريد لليوم (Hash)
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0;
    }
    
    const index = Math.abs(hash) % SAMPLE_HADITHS.length;
    setDailyHadith(SAMPLE_HADITHS[index]);
  }, []);

  const toggleFavorite = (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('hadith_favorites', JSON.stringify(newFavs));
  };

  const toggleQuranBookmark = (number: number) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newBookmarks = quranBookmarks.includes(number)
      ? quranBookmarks.filter(n => n !== number)
      : [...quranBookmarks, number];
    setQuranBookmarks(newBookmarks);
    localStorage.setItem('quran_bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleRemembranceFav = (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newFavs = remembranceFavs.includes(id)
      ? remembranceFavs.filter(f => f !== id)
      : [...remembranceFavs, id];
    setRemembranceFavs(newFavs);
    localStorage.setItem('remembrance_favorites', JSON.stringify(newFavs));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('hadith_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hadith_user');
  };

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    setSearchQuery(term);
    try {
      const results = await searchAuthenticHadith(term);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const navigateToSurah = (num: number) => {
    setJumpToSurah(num);
    setCurrentPage('quran');
  };

  const navigateToAzkar = (category: string) => {
    setJumpToAzkarTab(category as any);
    setCurrentPage('remembrances');
  };

  const handleNavChange = (page: string) => {
    setJumpToSurah(null);
    setJumpToAzkarTab(null);
    setCurrentPage(page);
  };

  const renderHome = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="text-center py-12 md:py-24 gradient-bg rounded-[2rem] text-white px-6 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none transform rotate-12 scale-150">
          <Icons.Book />
        </div>
        
        {user?.isLoggedIn && (
          <div className="mb-6 animate-in slide-in-from-top duration-500">
            <span className="bg-white/10 border border-white/20 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md">
              مرحباً بك يا {user.name} في رحاب ايمان
            </span>
          </div>
        )}

        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-white">ايمان</h1>
        <p className="text-lg md:text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 font-light">
          منصتك المتكاملة لتدبر آيات الذكر الحكيم والوصول للأحاديث النبوية الصحيحة والأدعية الموثقة بأعلى درجات الدقة.
        </p>
        
        <div className="flex flex-wrap justify-center gap-5">
          <button 
            onClick={() => handleNavChange('quran')}
            className="bg-white text-primary-900 px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
          >
            <Icons.Book />
            <span>تصفح القرآن الكريم</span>
          </button>
          <button 
            onClick={() => handleNavChange('search')}
            className="bg-primary-900/30 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 transition-all text-lg"
          >
            السنة النبوية
          </button>
          <button 
            onClick={() => handleNavChange('remembrances')}
            className="bg-gold-500 text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-gold-600 hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
          >
            <Icons.Sun />
            <span>الأذكار والأدعية</span>
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center py-12 px-6">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black text-slate-800 mb-4">لماذا ايمان؟</h3>
           <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
             نعتمد حصرياً على المصادر الثابتة في "صحيح البخاري" و "صحيح مسلم" لنقدم لك محتوىً نقياً وموثوقاً 100% بعيداً عن الأحاديث الضعيفة أو المختلف فيها.
           </p>
        </div>
      </section>
    </div>
  );

  const renderFavorites = () => {
    const bookmarkedSurahs = SURAHS.filter(s => quranBookmarks.includes(s.number));
    const favHadiths = SAMPLE_HADITHS.filter(h => favorites.includes(h.id));
    const favAzkar = AUTHENTIC_REMEMBRANCES.filter(a => remembranceFavs.includes(a.id));

    return (
      <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom duration-500">
        <h2 className="text-4xl font-black mb-10 text-slate-900">المفضلة والمحفوظات</h2>
        
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-gold-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">سور قرآنية للحفظ</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedSurahs.length > 0 ? (
              bookmarkedSurahs.map(s => (
                <div key={s.number} className="group relative">
                  <div 
                    onClick={() => navigateToSurah(s.number)}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center cursor-pointer hover:border-gold-300 hover:bg-gold-50 transition-all"
                  >
                    <span className="font-bold text-slate-800 text-lg">سورة {s.name}</span>
                    <Icons.Book />
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuranBookmark(s.number);
                    }} 
                    className="absolute -top-2 -left-2 bg-white rounded-full shadow-md p-1 text-gold-500 border border-gold-100"
                  >
                    <Icons.Star filled />
                  </button>
                </div>
              ))
            ) : <p className="text-slate-400 text-sm font-bold">لا توجد سور محفوظة حالياً.</p>}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-primary-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">أدعية وأذكار مفضلة</h3>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {favAzkar.length > 0 ? (
              favAzkar.map(a => (
                <div key={a.id} className="group relative">
                  <div 
                    onClick={() => navigateToAzkar(a.category)}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-primary-800">{a.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-white px-2 py-1 rounded-md border text-slate-400 font-bold uppercase tracking-tighter">
                          {a.category === 'morning_evening' ? 'أذكار' : a.category === 'prayer' ? 'صلاة' : 'عام'}
                        </span>
                        <Icons.Sun />
                      </div>
                    </div>
                    <p className="hadith-text text-xl text-slate-700 leading-relaxed">{a.text}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRemembranceFav(a.id);
                    }} 
                    className="absolute -top-2 -left-2 bg-white rounded-full shadow-md p-2 text-red-500 border border-red-100"
                  >
                    <Icons.Heart filled />
                  </button>
                </div>
              ))
            ) : <p className="text-slate-400 text-sm font-bold">لا توجد أدعية مفضلة حالياً.</p>}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-emerald-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">أحاديث أعجبتني</h3>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {favHadiths.length > 0 ? (
              favHadiths.map(h => (
                <HadithCard key={h.id} hadith={h} isFavorite={true} onToggleFavorite={toggleFavorite} />
              ))
            ) : <p className="text-slate-400 text-sm font-bold">لا توجد أحاديث مفضلة حالياً.</p>}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navbar onNavigate={handleNavChange} currentPage={currentPage} user={user} onOpenAuth={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-16">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'quran' && (
          <QuranBrowser 
            bookmarks={quranBookmarks} 
            onToggleBookmark={toggleQuranBookmark} 
            initialSurahNumber={jumpToSurah}
          />
        )}
        {currentPage === 'search' && (
          <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">البحث في السنة النبوية</h2>
              <form onSubmit={handleSearchSubmit} className="relative group mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  placeholder="ابحث عن حديث (مثلاً: الصلاة، الصدق، الجنة)..."
                  className="w-full h-16 px-14 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary-500/20 shadow-inner transition-all text-xl text-slate-800 text-center"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></div>
                <button type="submit" className="absolute left-2 top-2 bottom-2 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all">بحث</button>
              </form>
            </div>
            {isSearching ? <div className="text-center py-20"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div></div> : (
              searchResults.length > 0 ? searchResults.map(h => <HadithCard key={h.id} hadith={h} isFavorite={favorites.includes(h.id)} onToggleFavorite={toggleFavorite} />) : 
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800">حديث اليوم</h3>
                <HadithCard hadith={dailyHadith} isFavorite={favorites.includes(dailyHadith.id)} onToggleFavorite={toggleFavorite} />
              </div>
            )}
          </div>
        )}
        {currentPage === 'remembrances' && (
          <RemembranceSection 
            favorites={remembranceFavs} 
            onToggleFavorite={toggleRemembranceFav} 
            initialTab={jumpToAzkarTab}
          />
        )}
        {currentPage === 'favorites' && renderFavorites()}
      </main>
      <footer className="bg-white border-t py-10 text-center">
        <p className="text-slate-600 text-sm font-bold italic">ايمان - مرجعك الموثوق في الكتاب والسنة</p>
      </footer>
    </div>
  );
};

export default App;
