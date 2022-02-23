import styled from "styled-components/native";
import Colors from "@constants/CustomColors";
import { Dimensions } from "react-native";

export const CustomView = styled.View`
  align-items: center;
  padding: 30px;
  padding-left: ${Dimensions.get("window").width < 350 ? "10px" : "50px"};
  padding-right: ${Dimensions.get("window").width < 350 ? "10px" : "50px"};
  margin-top: 20px;
`;

export const ForContainer = styled.View`
  background-color: ${Colors.primary};
  width: 100px;
  border-radius: 100px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
