export default interface Dictionary {
  reviewCard: {
    body: {
      pros: string;
      cons: string;
      starsRating: {
        productGeneralRating: string;
        productManufacturerRating: string;
        productBuildRating: string;
        productUIRating: string;
        productPriceRating: string;
        productCameraRating: string;
        productCallQualityRating: string;
        productBatteryRating: string;
      };
    };
    actions: {
      like: string;
      liked: string;
      comment: string;
      share: string;
    };
  };

  appBar: {
    isDark: string;
    isLight: string;
  };
  searchBar: {
    title: string;
  };
  bottomNavBar: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
  };
  drawerTitles: {
    homePage: string;
    reviews: string;
    addReview: string;
    articles: string;
    aboutUs: string;
  };
  addRevLabels: {
    pageName: string;
    selectProduct: string;
    selectProductLabel: string;
    productAge: string;
    productAgeLabel: string;
    productGeneralRating: string;
    Ratings: {
      productBuildRating: string;
      productUIRating: string;
      productPriceRating: string;
      productCameraRating: string;
      productCallQualityRating: string;
      productBatteryRating: string;
    };
    productManufacturerRating: string;
    productPros: {
      text: string;
      label: string;
    };
    productCons: { text: string; label: string };
    companyPros: { text: string; label: string };
    companyCons: { text: string; label: string };
    invitationCode: { text: string; label: string };
    questionMark: string;
    submitButton: string;
  };
}

interface FullDictionary {
  ar: Dictionary;
  en: Dictionary;
}

export const text: FullDictionary = {
  ar: {
    reviewCard: {
      body: {
        pros: "المميزات",
        cons: "العيوب",
        starsRating: {
          productGeneralRating: "التقييم العام للهاتف",
          productManufacturerRating: "تقييم الشركة المصنعة",
          productBuildRating: "جودة التصنيع: ",
          productUIRating: "واجهة المتسخدم:",
          productPriceRating: "القيمة للسعر:",
          productCameraRating: "الكاميرا:",
          productCallQualityRating: "جودة المكالمات:",
          productBatteryRating: "البطارية:",
        },
      },
      actions: {
        like: "اعجاب",
        liked: "أعجبني",
        comment: "تعليق",
        share: "مشاركة",
      },
    },

    appBar: {
      isDark: "مظلم",
      isLight: "مضئ",
    },
    searchBar: {
      title: "ابحث عن هاتف",
    },
    drawerTitles: {
      homePage: "الصفحة الرئيسية",
      reviews: "المراجعات",
      addReview: "اضافة مراجعة",
      articles: "المقالات",
      aboutUs: "عنا",
    },
    bottomNavBar: {
      0: "المنتجات",
      1: "أضف",
      2: "الرئيسية",
      3: "المتصدرين",
      4: "القائمة",
    },
    addRevLabels: {
      pageName: "إضافة مراجعة",
      selectProduct: "أختر المنتج:",
      selectProductLabel: "أكتب أسم المنتج",
      productAge: "منذ متى و انت تمتلك هذا المنتج؟",
      productAgeLabel: "تاريخ الشراء",
      productGeneralRating: "قيم تجربتك العامة مع المنتج:",
      Ratings: {
        productBuildRating: "جودة التصنيع: ",
        productUIRating: "واجهة المتسخدم:",
        productPriceRating: "القيمة للسعر:",
        productCameraRating: "الكاميرا:",
        productCallQualityRating: "جودة المكالمات:",
        productBatteryRating: "البطارية:",
      },
      productManufacturerRating: "كيف تقيم الشركة المصنعة؟",
      productPros: {
        text: "ما الذي أعجبك بشأن هذا المنتج؟",
        label: "المميزات",
      },
      productCons: { text: "ما الذي تكرهه بشأن هذا المنتج؟", label: "العيوب" },
      companyPros: { text: ` ماذا تحب بشأن `, label: "المميزات" },
      companyCons: { text: ` ماذا تكره بشأن `, label: "العيوب" },
      invitationCode: { text: "قم بإدخال كود الدعوة", label: "كود الدعوة" },
      questionMark: "؟",
      submitButton: "أنشر",
    },
  },
  en: {
    reviewCard: {
      body: {
        pros: "Pros",
        cons: "Cons",
        starsRating: {
          productGeneralRating: "General Rating",
          productManufacturerRating: "Brand",
          productBuildRating: "Build:",
          productUIRating: "User Interface:",
          productPriceRating: "Price:",
          productCameraRating: "Camera:",
          productCallQualityRating: "Calling Quality:",
          productBatteryRating: "Battery:",
        },
      },

      actions: {
        like: "Like",
        liked: "Liked",
        comment: "Comment",
        share: "Share",
      },
    },
    bottomNavBar: {
      0: "Products",
      1: "Add",
      2: "Home",
      3: "Leaderboard",
      4: "Menu",
    },
    appBar: {
      isDark: "Dark",
      isLight: "Light",
    },
    searchBar: {
      title: "Search for product",
    },
    drawerTitles: {
      homePage: "Home Page",
      reviews: "Reviews",
      addReview: "Add Review",
      articles: "Articles",
      aboutUs: "About us",
    },
    addRevLabels: {
      pageName: "Add Review",
      selectProduct: "Select the product:",
      selectProductLabel: "Write the product's name",
      productAge: "For how long have you owned this product?",
      productAgeLabel: "Purchase date",
      productGeneralRating: "Rate your overall experince with the product:",
      Ratings: {
        productBuildRating: "Build:",
        productUIRating: "User Interface:",
        productPriceRating: "Price:",
        productCameraRating: "Camera:",
        productCallQualityRating: "Calling Quality:",
        productBatteryRating: "Battery:",
      },
      productManufacturerRating: "How would you rate this brand?",
      productPros: {
        text: "What do you like about this product?",
        label: "Pros",
      },
      productCons: {
        text: "What do you hate about this product?",
        label: "Cons",
      },
      companyPros: { text: `What do you like about `, label: "Pros" },
      companyCons: { text: `What do you hate about `, label: "Cons" },
      invitationCode: {
        text: "Enter the invitation code",
        label: "Invitation Code",
      },
      submitButton: "Post",
      questionMark: "?",
    },
  },
};
