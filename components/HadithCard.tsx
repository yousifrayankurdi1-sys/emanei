
import React, { useState, useEffect } from 'react';
import { Hadith, Source, Comment, User } from '../types';
import { Icons } from '../constants';
import { fetchCommentsByTarget, addCommentToFirebase, deleteCommentFromFirebase } from '../services/firebaseService';

interface HadithCardProps {
  hadith: Hadith;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit?: () => void;
  showEdit?: boolean;
  currentUser?: User | null;
}

const HadithCard: React.FC<HadithCardProps> = ({ 
  hadith, 
  isFavorite, 
  onToggleFavorite, 
  onEdit, 
  showEdit,
  currentUser 
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
      case Source.AGREED: return 'bg-amber-500 text-white shadow-amber-100';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white border border-slate-100 hover:border-primary-200 transition-all group overflow-hidden animate-in fade-in duration-300 p-8 md:p-12 relative">
      {/* Source Badge */}
      <div className={`absolute top-0 right-0 px-8 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-widest shadow-lg ${getSourceStyle(hadith.source)}`}>
        {hadith.source}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-300 font-bold tracking-widest bg-slate-50 px-4 py-1 rounded-full">حديث رقم {hadith.number}</span>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`p-3 transition-all rounded-2xl border shadow-sm flex items-center gap-2 ${
                showComments 
                ? 'text-primary-600 bg-primary-50 border-primary-200' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-primary-500'
              }`}
            >
              <Icons.Comment />
              {comments.length > 0 && <span className="text-xs font-black">{comments.length}</span>}
            </button>

            <button 
              onClick={() => onToggleFavorite(hadith.id)}
              className={`p-3 transition-all rounded-2xl border shadow-sm ${
                isFavorite 
                ? 'text-red-500 bg-red-50 border-red-200' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-red-400'
              }`}
            >
              <Icons.Heart filled={isFavorite} />
            </button>
          </div>
        </div>

        <div className="pr-6 border-r-8 border-primary-500/20 py-2">
          <p className="hadith-text text-slate-900 text-3xl md:text-4xl text-justify leading-[1.8] font-serif">
            {hadith.text}
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-6 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner ${getSourceStyle(hadith.source)}`}>
              {hadith.narrator[0]}
            </div>
            <div>
              <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter block mb-0.5">الصحابي الراوي</span>
              <span className="text-lg text-slate-700 font-black">عن {hadith.narrator}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {hadith.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-black text-primary-600 px-4 py-1.5 bg-primary-50 rounded-xl border border-primary-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {showComments && (
          <div className="mt-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 animate-in slide-in-from-top-4">
            <h4 className="font-black text-slate-900 mb-6 flex items-center gap-3">
               التعليقات والخواطر
               <div className="h-1 bg-primary-500 w-12 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              {isLoadingComments ? (
                <p className="text-center py-4 text-slate-300 animate-pulse font-bold">جاري تحميل التعليقات...</p>
              ) : comments.length === 0 ? (
                <p className="text-center py-4 text-slate-300 font-bold">لا توجد تعليقات بعد.</p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
                    <div className="flex justify-between mb-2">
                      <span className="font-black text-slate-800 text-sm">{c.userName}</span>
                      <span className="text-[10px] text-slate-300 font-bold">{new Date(c.timestamp).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">{c.text}</p>
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
