import {
  CustomBackButton,
  CustomConfirmButton,
  CustomInput,
  CustomModal,
  Title,
} from "@components";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "navigation/UnauthenticatedStack";
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { ButtonsPadding, ButtonView, CustomView, FormView } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import CustomColors from "@constants/CustomColors";
import { Auth } from "@services/index";

type ResetPasswordNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

type ResetPasswordRouteProp = RouteProp<RootStackParamList, "ResetPassword">;

type Props = {
  route: ResetPasswordRouteProp;
  navigation: ResetPasswordNavigationProp;
};

const schema = yup.object().shape({
  newPassword: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")]),
});

const ResetPassword = ({ route, navigation }: Props) => {
  const { token } = route.params;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReseted, setPasswordReseted] = useState(false);

  useEffect(() => {
    if (errors.newPassword?.message) {
      setNewPasswordError(true);
      setModalText(
        errors.newPassword?.message.charAt(0).toUpperCase() +
          errors.newPassword?.message.slice(1)
      );
      setModalVisible();
      return;
    }
    if (errors.confirmPassword) {
      setConfirmPasswordError(true);
      setModalText(
        "New Password and Confirm Password do not match, please try again."
      );
      setModalVisible();
    }
  }, [errors]);

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);
    const { changePassword } = Auth();
    try {
      await changePassword(token, data.newPassword);
      setModalText("Password updated successfully");
      setPasswordReseted(true);
      setIsLoading(false);
      setModalVisible();
    } catch (error: any) {
      setIsLoading(false);
      if (error.message) {
        setModalText(error.message);
        setModalVisible();
      } else {
        setModalText("Fail to update password. Please try again");
        setModalVisible();
      }
    }
  });

  const navigateAfterCloseModal = () => {
    if (passwordReseted) {
      navigation.popToTop();
    }
  };

  const backButtonHandler = () => {
    navigation.popToTop();
  };

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <CustomView>
          <Title />
          <FormView>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value, onBlur } }) => (
                <CustomInput
                  placeholder="New Password"
                  value={value}
                  onBlur={onBlur}
                  error={newPasswordError}
                  onChangeText={(value) => onChange(value)}
                  onFocus={() => setNewPasswordError(false)}
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value, onBlur } }) => (
                <CustomInput
                  placeholder="Confirm Password"
                  value={value}
                  onBlur={onBlur}
                  error={confirmPasswordError}
                  onChangeText={(value) => onChange(value)}
                  onFocus={() => setConfirmPasswordError(false)}
                  secureTextEntry={true}
                  keyboardType="default"
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
                    title="Change Password"
                    OnPress={onSubmitHandler}
                  />
                )}
              </View>
              <ButtonsPadding />
              <CustomBackButton
                title="Cancel      "
                OnPress={backButtonHandler}
                icon="arrow-back"
                iconSide="left"
              />
            </ButtonView>
          </FormView>
        </CustomView>
        <CustomModal
          isVisible={showModal}
          text={modalText}
          setModalVisible={setModalVisible}
          onModalHideHandler={navigateAfterCloseModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
