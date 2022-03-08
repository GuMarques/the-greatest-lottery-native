import { CustomConfirmButton, CustomModal, Title } from "@components";
import { CustomInput } from "@components";
import {
  ActivityIndicator,
  ScrollView,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { FormView, ButtonView, CustomView } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import CustomColors from "@constants/CustomColors";
import { useEffect } from "react";
import { useAppSelector } from "@hooks/custom-useSelector";
import User from "@services/user";
import { useDispatch } from "react-redux";
import { userActions } from "@store/slices/user-slice";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const Account: React.FC<{}> = (props) => {
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

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
    if (errors.name?.message) {
      setNameError(true);
      setModalText(
        errors.name?.message.charAt(0).toUpperCase() +
          errors.name?.message.slice(1)
      );
      setModalVisible();
      return;
    }
  }, [errors]);

  const onSubmitHandler = handleSubmit(async (data) => {
    setIsLoading(true);
    const { updateMyUser } = User();
    try {
      const res = await updateMyUser({ email: data.email, name: data.name });
      setValue("name", res.name);
      setValue("email", res.email);
      setIsLoading(false);
      setModalText("Infos updated sucessfully!");
      dispatch(userActions.updateInfos({ user: res }));
      setModalVisible();
    } catch (error: any) {
      setIsLoading(false);
      setModalText("Something went wrong, please try again");
      setModalVisible();
    }
  });

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          enabled={true}
          behavior={"height"}
        >
          <CustomView>
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
                      title="Save"
                      OnPress={onSubmitHandler}
                    />
                  )}
                </View>
              </ButtonView>
            </FormView>
            <CustomModal
              isVisible={showModal}
              text={modalText}
              setModalVisible={setModalVisible}
            />
          </CustomView>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
