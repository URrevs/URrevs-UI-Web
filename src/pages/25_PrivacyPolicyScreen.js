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

      اخيرا .. فنحن ملزمون ضمن بنود هذه الاتفاقية بان نبين لك كيفية تعطيل خاصية الكوكيز ، يمكنك فعل ذلك من خلال خيارات المتصفح الخاص بك .`,
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

      Finally, we are obligated within the terms of this agreement to show you how to disable the cookies feature. You can do this through your browser options.`,
    },
  };
  // const headerStyle = "";
  // const subHeaderStyle = "";
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        direction: direction,
      }}
    >
      <CustomAppBar showLogo label={pageDictionary[language].title} showLabel>
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
            <div></div>
          </Stack>
        </AlonePostsGrid>
      </CustomAppBar>
    </div>
  );
};
