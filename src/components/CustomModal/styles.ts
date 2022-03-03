import CustomColors from "@constants/CustomColors";
import styled from "styled-components/native";

interface IModalDimension {
  width: number;
  height: number;
}

export const ModalView = styled.View<IModalDimension>`
  background-color: #fff;
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  padding: 20px;
`;

export const ButtonView = styled.View<{ doubleButton?: boolean }>`
  flex-direction: row-reverse;
  justify-content: ${({ doubleButton }) =>
    doubleButton ? "space-between" : "center"};
  margin-top: auto;
`;

export const ModalButton = styled.TouchableOpacity<{ customColor?: string }>`
  background-color: ${({ customColor }) =>
    customColor ? customColor : CustomColors.primary};
  padding: 5px;
  width: 40%;
  border-radius: 8px;
`;
