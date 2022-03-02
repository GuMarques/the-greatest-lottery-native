import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
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
import { userActions } from "@store/slices/user-slice";
import Auth from "@services/auth";
import CustomColors from "@constants/CustomColors";
import { StackScreenProps } from "@react-navigation/stack";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: React.FC<StackScreenProps<{}>> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { navigation } = props;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const onSignUpClick = () => {
    navigation.push("SignUp" as never, {} as never);
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);
    const { login } = Auth();
    try {
      const res = await login({ email: data.email, password: data.password });
      dispatch(userActions.login({ user: res.user, token: res.token }));
      //navigation.replace("Drawer" as never, {} as never);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      alert("Error", error.data.message);
    }
  });

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
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
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Password"
                autoCapitalize="none"
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
          </TouchableOpacity>
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

          <ButtonView>
            <View style={{ height: 57.9 }}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={CustomColors.primary}
                  style={{ marginTop: 15 }}
                />
              ) : (
                <CustomConfirmButton title="Log In" OnPress={onSubmitHandler} />
              )}
            </View>
            <ButtonsPadding />

            <CustomBackButton
              title="Sign Up"
              OnPress={onSignUpClick}
              icon="arrow-forward"
            />
          </ButtonView>
        </FormView>
      </CustomView>
    </ScrollView>
  );
};

export default Login;
