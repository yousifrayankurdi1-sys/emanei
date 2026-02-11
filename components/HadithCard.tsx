
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
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        targetId: hadith.id,
        userName: currentUser.name,
        text: newComment.trim(),
        timestamp: Date.now()
      };
      await addCommentToFirebase(commentData);
      setNewComment('');
      loadComments();
    } catch (err) {
      alert("حدث خطأ أثناء إضافة التعليق");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("هل تريد حذف هذا التعليق؟")) return;
    try {
      await deleteCommentFromFirebase(commentId);
      loadComments();
    } catch (err) {
      alert("فشل حذف التعليق");
    }
  };

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
        {/* Header */}
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
              onClick={() => setShowComments(!showComments)}
              className={`p-2 transition-all rounded-lg border shadow-sm flex items-center gap-1.5 ${
                showComments 
                ? 'text-primary-600 bg-primary-50 border-primary-100' 
                : 'text-slate-300 bg-white border-slate-100 hover:text-primary-500'
              }`}
            >
              <Icons.Comment />
              {comments.length > 0 && <span className="text-[10px] font-black">{comments.length}</span>}
            </button>

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

        {/* Text Area */}
        <div className="pr-4 border-r-4 border-primary-500/20">
          <p className="hadith-text text-slate-900 text-2xl md:text-3xl text-justify leading-[1.8] font-serif">
            {hadith.text}
          </p>
        </div>

        {/* Metadata */}
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

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               خانة التعليقات
               <div className="h-px bg-slate-100 flex-grow"></div>
            </h4>

            <div className="space-y-3 mb-6">
              {isLoadingComments ? (
                <div className="text-center py-4 text-slate-300 text-xs font-bold animate-pulse">جاري تحميل التعليقات...</div>
              ) : comments.length === 0 ? (
                <div className="text-center py-4 text-slate-300 text-xs font-bold">لا توجد تعليقات بعد، كن أول من يشارك.</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 group/comment">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-black shrink-0">
                      {comment.userName[0]}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black text-slate-900">{comment.userName}</span>
                        <span className="text-[8px] text-slate-300">{new Date(comment.timestamp).toLocaleDateString('ar-SA')}</span>
                        {(currentUser?.isAdmin || currentUser?.name === comment.userName) && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-[8px] text-red-300 hover:text-red-500 font-bold opacity-0 group-hover/comment:opacity-100 transition-opacity"
                          >
                            حذف
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl rounded-tr-none inline-block">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {currentUser ? (
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب خواطرك حول هذا الحديث..."
                  className="flex-grow h-10 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-bold"
                />
                <button 
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-4 h-10 bg-primary-600 text-white rounded-xl text-xs font-black disabled:opacity-30 transition-all active:scale-95"
                >
                  نشر
                </button>
              </form>
            ) : (
              <div className="text-center py-2 bg-slate-50 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold">يرجى تسجيل الدخول لتتمكن من إضافة تعليق</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithCard;
