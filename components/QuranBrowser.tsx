
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
        if (data.code === 200 && data.data) {
          setAyahs(data.data.ayahs);
        } else {
          setError('فشل في تحميل نص السورة.');
        }
      } catch (err) {
        setError('حدث خطأ في الاتصال بالخادم.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurahData();
  }, [surah.number]);

  // دالة لتنظيف نص الآية الأولى من البسملة المدمجة
  const cleanAyahText = (text: string, index: number) => {
    // استثناء سورة الفاتحة (1) والتوبة (9)
    if (surah.number === 1 || surah.number === 9) return text;
    
    if (index === 0) {
      // إزالة البسملة من بداية الآية الأولى
      const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      const bismillahAlt = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      
      let cleaned = text;
      if (cleaned.startsWith(bismillah)) {
        cleaned = cleaned.replace(bismillah, "").trim();
      } else if (cleaned.startsWith(bismillahAlt)) {
        cleaned = cleaned.replace(bismillahAlt, "").trim();
      }
      return cleaned;
    }
    return text;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary-700 font-bold mb-8 hover:opacity-70 transition-opacity bg-white px-6 py-2 rounded-full shadow-sm"
      >
        <span>← عودة للسور</span>
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif font-black text-slate-900 mb-4">سورة {surah.name}</h2>
          <div className="text-slate-400 font-bold text-sm tracking-widest uppercase">
            {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.numberOfAyahs} آية
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-bold">جاري تحميل الآيات...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500 font-bold">{error}</div>
        ) : (
          <div className="quran-container">
            {/* البسملة كعنوان جمالي */}
            {surah.number !== 1 && surah.number !== 9 && (
              <div className="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            )}

            <div className="quran-text text-3xl md:text-5xl text-slate-800 text-center">
              {ayahs.map((ayah, index) => {
                const text = cleanAyahText(ayah.text, index);
                if (!text && index === 0 && surah.number !== 1) return null;

                return (
                  <span key={ayah.number} className="inline group">
                    <span className="hover:text-primary-600 transition-colors">{text}</span>
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

const QuranBrowser: React.FC<QuranBrowserProps> = ({ bookmarks, onToggleBookmark }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurahs = SURAHS.filter(s => s.name.includes(searchTerm));

  if (selectedSurah) {
    return <SurahReader surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-5xl font-black text-slate-900 mb-4">القرآن الكريم</h2>
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="ابحث عن سورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary-500/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => setSelectedSurah(surah)}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-right group relative"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 font-black group-hover:bg-primary-600 group-hover:text-white transition-all">
                {surah.number}
              </span>
              <Icons.Book />
            </div>
            <h3 className="text-2xl font-serif font-black text-slate-800">سورة {surah.name}</h3>
            <p className="text-slate-400 text-sm mt-1 font-bold">{surah.numberOfAyahs} آية</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuranBrowser;
