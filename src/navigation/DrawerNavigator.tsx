import { Button, Platform, TouchableOpacity, View } from "react-native";
import { DrawerInfos, HeaderButton, LogoutButton } from "@components";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Account, Home, NewBet } from "@screens";
import { SafeAreaView } from "react-navigation";
import { useDispatch } from "react-redux";
import { userActions } from "@store/slices/user-slice";
import { cartActions } from "@store/slices/cart-slice";
import { useAppSelector } from "@hooks/custom-useSelector";

const AppDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const userInfo = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <AppDrawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView
              style={{ flex: 1 }}
              forceInset={{ top: "always", horizontal: "never" }}
            >
              <DrawerInfos name={userInfo.name} email={userInfo.email} />
              <DrawerItemList {...props} />
              <View style={{ position: "absolute", bottom: 20 }}>
                <LogoutButton
                  onPress={() => {
                    dispatch(userActions.logout());
                  }}
                />
              </View>
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
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  iconName={Platform.select({
                    ios: "ios-cart",
                    android: "md-cart",
                  })}
                  title="Cart"
                  onPress={() => dispatch(cartActions.toggleCart())}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <AppDrawer.Screen
        name="Account"
        component={Account}
        options={(navData) => {
          return {
            headerTitle: "My Account",
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.select({
                  ios: "ios-person",
                  android: "md-person",
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
