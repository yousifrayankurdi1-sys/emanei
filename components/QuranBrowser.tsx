
import React, { useState, useEffect } from 'react';
import { SURAHS, Icons } from '../constants';
import { Surah } from '../types';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface QuranBrowserProps {
  bookmarks: number[];
  onToggleBookmark: (surahNumber: number) => void;
}

const ReciterCard: React.FC<{ query: string; reciter: string }> = ({ query, reciter }) => {
  const directLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  return (
    <a 
      href={directLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-1 transition-all group text-center"
    >
      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
      </div>
      <h4 className="text-2xl font-black text-slate-800 mb-2">{reciter}</h4>
      <p className="text-slate-500 text-sm font-bold mb-6">تلاوة مرئية كاملة على يوتيوب</p>
      <div className="bg-primary-600 text-white px-8 py-3 rounded-2xl text-base font-black shadow-lg shadow-primary-100 group-hover:bg-primary-700 transition-colors">
        مشاهدة الآن
      </div>
    </a>
  );
};

const SurahReader: React.FC<{ surah: Surah; onBack: () => void }> = ({ surah, onBack }) => {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
        const data = await response.json();
        if (data.code === 200) {
          setAyahs(data.data.ayahs);
        } else {
          setError('فشل في تحميل نص السورة.');
        }
      } catch (err) {
        setError('حدث خطأ في الاتصال.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surah.number]);

  // دالة تنظيف نص الآية من البسملة (غصب)
  const getCleanedText = (ayah: Ayah) => {
    // في الفاتحة (1) والتوبة (9) نترك النص كما هو
    if (surah.number === 1 || surah.number === 9) return ayah.text;

    // في بقية السور، إذا كانت الآية هي الأولى، نحذف نص البسملة من بدايتها
    if (ayah.numberInSurah === 1) {
      const bismillahPart = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      const bismillahPartAlt = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      
      let text = ayah.text;
      if (text.startsWith(bismillahPart)) {
        return text.replace(bismillahPart, "").trim();
      } else if (text.startsWith(bismillahPartAlt)) {
        return text.replace(bismillahPartAlt, "").trim();
      }
    }
    return ayah.text;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-24">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary-700 font-bold mb-4 hover:underline bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100 transition-all hover:bg-slate-50"
      >
        <span className="text-lg">← العودة لقائمة السور</span>
      </button>
      
      <div className="bg-white rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 text-center relative overflow-hidden">
        <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-6">سورة {surah.name}</h2>
        
        <div className="flex justify-center gap-8 text-slate-500 font-bold border-t border-b border-slate-50 py-6 max-w-sm mx-auto mb-12">
          <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
          <div className="w-px bg-slate-100"></div>
          <span>{surah.numberOfAyahs} آية</span>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center gap-6">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold">جاري تحميل الآيات...</p>
          </div>
        ) : error ? (
          <div className="py-24 text-red-500 font-black">{error}</div>
        ) : (
          <div className="space-y-12">
            {/* عرض البسملة كعنوان علوي (إلا في الفاتحة والتوبة) */}
            {surah.number !== 1 && surah.number !== 9 && (
              <div className="text-4xl md:text-6xl font-serif text-slate-800 mb-14 opacity-95 leading-relaxed tracking-widest border-b-2 border-gold-100 pb-8 max-w-xl mx-auto">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            
            <div className="quran-text text-3xl md:text-5xl text-slate-800 leading-[2.2] px-4 md:px-10">
              {ayahs.map((ayah) => {
                const cleanedText = getCleanedText(ayah);
                
                // إذا كانت الآية هي البسملة فقط في السور غير الفاتحة، قد تصبح فارغة، لذا نتجنب عرض رقم آية يتيم
                if (surah.number !== 1 && surah.number !== 9 && ayah.numberInSurah === 1 && !cleanedText) {
                    return null;
                }

                return (
                  <span key={ayah.number} className="inline group">
                    <span className="transition-colors group-hover:text-primary-700">
                      {cleanedText}
                    </span>
                    <span className="ayah-number inline-flex items-center justify-center w-12 h-12 mx-3 text-sm font-sans border-2 border-gold-500/40 rounded-full text-gold-700 bg-gold-50/30 font-bold translate-y-1">
                      {ayah.numberInSurah}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        <ReciterCard query={`سورة ${surah.name} عبدالرحمن السديس`} reciter="عبدالرحمن السديس" />
        <ReciterCard query={`سورة ${surah.name} مشاري العفاسي`} reciter="مشاري العفاسي" />
      </div>
    </div>
  );
};

const QuranBrowser: React.FC<QuranBrowserProps> = ({ bookmarks, onToggleBookmark }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  const filteredSurahs = SURAHS.filter(s => {
    const matchesSearch = s.name.includes(searchTerm);
    const matchesFilter = activeFilter === 'All' || s.revelationType === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (selectedSurah) {
    return <SurahReader surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900">القرآن الكريم</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-xl">تصفح وقراءة سور القرآن الكريم بواجهة مريحة.</p>
      </div>

      <div className="space-y-8">
        <div className="relative max-w-xl mx-auto px-4">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن اسم السورة..."
            className="w-full h-14 px-12 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-primary-500/10 shadow-sm transition-all text-lg font-bold"
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400">
            <Icons.Search />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {['All', 'Meccan', 'Medinan'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all ${
                activeFilter === f ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {f === 'All' ? 'الكل' : f === 'Meccan' ? 'مكية' : 'مدنية'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {filteredSurahs.map((surah) => (
          <div key={surah.number} className="relative group">
            <button
              onClick={() => setSelectedSurah(surah)}
              className="w-full bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-right h-full overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 font-black group-hover:bg-primary-600 group-hover:text-white transition-all">
                  {surah.number}
                </span>
                <Icons.Book />
              </div>
              <h3 className="text-2xl font-serif font-black text-slate-800">سورة {surah.name}</h3>
              <p className="text-slate-400 text-sm mt-2 font-bold">{surah.numberOfAyahs} آية</p>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(surah.number);
              }}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                bookmarks.includes(surah.number) ? 'text-gold-500' : 'text-slate-200 hover:text-gold-300'
              }`}
            >
              <Icons.Star filled={bookmarks.includes(surah.number)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranBrowser;
