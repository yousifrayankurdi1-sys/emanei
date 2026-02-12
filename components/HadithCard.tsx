
import React, { useState, useEffect } from 'react';
import { Hadith, Source, Comment, User } from '../types';
import { Icons } from '../constants';
import { fetchCommentsByTarget } from '../services/firebaseService';

interface HadithCardProps {
  hadith: Hadith;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  currentUser?: User | null;
  onNarratorClick?: (narrator: string) => void;
}

const HadithCard: React.FC<HadithCardProps> = ({ 
  hadith, 
  isFavorite, 
  onToggleFavorite, 
  currentUser,
  onNarratorClick
}) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, hadith.id]);

  const loadComments = async () => {
    setIsLoadingComments(true);
    const data = await fetchCommentsByTarget(hadith.id);
    setComments(data);
    setIsLoadingComments(false);
  };

  const getSourceStyle = (source: Source) => {
    switch (source) {
      case Source.BUKHARI: return 'bg-emerald-600 text-white shadow-emerald-100';
      case Source.MUSLIM: return 'bg-blue-600 text-white shadow-blue-100';
      case Source.AGREED: return 'bg-amber-600 text-white shadow-amber-100';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white border border-slate-100 hover:border-gold-200 transition-all group overflow-hidden animate-in fade-in duration-500 p-10 md:p-16 relative shadow-sm hover:shadow-2xl rounded-[3rem]">
      {/* Source Badge - Floating Style */}
      <div className={`absolute top-0 right-0 px-10 py-3 rounded-bl-[2rem] font-black text-xs uppercase tracking-[0.1em] shadow-lg z-10 ${getSourceStyle(hadith.source)}`}>
        {hadith.source}
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 font-black tracking-widest bg-slate-50 px-5 py-2 rounded-full border border-slate-100">رقم {hadith.number}</span>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`w-12 h-12 transition-all rounded-2xl border flex items-center justify-center shadow-sm ${
                showComments 
                ? 'text-primary-600 bg-primary-50 border-primary-200' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-primary-500'
              }`}
            >
              <Icons.Comment />
            </button>

            <button 
              onClick={() => onToggleFavorite(hadith.id)}
              className={`w-12 h-12 transition-all rounded-2xl border flex items-center justify-center shadow-sm ${
                isFavorite 
                ? 'text-red-500 bg-red-50 border-red-200' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-red-400'
              }`}
            >
              <Icons.Heart filled={isFavorite} />
            </button>
          </div>
        </div>

        {/* The Actual Text - Larger & More Centered */}
        <div className="relative py-4">
          <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3L10 3V15C10 18.3137 7.31371 21 4 21H3Z"/></svg>
          </div>
          <p className="hadith-text text-slate-950 text-4xl md:text-5xl text-center leading-[2] font-serif font-medium">
            {hadith.text}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 pt-10 border-t border-slate-50">
          <button 
            onClick={() => onNarratorClick?.(hadith.narrator)}
            className="flex items-center gap-5 group/narrator hover:bg-gold-50 px-8 py-4 rounded-3xl transition-all border border-transparent hover:border-gold-100"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl ${getSourceStyle(hadith.source)}`}>
              {hadith.narrator[0]}
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">عن الصحابي الجليل</span>
              <span className="text-xl text-slate-900 font-black group-hover/narrator:text-gold-600 transition-colors">{hadith.narrator}</span>
            </div>
          </button>
          
          <div className="flex gap-3">
            {hadith.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-black text-slate-400 px-5 py-2 bg-slate-50 rounded-xl border border-slate-100 hover:text-primary-600 hover:border-primary-100 cursor-default transition-all">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {showComments && (
          <div className="mt-10 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 animate-in slide-in-from-top-4">
            <h4 className="font-black text-slate-900 mb-8 flex items-center gap-4 text-xl">
               التعليقات والفوائد
               <div className="h-0.5 flex-grow bg-slate-200 rounded-full"></div>
            </h4>
            <div className="space-y-6">
              {isLoadingComments ? (
                <p className="text-center py-6 text-slate-300 animate-pulse font-bold">جاري تحميل الفوائد...</p>
              ) : comments.length === 0 ? (
                <p className="text-center py-6 text-slate-300 font-bold">لا توجد تعليقات بعد.</p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between mb-4">
                      <span className="font-black text-primary-800 text-sm">{c.userName}</span>
                      <span className="text-[10px] text-slate-300 font-black">{new Date(c.timestamp).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <p className="text-slate-700 font-bold text-base leading-relaxed">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithCard;
