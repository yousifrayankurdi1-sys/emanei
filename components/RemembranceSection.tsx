
import React, { useState, useEffect } from 'react';
import { AUTHENTIC_REMEMBRANCES, Icons } from '../constants';
import { Remembrance } from '../types';

interface RemembranceCardProps {
  item: Remembrance;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const RemembranceCard: React.FC<RemembranceCardProps> = ({ item, isFavorite, onToggleFavorite }) => {
  const [currentCount, setCurrentCount] = useState(0);

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCount(0);
  };

  const increment = () => {
    if (currentCount < item.count) {
      setCurrentCount(prev => prev + 1);
    }
  };

  return (
    <div 
      onClick={increment}
      className={`bg-white p-6 md:p-8 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group ${
        currentCount === item.count 
        ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100' 
        : 'border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200'
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-slate-900 mb-1">{item.title}</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.source}</span>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`p-2 rounded-xl transition-all ${
              isFavorite 
              ? 'bg-red-50 text-red-500' 
              : 'bg-slate-50 text-slate-300 hover:text-red-500'
            }`}
          >
            <Icons.Heart filled={isFavorite} />
          </button>
           <button 
            onClick={reset}
            className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-red-500 transition-colors"
            title="إعادة التكرار"
          >
            <Icons.Refresh />
          </button>
        </div>
      </div>

      <p className="hadith-text text-2xl md:text-3xl text-slate-800 text-justify mb-8 leading-[1.8]">
        {item.text}
      </p>

      {item.benefit && (
        <div className="bg-primary-50/50 p-4 rounded-2xl mb-8 border border-primary-100/50">
          <p className="text-sm text-primary-800 font-medium leading-relaxed italic">
            <span className="font-black ml-1">الفضل:</span>
            {item.benefit}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500">
            {item.count}
          </div>
          <span className="text-xs font-bold text-slate-400">مرات التكرار</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={175.92}
                strokeDashoffset={175.92 - (175.92 * (currentCount / item.count))}
                className="text-emerald-500 transition-all duration-300"
              />
            </svg>
            <span className="absolute text-xl font-black text-slate-800">{currentCount}</span>
          </div>
        </div>
      </div>

      {currentCount === item.count && (
        <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-[1px] pointer-events-none flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-emerald-500 text-white p-3 rounded-full shadow-lg">
             <Icons.Check />
          </div>
        </div>
      )}
    </div>
  );
};

interface RemembranceSectionProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialTab?: 'morning_evening' | 'prayer' | 'general_dua' | null;
}

const RemembranceSection: React.FC<RemembranceSectionProps> = ({ favorites, onToggleFavorite, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'morning_evening' | 'prayer' | 'general_dua'>('morning_evening');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const filteredItems = AUTHENTIC_REMEMBRANCES.filter(item => item.category === activeTab);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-bottom duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">الأذكار والأدعية الصحيحة</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">مجموعة منتقاة من الأذكار النبوية الثابتة في الصحيحين، لتكون عوناً لك في يومك وصلاتك.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
        {[
          { id: 'morning_evening', label: 'أذكار الصباح والمساء', icon: <Icons.Sun /> },
          { id: 'prayer', label: 'أدعية الصلاة', icon: <Icons.Star /> },
          { id: 'general_dua', label: 'أدعية نبوية عامة', icon: <Icons.Book /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredItems.map(item => (
          <RemembranceCard 
            key={item.id} 
            item={item} 
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] text-center">
        <p className="text-amber-800 font-bold text-sm">ملاحظة: جميع الأذكار والأدعية هنا تم التحقق من صحتها من البخاري ومسلم حصراً.</p>
      </div>
    </div>
  );
};

export default RemembranceSection;
