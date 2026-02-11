
import React from 'react';
import { Hadith, Source } from '../types';
import { Icons } from '../constants';

interface HadithCardProps {
  hadith: Hadith;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

const HadithCard: React.FC<HadithCardProps> = ({ hadith, isFavorite, onToggleFavorite, onEdit, showEdit }) => {
  const getSourceColor = (source: Source) => {
    switch (source) {
      case Source.BUKHARI: return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case Source.MUSLIM: return 'text-blue-700 bg-blue-50 border-blue-100';
      case Source.AGREED: return 'text-amber-700 bg-amber-50 border-amber-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-colors group overflow-hidden animate-in fade-in duration-300">
      <div className="p-6 md:p-10 flex flex-col gap-5">
        {/* Header - Very Clean */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${getSourceColor(hadith.source)}`}>
              {hadith.source}
            </span>
            <span className="text-[10px] text-slate-300 font-bold tracking-widest">حديث رقم {hadith.number}</span>
          </div>
          <div className="flex gap-2">
            {showEdit && onEdit && (
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-2 text-slate-300 hover:text-blue-500 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm"
              >
                <Icons.Refresh />
              </button>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(hadith.id); }}
              className={`p-2 transition-all rounded-lg border shadow-sm ${
                isFavorite 
                ? 'text-red-500 bg-red-50 border-red-100' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-red-400'
              }`}
            >
              <Icons.Heart filled={isFavorite} />
            </button>
          </div>
        </div>

        {/* Text Area - Focus on Typography */}
        <div className="pr-4 border-r-4 border-primary-500/20">
          <p className="hadith-text text-slate-900 text-2xl md:text-3xl text-justify leading-[1.8] font-serif">
            {hadith.text}
          </p>
        </div>

        {/* Footer Area - Metadata */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black text-xs">ر</div>
            <span className="text-sm text-slate-500 font-bold">عن {hadith.narrator}</span>
          </div>
          <div className="flex gap-1.5">
            {hadith.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-black text-slate-400 px-3 py-1 bg-slate-100/50 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithCard;
