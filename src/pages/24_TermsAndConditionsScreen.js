import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ROUTES_NAMES from "../RoutesNames";

export const TermsAndConditionsScreen = () => {
  //if true arabic if false english
  const language =
    window.location.pathname === `/${ROUTES_NAMES.TERMS_AND_CONDITIONS}/ar`
      ? "ar"
      : "en";
  const direction = language === "ar" ? "rtl" : "ltr";
  const pageDictionary = {
    ar: {
      title: `شروط الاستخدام `,
      welcomeMessage: `مرحبًا بك في URrevs ("URrevs" أو "الموقع") وهو موقع للتواصل الاجتماعي يسمح لمستخدميه بمشاركة مجموعة كبيرة ومتنوعة من المنتجات الإلكترونية الاستهلاكية والتعليق عليها ، إنه ببساطة منصة لعرض مراجعات المستخدمين.

      توفر URrevs خدماتها لك وفقًا لأحكام شروط الخدمة هذه ("TOS").باستخدام هذا الموقع أو عرض المحتوى هنا ، فإنك تقبل وتوافق على الالتزام بهذه الشروط وأحكامها.هذه اتفاقية ملزمة قانونًا بينك وبين URrevs ، لذا يرجى قراءتها بعناية. إذا كنت لا توافق على شروط الخدمة هذه ، فيرجى عدم استخدام URrevs. `,
      eligibility: `جدارة الاستخدام `,
      eligibilityParagraph: `الا يقل عمر مستخدم الموقع عن ١٨ عاما
      .فاذا تم اكتشاف ان عمر المستخدم اقل من السن القانونى المتفق عليه للاستخدام سيتم حذف حساب المستخدم دون إنذار مسبق `,
      yourURrevsAccount: `حساب URrevs الخاص بك`,
      yourURrevsAccountParagraph: `من أجل الحصول على تجربة URrevs الكاملة والوصول إلى بعض الميزات على موقع الويب ، سيكون على المستخدم إنشاء حساب مستخدم وملف تعريف.عند إنشاء حساب مستخدم وملف تعريف ، يجب كتابة معلومات كاملة ودقيقة وحقيقيه باستثناء الإسم يسمح باستخدام اسم مستعار، ولا يجوز للمستخدم انتحال شخصية شخص آخر بالاسم او البيانات والا تم حذف حساب المستخدم دون انذار مسبق اذا تم إكتشاف الانتحال 
      يمنع انشاء اكثر من حساب مستخدم لنفس المستخدم 
      
      إذا قمت كمستخدم بإنشاء حساب مستخدم باستخدام URrevs ، فأنت مسؤول عن حماية حسابك وكلمة المرور.أنت توافق على قبول المسؤولية عن جميع الأنشطة التي تحدث فيما يتعلق بحسابك ، سواء كان الاستخدام غير مصرح به أم لا.بالإضافة إلى ذلك ، فإنك توافق على إبلاغنا فورًا بأي استخدام غير مصرح به لحسابك.نحتفظ بالحق في إغلاق حسابك ، وإلغاء اسم المستخدم الخاص بك ، وإزالة أي محتوى مقدم من قبلك في أي وقت ولأي سبب أو بدون سبب. أنت تدرك أن URrevs لن يكون مسؤولاً أمامك عن استدعاء هذا الحق. `,
      licenseForPersonalUse: `رخصة الاستخدام الشخصي `,
      licenseForPersonalUseParahgraph1: `نحن نمنحك ترخيصًا محدودًا وإذنًا للوصول إلى URrevs واستخدامه الشخصي ولا يوجد اذن او تصريح بتنزيل أو نسخ أي جزء من محتواه لأي غرض تجاري أو لتعديل أي جزء منه ، إلا بموافقتنا الخطية أو المرسلة عبر البريد الإلكتروني.
      لا يتضمن هذا الترخيص أي إعادة بيع أو استخدام تجاري لـ URrevs أو محتواه ؛ أي تجميع أو استخدام "المحتوى الذي ينشئه المستخدم" (كما هو موضح أدناه) ؛ أي استخدام مشتق من URrevs أو محتوياته ؛ أو أي استخدام لاستخراج البيانات أو الروبوتات أو أدوات أو عمليات مماثلة لجمع البيانات أو استخراجها ؛ وأنت توافق على عدم القيام بأي مما سبق. باستثناء ما هو منصوص عليه صراحةً في شروط الاستخدام هذه ، فإنك توافق على عدم تخزين أي شكل من الأشكال أو توزيع أو إرسال أو عرض أو إعادة إنتاج أو تعديل أو إنشاء أعمال مشتقة من أو بيع أو استغلال أي محتوى من أي جزء من URrevs لأي غرض تجاري دون أي موافقة مسبقة من URrevs.
      يجوز لك عرض نسخة واحدة من صفحات URrevs وطباعتها من حين لآخر لاستخدامك الشخصي غير التجاري ، ولكن لا يجوز لك إعادة إنتاج أي مواد تظهر على URrevs (بخلاف "المحتوى الذي ينشئه المستخدم" الخاص بك ، كما هو موضح أدناه) دون موافقة خطية مسبقة منا.يجب إرسال طلبات الحصول على إذن لإعادة إنتاج أو توزيع المواد الموجودة على الموقع إلى `,
      emailAddress: "هذا البريد الإلكتروني.",
      licenseForPersonalUseParahgraph2: ` لا يجوز لك استخدام اسمنا أو أي تغيير إملائي أو تباين مطبعي لـ URrevs أو مراجعات المستخدمين ، سواء أكان ذلك بمفرده أو بالاقتران مع أي كلمة أو عبارة أو علامات تجارية أو علامات خدمة أخرى بأي طريقة (بما في ذلك الاستخدام في أي علامات (metatags) أو أي "نص مخفي" آخر) دون استخدام موافقة خطية مسبقة أو بالبريد الإلكتروني.أي انتهاك لما تقدم سوف ينهي الإذن والترخيص الممنوحين من قبلنا للوصول إلى URrevs واستخدامه. `,
      userGeneratedContent: `المحتوى الناتج عن طريق المستخدم `,
      userGeneratedContentParagraph: `يجوز لأصحاب حسابات مستخدم URrevs إرسال المحتوى والمعلومات ، بما في ذلك على سبيل المثال لا الحصر ، النص والبيانات والصور ومقاطع الفيديو (يشار إليها مجتمعة "المحتوى الذي ينشئه المستخدم"). أنت تدرك أنه سواء تم نشر أو عدم نشر هذا المحتوى الذي ينشئه المستخدم ، فإن URrevs لا تضمن أي سرية فيما يتعلق بأي محتوى يتم إنشاؤه بواسطة المستخدم.

      أنت توافق على أن المحتوى الذي ينشئه المستخدم والمقصود للعرض على URrevs لن يشمل أي محتوى غير قانوني أو غير لائق أو مدنس (بما في ذلك الألفاظ النابية المقنعة حيث تستخدم الرموز والأحرف الأولى والأخطاء الإملائية المتعمدة أو غيرها من الايحاءات لاي لغة نابية) أو تشهيرية أو منتهكة الخصوصية أو الإضرار بأطراف ثالثة ؛ وأنها لن تتكون من أو تحتوي على فيروسات برمجية أو حملات سياسية أو استدراج تجاري أو رسائل متسلسلة أو رسائل بريدية جماعية أو أي شكل من أشكال "البريد العشوائي". لا يجوز لك استخدام عنوان بريد إلكتروني مزيف أو انتحال شخصية أي شخص أو كيان أو التضليل فيما يتعلق بأصل المحتوى الذي ينشئه المستخدم. بالإضافة إلى القيود الموضحة أعلاه ، لا يجوز لك تقديم المحتوى الذي ينشئه المستخدم ينتهك بأي شكل من الأشكال حقوق الطبع والنشر أو العلامة التجارية أو حقوق الملكية الفكرية الأخرى لأي شخص أو كيان ، أو يحتوي على أي معلومات سرية أو خاصة بأي شخص أو كيان أو ينتهك الحقوق القانونية لأي شخص أو كيان آخر. ستقوم URrevs بإزالة جميع المحتويات التي ينشئها المستخدمون إذا تم إخطارها بشكل صحيح أن هذا المحتوى الذي ينشئه المستخدم ينتهك حقوق الملكية الفكرية للآخرين.
      
      كذلك ، لا يمكنك استخدام URrevs للتهديد أو الملاحقة أو الاحتيال أو التحرش أو المضايقة أو الدعوة إلى مضايقة شخص آخر أو التدخل بطريقة أخرى في استخدام مستخدم آخر لموقع الويب ؛ تشجيع التعصب أو التمييز ضد الطبقات المحمية ؛ نقل أو نشر مواد إباحية أو محتوى غير قانوني ؛ استخدام أي روبوت ، أو عنكبوت برمجي ، أو تطبيق للبحث عن الموقع / تطبيق استرجاعي ، أو أي جهاز آلي آخر ، أو عملية أو وسيلة للوصول إلى موقع الويب أو أي محتوى على URrevs أو استرجاعه أو كشطه أو فهرسته أو نسخه ؛ اتخاذ أي إجراء يفرض أو قد يفرض حمولة كبيرة (ضغط) غير معقولة أو غير متناسبة على البنية التحتية للتكنولوجيا المستخدمة في URrevs ؛ أو تنتهك أي قوانين معمول بها.
      
      أنت وحدك المسؤول و المتحمل عن جميع المخاطر المرتبطة ب المحتوى الذي ينشئه المستخدم الخاص بك. يتضمن ذلك أي اعتماد على دقته أو اكتماله أو فائدته من قِبل الآخرين ، أو أي إفصاح عن المعلومات الموجودة في المحتوى الذي ينشئه المستخدم الخاص بك والذي يجعلك تحدد هويتك الشخصية.أنت تقر بأنك تمتلك أو تملك التراخيص أو الأذونات اللازمة لاستخدامها ، وتخول URrevs استخدام المحتوى الذي ينشئه المستخدم الخاص بك كما هو موضح هنا.
      
      لا تؤيد URrevs أي محتوى ينشئه المستخدم أو أي رأي أو توصية أو مشورة يتم التعبير عنها فيه ، وتتجاهل URrevs بشكل صريح أي وكل مسؤولية فيما يتعلق بالمحتوى الذي ينشئه المستخدم.لا يجوز لك الإشارة إلى أن المحتوى الذي أنشأه المستخدمون يخضع بأي شكل من الأشكال لرعاية أو اعتماد URrevs.
      
      نحن نحتفظ بالحق ، لكننا لسنا ملزمين بمراقبة المحتوى الذي ينشئه المستخدم على URrevs وتقييد أو إزالة المحتوى الذي نعتقد ، حسب تقديرنا الوحيد بأنه غير مناسب.إذا كنت تشعر أن أي محتوى ينشئه المستخدم على URrevs يعد مسيئًا أو ينتهك حقوقك أو شروط الخدمة هذه ، فيرجى مراسلتنا عبر البريد الإلكتروني على `,
      userGeneratedContentParagraph2: ` عَنون الموضوع في البريد الالكتروني: مواد غير لائقة. `,
      licenseToURrevsAndURrevsUsers: `ترخيص لمستخدمي URrevs و ل URrevs`,
      licenseToURrevsAndURrevsUsersParagraph: `إنك توافق على أنه ، من خلال نشر أي "المحتوى الذي ينشئه المستخدم" على URrevs ، فإنك تمنح URrevs ترخيصًا عالميًا وغير حصري وخالي من حقوق الملكية ومرخصًا وقابل للتحويل لاستخدام هذا المستخدم وإعادة إنتاجه وتوزيعه وإعداد الأعمال المشتقة منه وعرضه. المحتوى الذي ينشئه المستخدم فيما يتعلق بموقع الويب هذا ونشاطات URrevs (وخلفائها والشركات التابعة لها و الشركات المتعاونة معها) ، بما في ذلك على سبيل المثال لا الحصر الترويج وإعادة توزيع جزء أو كل هذا الموقع (والأعمال المشتقة منه) بأي تنسيقات في الوسائط الاعلامية المختلفة ومن خلال أي قنوات  وسائط (media). أنت تمنحنا أيضًا الحق غير الحصري في السعي إلى الانضمام و / أو الحصول على تعويضات من أي طرف ثالث من الاستخدام غير المصرح به أو إعادة إنتاج المحتوى الذي أنشأه المستخدمون الخاص بك. إذا نشرنا المحتوى الذي ينشئه المستخدم الخاص بك أو أذِنّا أو رخصّنا للآخرين بالقيام بذلك ، فقد يتم تحرير المحتوى الذي ينشئه المستخدم الخاص بك للطول أو الوضوح  أو لأي سبب آخر سواء قبل نشره أو بعده.

    أنت أيضًا بموجب هذا تمنح كل مستخدم لـ URrevs ترخيصًا غير حصري للوصول إلى المحتوى الذي ينشئه المستخدم الخاص بك من خلال موقع الويب ، واستخدام وعرض المحتوى الذي ينشئه المستخدم على النحو المسموح به من خلال وظيفة الموقع الإلكتروني وتحت شروط الخدمة هذه.
    
    يتم إنهاء التراخيص أعلاه الممنوحة بواسطتك في غضون فترة زمنية معقولة تجاريًا بعد إزالة ملف تعريف المستخدم الخاص بك أو حذفه أو إنهاء حساب المستخدم الخاص بك. ومع ذلك ، فإنك تدرك وتوافق على أنه يجوز لـ URrevs الاحتفاظ بنسخ الخادم من هذا المحتوى الذي ينشئه المستخدم أو حذفه أو عدم توزيعه. تعتبر التراخيص أعلاه الممنوحة من قِبلك فيما يتعلق منشورات المحتوى الذي ينشئه المستخدم الخاص بك والتي تمت مشاركتها مع الآخرين ، على سبيل المثال لا الحصر ، التعليقات علي المناقشات او المراجعات أو المنتجات التي أصبحت جزءًا من قاعدة بيانات URrevs ، دائمة وغير قابلة للإلغاء.`,
      urrevssUseOfUserGeneratedContent: `استخدام URrevs للمحتوى الذي ينشئه المستخدم`,
      urrevssUseOfUserGeneratedContentParagraph: `قد تستخدم URrevs أو لا تستخدم المحتوى الذي ينشئه المستخدم الخاص بك وفقًا لتقديرها الخاص. على سبيل المثال ، قد نختار عدم نشر المحتوى الذي ينشئه المستخدم الخاص بك إذا اعتقدنا أنه ينتهك شروط الخدمة. بالإضافة إلى ذلك ، يرجى ملاحظة أنه ليس علينا أي التزام بالاحتفاظ بنسخ من المحتوى الذي ينشئه المستخدم الخاص بك أو تزويدك بنسخ منها ، ولا نضمن أي سرية فيما يتعلق ب المحتوى الذي ينشئه المستخدم الخاص بك.

      قد تعرض URrevs وأصحاب التراخيص الخاصة بها الإعلانات وغيرها من المعلومات المجاورة أو المضمنة مع المحتوى الذي ينشئه المستخدم الخاص بك على الموقع الإلكتروني والوسائط (media) الأخرى. لا يحق لك الحصول على أي تعويض عن هذه الإعلانات. تخضع طريقة وكيفية و أسلوب ومدى هذا الإعلان للتغيير دون إشعار محدد لك.`,
      privacyPolicy: `سياسة الخصوصية`,
      privacyPolicyParagraph: `سياسة الخصوصية الحالية لـ URrevs متاحة على `,
      thisLink: `هذا الرابط`,
      privacyPolicyParagraph2: ` ويتم تضمينها في هذا المرجع. `,
      linksToThirdPartyWebsites: `روابط لمواقع الطرف الثالث`,
      linksToThirdPartyWebsitesParagraph: `د يتضمن URrevs روابط إلى مواقع ويب أخرى كجزء من المحتوى الذي تم إنشاؤه بواسطة URrevs ("محتوى URrevs") أو المحتوى الذي ينشئه المستخدم. لا يتحكم URrevs أو يقر أي محتوى من مواقع الأطراف الثالثة هذه ، وبواسطة استخدام URrevs ، فإنك توافق على أن URrevs غير مسؤول عن توفر أو محتوى هذه المواقع الإلكترونية للأطراف الثالثة.`,
      termination: `الإنهاء`,
      terminationParagraph: `تحتفظ URrevs بالحق ، وفقًا لتقديرها الخاص ، في تقييد أو تعليق أو إنهاء وصولك إلى كل أو جزء من الموقع في أي وقت ، بما في ذلك إلغاء اسم المستخدم الخاص بك ، لأي سبب أو بدون سبب ، مع أو بدون إشعار مسبق ، ودون مسؤولية. تحتفظ URrevs صراحة بالحق في إزالة حساب المستخدم الخاص بك و / أو تقييد حسابك أو تعليقه أو إنهائه ووصولك إلى أي جزء من موقع الويب إذا كان يحدد ، وفقًا لتقديرهأ الخاص ، على سبيل المثال ، أنك انتهكت شروط الخدمة أو كنت مشتبهًا بها التورط في نشاط غير قانوني.

      يمكنك إنهاء حسابك مع URrevs في أي وقت ، ولأي سبب ، عن طريق التواصل معنا.
      
      في حالة حدوث أي إنهاء ، تظل شروط الخدمة هذه سارية.`,
      ownership: `الملكية`,
      ownershipParagraph: `يمتلك URrevs محتوى URrevs المتوفر على موقع الويب ، بما في ذلك على سبيل المثال لا الحصر ، الواجهات البصرية والميزات التفاعلية والرسومات والبرامج النصية والصور والأصوات والموسيقى ومقاطع الفيديو والتصميم والتجميع ورمز الكمبيوتر والمنتجات والبرمجيات والنص والتجميع لتقييمات مراجعات المستخدم ، وجميع العناصر والمكونات الأخرى للموقع و المحتوى الذي ينشئه المستخدم ، باستثناء أي محتوى تابع لجهة خارجية. تمتلك URrevs أيضًا أو تمتلك ترخيصًا لحقوق التأليف والنشر والعلامات التجارية وعلامات الخدمة والأسماء التجارية وغيرها من الحقوق الفكرية وحقوق الملكية في جميع أنحاء العالم المرتبطة بمحتوى URrevs والموقع الإلكتروني ، وهي محمية بموجب حقوق الطبع والنشر واللباس التجاري وبراءات الاختراع والعلامات التجارية. وجميع الحقوق والقوانين الفكرية والملكية السارية. على هذا النحو ، لا يجوز لك تعديل أو إعادة إنتاج أو توزيع أو إنشاء أعمال أو اشتقاقات مشتقة أو عرض أي محتوى من محتوى URrevs كليًا أو جزئيًا بأي شكل أو جزء منه باستثناء ما هو مخول صراحة من URrevs.باستثناء ما هو منصوص عليه صراحة وبلا لبس فيه ، لا يمنحك URrevs أي حقوق صريحة أو ضمنية. يتم الاحتفاظ بجميع الحقوق في وإلى موقع الويب ومحتوى URrevs بواسطة URrevs.`,
      copyrightPolicy: `سياسة حقوق النشر`,
      copyrightPolicyParagraph: `لا يجوز لك نشر أو تعديل أو توزيع أو إعادة إنتاج بأي شكل من الأشكال أي مواد أو علامات تجارية أو حقوق ملكية خاصة بحقوق الطبع والنشر تعود ملكيتها للآخرين دون الحصول على موافقة كتابية مسبقة من مالك حقوق الملكية هذه. تقضي سياسة URrevs بإنهاء حساب مستخدم وامتيازات أي مستخدم ل URrevs ينتهك بشكل متكرر حقوق الطبع والنشر للآخرين عند استلام إشعار مناسب إلى URrevs بواسطة مالك حقوق الطبع والنشر أو الوكيل القانوني لمالك حقوق الطبع والنشر. وفقًا لقانون حقوق النشر الرقمية للألفية ، إذا كنت تعتقد أن أيًا من المحتويات التي أنشأها المستخدمون في URrevs أو أي محتوى آخر ينتهك حقوق الطبع والنشر الخاصة بك ، فيرجى تزويد وكيل حقوق الطبع والنشر لدينا بالمعلومات التالية: (1) توقيع إلكتروني أو مادي للشخص المفوض بالتصرف نيابة عن مالك حقوق الطبع والنشر ؛ (2) وصف العمل المحمي بحقوق الطبع والنشر الذي تدعي أنه تم انتهاكه ؛ (3) وصفًا لمكان وجود المادة التي تدعي أنها تمثل انتهاكًا لها في URrevs ؛ (4) عنوانك ورقم هاتفك وعنوان بريدك الإلكتروني ؛ (5) بيان مكتوب من جانبك بأن لديك اعتقاد حسن النية بأن الاستخدام المتنازع عليه غير مصرح به من قبل مالك حقوق الطبع والنشر أو وكيله أو القانون ؛ (6) بيانًا من جانبك ، تم إصداره بموجب عقوبة الحنث باليمين ، بأن المعلومات الواردة أعلاه في إشعارك دقيقة وأنك مالك حقوق الطبع والنشر أو مصرح لك بالتصرف نيابة عن مالك حقوق الطبع والنشر.يمكن الوصول إلى وكيل حقوق الطبع والنشر في URrevs للإشعار بمزاعم انتهاك حقوق الطبع والنشر على النحو التالي: عن طريق إرسال بريد إلكتروني إلى`,
      warrantyDisclaimers: `إخلاء مسؤولية الضمان`,
      warrantyDisclaimersParagraph: `يتم توفير جميع المواد والمعلومات والبرامج والمنتجات والخدمات المدرجة أو المتوفرة من خلال URrevs كما هي "و" كما هي متوفرة "للاستخدام الخاص بك. يتم توفير جميع المواد والمعلومات والبرامج والمنتجات والخدمات المضمنة في أو من خلال هذا الموقع دون ضمانات من أي نوع ، سواء كانت صريحة أو ضمنية ، بما في ذلك ، على سبيل المثال لا الحصر ، ضمانات ضمنية أو الضمانات الخاصة بالتسويق ، الملاءمة لغرض معين أو غير المخالفة.نحن والكيانات الأخرى من ما نحصل عليه لا نضمن أن المواد أو المعلومات أو البرامج أو المنتجات أو الخدمات المدرجة في URrevs دقيقة أو موثوقة أو صحيحة ؛ أو أن URrevs ستكون متوفرة في أي وقت أو موقع محددين ؛أو أنه سيتم تصحيح أي عيوب أو أخطاء ؛ أو أن URrevs يخلو من أي فيروسات أو مكونات ضارة أخرى.استخدامك لهذا الموقع هو وحدك على مسؤوليتك. نظرًا لأن بعض الولايات القضائية لا تسمح باستثناء بعض الضمانات ، فقد لا تنطبق هذه الاستبعادات عليك.`,
      limitationOfLiability: `تحديد المسؤولية`,
      limitationOfLiabilityParagraph: `تحت أي ظرف من الظروف ، لن نتحمل نحن أو أي من الشركات التي نعمل بها معها مسؤولية أي أضرار مباشرة أو غير مباشرة أو عدوانية أو عرضية أو خاصة أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام URrevs. ينطبق هذا القيد على أن المسؤولية المزعومة تستند إلى عقد أو ضرر أو إهمال أو مسؤولية صارمة أو أي أساس آخر ، حتى إذا تم إخطارنا باحتمالية حدوث مثل هذا الضرر وتحت أي ظرف من الظروف التي تسبب أي علاج حصري بموجب هذه الاتفاقية تؤدي إلى فشل غرضها الأساسي.

      أنت تقر بشكل خاص بأن URrevs لن تكون مسؤولة عن أفعال المستخدمين أو السلوك التعسفي أو غير القانوني لأي سلوك من طرف ثالث ومخاطر الضرر أو الضرر الناجم عن القرارات السابقة وأن خطر الإضرار أو الضرر الناجم عن ما تقدم يقع لك تمامًا.
      نظرًا لأن بعض الولايات القضائية لا تسمح باستثناء أو الحد من الأضرار العرضية أو التبعية ، فإن مسؤوليتنا في هذه الولايات القضائية تكون محدودة بالقدر الذي يسمح به القانون.`,
      damagesIndemnification: `الأضرار. التعويض`,
      damagesIndemnificationParagraph: `أنت توافق على أنك ستكون مسؤولاً عن أي أضرار ناتجة عن أي انتهاك لشروط الخدمة هذه. أنت توافق أيضًا على تعويض URrevs وحجزه ، ومالكيها والشركات التابعة لها والمسؤولين والمديرين والوكلاء والموظفين ،URrevs غير مُضارة من أي مطالبة أو طلب ، بما في ذلك أتعاب المحاماة المعقولة ، التي يقدمها أي طرف ثالث بسبب أو الناشئة عن خرقك لـ شروط الخدمة هذه ، أو أي انتهاك لأي قانون أو حقوق أي طرف ثالث يحدث فيما يتعلق باستخدامك لـ URrevs.`,
      choiceOfLawAndForum: `اختيار القانون والمحكمة`,
      choiceOfLawAndForumParagraph: `تخضع شروط الخدمة هذه وتفسر وفقًا لقوانين الدولة المصرية ، باستثناء قواعد تنازع القوانين. أنت توافق على أنه ، ما لم نتنازل صراحةً ، فإن الاختصاص الحصري لأي مطالبة أو إجراء ينشأ عن أو يتعلق بهذه الشروط أو استخدامك لـ URrevs سيكون في المحاكم الموجودة في القاهرة ، مصر وتوافق كذلك على الخضوع لممارسة الاختصاص الشخصي لمثل هذه المحاكم لغرض التقاضي بشأن أي دعوى أو إجراء من هذا القبيل. أنت توافق على تلقي خدمة العملية او الإخطار من خلال البريد الإلكتروني أو البريد المعتمد أو بوسائل أخرى يقرها القانون ، وأنت تتنازل صراحة عن أي ادعاء بوجود مكان غير لائق وأي ادعاء بأن هذه المحاكم هي منتدى غير مريح. أنت توافق أيضًا على أنه في حالة اتخاذ أي إجراء لتطبيق أو تفسير هذه الشروط والأحكام ، يحق للطرف السائد تحصيل أتعاب المحاماة المعقولة.`,
      modificationAndSeverability: `التعديل والصلاحية`,
      modificationAndSeverabilityParagraph: `تحتفظ URrevs بالحق في إجراء تغييرات على شروط الخدمة هذه وإشعاراتنا القانونية الأخرى فى اى وقت ودون انتظار موافقة من اى مستخدم مع نشر التغييرات الجديدة وتعريف المستخدم بها . ومن خلال الاستمرار في استخدام هذا الموقع الإلكتروني بعد نشرنا لهذه التغييرات ، فإن المستخدم يعد موافق عليها ضمنيا دون اى اعتراض . ويجوز لنا تغيير أو تقييد الوصول إلى URrevs أو تعليقه أو إيقافه أو أي جزء منه في أي وقت.`,
      miscellaneous: `متنوع`,
      miscellaneousParagraph: `أنت و URrevs كيانان مستقلان ، ولا شيء في شروط الخدمة هذه ، أو عن طريق استخدام الموقع الإلكتروني ، سيخلق أي شراكة أو مشروع مشترك أو وكالة أو امتياز أو مندوب مبيعات أو علاقة عمل بين URrevs و بينك. لا يجوز لك نقل أو التنازل عن أي حقوق أو تراخيص ممنوحة بموجب شروط الخدمة هذه ، ولكن قد يتم التنازل عنها بواسطة URrevs دون قيود. إذا اعتبر أي بند من أحكام شروط الخدمة هذه باطلاً أو فاسدة أو لاغية أو غير قابل للتنفيذ لأي سبب آخر ، فيُعتبر هذا الحكم قابلاً للفصل ولا يؤثر على صلاحية وقابلية تنفيذ توازن شروط الخدمة هذه. لا يعني فشل URrevs في ممارسة أو إنفاذ أي حق أو حكم من أحكام شروط الخدمة هذه كتنازل عن هذا الحق أو الحكم. عناوين الأقسام في شروط الخدمة هذه هي للراحة فقط وليس لها أي تأثير قانوني أو تعاقدي. تعمل شروط الخدمة هذه إلى أقصى حد يسمح به القانون.
      إذا كان لديك أي أسئلة بخصوص شروط الخدمة هذه ، فيرجى الاتصال بنا على `,
      iHaveReadTheAgreement: `لقد قرأت هذا الاتفاق وأوافق على جميع الأحكام الواردة أعلاه. `,
    },
    en: {
      title: `Terms Of Service`,
      welcomeMessage: `Welcome to the URrevs (“URrevs” or “Website”) a social networking website that allows its users to share and comment upon a vast variety of consumer electronic products ,simply it is a customer review platform.
      URrevs provides its services to you subject to the provisions of these Terms of Service (“TOS”). By using this Website or viewing the content herein you accept and agree to be bound by these TOS and each of its provisions. This is a legally binding agreement between you and URrevs, so please read it carefully. If you do not agree to these TOS, please do not use URrevs`,
      eligibility: `Eligibility`,
      eligibilityParagraph: `All Users of this Website must be 14 years of age or older. If you do not so qualify, do not attempt to use URrevs. Your User account and your User-Generated Content (as defined below) may be deleted without warning if we believe that you are under 14 years of age.`,
      yourURrevsAccount: `Your URrevs Account`,
      yourURrevsAccountParagraph: ` Website, you will have to create a User account and profile. In creating a User account and profile, we ask that you must provide complete and accurate information about yourself, though you may opt instead to provide information that does not make you personally identifiable to the public. Notwithstanding the foregoing, you may not impersonate someone else (e.g., adopt the identity of a celebrity or your next-door neighbor), provide an email address other than your own, or create multiple User accounts and profiles.
      If you have created a User account with URrevs, you are responsible for the security of your account and password. You agree to accept responsibility for all activities that occur in connection with your account, whether or not the use is unauthorized. In addition, you agree to notify us immediately of any unauthorized use of your account. We reserve the right to close your account, revoke your username, and remove any content submitted by you at any time for any or no reason. You understand that URrevs will not be liable to you for invoking this right.`,
      licenseForPersonalUse: `License for Personal Use`,
      licenseForPersonalUseParahgraph1: `We grant you a limited license and permission to access and make personal use of URrevs but not to download or copy any portion of its content for any commercial purpose or to modify any portion of it, except with our written or e-mailed consent. This license does not include any resale or commercial use of URrevs or its content; any collection or use of “User-Generated Content” (as described below); any derivative use of URrevs or its contents; or any use of data mining, robots or similar data gathering or extraction tools or processes; and you agree not to do any of the foregoing. Except as explicitly provided in these TOS, you agree not to store in any form, distribute, transmit, display, reproduce, modify, create derivative works from, sell or otherwise exploit any of the content of any portion of URrevs for any commercial purpose without prior consent from URrevs. You may display and occasionally print a single copy of pages of URrevs for your personal, non-commercial use, but you may not otherwise reproduce any material appearing on URrevs (other than your own "User-Generated Content," as described below) without our prior written consent. Requests for permission to reproduce or distribute materials found on the Website should be sent to `,
      emailAddress: `this email.`,
      licenseForPersonalUseParahgraph2: ` You may not use our name nor any misspelling or typographical variation of URrevs, whether alone or in conjunction with any other word or phrase, trademarks or service marks in any manner (including use in any metatags or any other "hidden text") without our prior written or e-mailed consent. Any violation of the foregoing will terminate the permission and license granted by us to access and use URrevs.`,
      userGeneratedContent: `User-Generated Content`,
      userGeneratedContentParagraph: `URrevs user account holders may submit content and information, including but not limited to text, data,photos and videos (collectively "User-Generated Content"). You understand that whether or not such User-Generated Content is published, URrevs does not guarantee any confidentiality with respect to any User-Generated Content.
      You agree that your User-Generated Content intended for display on URrevs will not include any content that is illegal, indecent, profane (including masked profanity where symbols, initials, intentional misspellings or other characters are used to suggest profane language), defamatory, invasive of privacy or otherwise injurious to third parties; and that it will not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings or any form of "spam." You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of your User-Generated Content. In additional to the restrictions described above, you may not submit User-Generated Content that infringes in any manner on the copyright, trademark or other intellectual property rights of any person or entity, or that contains any confidential or proprietary information of any person or entity, or that otherwise violates the legal rights of any person or entity. URrevs will remove all User-Generated Content if properly notified that such User-Generated Content infringes on another's intellectual property rights.
      Furthermore, you cannot use URrevs to threaten, stalk, defraud, incite, harass, or advocate the harassment of another person, or otherwise interfere with another User's use of the Website; promote bigotry or discrimination against protected classes; transmit or post pornography or illegal content; use any robot, spider, site search/retrieval application, or other automated device, process or means to access, retrieve, scrape, or index the Website or any content on URrevs; take any action that imposes or may impose an unreasonable or disproportionately large load on URrevs's technology infrastructure; or violate any applicable laws.
      You are solely responsible for and assume all risks associated with your User-Generated Content. This includes any reliance on its accuracy, completeness or usefulness by others, or any disclosure by you of information in your User-Generated Content that makes you personally identifiable. You represent that you own, or have the necessary licenses or permissions to use, and authorize URrevs to use your User-Generated Content as described herein.
      URrevs does not endorse any User-Generated Content or any opinion, recommendation, or advice expressed therein, and URrevs expressly disclaims any and all liability in connection with User-Generated Content. You may not imply that your User-Generated Content is in any way sponsored or endorsed by URrevs.
      We reserve the right, but are not obligated to monitor User-Generated Content on URrevs and restrict or remove such content that we believe, in our sole discretion to be inappropriate. If you feel that any User-Generated Content on URrevs is offensive, violates your rights or this TOS, please email us at `,
      userGeneratedContentParagraph2: ` Subject: Inappropriate Material.`,
      licenseToURrevsAndURrevsUsers: `License to URrevs and URrevs Users`,
      licenseToURrevsAndURrevsUsersParagraph: `You agree that, by posting any User-Generated Content to URrevs, you are granting to URrevs a worldwide, non-exclusive, royalty-free, sublicenseable and transferable license to use, reproduce, distribute, prepare derivative works of, and display that User-Generated Content in connection with the this Website and URrevs’s (and its successors' and affiliates') business, including without limitation for promoting and redistributing part or all of this Website (and derivative works thereof) in any media formats and through any media channels. You are also granting to us the non-exclusive right to seek to enjoin and/or obtain damages from any third party from the unauthorized use or reproduction of your User-Generated Content. If we publish your User-Generated Content or authorize or license others to do so, your User-Generated Content may be edited for length or clarity or for any other reason either before or after it is published.
      You also hereby grant each User of URrevs a non-exclusive license to access your User-Generated Content through the Website, and to use and display such User-Generated Content as permitted through the functionality of the Website and under these TOS.
      The above licenses granted by you terminate within a commercially reasonable time after you remove or delete your User profile or terminate your User account. You understand and agree, however, that URrevs may retain, but not display or distribute, server copies of this User-Generated Content that have been removed or deleted. The above licenses granted by you with respect to your User-Generated Content postings that have been shared with others such as but not limited to discussion comments or products that have become part URrevs’s database are perpetual and irrevocable.`,
      urrevssUseOfUserGeneratedContent: `URrevs’s Use of User-Generated Content`,
      urrevssUseOfUserGeneratedContentParagraph: `URrevs may or may not use your User-Generated Content in its sole discretion. For example, we may choose not to publish your User-Generated Content if we believe it violates the TOS. In addition, please note that we have no obligation to retain or provide you with copies of your User-Generated Content, nor do we guarantee any confidentiality with respect to your User-Generated Content.
      URrevs and its licensees may display advertisements and other information adjacent to or included with your User-Generated Content on the Website and other media. You are not entitled to any compensation for such advertisements. The manner, mode and extent of such advertising are subject to change without specific notice to you.`,
      privacyPolicy: `Privacy Policy`,
      privacyPolicyParagraph: `URrevs’s current Privacy Policy is available at `,
      thisLink: `this link`,
      privacyPolicyParagraph2: ` and is incorporated herein by this reference.`,
      linksToThirdPartyWebsites: `Links to Third Party Websites`,
      linksToThirdPartyWebsitesParagraph: `URrevs may include links to other websites as part of content created by URrevs (“URrevs Content”) or User-Generated Content. URrevs does not control or endorse any content of these third party websites, and, by using URrevs you agree that URrevs is not responsible for the availability or content of such third party websites`,
      termination: `Termination`,
      terminationParagraph: `URrevs reserves the right, in its sole discretion, to restrict, suspend, or terminate your access to all or any part of the Website at any time, including revoking your username, for any or no reason, with or without prior notice, and without liability. URrevs expressly reserves the right to remove your User account and/or restrict, suspend, or terminate your account and your access to any part of the Website if it determines, in its sole discretion, for example, that you breached the TOS or are suspected of involvement in illegal activity.
      You may terminate your account with URrevs at any time, for any reason, by communication with us.
      In the event of any termination, this TOS shall remain in effect`,
      ownership: `Ownership`,
      ownershipParagraph: `URrevs owns the URrevs Content that is available on the Website, including but not limited to visual interfaces, interactive features, graphics, scripts, photos, sounds, music, videos, design, compilation, computer code, products, software, text, aggregate user review ratings, and all other elements and components of the Website, excluding User-Generated Content and any third party content. URrevs also owns or has the license for the copyrights, trademarks, service marks, trade names, and other intellectual and proprietary rights throughout the world associated with the URrevs Content and the Website, which are protected by copyright, trade dress, patent, trademark laws and all other applicable intellectual and proprietary rights and laws. As such, you may not modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way exploit any of the URrevs Content in whole or in part except as expressly authorized by URrevs. Except as expressly and unambiguously provided herein, URrevs does not grant you any express or implied rights. All rights in and to the Website and the URrevs Content are retained by URrevs.`,
      copyrightPolicy: `Copyright Policy`,
      copyrightPolicyParagraph: `You may not post, modify, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information belonging to others without obtaining the prior written consent of the owner of such proprietary rights. It is URrevs’s policy to terminate a User’s account and privileges of any URrevs User who repeatedly infringes the copyright rights of others upon receipt of proper notification to URrevs by the copyright owner or the copyright owner's legal agent. Pursuant to the Digital Millennium Copyright Act, if you believe that any of URrevs’s User-Generated Content or other content infringes on your copyright, please provide our Copyright Agent with the following information: (i) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; (ii) a description of the copyrighted work that you claim has been infringed; (iii) a description of where the material that you claim is infringing is located on URrevs; (iv) your address, telephone number, and email address; (v) a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; (vi) a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf. URrevs's Copyright Agent for notice of claims of copyright infringement can be reached as follows: by sending an email to `,
      warrantyDisclaimers: `Warranty Disclaimers`,
      warrantyDisclaimersParagraph: `ALL MATERIALS, INFORMATION, SOFTWARE, PRODUCTS AND SERVICES INCLUDED IN OR AVAILABLE THROUGH URREV ARE PROVIDED AS IS" AND "AS AVAILABLE" FOR YOUR USE. ALL MATERIALS, INFORMATION, SOFTWARE, PRODUCTS AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THIS WEBSITE ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NONINFRINGEMENT. WE AND THE OTHER ENTITIES FROM WHOM WE OBTAIN CONTENT DO NOT WARRANT THAT THE MATERIALS, INFORMATION, SOFTWARE, PRODUCTS OR SERVICES INCLUDED IN OR AVAILABLE THROUGH URREV ARE ACCURATE, RELIABLE OR CORRECT; THAT URREV WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT URREV IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THIS WEBSITE IS SOLELY AT YOUR RISK. Because some jurisdictions do not permit the exclusion of certain warranties, these exclusions may not apply to you.`,
      limitationOfLiability: `Limitation of Liability`,
      limitationOfLiabilityParagraph: `UNDER NO CIRCUMSTANCES SHALL WE OR ANY OF THE COMPANIES WITH WHICH WE DO BUSINESS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR INABILITY TO USE URREV. THIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR ANY OTHER BASIS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN UNDER CIRCUMSTANCES THAT CAUSE ANY EXCLUSIVE REMEDY UNDER THIS AGREEMENT TO FAIL OF ITS ESSENTIAL PURPOSE.
      YOU SPECIFICALLY ACKNOWLEDGE THAT URREV SHALL NOT BE LIABLE FOR USER SUBMISSIONS OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE RISK OF HARM OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH YOU.
      Because some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, our liability in such jurisdictions shall be limited to the extent permitted by law.`,
      damagesIndemnification: `Damages; Indemnification`,
      damagesIndemnificationParagraph: `You agree that you will be responsible for any damages resulting from any violation of these TOS. You further agree to indemnify and hold URrevs, and its owners, affiliates, officers, directors, agents and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of these TOS, or any violation of any law or the rights of any third party that occurs in connection with your use of URrevs.`,
      choiceOfLawAndForum: `Choice of Law and Forum`,
      choiceOfLawAndForumParagraph: `These TOS shall be governed by and construed in accordance with the laws of nation of Egypt, excluding conflicts of law rules. You agree that, unless expressly waived by us, the exclusive jurisdiction for any claim or action arising out of or relating to these TOS or your use of URrevs shall be in the courts located in cairo, Egypt and you further agree and submit to the exercise of personal jurisdiction of such courts for the purpose of litigating any such claim or action. You agree to receive service of process through e-mail, certified mail or by other means sanctioned by law, and you expressly waive any claim of improper venue and any claim that such courts are an inconvenient forum. You also agree that in the event of any action to enforce or interpret these TOS, the prevailing party shall be entitled to collect its reasonable attorney fees.`,
      modificationAndSeverability: `Modification and Severability`,
      modificationAndSeverabilityParagraph: `URrevs reserves the right to make changes to these TOS and our other legal notices at any time without notice to you. By continuing to use this Website following our posting of such changes, you agree to be bound by these TOS as modified. We may change, restrict access to, suspend or discontinue URrevs, or any portion of thereof, at any time.`,
      miscellaneous: `Miscellaneous`,
      miscellaneousParagraph: `URrevs and you are independent entities, and nothing in these TOS, or via use of the Website, will create any partnership, joint venture, agency, franchise, sales representative, or employment relationship between URrevs and you. Any rights and licenses granted under these TOS, may not be transferred or assigned by you, but may be assigned by URrevs without restriction. If any of provision of these TOS shall be deemed invalid, void or for any other reason unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the balance of these TOS. The failure of URrevs to exercise or enforce any right or provision of this TOS shall not operate as a waiver of such right or provision. The section titles in this TOS are for convenience only and have no legal or contractual effect. This TOS operates to the fullest extent permissible by law.
      If you have any questions regarding these TOS, please contact us at `,
      iHaveReadTheAgreement: `I HAVE READ THIS AGREEMENT AND AGREE TO ALL OF THE PROVISIONS CONTAINED ABOVE.`,
    },
  };
  const headerStyling = "S20W700C050505";
  const subHeaderStyling = "";
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        direction: direction,
      }}
    >
      <CustomAppBar label={pageDictionary[language].title} showLabel showLogo>
        <AlonePostsGrid>
          <Stack spacing={2}>
            <div></div>

            {/* Welcome Message */}
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].welcomeMessage}
            </Typography>

            {/* Eligibility Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].eligibility}
            </Typography>
            <Typography>
              {pageDictionary[language].eligibilityParagraph}
            </Typography>

            {/* Your URrevs Account Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].yourURrevsAccount}
            </Typography>

            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].yourURrevsAccountParagraph}
            </Typography>

            {/* License For Personal Use Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].licenseForPersonalUse}
            </Typography>

            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].licenseForPersonalUseParahgraph1}
              <Link href="mailto: urrevsofficial@gmail.com" underline="always">
                {pageDictionary[language].emailAddress}
              </Link>
            </Typography>

            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].licenseForPersonalUseParahgraph2}
            </Typography>

            {/* User Generated Content*/}
            <Typography variant={headerStyling}>
              {pageDictionary[language].userGeneratedContent}
            </Typography>

            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].userGeneratedContentParagraph}
              <Link href="mailto: urrevsofficial@gmail.com" underline="always">
                {pageDictionary[language].emailAddress}
              </Link>
              {pageDictionary[language].userGeneratedContentParagraph2}
            </Typography>

            {/* licenseToURrevsAndURrevsUsers Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].licenseToURrevsAndURrevsUsers}
            </Typography>

            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].licenseToURrevsAndURrevsUsersParagraph}
            </Typography>

            {/* urrevssUseOfUserGeneratedContent section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].urrevssUseOfUserGeneratedContent}
            </Typography>

            <Typography variant={subHeaderStyling}>
              {
                pageDictionary[language]
                  .urrevssUseOfUserGeneratedContentParagraph
              }
            </Typography>

            {/*  privacyPolicy section*/}
            <Typography variant={headerStyling}>
              {pageDictionary[language].privacyPolicy}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].privacyPolicyParagraph}
              <Link
                href={`/${ROUTES_NAMES.PRIVACY_POLICY}/${language}`}
                underline="always"
              >
                {pageDictionary[language].thisLink}
              </Link>
              <Typography variant={subHeaderStyling}>
                {pageDictionary[language].privacyPolicyParagraph2}
              </Typography>
            </Typography>

            {/*  linksToThirdPartyWebsites section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].linksToThirdPartyWebsites}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].linksToThirdPartyWebsitesParagraph}
            </Typography>

            {/* termination section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].linksToThirdPartyWebsites}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].terminationParagraph}
            </Typography>

            {/* ownership */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].ownership}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].ownershipParagraph}
            </Typography>

            {/* copyrightPolicy Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].warrantyDisclaimers}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].warrantyDisclaimersParagraph}
            </Typography>

            {/*  limitationOfLiability Section*/}
            <Typography variant={headerStyling}>
              {pageDictionary[language].limitationOfLiability}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].limitationOfLiabilityParagraph}
            </Typography>
            {/* damagesIndemnification Section */}

            <Typography variant={headerStyling}>
              {pageDictionary[language].damagesIndemnification}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].damagesIndemnificationParagraph}
            </Typography>

            {/*  choiceOfLawAndForum Section*/}
            <Typography variant={headerStyling}>
              {pageDictionary[language].choiceOfLawAndForum}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].choiceOfLawAndForumParagraph}
            </Typography>

            {/* Modification And Severability Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].modificationAndSeverability}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].modificationAndSeverabilityParagraph}
            </Typography>

            {/* miscellaneous Section */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].miscellaneous}
            </Typography>
            <Typography variant={subHeaderStyling}>
              {pageDictionary[language].miscellaneousParagraph}
              <Link href="mailto: urrevsofficial@gmail.com">
                {pageDictionary[language].emailAddress}
              </Link>
            </Typography>

            {/* iHaveReadTheAgreement */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].iHaveReadTheAgreement}
            </Typography>
          </Stack>
        </AlonePostsGrid>
      </CustomAppBar>
    </div>
  );
};
