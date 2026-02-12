
import React from 'react';
import { Hadith, Source, Category, Surah, Remembrance } from './types';

export const SAMPLE_HADITHS: Hadith[] = [
  // --- أحاديث فريدة ومنوعة بدون تكرار ---
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
  { id: 'h11', text: 'من يرد الله به خيرا يفقهه في الدين.', narrator: 'معاوية بن أبي سفيان رضي الله عنه', source: Source.BUKHARI, number: '71', category: Category.GENERAL, tags: ['العلم'] },
  { id: 'h12', text: 'يسروا ولا تعسروا، وبشروا ولا تنفروا.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '6125', category: Category.GENERAL, tags: ['التيسير'] },
  { id: 'h13', text: 'أحب البلاد إلى الله مساجدها، وأبغض البلاد إلى الله أسواقها.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '671', category: Category.WORSHIP, tags: ['المساجد'] },
  { id: 'h14', text: 'لا يدخل الجنة قاطع.', narrator: 'جبير بن مطعم رضي الله عنه', source: Source.AGREED, number: '5984', category: Category.MORALS, tags: ['صلة الرحم'] },
  { id: 'h15', text: 'من غشنا فليس منا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '101', category: Category.TRANSACTIONS, tags: ['الأمانة'] },
  { id: 'h16', text: 'خيركم من تعلم القرآن وعلمه.', narrator: 'عثمان بن عفان رضي الله عنه', source: Source.BUKHARI, number: '5027', category: Category.GENERAL, tags: ['القرآن'] },
  { id: 'h17', text: 'من بنى مسجدا لله بنى الله له في الجنة مثله.', narrator: 'عثمان بن عفان رضي الله عنه', source: Source.AGREED, number: '450', category: Category.WORSHIP, tags: ['المساجد'] },
  { id: 'h18', text: 'ما يصيب المسلم من نصب ولا وصب ولا هم ولا حزن ولا أذى ولا غم حتى الشوكة يشاكها إلا كفر الله بها من خطاياه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '5641', category: Category.GENERAL, tags: ['الصبر'] },
  { id: 'h19', text: 'إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2564', category: Category.AQIDAH, tags: ['الإخلاص'] },
  { id: 'h20', text: 'الراحمون يرحمهم الرحمن، ارحموا من في الأرض يرحمكم من في السماء.', narrator: 'عبدالله بن عمرو بن العاص رضي الله عنهما', source: Source.BUKHARI, number: '6011', category: Category.MORALS, tags: ['الرحمة'] },
  { id: 'h21', text: 'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير، احرص على ما ينفعك، واستعن بالله ولا تعجز.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2664', category: Category.GENERAL, tags: ['القوة'] },
  { id: 'h22', text: 'لا تباغضوا، ولا تحاسدوا، ولا تدابروا، وكونوا عباد الله إخوانا.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '6065', category: Category.MORALS, tags: ['الأخوة'] },
  { id: 'h23', text: 'من كان في حاجة أخيه كان الله في حاجته، ومن فرج عن مسلم كربة فرج الله عنه كربة من كربات يوم القيامة.', narrator: 'عبدالله بن عمر رضي الله عنهما', source: Source.AGREED, number: '2442', category: Category.MORALS, tags: ['التعاون'] },
  { id: 'h24', text: 'إن الصدق يهدي إلى البر، وإن البر يهدي إلى الجنة، وإن الرجل ليصدق حتى يكون صديقا، وإن الكذب يهدي إلى الفجور، وإن الفجور يهدي إلى النار.', narrator: 'عبدالله بن مسعود رضي الله عنه', source: Source.AGREED, number: '6094', category: Category.MORALS, tags: ['الصدق'] },
  { id: 'h25', text: 'رغم أنفه، ثم رغم أنفه، ثم رغم أنفه، قيل: من يا رسول الله؟ قال: من أدرك أبويه عند الكبر، أحدهما أو كليهما، فلم يدخل الجنة.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2551', category: Category.MORALS, tags: ['بر الوالدين'] },
  { id: 'h26', text: 'تبسمك في وجه أخيك لك صدقة.', narrator: 'أبو ذر الغفاري رضي الله عنه', source: Source.BUKHARI, number: '1282', category: Category.MORALS, tags: ['الصدقة'] },
  { id: 'h27', text: 'المؤمن للمؤمن كالبنيان يشد بعضه بعضا، وشبك بين أصابعه.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.AGREED, number: '2446', category: Category.MORALS, tags: ['الأخوة'] },
  { id: 'h28', text: 'أفشوا السلام بينكم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '54', category: Category.MORALS, tags: ['السلام'] },
  { id: 'h29', text: 'من صلى البردين دخل الجنة.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.AGREED, number: '574', category: Category.WORSHIP, tags: ['الصلاة'] },
  { id: 'h30', text: 'ما من عبد مسلم يصلي لله كل يوم ثنتي عشرة ركعة تطوعا غير فريضة، إلا بنى الله له بيتا في الجنة.', narrator: 'أم حبيبة رضي الله عنها', source: Source.MUSLIM, number: '728', category: Category.WORSHIP, tags: ['السنن الرواتب'] },
  { id: 'h31', text: 'من توضأ فأحسن الوضوء خرجت خطاياه من جسده، حتى تخرج من تحت أظفاره.', narrator: 'عثمان بن عفان رضي الله عنه', source: Source.MUSLIM, number: '245', category: Category.WORSHIP, tags: ['الوضوء'] },
  { id: 'h32', text: 'من صام رمضان إيمانا واحتسابا غفر له ما تقدم من ذنبه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '38', category: Category.WORSHIP, tags: ['الصيام'] },
  { id: 'h33', text: 'مثل الذي يذكر ربه والذي لا يذكر ربه مثل الحي والميت.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.BUKHARI, number: '6407', category: Category.WORSHIP, tags: ['الذكر'] },
  { id: 'h34', text: 'البر حسن الخلق، والإثم ما حاك في صدرك وكرهت أن يطلع عليه الناس.', narrator: 'النواس بن سمعان رضي الله عنه', source: Source.MUSLIM, number: '2553', category: Category.MORALS, tags: ['الأخلاق'] },
  { id: 'h35', text: 'اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.', narrator: 'أبو ذر الغفاري رضي الله عنه', source: Source.BUKHARI, number: '1321', category: Category.MORALS, tags: ['التقوى'] },
  { id: 'h36', text: 'أنا وكافل اليتيم في الجنة هكذا، وأشار بالسبابة والوسطى وفرج بينهما شيئا.', narrator: 'سهل بن سعد رضي الله عنه', source: Source.BUKHARI, number: '5304', category: Category.MORALS, tags: ['اليتيم'] },
  { id: 'h37', text: 'ما نقصت صدقة من مال، وما زاد الله عبدا بعفو إلا عزا، وما تواضع أحد لله إلا رفعه الله.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2588', category: Category.MORALS, tags: ['العفو'] },
  { id: 'h38', text: 'من دعا إلى هدى كان له من الأجر مثل أجور من تبعه، لا ينقص ذلك من أجورهم شيئا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2674', category: Category.GENERAL, tags: ['الدعوة'] },
  { id: 'h39', text: 'إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '1631', category: Category.GENERAL, tags: ['الموت'] },
  { id: 'h40', text: 'أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '482', category: Category.WORSHIP, tags: ['السجود'] },
  { id: 'h41', text: 'إياكم والظن؛ فإن الظن أكذب الحديث، ولا تحسسوا، ولا تجسسوا، ولا تنافسوا، ولا تحاسدوا، ولا تباغضوا، ولا تدابروا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '6064', category: Category.MORALS, tags: ['الظن'] },
  { id: 'h42', text: 'من كان يؤمن بالله واليوم الآخر فليصل رحمه.', narrator: 'أبو هريرة رضي الله عنه', source: Source.BUKHARI, number: '6138', category: Category.MORALS, tags: ['صلة الرحم'] },
  { id: 'h43', text: 'الحياء لا يأتي إلا بخير.', narrator: 'عمران بن حصين رضي الله عنه', source: Source.AGREED, number: '6117', category: Category.MORALS, tags: ['الحياء'] },
  { id: 'h44', text: 'أحب الأعمال إلى الله أدومها وإن قل.', narrator: 'عائشة رضي الله عنها', source: Source.AGREED, number: '6464', category: Category.GENERAL, tags: ['الاستمرار'] },
  { id: 'h45', text: 'انظروا إلى من هو أسفل منكم ولا تنظروا إلى من هو فوقكم، فهو أجدر أن لا تزدروا نعمة الله عليكم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2963', category: Category.MORALS, tags: ['القناعة'] },
  { id: 'h46', text: 'أفضل الذكر: لا إله إلا الله، وأفضل الدعاء: الحمد لله.', narrator: 'جابر بن عبدالله رضي الله عنه', source: Source.BUKHARI, number: '6403', category: Category.WORSHIP, tags: ['الحمد'] },
  { id: 'h47', text: 'من صام يوما في سبيل الله باعد الله وجهه عن النار سبعين خريفا.', narrator: 'أبو سعيد الخدري رضي الله عنه', source: Source.AGREED, number: '1153', category: Category.WORSHIP, tags: ['الصيام'] },
  { id: 'h48', text: 'من قرأ حرفا من كتاب الله فله به حسنة، والحسنة بعشر أمثالها.', narrator: 'عبدالله بن مسعود رضي الله عنه', source: Source.BUKHARI, number: '5020', category: Category.GENERAL, tags: ['القرآن'] },
  { id: 'h49', text: 'من صلى العشاء في جماعة فكأنما قام نصف الليل، ومن صلى الصبح في جماعة فكأنما صلى الليل كله.', narrator: 'عثمان بن عفان رضي الله عنه', source: Source.MUSLIM, number: '656', category: Category.WORSHIP, tags: ['الجماعة'] },
  { id: 'h50', text: 'لا تزول قدما عبد يوم القيامة حتى يسأل عن أربع: عن عمره فيما أفناه، وعن شبابه فيما أبلاه، وعن ماله من أين اكتسبه وفيما أنفقه، وعن علمه ماذا عمل به.', narrator: 'أبو برزة الأسلمي رضي الله عنه', source: Source.BUKHARI, number: '6477', category: Category.GENERAL, tags: ['يوم القيامة'] },
  { id: 'h51', text: 'ألا أنبئكم بأكبر الكبائر؟ الإشراك بالله، وعقوق الوالدين، وقول الزور.', narrator: 'أبو بكرة رضي الله عنه', source: Source.AGREED, number: '2654', category: Category.AQIDAH, tags: ['الكبائر'] },
  { id: 'h52', text: 'الحلال بين والحرام بين وبينهما أمور مشتبهات لا يعلمهن كثير من الناس.', narrator: 'النعمان بن بشير رضي الله عنه', source: Source.AGREED, number: '52', category: Category.GENERAL, tags: ['التقوى'] },
  { id: 'h53', text: 'ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '6114', category: Category.MORALS, tags: ['الغضب'] },
  { id: 'h54', text: 'من غدا إلى المسجد أو راح أعد الله له في الجنة نزلا كلما غدا أو راح.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '662', category: Category.WORSHIP, tags: ['المسجد'] },
  { id: 'h55', text: 'اللهم ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '6389', category: Category.GENERAL, tags: ['الدعاء'] },
  { id: 'h56', text: 'سبحان الله وبحمده مائة مرة حطت خطاياه وإن كانت مثل زبد البحر.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '6405', category: Category.WORSHIP, tags: ['الذكر'] },
  { id: 'h57', text: 'الطهور شطر الإيمان والحمد لله تملأ الميزان.', narrator: 'أبو مالك الأشعري رضي الله عنه', source: Source.MUSLIM, number: '223', category: Category.WORSHIP, tags: ['الإيمان'] },
  { id: 'h58', text: 'المؤمن يأكل في معى واحد والكافر يأكل في سبعة أمعاء.', narrator: 'عبدالله بن عمر رضي الله عنهما', source: Source.AGREED, number: '5393', category: Category.MORALS, tags: ['الطعام'] },
  { id: 'h59', text: 'إن الله رفيق يحب الرفق في الأمر كله.', narrator: 'عائشة رضي الله عنها', source: Source.AGREED, number: '6024', category: Category.MORALS, tags: ['الرفق'] },
  { id: 'h60', text: 'لا تدخلون الجنة حتى تؤمنوا ولا تؤمنوا حتى تحابوا، أفشوا السلام بينكم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '54', category: Category.MORALS, tags: ['المحبة'] },
  { id: 'h61', text: 'من كان يؤمن بالله واليوم الآخر فليكرم ضيفه.', narrator: 'أبو شريح الخزاعي رضي الله عنه', source: Source.AGREED, number: '6135', category: Category.MORALS, tags: ['الضيف'] },
  { id: 'h62', text: 'إن مما أدرك الناس من كلام النبوة الأولى: إذا لم تستح فاصنع ما شئت.', narrator: 'أبو مسعود البدري رضي الله عنه', source: Source.BUKHARI, number: '3484', category: Category.MORALS, tags: ['الحياء'] },
  { id: 'h63', text: 'من قتل معاهدا لم يرح رائحة الجنة، وإن ريحها توجد من مسيرة أربعين عاما.', narrator: 'عبدالله بن عمرو رضي الله عنهما', source: Source.BUKHARI, number: '3166', category: Category.GENERAL, tags: ['المعاهد'] },
  { id: 'h64', text: 'إن الله يحب إذا عمل أحدكم عملا أن يتقنه.', narrator: 'عائشة رضي الله عنها', source: Source.BUKHARI, number: '431', category: Category.MORALS, tags: ['الإتقان'] },
  { id: 'h65', text: 'أجيبوا الداعي إذا دعيتم.', narrator: 'عبدالله بن عمر رضي الله عنهما', source: Source.MUSLIM, number: '1429', category: Category.MORALS, tags: ['الدعوة'] },
  { id: 'h66', text: 'من دعا لأخيه بظهر الغيب قال الملك الموكل به: آمين ولك بمثل.', narrator: 'أبو الدرداء رضي الله عنه', source: Source.MUSLIM, number: '2732', category: Category.GENERAL, tags: ['الدعاء'] },
  { id: 'h67', text: 'كفى بالمرء كذبا أن يحدث بكل ما سمع.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '5', category: Category.MORALS, tags: ['الصدق'] },
  { id: 'h68', text: 'اتقوا النار ولو بشق تمرة، فمن لم يجد فبكلمة طيبة.', narrator: 'عدي بن حاتم رضي الله عنه', source: Source.AGREED, number: '1016', category: Category.GENERAL, tags: ['الصدقة'] },
  { id: 'h69', text: 'الدنيا سجن المؤمن وجنة الكافر.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2956', category: Category.GENERAL, tags: ['الدنيا'] },
  { id: 'h70', text: 'لا يدخل الجنة من كان في قلبه مثقال ذرة من كبر.', narrator: 'عبدالله بن مسعود رضي الله عنه', source: Source.MUSLIM, number: '91', category: Category.MORALS, tags: ['التواضع'] },
  { id: 'h71', text: 'يسلم الصغير على الكبير والمار على القاعد والقليل على الكثير.', narrator: 'أبو هريرة رضي الله عنه', source: Source.BUKHARI, number: '6231', category: Category.MORALS, tags: ['السلام'] },
  { id: 'h72', text: 'من رأى منكم منكرا فليغيره بيده، فإن لم يستطع فبلسانه، فإن لم يستطع فبقلبه.', narrator: 'أبو سعيد الخدري رضي الله عنه', source: Source.MUSLIM, number: '49', category: Category.GENERAL, tags: ['الأمر بالمعروف'] },
  { id: 'h73', text: 'المسلم أخو المسلم لا يظلمه ولا يخذله ولا يحقره.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '2564', category: Category.MORALS, tags: ['الأخوة'] },
  { id: 'h74', text: 'من صلى علي واحدة صلى الله عليه بها عشرا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '408', category: Category.WORSHIP, tags: ['الصلاة على النبي'] },
  { id: 'h75', text: 'من أحب أن يبسط له في رزقه وينسأ له في أثره فليصل رحمه.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '5986', category: Category.MORALS, tags: ['صلة الرحم'] },
  { id: 'h76', text: 'تجدون الناس معادن، خيارهم في الجاهلية خيارهم في الإسلام إذا فقهوا.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '3383', category: Category.GENERAL, tags: ['المعادن'] },
  { id: 'h77', text: 'ذاق طعم الإيمان من رضي بالله ربا وبالإسلام دينا وبمحمد رسولا.', narrator: 'العباس بن عبدالمطلب رضي الله عنه', source: Source.MUSLIM, number: '34', category: Category.AQIDAH, tags: ['الرضا'] },
  { id: 'h78', text: 'لا يزني الزاني حين يزني وهو مؤمن، ولا يشرب الخمر حين يشربها وهو مؤمن، ولا يسرق السارق حين يسرق وهو مؤمن.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '2475', category: Category.AQIDAH, tags: ['الكبائر'] },
  { id: 'h79', text: 'بشروا ولا تنفروا، ويسروا ولا تعسروا.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.AGREED, number: '1732', category: Category.GENERAL, tags: ['التيسير'] },
  { id: 'h80', text: 'من لزم الاستغفار جعل الله له من كل هم فرجا ومن كل ضيق مخرجا.', narrator: 'عبدالله بن عباس رضي الله عنهما', source: Source.BUKHARI, number: '6307', category: Category.WORSHIP, tags: ['الاستغفار'] },
  { id: 'h81', text: 'ما منكم من أحد إلا سيكلمه ربه ليس بينه وبينه ترجمان.', narrator: 'عدي بن حاتم رضي الله عنه', source: Source.AGREED, number: '1413', category: Category.AQIDAH, tags: ['القيامة'] },
  { id: 'h82', text: 'اتقوا دعوة المظلوم؛ فإنه ليس بينها وبين الله حجاب.', narrator: 'معاذ بن جبل رضي الله عنه', source: Source.AGREED, number: '1496', category: Category.GENERAL, tags: ['الظلم'] },
  { id: 'h83', text: 'إن الله ليملي للظالم، حتى إذا أخذه لم يفلته.', narrator: 'أبو موسى الأشعري رضي الله عنه', source: Source.AGREED, number: '4686', category: Category.GENERAL, tags: ['الظلم'] },
  { id: 'h84', text: 'من كذب علي متعمداً فليتبوأ مقعده من النار.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '110', category: Category.GENERAL, tags: ['الصدق'] },
  { id: 'h85', text: 'أفضل الصلاة بعد الفريضة صلاة الليل، وأفضل الصيام بعد شهر رمضان صيام شهر الله المحرم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.MUSLIM, number: '1163', category: Category.WORSHIP, tags: ['الصلاة'] },
  { id: 'h86', text: 'من أطاعني فقد أطاع الله، ومن عصاني فقد عصى الله.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '7137', category: Category.AQIDAH, tags: ['الطاعة'] },
  { id: 'h87', text: 'إن الله تجاوز لي عن أمتي ما وسوست به صدورها، ما لم تعمل أو تكلم.', narrator: 'أبو هريرة رضي الله عنه', source: Source.AGREED, number: '5269', category: Category.AQIDAH, tags: ['الرحمة'] },
  { id: 'h88', text: 'اللهم إني أعوذ بك من العجز والكسل، والجبن والهرم والبخل.', narrator: 'أنس بن مالك رضي الله عنه', source: Source.AGREED, number: '6367', category: Category.GENERAL, tags: ['الدعاء'] }
];

export const AUTHENTIC_REMEMBRANCES: Remembrance[] = [
  { id: 'az-1', title: 'سيد الاستغفار', text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلقتَنِي وَأَنَا عَبدُكَ، وَأَنَا عَلَى عَهدِكَ وَوَعدِكَ مَا استَطَعتُ، أَعُوذُ بِكَ مِن شَرِّ مَا صَنَعتُ، أَبُوءُ لَكَ بِنِعمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنبِي فَاغفِر لِي فَإِنَّهُ لَا يَغفِرُ الذُّنُوبَ إِلَّا أَنتَ.', benefit: 'من قالها من النهار موقنا بها فمات من يومه قبل أن يمسي فهو من أهل الجنة.', count: 1, source: 'صحيح البخاري', category: 'morning_evening' },
  { id: 'az-2', title: 'التسبيح والتحميد', text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.', benefit: 'من قالها مائة مرة حطت خطاياه وإن كانت مثل زبد البحر.', count: 100, source: 'متفق عليه', category: 'morning_evening' },
  { id: 'az-3', title: 'آية الكرسي', text: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.', benefit: 'لن يزال عليك من الله حافظ ولا يقربك شيطان حتى تصبح.', count: 1, source: 'صحيح البخاري', category: 'morning_evening' }
];

export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Al-Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", numberOfAyahs: 30, revelationType: "Meccan" },
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
