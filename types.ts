
export enum Source {
  BUKHARI = 'صحيح البخاري',
  MUSLIM = 'صحيح مسلم',
  AGREED = 'متفق عليه'
}

export enum Category {
  AQIDAH = 'عقيدة',
  MORALS = 'أخلاق',
  WORSHIP = 'عبادات',
  TRANSACTIONS = 'معاملات',
  GENERAL = 'عام'
}

export interface Hadith {
  id: string;
  text: string;
  narrator: string;
  source: Source;
  number: string;
  category: Category;
  tags: string[];
}

export interface Remembrance {
  id: string;
  title: string;
  text: string;
  benefit?: string;
  count: number;
  source: string;
  category: 'morning_evening' | 'prayer' | 'general_dua';
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface User {
  name: string;
  isLoggedIn: boolean;
}

export interface SearchState {
  query: string;
  source: Source | 'all';
  category: Category | 'all';
}
