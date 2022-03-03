import { commonStackScreenOptions } from "./commonOptions";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, ResetPassword, SendEmailResetPassword, SignUp } from "@screens";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SendEmailResetPassword: undefined;
  ResetPassword: { token: string };
};

const StackNavigator = createStackNavigator<RootStackParamList>();

const UnauthenticatedStack: React.FC<{}> = (props) => {
  return (
    <StackNavigator.Navigator
      screenOptions={{ headerShown: false, ...commonStackScreenOptions }}
    >
      <StackNavigator.Screen name="Login" component={Login} />
      <StackNavigator.Screen name="SignUp" component={SignUp} />
      <StackNavigator.Screen
        name="SendEmailResetPassword"
        component={SendEmailResetPassword}
      />
      <StackNavigator.Screen name="ResetPassword" component={ResetPassword} />
    </StackNavigator.Navigator>
  );
};

export default UnauthenticatedStack;
