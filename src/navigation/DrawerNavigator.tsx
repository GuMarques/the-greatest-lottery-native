import { Button, Platform, View } from "react-native";
import { HeaderButton } from "@components";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Home, NewBet } from "@screens";
import { SafeAreaView } from "react-navigation";
import CustomColors from "@constants/CustomColors";
import { useDispatch } from "react-redux";
import { userActions } from "@store/slices/user-slice";

const AppDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  return (
    <AppDrawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={CustomColors.secondary}
                onPress={() => {
                  dispatch(userActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
        options={(navData) => {
          return {
            headerTitle: "Recent Games",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.select({
                  ios: "ios-home",
                  android: "md-home",
                })}
                size={23}
                color={drawerConfig.color}
              />
            ),
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="md-menu"
                  title="Menu"
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <AppDrawer.Screen
        name="New Game"
        component={NewBet}
        options={(navData) => {
          return {
            headerTitle: "New Game",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.select({
                  ios: "ios-trophy",
                  android: "md-trophy",
                })}
                size={23}
                color={drawerConfig.color}
              />
            ),
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName="md-menu"
                  title="Menu"
                  onPress={() => navData.navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </AppDrawer.Navigator>
  );
};

export default DrawerNavigator;
