import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "@screens";
import StackNavigator from "./StackNavigator";

const AppDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Stack" component={StackNavigator} />
    </AppDrawer.Navigator>
  );
};

export default DrawerNavigator;
