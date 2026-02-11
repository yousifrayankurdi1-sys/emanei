
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Icons } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  isAdminModeInitially?: boolean;
}

const TAKEN_NAMES = ['يوسف', 'أحمد', 'محمد', 'سارة', 'عبدالله', 'عمر'];
const ADMIN_SECRET = "2013"; 

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, isAdminModeInitially = false }) => {
  const [name, setName] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminField, setShowAdminField] = useState(isAdminModeInitially);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShowAdminField(isAdminModeInitially);
      setError(null);
    }
  }, [isOpen, isAdminModeInitially]);

  useEffect(() => {
    if (name.trim() && !showAdminField) {
      if (TAKEN_NAMES.includes(name.trim())) {
        setError('عذراً، هذا الاسم مأخوذ مسبقاً');
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
  }, [name, showAdminField]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showAdminField) {
      if (adminCode === ADMIN_SECRET) {
        onLogin({
          name: name.trim() || "المشرف",
          isLoggedIn: true,
          isAdmin: true
        });
        onClose();
        setAdminCode('');
      } else {
        setError("الرمز السري غير صحيح");
      }
      return;
    }

    if (name.trim() && !TAKEN_NAMES.includes(name.trim())) {
      onLogin({
        name: name.trim(),
        isLoggedIn: true,
        isAdmin: false
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        <div className="gradient-bg p-10 text-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-9 h-9 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors text-white font-bold"
          >
            ✕
          </button>
          <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-white/40 backdrop-blur-md shadow-inner">
            <span className="text-4xl font-serif font-black">ا</span>
          </div>
          <h2 className="text-3xl font-black">{showAdminField ? 'دخول المشرف' : 'تسجيل دخول'}</h2>
          <p className="text-emerald-50 text-sm mt-2 opacity-90 font-bold">
            {showAdminField ? 'أهلاً يوسف، يرجى تأكيد الهوية' : 'أهلاً بك في منصة ايمان'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-black text-slate-900 block mb-2 px-1">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب اسمك بوضوح..."
                className="w-full h-16 px-6 rounded-2xl bg-white border-2 border-slate-300 text-slate-950 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all font-black text-xl placeholder:text-slate-300 shadow-sm"
                autoFocus
              />
            </div>

            {showAdminField && (
              <div className="animate-in slide-in-from-top duration-300">
                <label className="text-sm font-black text-slate-900 block mb-2 px-1">رمز المشرف الخاص (سيظهر بوضوح)</label>
                <input
                  type="text"
                  required
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="أدخل الرمز هنا"
                  className="w-full h-16 px-6 rounded-2xl bg-white border-2 border-primary-300 text-slate-950 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all font-black text-center tracking-[0.3em] text-2xl placeholder:text-slate-200 placeholder:tracking-normal shadow-sm"
                />
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-black text-center border border-red-100 animate-pulse">
                {error}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-16 bg-primary-600 hover:bg-primary-700 text-white text-xl font-black rounded-2xl shadow-xl shadow-primary-500/30 transition-all active:scale-95"
            >
              {showAdminField ? 'تأكيد ودخول' : 'تسجيل دخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
