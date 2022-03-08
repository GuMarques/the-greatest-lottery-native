import { TextItalic } from "@textComponents";
import { ButtonView, Button } from "./styles";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LogoutButton: React.FC<{ onPress: () => void }> = (props) => {
  const { onPress } = props;
  return (
    <ButtonView>
      <Button onPress={onPress}>
        <Ionicons
          style={{ marginLeft: 20 }}
          size={28}
          name={Platform.select({
            ios: "ios-log-out",
            android: "md-log-out",
          })}
          color="#656566"
        />
        <TextItalic size={15} color="#6c6c6d" style={{ marginLeft: 25 }}>
          Logout
        </TextItalic>
      </Button>
    </ButtonView>
  );
};

export default LogoutButton;
