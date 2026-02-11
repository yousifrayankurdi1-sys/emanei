
import React from 'react';
import { Hadith, Source, Category, Surah, Remembrance } from './types';

export const SAMPLE_HADITHS: Hadith[] = [
  {
    id: '1',
    text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله، فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها، فهجرته إلى ما هاجر إليه.',
    narrator: 'عمر بن الخطاب رضي الله عنه',
    source: Source.BUKHARI,
    number: '1',
    category: Category.AQIDAH,
    tags: ['النية', 'الإخلاص']
  },
  {
    id: '2',
    text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.',
    narrator: 'أنس بن مالك رضي الله عنه',
    source: Source.AGREED,
    number: '13',
    category: Category.MORALS,
    tags: ['الأخوة', 'المحبة']
  },
  {
    id: '3',
    text: 'من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة.',
    narrator: 'أبو هريرة رضي الله عنه',
    source: Source.MUSLIM,
    number: '2699',
    category: Category.GENERAL,
    tags: ['العلم', 'الجنة']
  },
  {
    id: '4',
    text: 'اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.',
    narrator: 'أبو ذر الغفاري رضي الله عنه',
    source: Source.AGREED,
    number: '1987',
    category: Category.MORALS,
    tags: ['التقوى', 'الأخلاق']
  },
  {
    id: '5',
    text: 'كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم.',
    narrator: 'أبو هريرة رضي الله عنه',
    source: Source.BUKHARI,
    number: '6406',
    category: Category.WORSHIP,
    tags: ['الذكر', 'التسبيح']
  },
  {
    id: '6',
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه.',
    narrator: 'أبو هريرة رضي الله عنه',
    source: Source.AGREED,
    number: '6018',
    category: Category.MORALS,
    tags: ['الأخلاق', 'الجوار']
  },
  {
    id: '25',
    text: 'من كذب علي متعمدا فليتبوأ مقعده من النار.',
    narrator: 'أبو هريرة رضي الله عنه',
    source: Source.AGREED,
    number: '110',
    category: Category.GENERAL,
    tags: ['الصدق', 'الوعيد']
  }
];

export const AUTHENTIC_REMEMBRANCES: Remembrance[] = [
  {
    id: 'azkar-1',
    title: 'سيد الاستغفار',
    text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطعتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
    benefit: 'من قالها من النهار موقنا بها فمات من يومه قبل أن يمسي فهو من أهل الجنة.',
    count: 1,
    source: 'صحيح البخاري',
    category: 'morning_evening'
  },
  {
    id: 'azkar-2',
    title: 'التسبيح والتحميد (100 مرة)',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
    benefit: 'من قالها مائة مرة حطت خطاياه وإن كانت مثل زبد البحر.',
    count: 100,
    source: 'متفق عليه',
    category: 'morning_evening'
  }
];

export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 114, name: "الناس", englishName: "Al-Nas", numberOfAyahs: 6, revelationType: "Meccan" }
];

export const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Heart: ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Comment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Refresh: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Star: ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
};
