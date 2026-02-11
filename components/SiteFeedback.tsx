
import React, { useState, useEffect } from 'react';
import { User, Comment } from '../types';
import { Icons } from '../constants';
import { fetchCommentsByTarget, addCommentToFirebase, deleteCommentFromFirebase } from '../services/firebaseService';

interface SiteFeedbackProps {
  currentUser: User | null;
  onOpenAuth: () => void;
}

const SITE_FEEDBACK_ID = "site_general_feedback";

const SiteFeedback: React.FC<SiteFeedbackProps> = ({ currentUser, onOpenAuth }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    setIsLoading(true);
    const data = await fetchCommentsByTarget(SITE_FEEDBACK_ID);
    setComments(data.reverse()); // عرض الأحدث أولاً
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.trim() || !currentUser || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addCommentToFirebase({
        targetId: SITE_FEEDBACK_ID,
        userName: currentUser.name,
        text: newFeedback.trim(),
        timestamp: Date.now()
      });
      setNewFeedback('');
      loadFeedback();
    } catch (err) {
      alert("عذراً، حدث خطأ أثناء إرسال رأيك.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل تريد حذف هذا الرأي؟")) return;
    await deleteCommentFromFirebase(id);
    loadFeedback();
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">آراء زوار "ايمان"</h2>
        <p className="text-slate-500 font-bold max-w-2xl mx-auto">
          نسعد بسماع آرائكم ومقترحاتكم لتطوير هذه المنصة المباركة. رأيك يهمنا لنرتقي معاً.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 border-b-4 border-b-primary-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-gold-500"></div>
        
        {currentUser ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
               <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-black text-xl">
                 {currentUser.name[0]}
               </div>
               <div>
                 <span className="block font-black text-slate-900">مرحباً بك يا {currentUser.name}</span>
                 <span className="text-xs text-slate-400 font-bold">شاركنا رأيك أو انطباعك عن الموقع</span>
               </div>
            </div>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="اكتب هنا رأيك، اقتراحك، أو دعوة صالحة..."
              className="w-full p-6 rounded-[1.5rem] bg-slate-50 border-2 border-slate-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 transition-all min-h-[150px] font-bold text-lg text-slate-800"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newFeedback.trim() || isSubmitting}
                className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-30 flex items-center gap-3"
              >
                {isSubmitting ? 'جاري النشر...' : 'نشر رأيك'}
                <Icons.Check />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
               <Icons.Comment />
            </div>
            <p className="text-slate-500 font-black text-xl">يجب تسجيل الدخول لتتمكن من إضافة رأيك</p>
            <button 
              onClick={onOpenAuth}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-black hover:bg-primary-700 transition-all"
            >
              تسجيل دخول سريع
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center animate-pulse">
            <p className="text-slate-300 font-black">جاري تحميل آراء الزوار...</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center text-gold-600 font-black">
                    {c.userName[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{c.userName}</h4>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                      {new Date(c.timestamp).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
                {(currentUser?.isAdmin || currentUser?.name === c.userName) && (
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-slate-200 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="text-slate-600 font-bold leading-relaxed pr-4 border-r-2 border-gold-100">
                "{c.text}"
              </p>
              <div className="absolute bottom-6 left-8 opacity-5">
                 <Icons.Comment />
              </div>
            </div>
          ))
        )}
        
        {!isLoading && comments.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
             <p className="text-slate-300 font-black text-xl">لا توجد آراء بعد. كن أول من يشاركنا انطباعه!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteFeedback;
