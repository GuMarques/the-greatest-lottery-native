import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login } from "@screens";
const AppStack = createStackNavigator();

const StackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        animationTypeForReplace: "pop",
        headerTitleStyle: {
          fontFamily: "helvetica-bold-italic",
        },
      }}
    >
      <AppStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Home"
        component={Home}
        options={(navData) => {
          return {
            headerTitle: "Recent Games",
          };
        }}
      />
    </AppStack.Navigator>
  );
};

export default StackNavigator;
