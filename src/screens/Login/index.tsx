import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { CustomView, FormView, ButtonView, ButtonsPadding } from "./styles";
import { TextBoldItalic, TextItalic } from "@textComponents";
import {
  Title,
  CustomInput,
  CustomConfirmButton,
  CustomBackButton,
} from "@components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginRequest } from "@store/slices/user-slice";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: React.FC<{}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.email?.message) {
      setEmailError(
        errors.email?.message.charAt(0).toUpperCase() +
          errors.email?.message.slice(1)
      );
    }
    if (errors.password?.message) {
      setPasswordError(
        errors.password?.message.charAt(0).toUpperCase() +
          errors.password?.message.slice(1)
      );
    }
  }, [errors]);

  const onSubmitHandler = handleSubmit((data) => {
    dispatch(loginRequest({ email: data.email, password: data.password }));
  });

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <CustomView>
        <Title />
        <FormView>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Email"
                value={value}
                onBlur={onBlur}
                error={emailError.length > 0}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setEmailError("")}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry={true}
                error={passwordError.length > 0}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setPasswordError("")}
              />
            )}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <TextItalic
              size={17}
              color={"#C1C1C1"}
              style={{ textAlign: "right", paddingTop: 14, paddingRight: 14 }}
            >
              I forgot my password
            </TextItalic>
            <TextBoldItalic
              size={18}
              style={{ textAlign: "center", paddingTop: 15, color: "red" }}
            >
              {emailError.length > 0
                ? emailError
                : passwordError.length > 0
                ? passwordError
                : null}
            </TextBoldItalic>
          </TouchableOpacity>
          <ButtonView>
            <CustomConfirmButton title="Log In" OnPress={onSubmitHandler} />
            <ButtonsPadding />
            <CustomBackButton
              title="Sign Up"
              OnPress={() => {}}
              icon="arrow-forward"
            />
          </ButtonView>
        </FormView>
      </CustomView>
    </ScrollView>
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
