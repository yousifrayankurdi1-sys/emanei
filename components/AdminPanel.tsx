
import React, { useState, useEffect } from 'react';
import { Hadith, Remembrance, Source, Category } from '../types';
import { Icons } from '../constants';
import { saveHadith, deleteHadithFromFirebase, saveRemembrance, deleteRemembranceFromFirebase } from '../services/firebaseService';

interface AdminPanelProps {
  hadiths: Hadith[];
  remembrances: Remembrance[];
  onRefresh: () => void;
  initialEdit?: {type: 'hadith' | 'remembrance', item: any} | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ hadiths, remembrances, onRefresh, initialEdit }) => {
  const [activeTab, setActiveTab] = useState<'hadiths' | 'remembrances'>('hadiths');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hadithForm, setHadithForm] = useState<Partial<Hadith>>({
    text: '', narrator: '', source: Source.BUKHARI, number: '', category: Category.GENERAL, tags: []
  });

  const [remForm, setRemForm] = useState<Partial<Remembrance>>({
    title: '', text: '', benefit: '', count: 1, source: '', category: 'morning_evening'
  });

  useEffect(() => {
    if (initialEdit) {
      if (initialEdit.type === 'hadith') {
        setActiveTab('hadiths');
        setHadithForm(initialEdit.item);
        setEditingId(initialEdit.item.id);
      } else {
        setActiveTab('remembrances');
        setRemForm(initialEdit.item);
        setEditingId(initialEdit.item.id);
      }
      setIsFormOpen(true);
    }
  }, [initialEdit]);

  const handleSaveHadith = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveHadith(hadithForm);
      setIsFormOpen(false);
      setEditingId(null);
      setHadithForm({ text: '', narrator: '', source: Source.BUKHARI, number: '', category: Category.GENERAL, tags: [] });
      onRefresh();
      alert('تم الحفظ بنجاح');
    } catch (err) {
      alert('خطأ في الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveRemembrance(remForm);
      setIsFormOpen(false);
      setEditingId(null);
      setRemForm({ title: '', text: '', benefit: '', count: 1, source: '', category: 'morning_evening' });
      onRefresh();
      alert('تم الحفظ بنجاح');
    } catch (err) {
      alert('خطأ في الحفظ');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      if (activeTab === 'hadiths') await deleteHadithFromFirebase(id);
      else await deleteRemembranceFromFirebase(id);
      onRefresh();
    } catch (err) {
      alert('خطأ في الحذف');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-4xl font-black text-slate-900">لوحة التحكم</h2>
        <button 
          onClick={() => { setIsFormOpen(true); setEditingId(null); }}
          className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
        >
          <Icons.Check />
          <span>إضافة جديد</span>
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button onClick={() => setActiveTab('hadiths')} className={`px-6 py-4 font-black text-lg ${activeTab === 'hadiths' ? 'text-primary-600 border-b-4 border-primary-600' : 'text-slate-400'}`}>الأحاديث</button>
        <button onClick={() => setActiveTab('remembrances')} className={`px-6 py-4 font-black text-lg ${activeTab === 'remembrances' ? 'text-primary-600 border-b-4 border-primary-600' : 'text-slate-400'}`}>الأذكار</button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-primary-100 shadow-xl animate-in slide-in-from-top duration-300">
          <h3 className="text-2xl font-black mb-6">{editingId ? 'تعديل' : 'إضافة'} {activeTab === 'hadiths' ? 'حديث' : 'ذكر'}</h3>
          
          {activeTab === 'hadiths' ? (
            <form onSubmit={handleSaveHadith} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-black mb-2">نص الحديث</label>
                <textarea required value={hadithForm.text} onChange={e => setHadithForm({...hadithForm, text: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl h-32 font-serif text-xl" />
              </div>
              <div><label className="block text-sm font-black mb-2">الراوي</label><input required value={hadithForm.narrator} onChange={e => setHadithForm({...hadithForm, narrator: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl" /></div>
              <div><label className="block text-sm font-black mb-2">الرقم</label><input required value={hadithForm.number} onChange={e => setHadithForm({...hadithForm, number: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl" /></div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 font-bold text-slate-500">إلغاء</button>
                <button type="submit" disabled={loading} className="px-10 py-3 bg-primary-600 text-white rounded-xl font-black">{loading ? 'جاري الحفظ...' : 'حفظ'}</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveRem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-black mb-2">العنوان</label><input required value={remForm.title} onChange={e => setRemForm({...remForm, title: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-black mb-2">النص</label><textarea required value={remForm.text} onChange={e => setRemForm({...remForm, text: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl h-24" /></div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 font-bold text-slate-500">إلغاء</button>
                <button type="submit" disabled={loading} className="px-10 py-3 bg-primary-600 text-white rounded-xl font-black">حفظ</button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {activeTab === 'hadiths' ? hadiths.map(h => (
          <div key={h.id} className="bg-white p-6 rounded-2xl border flex justify-between items-center group">
            <div className="flex-1"><p className="font-serif text-lg text-slate-700 truncate ml-4">{h.text}</p><span className="text-xs font-bold text-slate-400">{h.source} - رقم {h.number}</span></div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => { setHadithForm(h); setIsFormOpen(true); setEditingId(h.id); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Icons.Refresh /></button>
               <button onClick={() => deleteItem(h.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Icons.Heart filled /></button>
            </div>
          </div>
        )) : remembrances.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border flex justify-between items-center group">
            <div className="flex-1"><p className="font-bold text-slate-900">{r.title}</p></div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => { setRemForm(r); setIsFormOpen(true); setEditingId(r.id); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Icons.Refresh /></button>
               <button onClick={() => deleteItem(r.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Icons.Heart filled /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
