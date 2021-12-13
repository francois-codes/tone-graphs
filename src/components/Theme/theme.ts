import * as R from "ramda";
import { TextStyle, ScaledSize } from "react-native";

const dark = "#343536";
const lighterDark = "#4a4b4c";
const light = "#efefef";
const darkerLight = "#d5d5d5";
const white = "#ffffff";
const black = "#000000";

const primary = "#00bcd4";
const secondary = "#ff9800";

function themeStyle<T>(styles: T) {
  function getStyles(): T {
    return styles;
  }

  getStyles.extend = function (newStyles: T): T {
    return R.mergeDeepRight(styles, newStyles);
  };

  return getStyles;
}

const breakpoints = {
  mobile: 768,
  tablet: 1024,
};

export function responsiveValue<T>(specs: ResponsiveSpecs<T>, dimensions: ScaledSize): T {
  if (dimensions.width < breakpoints.mobile) {
    return specs.mobile;
  } else if (dimensions.width <= breakpoints.tablet) {
    return specs.tablet || specs.desktop;
  } else {
    return specs.desktop;
  }
}

export const theme = (dimensions: ScaledSize) => ({
  colors: {
    primary,
    secondary,
    dark,
    light,
    white,
    black,
    darkerLight,
    lighterDark,
  },
  spacings: {
    xs: 3,
    s: 6,
    m: 12,
    l: 24,
    xl: 48,
    xxl: 96,
  },
  typography: {
    h0: themeStyle<TextStyle>({
      fontSize: responsiveValue<number>({ desktop: 48, mobile: 30 }, dimensions),
      fontFamily: "Open sans",
      fontWeight: "800",
      color: dark,
    }),
    h1: themeStyle<TextStyle>({
      fontSize: responsiveValue<number>({ desktop: 24, mobile: 18 }, dimensions),
      fontFamily: "Open sans",
      fontWeight: "600",
      color: dark,
    }),
    h2: themeStyle<TextStyle>({
      fontSize: responsiveValue<number>({ desktop: 18, mobile: 14 }, dimensions),
      fontFamily: "Open sans",
      fontWeight: "600",
      color: dark,
    }),
    p: themeStyle<TextStyle>({
      fontSize: 12,
      fontFamily: "Open sans",
      fontWeight: "400",
      color: dark,
    }),
    small: themeStyle<TextStyle>({
      fontSize: 10,
      fontFamily: "Open sans",
      fontWeight: "300",
    }),
  },
});
