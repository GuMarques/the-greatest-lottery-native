import {
  CustomBackButton,
  CustomConfirmButton,
  CustomInput,
  Title,
  CustomModal,
} from "@components";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { ButtonsPadding, ButtonView, FormView } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomColors from "@constants/CustomColors";
import { StackScreenProps } from "@react-navigation/stack";
import { User } from "@services/index";
import { loginRequest, userActions } from "@store/slices/user-slice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignUp: React.FC<StackScreenProps<{}>> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.name?.message) {
      setNameError(true);
      setModalText(
        errors.name?.message.charAt(0).toUpperCase() +
          errors.name?.message.slice(1)
      );
      setModalVisible();
      return;
    }
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

  const backButtonHandler = () => {
    navigation.goBack();
  };

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);
    const { createUser } = User();
    try {
      const res = await createUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      dispatch(loginRequest({ user: res.user, token: res.token }));
    } catch (error: any) {
      if (error.errors[0].message) setModalText(error.errors[0].message);
      setModalText("Something went wrong, try again");
      setModalVisible();
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <ScrollView>
        <Title />
        <FormView>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Name"
                value={value}
                onBlur={onBlur}
                error={nameError}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setNameError(false)}
                keyboardType="default"
                autoCapitalize="words"
              />
            )}
          />
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
                value={value}
                onBlur={onBlur}
                error={passwordError}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setPasswordError(false)}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            )}
          />
          <ButtonView>
            <View style={{ height: 57.9 }}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={CustomColors.primary}
                  style={{ marginTop: 15 }}
                />
              ) : (
                <CustomConfirmButton
                  title="Register"
                  OnPress={onSubmitHandler}
                />
              )}
            </View>
            <ButtonsPadding />
            <CustomBackButton
              title="Back      "
              OnPress={backButtonHandler}
              icon="arrow-back"
              iconSide="left"
            />
          </ButtonView>
        </FormView>
        <CustomModal
          isVisible={showModal}
          text={modalText}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
