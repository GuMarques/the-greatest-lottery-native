import React from "react";
import BaseStack from "./BaseStack";
import { useAppSelector } from "@hooks/custom-useSelector";
import { NavigationContainer } from "@react-navigation/native";
import UnauthenticatedStack from "./UnauthenticatedStack";
import { Startup } from "@screens";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator: React.FC<{}> = (props) => {
  const isAuth = useAppSelector((state) => !!state.user.token.token);
  const didTryAutoLogin = useAppSelector(
    (state) => !!state.user.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && didTryAutoLogin && <UnauthenticatedStack />}
      {!isAuth && !didTryAutoLogin && <Startup />}
    </NavigationContainer>
  );
};

export default AppNavigator;
