
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

// --- عمليات الأحاديث ---

export const fetchHadithsFromFirebase = async (): Promise<Hadith[]> => {
  if (!firebaseReady || !db) return [];
  try {
    const querySnapshot = await getDocs(collection(db, "hadiths"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Hadith));
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    return [];
  }
};

export const saveHadith = async (hadith: Partial<Hadith>) => {
  if (!firebaseReady || !db) return;
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

export const deleteHadithFromFirebase = async (id: string) => {
  if (!firebaseReady || !db) return;
  try {
    await deleteDoc(doc(db, "hadiths", id));
  } catch (error) {
    console.error("Error deleting hadith:", error);
    throw error;
  }
};

// --- عمليات التعليقات ---

export const fetchCommentsByTarget = async (targetId: string): Promise<Comment[]> => {
  if (!firebaseReady || !db) return [];
  try {
    const q = query(
      collection(db, "comments"), 
      where("targetId", "==", targetId),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Comment));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addCommentToFirebase = async (comment: Omit<Comment, 'id'>) => {
  if (!firebaseReady || !db) return;
  try {
    const docRef = await addDoc(collection(db, "comments"), comment);
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteCommentFromFirebase = async (id: string) => {
  if (!firebaseReady || !db) return;
  try {
    await deleteDoc(doc(db, "comments", id));
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// --- عمليات الأذكار ---

export const fetchRemembrancesFromFirebase = async (): Promise<Remembrance[]> => {
  if (!firebaseReady || !db) return [];
  try {
    const querySnapshot = await getDocs(collection(db, "remembrances"));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Remembrance));
  } catch (error) {
    console.error("Error fetching remembrances:", error);
    return [];
  }
};

export const saveRemembrance = async (rem: Partial<Remembrance>) => {
  if (!firebaseReady || !db) return;
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
  if (!firebaseReady || !db) return;
  try {
    await deleteDoc(doc(db, "remembrances", id));
  } catch (error) {
    console.error("Error deleting remembrance:", error);
    throw error;
  }
};

// --- ملف المستخدم ---

export const syncUserProfile = async (name: string, data: any) => {
  if (!firebaseReady || !db) return;
  try {
    const userDoc = doc(db, "users", name);
    await setDoc(userDoc, data, { merge: true });
  } catch (error) {
    console.error("Error syncing user profile:", error);
  }
};

export const getUserProfile = async (name: string) => {
  if (!firebaseReady || !db) return null;
  try {
    const userDoc = await getDoc(doc(db, "users", name));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
