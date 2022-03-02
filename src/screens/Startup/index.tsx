import CustomColors from "@constants/CustomColors";
import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { ILoginResponse } from "@interfaces";
import { useDispatch } from "react-redux";
import { userActions } from "@store/slices/user-slice";

const Startup: React.FC<{}> = (props) => {
  //const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      dispatch(userActions.triedAutoLogin());
      //await AsyncStorage.removeItem("userData");
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        //navigation.push("Unauthenticated" as never, {} as never);
        return;
      }
      const { user, token }: ILoginResponse = JSON.parse(userData!);
      const expires_at = token.expires_at;
      if (!expires_at || expires_at <= new Date() || !token || !user) {
        dispatch(userActions.logout());
        //navigation.push("Unauthenticated" as never, {} as never);
        return;
      }
      dispatch(
        userActions.authenticate({
          user: user,
          token: token,
        })
      );
      //navigation.push("Drawer" as never, {} as never);
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" color={CustomColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Startup;
