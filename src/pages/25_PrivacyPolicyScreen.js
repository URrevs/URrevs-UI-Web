import { Link, Stack, Typography } from "@mui/material";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ROUTES_NAMES from "../RoutesNames";
export const PrivacyPolicyScreen = () => {
  const language =
    window.location.pathname === `/${ROUTES_NAMES.PRIVACY_POLICY}/ar`
      ? "ar"
      : "en";
  const direction = language === "ar" ? "rtl" : "ltr";
  const pageDictionary = {
    ar: {
      title: `سياسةالخصوصية`,
      introduction: `موقع يوريفز (URrevs) يعتبر اول موقع متخصص لمراجعات المستخدمين في الشرق الاوسط و ايضا يوجد عليه مواصفات الاجهزة الالكترونية و اسعارها`,
      paragraph: `ملفات الدخول :

      و هي مثل بقية المواقع فنحن نستخدم ملفات الدخول ويشمل بروتوكول الانترنت (عناوين ، نوع المتصفح ، مزود خدمة الانترنت (مقدمي خدمات الانترنت) ، التاريخ / الوقت ، وعدد النقرات لتحليل الاتجاهات وادارة الموقع ).
      في حالة تسجيل الدخول لدينا قد يستخدم موقع يوريفز احصائيات مثل السن و الموقع و الجنس لتحسين خدمات الموقع و رفع جودة المحتوي.
      
      و لا يقصد بجمع هذه المعلومات التلصص علي الزوار و لكن لاغراض تحسين الخدمة و كما ان جميع المعلومات المحفوظة من طرفنا سرية.
      
      الكوكيز و اعدادات الشبكة:
      
      الموقع يوريفز يستخدم الكوكيز لتخزين معلومات عن التفضيلات للزائرين , الي جانب سجل خاص للمستخدم تسجل فيه معلومات محددة عن الصفحات التي تم الوصول اليها لمعرفة اهتمامات الزائرين لتطوير الموقع حتي يناسبهم أكثر و يقدم لهم كل ما يحتاجونه في مكان واحد .
      
      و ايضا بعض الشركات التي تعلن لدينا من الممكن ان تطلع علي هذه الكوكيز و اعدادات الشبكة الخاصة بموقعنا ، و من هذه الشركات جوجل ادسنس (Google Adsense) .
      
      
      هذه الشركات المعلنة و التي تعتبر طرف ثالث في سياسة الخصوصية هذه قد تطلع علي مثل هذه البيانات و الاحصائيات عبر بروتوكولات الانترنت لتحسين جودة اعلاناتها و قياس مدي فعاليتها ، وهذه الشركات و بموجب الاتفاقيات المبرمة معنا يحق لها استخدام الوسائل التقنية مثل ( الكوكيز ، اعدادات الشبكة ، واكواد برمجية خاصة “جافا سكربت” ) لنفس الاغراض المذكروة اعلاه والتي تتلخص في تطوير المحتوى الاعلاني لهذه الشركات وقياس مدى فاعلية هذه الاعلانات ، من دون اي اهداف اخرى قد تضر بشكل او بآخر بالمستخدمين على الشبكة .
      
      موقع يوريفز لا يستطيع الوصول او السيطرة علي هذه الملفات ، بعد سماحك و تفعيلك لاخذها من جهازك (الكوكيز) ، كم و نعتبر انفسنا غير مسؤوليين باي شكل من الاشكال عن الاستخدام الغير شرعي لها إن حصل .
      
      عليك مراجعة `,
      privacyPolicy: "سياسة الخصوصية ",
      paragraph2: `الخاصة بالطرف الثالث في هذه الوثقية (الشركات المعلنة “`,
      adSense: `ادسنس AdSense`,
      paragraph3: `” ) او خوادم الشبكات الاعلانيه لمزيد من المعلومات عن ممارساتها وانشطتها المختلفة .

      اخيرا .. فنحن ملزمون ضمن بنود هذه الاتفاقية بان نبين لك كيفية تعطيل خاصية الكوكيز ، يمكنك فعل ذلك من خلال خيارات المتصفح الخاص بك .
      
      أنشأ URrevs تطبيق URrevs كتطبيق تجاري. يتم توفير هذه الخدمة من قبل URrevs وهي مخصصة للاستخدام كما هي.
      تُستخدم هذه الصفحة لإعلام الزائرين بسياساتنا المتعلقة بجمع المعلومات الشخصية واستخدامها والكشف عنها إذا قرر أي شخص استخدام خدمتنا.
      إذا اخترت استخدام خدمتنا ، فأنت توافق على جمع واستخدام المعلومات المتعلقة بهذه السياسة. تُستخدم المعلومات الشخصية التي نجمعها لتوفير الخدمة وتحسينها. لن نستخدم أو نشارك معلوماتك مع أي شخص باستثناء ما هو موضح في سياسة الخصوصية هذه.
      المصطلحات المستخدمة في سياسة الخصوصية هذه لها نفس المعاني الواردة في الشروط والأحكام الخاصة بنا ، والتي يمكن الوصول إليها في URrevs ما لم يتم تحديد خلاف ذلك في سياسة الخصوصية هذه.
      
      `,
      informationCollectionAndUse: `جمع المعلومات واستخدامها`,
      informationCollectionAndUseParagraph: `للحصول على تجربة أفضل ، أثناء استخدام خدمتنا ، قد نطلب منك تزويدنا بمعلومات تعريف شخصية معينة. سيتم الاحتفاظ بالمعلومات التي نطلبها من قبلنا واستخدامها كما هو موضح في سياسة الخصوصية هذه.
      يستخدم التطبيق خدمات الجهات الخارجية التي قد تجمع المعلومات المستخدمة لتحديد هويتك.
      رابط لسياسة الخصوصية لمقدمي خدمات الطرف الثالث التي يستخدمها التطبيق`,
      informationCollectionAndUseGooglePlayServices: `Google Play Services`,
      informationCollectionAndUseGoogleAnalyticsForFirebase: `Google Analytics for Firebase`,
      informationCollectionAndUseFirebaseCrashlytics: `Firebase Crashlytics`,
      informationCollectionAndUseFacebook: `Facebook`,
      logData: `تسجيل البيانات`,
      logDataParagraph: `نود إعلامك أنه كلما استخدمت خدمتنا ، في حالة حدوث خطأ في التطبيق ، نجمع البيانات والمعلومات (من خلال منتجات الجهات الخارجية) على هاتفك تسمى Log Data. قد تتضمن بيانات السجل هذه معلومات مثل عنوان بروتوكول الإنترنت ("IP") الخاص بجهازك ، واسم الجهاز ، وإصدار نظام التشغيل ، ووكيل المستخدم ، وتكوين التطبيق عند استخدام خدمتنا ، ووقت وتاريخ استخدامك للخدمة ، وإحصائيات أخرى.`,
      cookies: `ملفات تعريف الارتباط "الكوكيز"`,
      cookiesParagraph: `ملفات تعريف الارتباط هي ملفات تحتوي على كمية صغيرة من البيانات التي يتم استخدامها بشكل شائع كمعرفات فريدة مجهولة الهوية. يتم إرسالها إلى متصفحك من مواقع الويب التي تزورها ويتم تخزينها على الذاكرة الداخلية لجهازك.
      لا تستخدم هذه الخدمة "ملفات تعريف الارتباط" بشكل صريح. ومع ذلك ، قد يستخدم التطبيق رموزًا ومكتبات تابعة لجهات خارجية تستخدم "ملفات تعريف الارتباط" لجمع المعلومات وتحسين خدماتهم. لديك خيار إما قبول أو رفض ملفات تعريف الارتباط هذه ومعرفة متى يتم إرسال ملف تعريف الارتباط إلى جهازك. إذا اخترت رفض ملفات تعريف الارتباط الخاصة بنا ، فقد لا تتمكن من استخدام بعض أجزاء هذه الخدمة.`,
      serviceProviders: `مقدمي الخدمة`,
      serviceProvidersParagraph: `يجوز لنا توظيف شركات وأفراد تابعين لجهات خارجية للأسباب التالية`,
      serviceProvidersFacilitate: `لتسهيل خدمتنا ؛`,
      serviceProvidersProvideServiceOnOurBehalf: `لتقديم الخدمة نيابة عنا ؛`,
      serviceProvidersPerformServiceRelatedServices: `لأداء الخدمات المتعلقة بالخدمة ؛ أو`,
      serviceProvidersAssistUsinAnalyzing: `لمساعدتنا في تحليل كيفية استخدام خدمتنا.`,
      serviceProvidersParagraph2: `نريد إبلاغ مستخدمي هذه الخدمة أن هذه الأطراف الثالثة لديها حق الوصول إلى معلوماتهم الشخصية. والسبب هو أداء المهام الموكلة إليهم نيابة عنا. ومع ذلك ، فهم ملزمون بعدم الكشف عن المعلومات أو استخدامها لأي غرض آخر.`,
      security: `حماية`,
      securityParagraph: `نحن نقدر ثقتك في تزويدنا بمعلوماتك الشخصية ، وبالتالي فإننا نسعى جاهدين لاستخدام وسائل مقبولة تجاريًا لح                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            مايتها. لكن تذكر أنه لا توجد وسيلة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة وموثوقة بنسبة 100٪ ، ولا يمكننا ضمان أمانها المطلق.`,
      linksToOtherSites: `روابط لمواقع أخرى`,
      linksToOtherSitesParagraph: `قد تحتوي هذه الخدمة على روابط لمواقع أخرى. إذا قمت بالنقر فوق ارتباط جهة خارجية ، فسيتم توجيهك إلى هذا الموقع. لاحظ أن هذه المواقع الخارجية لا يتم تشغيلها بواسطتنا. لذلك ، ننصحك بشدة بمراجعة سياسة الخصوصية الخاصة بهذه المواقع. ليس لدينا أي سيطرة ولا نتحمل أي مسؤولية عن المحتوى أو سياسات الخصوصية أو الممارسات الخاصة بأي مواقع أو خدمات تابعة لجهات خارجية.`,
      childrensPrivacy: `خصوصية الاطفال`,
      childrensPrivacyParagraph: `لا تخاطب هذه الخدمات أي شخص يقل عمره عن 13 عامًا. نحن لا نجمع عن عمد معلومات التعريف الشخصية من الأطفال دون سن 13 عامًا. في الحالة التي اكتشفنا فيها أن طفلًا أقل من 13 عامًا قد زودنا بمعلومات شخصية ، فنحن نحذفها على الفور من خوادمنا. إذا كنت والدًا أو وصيًا وكنت على علم بأن طفلك قد زودنا بمعلومات شخصية ، فيرجى الاتصال بنا حتى نتمكن من القيام بالإجراءات اللازمة. `,
      changesToThisPrivacyPolicy: `التغييرات على سياسة الخصوصية هذه`,
      changesToThisPrivacyPolicyParagraph: `قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. وبالتالي ، يُنصح بمراجعة هذه الصفحة بشكل دوري لمعرفة أي تغييرات. سنخطرك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة.
      هذه السياسة سارية اعتبارًا من 2019-08-08`,
      forAccountDeletion: `لحذف الحساب`,
      forAccountDeletionParagraph1: `يرجى إرسال طلبك إلى `,
      forAccountDeletionParagraph2: `، سيتم مراجعة طلبك وتنفيذه قريبًا.`,
      termsOfService: `شروط الخدمة`,
      termsOfServiceParagraph: `تتوفر شروط خدمة URrevs الحالية على هذا الرابط وتم دمجها هنا من خلال `,
      contactUs: `اتصل بنا`,
      contactUsParagraph: `إذا كانت لديك أي أسئلة أو اقتراحات حول سياسة الخصوصية الخاصة بنا ، فلا تتردد في الاتصال بنا على `,
      emailAddress: `هذا البريد الالكتروني`,
      thisLink: `هذا الرابط`,
    },
    en: {
      title: `Privacy Policy`,
      introduction: `URrevs is the first specialized site for user reviews in the Middle East. It also contains the specifications and prices of electronic devices.`,
      paragraph: `Log files:

      Like other sites, we use log files, including Internet protocol (addresses, browser type, Internet service provider (ISP), date / time, and number of clicks to analyze trends and administer the site).
      If you log in with us, URrevs may use statistics such as age, location and gender to improve the site's services and raise the quality of content.
      
      It is not intended to collect this information to eavesdrop on visitors, but for the purposes of improving the service, and all the information stored by us is confidential.
      
      Cookies and network settings:
      
      The site uses cookies to store information about the preferences of visitors, as well as a special user record in which specific information is recorded about the pages accessed to know the interests of visitors to develop the site to suit them more and provide them with everything they need in one place.
      
      Also, some of the companies that advertise to us may view these cookies and the network settings of our site, and one of these companies is Google Adsense.
      
      These advertisers, which are considered a third party in this privacy policy, may view such data and statistics via Internet protocols to improve the quality of their advertisements and measure their effectiveness, and these companies, under the agreements, concluded with us, have the right to use technical means such as (cookies, network settings, and special “JavaScript” programming codes) for the same purposes mentioned above, which are to develop the advertising content of these companies and measure the effectiveness of these ads, without any other goals that may harm one way or another users on the network.
      
      
      URrevs website cannot access or control these files after you allow and activate them to take them from your computer (cookies), and we consider ourselves not responsible in any way for the illegal use of them if they happen.
      
      You should review the `,
      privacyPolicy: `privacy policy `,
      paragraph2: `of the third party in this document (advertisers “`,
      adSense: `AdSense`,
      paragraph3: `”) or ad network servers for more information on their various practices and activities.

      We are obligated within the terms of this agreement to show you how to disable the cookies feature. You can do this through your browser options.
      URrevs built the URrevs app as a Commercial app. This SERVICE is provided by URrevs and is intended for use as is.
      This page is used to inform visitors regarding our policies regarding the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
      If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
      The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at URrevs unless otherwise defined in this Privacy Policy.
      `,
      informationCollectionAndUse: `Information Collection and Use`,
      informationCollectionAndUseParagraph: `For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
      The app does use third-party services that may collect information used to identify you.
      Link to the privacy policy of third-party service providers used by the app`,
      informationCollectionAndUseGooglePlayServices: `Google Play Services`,
      informationCollectionAndUseGoogleAnalyticsForFirebase: `Google Analytics for Firebase`,
      informationCollectionAndUseFirebaseCrashlytics: `Firebase Crashlytics`,
      informationCollectionAndUseFacebook: `Facebook`,
      logData: `Log Data`,
      logDataParagraph: `We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, user agent, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.      `,
      cookies: `Cookies`,
      cookiesParagraph: `Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
      This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`,
      serviceProviders: `Service Providers`,
      serviceProvidersParagraph: `We may employ third-party companies and individuals due to the following reasons:`,
      serviceProvidersFacilitate: `To facilitate our Service;`,
      serviceProvidersProvideServiceOnOurBehalf: `To provide the Service on our behalf;`,
      serviceProvidersPerformServiceRelatedServices: `To perform Service-related services; or`,
      serviceProvidersAssistUsinAnalyzing: `To assist us in analyzing how our Service is used.`,
      serviceProvidersParagraph2: `We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`,
      security: `Security`,
      securityParagraph: `We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.      `,
      linksToOtherSites: `Links to Other Sites`,
      linksToOtherSitesParagraph: `This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.      `,
      childrensPrivacy: `Children’s Privacy`,
      childrensPrivacyParagraph: `These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.      `,
      changesToThisPrivacyPolicy: `Changes to This Privacy Policy`,
      changesToThisPrivacyPolicyParagraph: `We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
      This policy is effective as of 2019-08-08`,
      forAccountDeletion: `For Account Deletion`,
      forAccountDeletionParagraph1: `Kindly send your request to `,
      forAccountDeletionParagraph2: `, Your request will be reviewed and served shortly.`,
      termsOfService: `Terms of Service`,
      termsOfServiceParagraph: `URrevs’s current Terms of Service are available at `,
      termsOfServiceParagraph2: ` and are incorporated herein by this reference.`,
      contactUs: `Contact Us`,
      contactUsParagraph: `If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at `,
      emailAddress: `This email`,
      thisLink: `This Link`,
    },
  };
  const headerStyling = "S20W700C050505";

  // const subHeaderStyle = "";
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        direction: direction,
      }}
    >
      <CustomAppBar label={pageDictionary[language].title} showLabel>
        <AlonePostsGrid>
          <Stack spacing={5}>
            <div></div>
            <Typography>{pageDictionary[language].introduction}</Typography>
            <img
              height="auto"
              width="60%"
              alt="URrevs"
              src="/images/full_logo.png"
            />
            <Typography>
              {pageDictionary[language].paragraph}
              <Link
                href={`http://www.google.com/privacy.html#utm_source=aso&utm_campaign=ww-ww-et-ashp&utm_medium=link`}
              >
                {pageDictionary[language].privacyPolicy}
              </Link>
              {pageDictionary[language].paragraph2}
              <Link
                href={`https://www.google.com.eg/intl/ar/adsense/start/#/?modal_active=none`}
              >
                {pageDictionary[language].adSense}
              </Link>
              {pageDictionary[language].paragraph3}
            </Typography>
            {/* informationCollectionAndUse */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].informationCollectionAndUse}
            </Typography>
            <Typography>
              {pageDictionary[language].informationCollectionAndUseParagraph}
              <ul>
                <li>
                  <a
                    href="https://policies.google.com/privacy"
                    underline="always"
                  >
                    {
                      pageDictionary[language]
                        .informationCollectionAndUseGooglePlayServices
                    }
                  </a>
                </li>
                <li>
                  <a
                    href="https://firebase.google.com/policies/analytics"
                    underline="always"
                  >
                    {
                      pageDictionary[language]
                        .informationCollectionAndUseGoogleAnalyticsForFirebase
                    }
                  </a>
                </li>
                <li>
                  <a
                    href="https://firebase.google.com/support/privacy/"
                    underline="always"
                  >
                    {
                      pageDictionary[language]
                        .informationCollectionAndUseFirebaseCrashlytics
                    }
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/about/privacy/update/printable"
                    underline="always"
                  >
                    {
                      pageDictionary[language]
                        .informationCollectionAndUseFacebook
                    }
                  </a>
                </li>
              </ul>
            </Typography>
            {/*  logData */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].logData}
            </Typography>
            <Typography>{pageDictionary[language].logDataParagraph}</Typography>
            {/* cookies */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].cookies}
            </Typography>
            <Typography>{pageDictionary[language].cookiesParagraph}</Typography>
            {/* serviceProviders  */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].serviceProviders}
            </Typography>
            <Typography>
              {pageDictionary[language].serviceProvidersParagraph}
              <ul>
                <li>{pageDictionary[language].serviceProvidersFacilitate}</li>
                <li>
                  {
                    pageDictionary[language]
                      .serviceProvidersProvideServiceOnOurBehalf
                  }
                </li>
                <li>
                  {
                    pageDictionary[language]
                      .serviceProvidersPerformServiceRelatedServices
                  }
                </li>
                <li>
                  {pageDictionary[language].serviceProvidersAssistUsinAnalyzing}
                </li>
              </ul>
              {pageDictionary[language].serviceProvidersParagraph2}
            </Typography>
            {/* security */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].security}
            </Typography>
            <Typography>
              {pageDictionary[language].securityParagraph}
            </Typography>
            {/* linksToOtherSites */}
            <Typography varinat={headerStyling}>
              {pageDictionary[language].linksToOtherSites}
            </Typography>
            <Typography>
              {pageDictionary[language].linksToOtherSitesParagraph}
            </Typography>
            {/* childrensPrivacy */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].childrensPrivacy}
            </Typography>
            <Typography>
              {pageDictionary[language].childrensPrivacyParagraph}
            </Typography>
            {/* changesToThisPrivacyPolicy */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].changesToThisPrivacyPolicy}
            </Typography>
            <Typography>
              {pageDictionary[language].changesToThisPrivacyPolicyParagraph}
            </Typography>
            {/* forAccountDeletion */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].forAccountDeletion}
            </Typography>
            <Typography>
              {pageDictionary[language].forAccountDeletionParagraph1}
              <Link href="mailto: urrevsofficial@gmail.com" underline="always">
                {pageDictionary[language].emailAddress}
              </Link>
              {pageDictionary[language].forAccountDeletionParagraph2}
            </Typography>
            {/* termsOfService */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].termsOfService}
            </Typography>
            <Typography>
              {pageDictionary[language].termsOfServiceParagraph}
              <Link
                href="https://docs.google.com/document/d/e/2PACX-1vTG4kawFFmI0ku7erJPGiOlrp6gYW4Ybj-_qHFMSlTWqgI2dSTPYZPTraZh2MMzqxMn7KmZVL0QiOqJ/pub"
                underline="always"
              >
                {pageDictionary[language].thisLink}.
              </Link>
              {pageDictionary[language].termsOfServiceParagraph2}
            </Typography>
            {/* contactUs */}
            <Typography variant={headerStyling}>
              {pageDictionary[language].contactUs}
            </Typography>
            <Typography>
              {pageDictionary[language].contactUsParagraph}
              <Link href="mailto: urrevsofficial@gmail.com" underline="always">
                {pageDictionary[language].emailAddress}.
              </Link>
            </Typography>
            <div></div>
          </Stack>
        </AlonePostsGrid>
      </CustomAppBar>
    </div>
  );
};
