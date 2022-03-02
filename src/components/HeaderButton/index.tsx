import React from "react";
import {
  HeaderButton as Button,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import CustomColors from "@constants/CustomColors";

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  return (
    <Button {...props} IconComponent={Ionicons} iconSize={23} color="#000" />
  );
};

export default HeaderButton;
