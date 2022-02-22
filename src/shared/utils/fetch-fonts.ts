import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    "helvetica": require("assets/fonts/HelveticaNeueMedium.ttf"),
    "helvetica-bold": require("assets/fonts/HelveticaNeueBold.ttf"),
    "helvetica-light": require("assets/fonts/HelveticaNeue.ttf"),
    "helvetica-italic": require("assets/fonts/HelveticaNeueItalic.ttf"),
    "helvetica-bold-italic": require("assets/fonts/HelveticaNeueBoldItalic.ttf"),
  });
};

export default fetchFonts;
