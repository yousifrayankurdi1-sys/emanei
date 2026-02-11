
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Icons } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const TAKEN_NAMES = ['يوسف', 'أحمد', 'محمد', 'سارة', 'عبدالله', 'عمر'];

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = (baseName: string) => {
    const s1 = `${baseName} ${Math.floor(Math.random() * 99 + 1)}`;
    const s2 = `${baseName} ${Math.floor(Math.random() * 999 + 100)}`;
    const s3 = `${baseName} الموحد`;
    setSuggestions([s1, s2, s3]);
  };

  useEffect(() => {
    if (name.trim()) {
      if (TAKEN_NAMES.includes(name.trim())) {
        setError('عذراً، هذا الاسم مأخوذ مسبقاً');
        generateSuggestions(name.trim());
      } else {
        setError(null);
        setSuggestions([]);
      }
    } else {
      setError(null);
      setSuggestions([]);
    }
  }, [name]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !TAKEN_NAMES.includes(name.trim())) {
      onLogin({
        name: name.trim(),
        isLoggedIn: true
      });
      onClose();
    }
  };

  const selectSuggestion = (s: string) => {
    setName(s);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        <div className="gradient-bg p-10 text-center text-white relative">
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-white/40 backdrop-blur-md shadow-lg">
            <span className="text-4xl font-serif font-black">ا</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-md">تسجيل دخول</h2>
          <p className="text-emerald-50 text-base mt-3 font-medium opacity-100">مرحباً بك في ايمان، أدخل اسمك للبدء</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white">
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-800 mr-1 block">الاسم الكريم</label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: يوسف"
              className={`w-full h-14 px-6 rounded-2xl border-2 transition-all text-xl font-bold placeholder:text-slate-400 ${
                error 
                ? 'bg-red-50 border-red-200 text-red-900 focus:border-red-500' 
                : 'bg-slate-50 border-slate-100 focus:border-primary-500 focus:bg-white text-slate-900'
              }`}
            />
            
            {error && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <p className="text-red-600 text-sm font-black mb-3">{error}</p>
                <div className="space-y-2">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">اقتراحات متوفرة:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectSuggestion(s)}
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm font-black hover:bg-emerald-100 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 space-y-4">
            <button
              type="submit"
              disabled={!!error || !name.trim()}
              className={`w-full h-14 text-white text-xl font-black rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                !!error || !name.trim() 
                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-primary-600 hover:bg-primary-700 shadow-primary-200'
              }`}
            >
              <Icons.Check />
              <span>تسجيل دخول</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-all border border-slate-100"
            >
              إلغاء
            </button>
          </div>
        </form>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-sm text-slate-600 font-bold">سيتم حفظ حسابك تلقائياً للزيارات القادمة</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;