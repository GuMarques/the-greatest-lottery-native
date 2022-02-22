import CustomColors from "@constants/CustomColors";
import { TextBoldItalic } from "@textComponents";
import { CustomButton } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const CustomConfirmButton: React.FC<{ OnPress: () => void; title: string }> = (
  props
) => {
  const { OnPress, title } = props;
  return (
    <CustomButton activeOpacity={0.7} onPress={OnPress}>
      <TextBoldItalic
        color={CustomColors.primary}
        size={35}
        style={{ marginRight: 10 }}
      >
        {title}
      </TextBoldItalic>
      <Ionicons name="arrow-forward" size={38} color={CustomColors.primary} />
    </CustomButton>
  );
};

export default CustomConfirmButton;
