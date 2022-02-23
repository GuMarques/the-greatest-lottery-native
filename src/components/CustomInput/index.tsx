import { TextInputProps } from "react-native";
import { CustomInput as TextInput } from "./styles";

interface ICustomProps extends TextInputProps {
  error?: boolean;
}

const CustomInput: React.FC<ICustomProps> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={props.error ? "red" : "#9D9D9D"}
      error={props.error}
    />
  );
};

export default CustomInput;
