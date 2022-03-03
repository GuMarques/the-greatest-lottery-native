import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { CustomView, FormView, ButtonView, ButtonsPadding } from "./styles";
import { Text, TextBoldItalic, TextItalic } from "@textComponents";
import {
  Title,
  CustomInput,
  CustomConfirmButton,
  CustomBackButton,
  CustomModal,
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

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.email?.message) {
      setEmailError(true);
      setModalText(
        errors.email?.message.charAt(0).toUpperCase() +
          errors.email?.message.slice(1)
      );
      setModalVisible();
      return;
    }
    if (errors.password?.message) {
      setPasswordError(true);
      setModalText(
        errors.password?.message.charAt(0).toUpperCase() +
          errors.password?.message.slice(1)
      );
      setModalVisible();
      return;
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
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setModalText("error.data.message");
      setModalVisible();
    }
  });

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  const forgotPasswordHandler = () => {
    navigation.push("SendEmailResetPassword" as never, {} as never);
  };

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
                error={emailError}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setEmailError(false)}
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
                error={passwordError}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setPasswordError(false)}
              />
            )}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={forgotPasswordHandler}>
            <TextItalic
              size={17}
              color={"#C1C1C1"}
              style={{ textAlign: "right", paddingTop: 14, paddingRight: 14 }}
            >
              I forgot my password
            </TextItalic>
          </TouchableOpacity>
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
      <CustomModal
        isVisible={showModal}
        text={modalText}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

export default Login;
