import { commonStackScreenOptions } from "./commonOptions";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, SignUp } from "@screens";

const StackNavigator = createStackNavigator();

const UnauthenticatedStack: React.FC<{}> = (props) => {
  return (
    <StackNavigator.Navigator
      screenOptions={{ headerShown: false, ...commonStackScreenOptions }}
    >
      <StackNavigator.Screen name="Login" component={Login} />
      <StackNavigator.Screen name="SignUp" component={SignUp} />
    </StackNavigator.Navigator>
  );
};

export default UnauthenticatedStack;
