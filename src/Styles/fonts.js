export const getFonts = (isDark) => {
  // these keys is true for light theme
  const LIGHT_FONTS = {
    blue: "#65676b",
    lightBlue: "#2196F3",
    black: "#050505",
    white: "#ffffff",
    grey: "#606266",
    red: "#E41D1D",
  };
  const DARK_FONTS = {
    blue: "#65676b",
    lightBlue: "#2196F3",
    black: "#E4E6EB",
    white: "#E4E6EB",
    grey: "#B0B3B8",
    red: "#E41D1D",
  };

  const FONTS_COLORS = isDark ? DARK_FONTS : LIGHT_FONTS;

  return {
    fontFamily: "Tajawal",

    S12W400C65676b: {
      fontWeight: 400,
      fontSize: 12,
      color: FONTS_COLORS.blue,
    },
    S13W700C2196F3: {
      fontWeight: 700,
      fontSize: 13,
      color: FONTS_COLORS.lightBlue,
    },
    S13W700C050505: {
      fontWeight: 700,
      fontSize: 13,
      color: FONTS_COLORS.black,
    },
    S13W400C2196F3: {
      fontWeight: 400,
      fontSize: 13,
      color: FONTS_COLORS.lightBlue,
    },
    S13W400C65676B: {
      fontWeight: 400,
      fontSize: 13,
      color: FONTS_COLORS.blue,
    },
    // bottom nav bar focused
    S14W700C2196f3: {
      fontWeight: 700,
      fontSize: 14,
      color: FONTS_COLORS.lightBlue,
    },
    S14W700Cffffff: {
      fontWeight: 700,
      fontSize: 14,
      color: FONTS_COLORS.white,
    },
    S14W400C65676b: {
      fontWeight: 400,
      fontSize: 14,
      color: FONTS_COLORS.blue,
    },
    S14W400C606266: {
      fontWeight: 400,
      fontSize: 14,
      color: FONTS_COLORS.grey,
    },
    S14W700CFFFFFF: {
      fontWeight: 700,
      fontSize: 14,
      color: FONTS_COLORS.white,
    },
    S14W700C65676B: {
      fontWeight: 700,
      fontSize: 14,
      color: FONTS_COLORS.blue,
    },
    S14W800C050505: {
      fontWeight: 800,
      fontSize: 14,
      color: FONTS_COLORS.black,
    },
    S14W700C050505: {
      fontWeight: 700,
      fontSize: 14,
      color: FONTS_COLORS.black,
    },

    // review card stars
    S14W500C050505: {
      fontWeight: 500,
      fontSize: 14,
      color: FONTS_COLORS.black,
    },

    // review card date
    S14W400C65676B: {
      fontWeight: 400,
      fontSize: 14,
      color: FONTS_COLORS.blue,
    },
    S14W400C050505: {
      fontWeight: 400,
      fontSize: 14,
      color: FONTS_COLORS.black,
    },
    S16W800C050505: {
      fontWeight: 800,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    S16W800C2196F3: {
      fontWeight: 800,
      fontSize: 16,
      color: FONTS_COLORS.lightBlue,
    },
    S16W800CE41D1D: {
      fontWeight: 800,
      fontSize: 16,
      color: FONTS_COLORS.red,
    },
    S16W300C050505: {
      fontWeight: 300,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    S16W500C2196F3: {
      fontWeight: 500,
      fontSize: 16,
      color: FONTS_COLORS.lightBlue,
    },
    S16W500C050505: {
      fontWeight: 500,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    S16W500C65676b: {
      fontWeight: 500,
      fontSize: 16,
      color: FONTS_COLORS.blue,
    },
    // review card names
    S16W700C050505: {
      fontWeight: 700,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    // pros, cons text
    S16W400C050505: {
      fontWeight: 400,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    S16W900C050505: {
      fontWeight: 900,
      fontSize: 16,
      color: FONTS_COLORS.black,
    },
    S16W400C65676b: {
      fontWeight: 400,
      fontSize: 16,
      color: FONTS_COLORS.blue,
    },
    // review card actions
    S16W700C606266: {
      fontWeight: 700,
      fontSize: 16,
      color: FONTS_COLORS.grey,
    },
    // isLiked button
    S16W700C2196F3: {
      fontWeight: 700,
      fontSize: 16,
      color: FONTS_COLORS.lightBlue,
    },
    S18W500C65676B: {
      fontWeight: 500,
      fontSize: 18,
      color: FONTS_COLORS.blue,
    },
    S18W300C65676b: {
      fontWeight: 500,
      fontSize: 18,
      color: FONTS_COLORS.blue,
    },
    S18W700C65676B: {
      fontWeight: 700,
      fontSize: 18,
      color: FONTS_COLORS.blue,
    },
    S18W700Cffffff: {
      fontWeight: 700,
      fontSize: 18,
      color: FONTS_COLORS.white,
    },
    S18W700C000000: {
      fontWeight: 700,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    S18W800C050505: {
      fontWeight: 800,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    S18W700C050505: {
      fontWeight: 700,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    S18W300C050505: {
      fontWeight: 300,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    S18W400C050505: {
      fontWeight: 400,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    // pros cons titles
    S18W500C050505: {
      fontWeight: 500,
      fontSize: 18,
      color: FONTS_COLORS.black,
    },
    S18W400C65676B: {
      fontWeight: 400,
      fontSize: 18,
      color: FONTS_COLORS.blue,
    },
    S18W700C2196F3: {
      fontWeight: 700,
      fontSize: 18,
      color: FONTS_COLORS.lightBlue,
    },
    //I added this line idk what's the order
    S18W800CFFFFFF: {
      fontWeight: 800,
      fontSize: 18,
      color: FONTS_COLORS.white,
    },

    S20W400C65676B: {
      fontWeight: 400,
      fontSize: 20,
      color: FONTS_COLORS.blue,
    },
    S20W400C050505: {
      fontWeight: 400,
      fontSize: 20,
      color: FONTS_COLORS.black,
    },
    S20W700C050505: {
      fontWeight: 700,
      fontSize: 20,
      color: FONTS_COLORS.black,
    },
    S20W500C050505: {
      fontWeight: 500,
      fontSize: 20,
      color: FONTS_COLORS.black,
    },
    S22W700C050505: {
      fontWeight: 700,
      fontSize: 22,
      color: FONTS_COLORS.black,
    },
    S22W800Cffffff: {
      fontWeight: 800,
      fontSize: 22,
      color: FONTS_COLORS.white,
    },
    S22W500Cffffff: {
      fontWeight: 500,
      fontSize: 22,
      color: FONTS_COLORS.white,
    },
    S22W500C050505: {
      fontWeight: 500,
      fontSize: 22,
      color: FONTS_COLORS.black,
    },
    S22W800C050505: {
      fontWeight: 800,
      fontSize: 22,
      color: FONTS_COLORS.black,
    },
    S24W500C050505: {
      fontWeight: 500,
      fontSize: 24,
      color: FONTS_COLORS.black,
    },
    S28W800C050505: {
      fontWeight: 800,
      fontSize: 28,
      color: FONTS_COLORS.black,
    },
    S32W700C050505: {
      fontWeight: 700,
      fontSize: 32,
      color: FONTS_COLORS.black,
    },
  };
};
