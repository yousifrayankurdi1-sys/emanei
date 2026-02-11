
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
  initialSurahNumber?: number | null;
}

const SurahReader: React.FC<{ 
  surah: Surah; 
  onBack: () => void; 
  isBookmarked: boolean;
  onToggleBookmark: (num: number) => void;
}> = ({ surah, onBack, isBookmarked, onToggleBookmark }) => {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSurahData = async () => {
      if (!surah) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
        if (!response.ok) throw new Error('فشل الاتصال بخادم القرآن');
        const data = await response.json();
        
        if (isMounted) {
          if (data && data.code === 200 && data.data && data.data.ayahs) {
            setAyahs(data.data.ayahs);
          } else {
            setError('تعذر العثور على بيانات هذه السورة.');
          }
        }
      } catch (err) {
        if (isMounted) setError('حدث خطأ أثناء تحميل السورة. يرجى التأكد من اتصال الإنترنت.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSurahData();
    return () => { isMounted = false; };
  }, [surah.number]);

  const getCleanedText = (ayah: Ayah) => {
    if (surah.number === 1 || surah.number === 9) return ayah.text;
    if (ayah.numberInSurah === 1) {
      const bismillahStandard = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      const bismillahSimple = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      let cleaned = ayah.text;
      if (cleaned.startsWith(bismillahStandard)) {
        cleaned = cleaned.replace(bismillahStandard, "").trim();
      } else if (cleaned.startsWith(bismillahSimple)) {
        cleaned = cleaned.replace(bismillahSimple, "").trim();
      }
      return cleaned;
    }
    return ayah.text;
  };

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
          <p className="text-red-600 font-bold mb-4">{error}</p>
          <button onClick={onBack} className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold">العودة للسور</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary-700 font-bold hover:opacity-70 transition-opacity bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-50"
        >
          <span>← عودة لقائمة السور</span>
        </button>
        <button 
          onClick={() => onToggleBookmark(surah.number)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm border ${
            isBookmarked ? 'bg-gold-50 text-gold-600 border-gold-200' : 'bg-white text-slate-400 border-slate-100'
          }`}
        >
          <Icons.Star filled={isBookmarked} />
          <span>{isBookmarked ? 'مضافة للحفظ' : 'اضافتها للحفظ'}</span>
        </button>
      </div>

      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-6 leading-tight">سورة {surah.name}</h2>
          <div className="flex justify-center items-center gap-4 text-slate-400 font-bold text-sm tracking-widest uppercase bg-slate-50 w-fit mx-auto px-6 py-2 rounded-full">
            <span className={surah.revelationType === 'Meccan' ? 'text-amber-600' : 'text-emerald-600'}>
              {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
            </span>
            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
            <span>{surah.numberOfAyahs} آية</span>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-14 h-14 border-[5px] border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-slate-400 font-black text-xl">جاري تحميل آيات الذكر الحكيم...</p>
          </div>
        ) : (
          <div className="quran-reader-container">
            {surah.number !== 1 && surah.number !== 9 && (
              <div className="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            )}
            <div className="quran-text text-3xl md:text-5xl text-slate-800 text-center leading-[2.5] select-none">
              {ayahs.map((ayah) => {
                const text = getCleanedText(ayah);
                if (!text && ayah.numberInSurah === 1) return null;
                return (
                  <span key={ayah.number} className="inline group hover:bg-primary-50/40 transition-colors rounded-xl px-1">
                    <span>{text}</span>
                    <span className="ayah-number">{ayah.numberInSurah}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuranBrowser: React.FC<QuranBrowserProps> = ({ bookmarks, onToggleBookmark, initialSurahNumber }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  // معالجة الانتقال المباشر من المفضلة
  useEffect(() => {
    if (initialSurahNumber) {
      const surah = SURAHS.find(s => s.number === initialSurahNumber);
      if (surah) setSelectedSurah(surah);
    }
  }, [initialSurahNumber]);

  const filteredSurahs = (SURAHS || []).filter(s => {
    const matchesSearch = s && s.name && s.name.includes(searchTerm);
    const matchesFilter = filterType === 'all' || s.revelationType === filterType;
    return matchesSearch && matchesFilter;
  });

  if (selectedSurah) {
    return (
      <SurahReader 
        surah={selectedSurah} 
        onBack={() => setSelectedSurah(null)} 
        isBookmarked={bookmarks.includes(selectedSurah.number)}
        onToggleBookmark={onToggleBookmark}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900">القرآن الكريم</h2>
        
        <div className="max-w-xl mx-auto space-y-8">
          <div className="relative px-4">
            <input 
              type="text" 
              placeholder="ابحث عن سورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 px-8 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-lg text-center"
            />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300">
              <Icons.Search />
            </div>
          </div>

          {/* أزرار الفلترة - تم تكبيرها وتغيير المسميات بناءً على الطلب */}
          <div className="flex justify-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm w-fit mx-auto">
            {[
              { id: 'all', label: 'جميع السور' },
              { id: 'Meccan', label: 'سور مكية' },
              { id: 'Medinan', label: 'سور مدنية' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={`px-8 py-3.5 rounded-2xl font-black text-base transition-all ${
                  filterType === type.id 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {filteredSurahs.map((surah) => {
          const isBookmarked = bookmarks.includes(surah.number);
          return (
            <div key={surah.number} className="group relative">
              <button
                onClick={() => setSelectedSurah(surah)}
                className="w-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-right overflow-hidden"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 font-black group-hover:bg-primary-600 group-hover:text-white transition-all shadow-inner">
                    {surah.number}
                  </span>
                  <Icons.Book />
                </div>
                <h3 className="text-2xl font-serif font-black text-slate-800 group-hover:text-primary-700 transition-colors">سورة {surah.name}</h3>
                
                <div className="flex items-center gap-3 mt-4">
                   <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                     surah.revelationType === 'Meccan' 
                     ? 'bg-amber-50 text-amber-700 border-amber-100' 
                     : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                   }`}>
                     {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                   </span>
                   <span className="text-slate-300 text-[10px] font-bold">{surah.numberOfAyahs} آية</span>
                </div>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(surah.number);
                }}
                className={`absolute top-6 left-6 p-2 rounded-xl transition-all z-10 ${
                  isBookmarked ? 'text-gold-500 bg-gold-50' : 'text-slate-200 hover:text-gold-400'
                }`}
              >
                <Icons.Star filled={isBookmarked} />
              </button>
            </div>
          );
        })}
      </div>
      
      {filteredSurahs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold text-xl">لم يتم العثور على سور تطابق بحثك.</p>
        </div>
      )}
    </div>
  );
};

export default QuranBrowser;
