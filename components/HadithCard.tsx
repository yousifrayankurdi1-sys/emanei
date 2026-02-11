
import React from 'react';
import { Hadith, Source } from '../types';
import { Icons } from '../constants';

interface HadithCardProps {
  hadith: Hadith;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const HadithCard: React.FC<HadithCardProps> = ({ hadith, isFavorite, onToggleFavorite }) => {
  const getSourceColor = (source: Source) => {
    switch (source) {
      case Source.BUKHARI: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case Source.MUSLIM: return 'bg-blue-100 text-blue-800 border-blue-200';
      case Source.AGREED: return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-wrap gap-2">
          <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${getSourceColor(hadith.source)}`}>
            {hadith.source}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-xs font-bold border border-slate-200">
            رقم: {hadith.number}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-black border border-primary-100 flex items-center gap-1">
            <Icons.Check />
            صحيح
          </span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onToggleFavorite(hadith.id)}
            className={`p-2.5 rounded-xl transition-all ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Icons.Heart filled={isFavorite} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="hadith-text text-slate-800 text-2xl md:text-3xl text-justify leading-[1.8] font-serif">
          {hadith.text}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 border-t border-slate-50 pt-6">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold mb-1">الراوي:</span>
          <span className="text-lg text-slate-700 font-black">{hadith.narrator}</span>
        </div>
        <div className="flex gap-2">
          {hadith.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-3 py-1 bg-slate-50 text-slate-500 rounded-lg font-bold border border-slate-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HadithCard;
