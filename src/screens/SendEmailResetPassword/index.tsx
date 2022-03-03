import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CustomBackButton,
  CustomConfirmButton,
  CustomModal,
  Title,
} from "@components";
import { ButtonsPadding, ButtonView, CustomView, FormView } from "./styles";
import { CustomInput } from "components/CustomInput/styles";
import { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CustomColors from "@constants/CustomColors";
import { Auth } from "@services/index";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const SendEmailResetPassword: React.FC<StackScreenProps<{}>> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { navigation } = props;
  const [emailError, setEmailError] = useState(false);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [errors]);

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  const backButtonHandler = () => {
    navigation.goBack();
  };

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);
    const { resetPassword } = Auth();
    try {
      const res = await resetPassword(data.email);
      navigation.push("ResetPassword" as never, { token: res.token } as never);
    } catch (error: any) {
      setIsLoading(false);
      if (error.message) {
        setModalText(error.message);
      } else {
        setModalText("Something went wrong, try again");
      }
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
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
                    title="Send link"
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
        </CustomView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendEmailResetPassword;
