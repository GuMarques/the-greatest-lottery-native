import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CustomView, FormView, ButtonView } from "./styles";
import { TextItalic } from "@textComponents";
import {
  Title,
  CustomInput,
  CustomConfirmButton,
  CustomBackButton,
} from "@components";

const Login: React.FC<{}> = (props) => {
  return (
    <CustomView>
      <Title />
      <FormView>
        <CustomInput placeholder="Email" />
        <CustomInput placeholder="Password" />
        <TouchableOpacity activeOpacity={0.7}>
          <TextItalic
            size={17}
            color={"#C1C1C1"}
            style={{ textAlign: "right", paddingTop: 14, paddingRight: 14 }}
          >
            I forgot my password
          </TextItalic>
        </TouchableOpacity>
        <ButtonView>
          <CustomConfirmButton title="Log In" OnPress={() => {}} />
          <CustomBackButton
            title="Sign Up"
            OnPress={() => {}}
            icon="arrow-forward"
          />
        </ButtonView>
      </FormView>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "helvetica-italic",
  },
});

export default Login;
