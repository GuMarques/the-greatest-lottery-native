import CustomColors from "@constants/CustomColors";
import { TextBoldItalic } from "@textComponents";
import { CustomButton } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const CustomBackButton: React.FC<{
  OnPress: () => void;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconSide?: "left" | "right";
}> = (props) => {
  const { OnPress, title, icon, iconSide } = props;
  if (iconSide === "left") {
    return (
      <CustomButton activeOpacity={0.7} onPress={OnPress}>
        <Ionicons name={icon} size={38} color={CustomColors.secondary} />
        <TextBoldItalic
          color={CustomColors.secondary}
          size={35}
          style={{ marginLeft: 10 }}
        >
          {title}
        </TextBoldItalic>
      </CustomButton>
    );
  }
  return (
    <CustomButton activeOpacity={0.7} onPress={OnPress}>
      <TextBoldItalic
        color={CustomColors.secondary}
        size={35}
        style={{ marginRight: 10 }}
      >
        {title}
      </TextBoldItalic>
      <Ionicons name={icon} size={38} color={CustomColors.secondary} />
    </CustomButton>
  );
};

export default CustomBackButton;
