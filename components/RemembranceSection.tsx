
import React, { useState, useEffect } from 'react';
import { AUTHENTIC_REMEMBRANCES, Icons } from '../constants';
import { Remembrance } from '../types';

interface RemembranceCardProps {
  item: Remembrance;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

const RemembranceCard: React.FC<RemembranceCardProps> = ({ item, isFavorite, onToggleFavorite, onEdit, showEdit }) => {
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
        currentCount === item.count && item.count > 1
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
           {showEdit && onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
              title="تعديل"
            >
              <Icons.Refresh />
            </button>
           )}
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
           {item.count > 1 && (
             <button 
              onClick={reset}
              className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-red-500 transition-colors"
              title="إعادة التكرار"
            >
              <Icons.Refresh />
            </button>
           )}
        </div>
      </div>

      <p className="hadith-text text-2xl md:text-3xl text-slate-800 text-justify mb-8 leading-[1.8] font-serif">
        {item.text}
      </p>

      {item.benefit && (
        <div className="mb-6 p-4 bg-primary-50 rounded-2xl border border-primary-100">
          <p className="text-xs font-bold text-primary-700 leading-relaxed">
             <span className="font-black">الفضل:</span> {item.benefit}
          </p>
        </div>
      )}

      {item.count > 1 && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all ${currentCount === item.count ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}>
              {currentCount} / {item.count}
            </div>
            <span className="text-xs font-black text-slate-400">تكرار الذكر</span>
          </div>
          {currentCount === item.count && (
            <div className="animate-bounce text-emerald-500">
               <Icons.Check />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface RemembranceSectionProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialTab?: 'morning_evening' | 'prayer' | 'general_dua' | null;
  onEdit?: (r: Remembrance) => void;
  showEdit?: boolean;
}

const RemembranceSection: React.FC<RemembranceSectionProps> = ({ favorites, onToggleFavorite, initialTab, onEdit, showEdit }) => {
  const [activeTab, setActiveTab] = useState<'morning_evening' | 'prayer' | 'general_dua'>('morning_evening');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
        {[
          { id: 'morning_evening', label: 'الصباح والمساء', icon: <Icons.Sun /> },
          { id: 'prayer', label: 'أدعية الصلاة', icon: <Icons.Star /> },
          { id: 'general_dua', label: 'أدعية نبوية', icon: <Icons.Book /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {AUTHENTIC_REMEMBRANCES.filter(item => item.category === activeTab).map(item => (
          <RemembranceCard 
            key={item.id} 
            item={item} 
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
            onEdit={() => onEdit?.(item)}
            showEdit={showEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default RemembranceSection;
