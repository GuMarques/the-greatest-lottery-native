import {
  CustomBackButton,
  CustomConfirmButton,
  CustomInput,
  Title,
} from "@components";
import { useState } from "react";
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
import { TextBoldItalic } from "@textComponents";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignUp: React.FC<{}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const printError = (): string => {
    if (nameError.length > 0) {
      return nameError;
    }
    if (emailError.length > 0) {
      return emailError;
    }
    if (passwordError.length > 0) {
      return passwordError;
    }
    return "";
  };

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
                error={nameError.length > 0}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setNameError("")}
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
                value={value}
                onBlur={onBlur}
                error={passwordError.length > 0}
                onChangeText={(value) => onChange(value)}
                onFocus={() => setPasswordError("")}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            )}
          />

          <TextBoldItalic
            size={18}
            style={{ textAlign: "center", paddingTop: 5, color: "red" }}
          >
            {printError()}
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
                <CustomConfirmButton title="Register" OnPress={() => {}} />
              )}
            </View>
            <ButtonsPadding />
            <CustomBackButton
              title="Back        "
              OnPress={() => {}}
              icon="arrow-back"
              iconSide="left"
            />
          </ButtonView>
        </FormView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
