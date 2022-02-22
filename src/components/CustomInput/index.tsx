import { TextInputProps } from "react-native";
import { CustomInput as TextInput } from "./styles";

const CustomInput: React.FC<TextInputProps> = (props) => {
  return <TextInput {...props} placeholderTextColor="#9D9D9D" />;
};

export default CustomInput;
