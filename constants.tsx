
import React from 'react';
import { Hadith, Source, Category, Surah, Remembrance } from './types';

export const SAMPLE_HADITHS: Hadith[] = [
  { id: 'h1', text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله، فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها، فهجرته إلى ما هاجر إليه.', narrator: 'عمر بن الخطاب رضي الله عنه', source: Source.AGREED, number: '1', category: Category.AQIDAH, tags: ['النية'] },
  { id: 'h2', text: 'بني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمدا رسول الله، وإقام الصلاة، وإيتاء الزكاة، والحج، وصوم رمضان.', narrator: 'عبدالله بن عمر رضي الله عنهما', source: Source.AGREED, number: '8', category: Category.WORSHIP, tags: ['الأركان'] },
  { id: 'h3', text: 'الإيمان بضع وستون شعبة، والحياء شعبة من الإيمان.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '9', category: Category.AQIDAH, tags: ['الإيمان'] },
  { id: 'h4', text: 'المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه.', narrator: 'عبدالله بن عمرو بن العاص رضي الله عنهما', source: Source.BUKHARI, number: '10', category: Category.MORALS, tags: ['الأخلاق'] },
  { id: 'h5', text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '13', category: Category.MORALS, tags: ['المحبة'] },
  { id: 'h6', text: 'من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2699', category: Category.GENERAL, tags: ['العلم'] },
  { id: 'h7', text: 'كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.BUKHARI, number: '6406', category: Category.WORSHIP, tags: ['الذكر'] },
  { id: 'h8', text: 'من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '6018', category: Category.MORALS, tags: ['الأخلاق'] },
  { id: 'h9', text: 'الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.', narrator: 'تميم الداري رضي الله عنه', source: Source.MUSLIM, number: '55', category: Category.GENERAL, tags: ['النصيحة'] },
  { id: 'h10', text: 'سبعة يظلهم الله في ظله يوم لا ظل إلا ظله: إمام عادل، وشاب نشأ في عبادة الله، ورجل قلبه معلق بالمساجد، ورجلان تحابا في الله اجتمعا عليه وتفرقا عليه، ورجل طلبته امرأة ذات منصب وجمال فقال إني أخاف الله، ورجل تصدق بصدقة فأخفاها حتى لا تعلم شماله ما تنفق يمينه، ورجل ذكر الله خاليا ففاضت عيناه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '660', category: Category.GENERAL, tags: ['القيامة'] },
  // --- إضافة الأحاديث الجديدة ---
  { id: 'h11', text: 'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير، احرص على ما ينفعك، واستعن بالله ولا تعجز.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2664', category: Category.AQIDAH, tags: ['القوة', 'التوكل'] },
  { id: 'h12', text: 'أن رجلاً قال للنبي صلى الله عليه وسلم: أوصني، قال: لا تغضب. فردد مراراً، قال: لا تغضب.', narrator: 'أبو هريرة رضي الله عنه', source: Source.BUKHARI, number: '6116', category: Category.MORALS, tags: ['الغضب', 'الوصية'] },
  { id: 'h13', text: 'من كان يؤمن بالله واليوم الآخر فليصل رحمه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.BUKHARI, number: '6138', category: Category.MORALS, tags: ['صلة الرحم'] },
  { id: 'h14', text: 'خيركم من تعلم القرآن وعلمه.', narrator: 'عثمان بن عفان رضي الله عنه', source: Source.BUKHARI, number: '5027', category: Category.GENERAL, tags: ['القرآن', 'العلم'] },
  { id: 'h15', text: 'اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.', narrator: 'أبو ذر الغفاري رضي الله عنه', source: Source.AGREED, number: '1987', category: Category.MORALS, tags: ['التقوى', 'الأخلاق'] },
  { id: 'h16', text: 'إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '1631', category: Category.GENERAL, tags: ['الصدقة', 'العلم'] },
  { id: 'h17', text: 'يسروا ولا تعسروا، وبشروا ولا تنفروا.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '6125', category: Category.MORALS, tags: ['التيسير'] },
  { id: 'h18', text: 'إن الله جميل يحب الجمال.', narrator: 'عبدالله بن مسعود رضي الله عنه', source: Source.MUSLIM, number: '91', category: Category.GENERAL, tags: ['الجمال'] },
  { id: 'h19', text: 'تبسمك في وجه أخيك لك صدقة.', narrator: 'أبو ذر الغفاري رضي الله عنه', source: Source.AGREED, number: '1956', category: Category.MORALS, tags: ['التبسم', 'الصدقة'] },
  { id: 'h20', text: 'من غش فليس منا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '101', category: Category.TRANSACTIONS, tags: ['الأمانة', 'الغش'] },
  { id: 'h21', text: 'والله في عون العبد ما كان العبد في عون أخيه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2699', category: Category.MORALS, tags: ['المساعدة'] },
  { id: 'h22', text: 'من صلى البردين دخل الجنة.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.AGREED, number: '574', category: Category.WORSHIP, tags: ['الصلاة', 'الجنة'] },
  { id: 'h23', text: 'الدعاء هو العبادة.', narrator: 'النعمان بن بشير رضي الله عنه', source: Source.AGREED, number: '3372', category: Category.WORSHIP, tags: ['الدعاء'] },
  { id: 'h24', text: 'ليس الشديد بالصّرعة، إنما الشديد الذي يملك نفسه عند الغضب.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '6114', category: Category.MORALS, tags: ['الصبر', 'القوة'] },
  { id: 'h25', text: 'أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '482', category: Category.WORSHIP, tags: ['السجود'] },
  { id: 'h26', text: 'كل مسكر خمر، وكل خمر حرام.', narrator: 'عبدالله بن عمر رضي الله عنهما', source: Source.MUSLIM, number: '2003', category: Category.GENERAL, tags: ['التحريم'] },
  { id: 'h27', text: 'الطهور شطر الإيمان.', narrator: 'أبو مالك الأشعري رضي الله عنه', source: Source.MUSLIM, number: '223', category: Category.WORSHIP, tags: ['النظافة'] },
  { id: 'h28', text: 'من صام رمضان ثم أتبعه بست من شوال كان كصيام الدهر.', narrator: 'أبو أيوب الأنصاري رضي الله عنه', source: Source.MUSLIM, number: '1164', category: Category.WORSHIP, tags: ['الصيام', 'شوال'] },
  { id: 'h29', text: 'من قرأ حرفاً من كتاب الله فله به حسنة، والحسنة بعشر أمثالها.', narrator: 'عبدالله بن مسعود رضي الله عنه', source: Source.AGREED, number: '2910', category: Category.GENERAL, tags: ['القرآن', 'الأجر'] },
  { id: 'h30', text: 'استوصوا بالنساء خيراً.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '3331', category: Category.MORALS, tags: ['النساء', 'الوصية'] }
];

export const AUTHENTIC_REMEMBRANCES: Remembrance[] = [
  // --- أذكار الصباح والمساء ---
  { id: 'az-1', title: 'سيد الاستغفار', text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أنتَ، خلقتَني وأنا عبدُك، وأنا على عهدِك ووعدِك ما استطعتُ، أعوذُ بك من شرِّ ما صنعتُ، أبوءُ لك بنعمتِك عليَّ، وأبوءُ لك بذنبي فاغفر لي فإنه لا يغفرُ الذنوبَ إلا أنتَ.', benefit: 'من قالها من النهار موقنا بها فمات من يومه قبل أن يمسي فهو من أهل الجنة.', count: 1, source: 'صحيح البخاري', category: 'morning_evening' },
  { id: 'az-2', title: 'التسبيح والتحميد', text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.', benefit: 'من قالها مائة مرة حطت خطاياه وإن كانت مثل زبد البحر.', count: 100, source: 'متفق عليه', category: 'morning_evening' },
  { id: 'az-3', title: 'آية الكرسي', text: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.', benefit: 'لن يزال عليك من الله حافظ ولا يقربك شيطان حتى تصبح.', count: 1, source: 'صحيح البخاري', category: 'morning_evening' },

  // --- أدعية الصلاة ---
  { id: 'pr-1', title: 'دعاء الاستفتاح', text: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.', benefit: 'يقال بعد تكبيرة الإحرام وقبل القراءة.', count: 1, source: 'متفق عليه', category: 'prayer' },
  { id: 'pr-2', title: 'دعاء الركوع', text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ.', benefit: 'السنة تكرارها ثلاثاً أو أكثر.', count: 3, source: 'صحيح مسلم', category: 'prayer' },
  { id: 'pr-3', title: 'دعاء السجود', text: 'سُبْحَانَ رَبِّيَ الأَعْلَى.', benefit: 'أقرب ما يكون العبد من ربه وهو ساجد فأكثروا الدعاء.', count: 3, source: 'صحيح مسلم', category: 'prayer' },
  { id: 'pr-4', title: 'بين السجدتين', text: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي.', benefit: 'كان النبي ﷺ يكررها بين السجدتين.', count: 2, source: 'أبو داود', category: 'prayer' },
  { id: 'pr-5', title: 'التشهد الأخير', text: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.', benefit: 'ركن من أركان الصلاة.', count: 1, source: 'متفق عليه', category: 'prayer' },

  // --- أدعية نبوية (جوامع الكلم) ---
  { id: 'gd-1', title: 'دعاء جامع', text: 'اللَّهُمَّ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.', benefit: 'كان أكثر دعاء النبي ﷺ.', count: 1, source: 'متفق عليه', category: 'general_dua' },
  { id: 'gd-2', title: 'الثبات على الدين', text: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ.', benefit: 'كان النبي ﷺ يكثر من هذا الدعاء.', count: 1, source: 'الترمذي', category: 'general_dua' },
  { id: 'gd-3', title: 'دعاء الكرب', text: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَواتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.', benefit: 'يقال عند الهم والغم والكرب.', count: 1, source: 'متفق عليه', category: 'general_dua' },
  { id: 'gd-4', title: 'طلب الهدى والتقى', text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.', benefit: 'من جوامع دعاء النبي ﷺ.', count: 1, source: 'صحيح مسلم', category: 'general_dua' }
];

export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Al-Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisa", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "يونس", englishName: "Yunus", numberOfAyahs: 109, revelationType: "Meccan" },
  { number: 11, name: "هود", englishName: "Hud", numberOfAyahs: 123, revelationType: "Meccan" },
  { number: 12, name: "يوسف", englishName: "Yusuf", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", numberOfAyahs: 43, revelationType: "Medinan" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", numberOfAyahs: 99, revelationType: "Meccan" },
  { number: 16, name: "النحل", englishName: "An-Nahl", numberOfAyahs: 128, revelationType: "Meccan" },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 19, name: "مريم", englishName: "Maryam", numberOfAyahs: 98, revelationType: "Meccan" },
  { number: 20, name: "طه", englishName: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", numberOfAyahs: 112, revelationType: "Meccan" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", numberOfAyahs: 118, revelationType: "Meccan" },
  { number: 24, name: "النور", englishName: "An-Nur", numberOfAyahs: 64, revelationType: "Medinan" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", numberOfAyahs: 77, revelationType: "Meccan" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", numberOfAyahs: 227, revelationType: "Meccan" },
  { number: 27, name: "النمل", englishName: "An-Naml", numberOfAyahs: 93, revelationType: "Meccan" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", numberOfAyahs: 69, revelationType: "Meccan" },
  { number: 30, name: "الروم", englishName: "Ar-Rum", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 31, name: "لقمان", englishName: "Luqman", numberOfAyahs: 34, revelationType: "Meccan" },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", numberOfAyahs: 73, revelationType: "Medinan" },
  { number: 34, name: "سبأ", englishName: "Saba", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 35, name: "فاطر", englishName: "Fatir", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 37, name: "الصافات", englishName: "As-Saffat", numberOfAyahs: 182, revelationType: "Meccan" },
  { number: 38, name: "ص", englishName: "Sad", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", numberOfAyahs: 75, revelationType: "Meccan" },
  { number: 40, name: "غافر", englishName: "Ghafir", numberOfAyahs: 85, revelationType: "Meccan" },
  { number: 41, name: "فصلت", englishName: "Fussilat", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", numberOfAyahs: 53, revelationType: "Meccan" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", numberOfAyahs: 89, revelationType: "Meccan" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", numberOfAyahs: 59, revelationType: "Meccan" },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", numberOfAyahs: 37, revelationType: "Meccan" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", numberOfAyahs: 35, revelationType: "Meccan" },
  { number: 47, name: "محمد", englishName: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaf", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 52, name: "الطور", englishName: "At-Tur", numberOfAyahs: 49, revelationType: "Meccan" },
  { number: 53, name: "النجم", englishName: "An-Najm", numberOfAyahs: 62, revelationType: "Meccan" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", numberOfAyahs: 55, revelationType: "Meccan" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", numberOfAyahs: 96, revelationType: "Meccan" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadila", numberOfAyahs: 22, revelationType: "Medinan" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", numberOfAyahs: 24, revelationType: "Medinan" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", numberOfAyahs: 13, revelationType: "Medinan" },
  { number: 61, name: "الصف", englishName: "As-Saff", numberOfAyahs: 14, revelationType: "Medinan" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", numberOfAyahs: 44, revelationType: "Meccan" },
  { number: 71, name: "نوح", englishName: "Nuh", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", numberOfAyahs: 56, revelationType: "Meccan" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", numberOfAyahs: 31, revelationType: "Medinan" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", numberOfAyahs: 50, revelationType: "Meccan" },
  { number: 78, name: "النبأ", englishName: "An-Naba", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "عبس", englishName: "Abasa", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", numberOfAyahs: 29, revelationType: "Meccan" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", numberOfAyahs: 36, revelationType: "Meccan" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", numberOfAyahs: 25, revelationType: "Meccan" },
  { number: 85, name: "البروج", englishName: "Al-Buruj", numberOfAyahs: 22, revelationType: "Meccan" },
  { number: 86, name: "الطارق", englishName: "At-Tariq", numberOfAyahs: 17, revelationType: "Meccan" },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", numberOfAyahs: 26, revelationType: "Meccan" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 90, name: "البلد", englishName: "Al-Balad", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", numberOfAyahs: 15, revelationType: "Meccan" },
  { number: 92, name: "الليل", englishName: "Al-Layl", numberOfAyahs: 21, revelationType: "Meccan" },
  { number: 93, name: "الضحى", englishName: "Ad-Duha", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "التين", englishName: "At-Tin", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "العلق", englishName: "Al-Alaq", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 103, name: "العصر", englishName: "Al-Asr", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", numberOfAyahs: 9, revelationType: "Meccan" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 106, name: "قريش", englishName: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "النصر", englishName: "An-Nasr", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "المسد", englishName: "Al-Masad", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "الناس", englishName: "An-Nas", numberOfAyahs: 6, revelationType: "Meccan" }
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
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};
