import { commonStackScreenOptions } from "./commonOptions";
import { createStackNavigator } from "@react-navigation/stack";
import UnauthenticatedStack from "./UnauthenticatedStack";
import DrawerNavigator from "./DrawerNavigator";
import { Startup } from "@screens";

const StackNavigator = createStackNavigator();

const BaseStack: React.FC<{}> = (props) => {
  return (
    <StackNavigator.Navigator
      screenOptions={{ headerShown: false, ...commonStackScreenOptions }}
    >
      <StackNavigator.Screen name="Startup" component={Startup} />
      <StackNavigator.Screen
        name="Unauthenticated"
        component={UnauthenticatedStack}
      />
      <StackNavigator.Screen name="Drawer" component={DrawerNavigator} />
    </StackNavigator.Navigator>
  );
};

export default BaseStack;
