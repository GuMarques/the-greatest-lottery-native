import { TextBold } from "@textComponents";
import { View, Text } from "react-native";
import { Button } from "./styles";

const BoardButton: React.FC<{
  activeColor: string;
  active: boolean;
  onPress: () => void;
  buttonNumber: number;
}> = (props) => {
  const { activeColor, active, onPress, buttonNumber } = props;
  return (
    <Button
      activeOpacity={0.7}
      onPress={onPress}
      activeColor={activeColor}
      active={active}
    >
      <TextBold color="#FFFFFF" size={20}>
        {buttonNumber}
      </TextBold>
    </Button>
  );
};

export default BoardButton;
