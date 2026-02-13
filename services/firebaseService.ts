
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db, firebaseReady } from "../firebase";
import { Hadith, Remembrance, Comment } from "../types";

// --- نظام تخزين احتياطي (LocalStorage) للعرض التجريبي ---
const getLocalData = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
const saveLocalData = (key: string, data: any[]) => localStorage.setItem(key, JSON.stringify(data));

// --- عمليات الأحاديث ---

export const fetchHadithsFromFirebase = async (): Promise<Hadith[]> => {
  if (!firebaseReady || !db) return getLocalData('hadiths');
  try {
    const querySnapshot = await getDocs(collection(db, "hadiths"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Hadith));
  } catch (error) {
    return getLocalData('hadiths');
  }
};

export const saveHadith = async (hadith: Partial<Hadith>) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('hadiths');
    const newId = hadith.id || `local_${Date.now()}`;
    const newItem = { ...hadith, id: newId };
    const index = data.findIndex((h: any) => h.id === hadith.id);
    if (index > -1) data[index] = newItem;
    else data.push(newItem);
    saveLocalData('hadiths', data);
    return;
  }
  try {
    if (hadith.id) {
      const docRef = doc(db, "hadiths", hadith.id);
      await updateDoc(docRef, hadith);
    } else {
      await addDoc(collection(db, "hadiths"), hadith);
    }
  } catch (error) {
    console.error("Error saving hadith:", error);
    throw error;
  }
};

// Add deleteHadithFromFirebase to resolve reference error in AdminPanel.tsx
export const deleteHadithFromFirebase = async (id: string) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('hadiths');
    saveLocalData('hadiths', data.filter((h: any) => h.id !== id));
    return;
  }
  try {
    await deleteDoc(doc(db, "hadiths", id));
  } catch (error) {
    console.error("Error deleting hadith:", error);
    throw error;
  }
};

// --- عمليات التعليقات والآراء ---

export const fetchCommentsByTarget = async (targetId: string): Promise<Comment[]> => {
  if (!firebaseReady || !db) {
    const all = getLocalData('comments');
    return all.filter((c: any) => c.targetId === targetId).sort((a: any, b: any) => a.timestamp - b.timestamp);
  }
  try {
    const q = query(
      collection(db, "comments"), 
      where("targetId", "==", targetId),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Comment));
  } catch (error) {
    const all = getLocalData('comments');
    return all.filter((c: any) => c.targetId === targetId);
  }
};

export const addCommentToFirebase = async (comment: Omit<Comment, 'id'>) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('comments');
    const newId = `comm_${Date.now()}`;
    const newItem = { ...comment, id: newId };
    data.push(newItem);
    saveLocalData('comments', data);
    return newId;
  }
  try {
    const docRef = await addDoc(collection(db, "comments"), comment);
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteCommentFromFirebase = async (id: string) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('comments');
    saveLocalData('comments', data.filter((c: any) => c.id !== id));
    return;
  }
  try {
    await deleteDoc(doc(db, "comments", id));
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// --- عمليات الأذكار ---

export const fetchRemembrancesFromFirebase = async (): Promise<Remembrance[]> => {
  if (!firebaseReady || !db) return getLocalData('remembrances');
  try {
    const querySnapshot = await getDocs(collection(db, "remembrances"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Remembrance));
  } catch (error) {
    return getLocalData('remembrances');
  }
};

export const saveRemembrance = async (rem: Partial<Remembrance>) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('remembrances');
    const newId = rem.id || `rem_${Date.now()}`;
    const newItem = { ...rem, id: newId };
    const index = data.findIndex((r: any) => r.id === rem.id);
    if (index > -1) data[index] = newItem;
    else data.push(newItem);
    saveLocalData('remembrances', data);
    return;
  }
  try {
    if (rem.id) {
      const docRef = doc(db, "remembrances", rem.id);
      await updateDoc(docRef, rem);
    } else {
      await addDoc(collection(db, "remembrances"), rem);
    }
  } catch (error) {
    console.error("Error saving remembrance:", error);
    throw error;
  }
};

export const deleteRemembranceFromFirebase = async (id: string) => {
  if (!firebaseReady || !db) {
    const data = getLocalData('remembrances');
    saveLocalData('remembrances', data.filter((r: any) => r.id !== id));
    return;
  }
  try {
    await deleteDoc(doc(db, "remembrances", id));
  } catch (error) {
    console.error("Error deleting remembrance:", error);
    throw error;
  }
};

// --- ملف المستخدم ---

export const syncUserProfile = async (name: string, data: any) => {
  if (!firebaseReady || !db) {
    localStorage.setItem(`user_profile_${name}`, JSON.stringify(data));
    return;
  }
  try {
    const userDoc = doc(db, "users", name);
    await setDoc(userDoc, data, { merge: true });
  } catch (error) {
    console.error("Error syncing user profile:", error);
  }
};

export const getUserProfile = async (name: string) => {
  if (!firebaseReady || !db) {
    const local = localStorage.getItem(`user_profile_${name}`);
    return local ? JSON.parse(local) : null;
  }
  try {
    const userDoc = await getDoc(doc(db, "users", name));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    return null;
  }
};
