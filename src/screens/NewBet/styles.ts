import styled from "styled-components/native";

export const TitleView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const BoardView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
`;

export const ActionButtonsView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ActionButton = styled.TouchableOpacity`
  border-color: #27c383;
  border-width: 1px;
  border-radius: 10px;
  background-color: white;
  color: #27c383;
  width: 48%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartButtonView = styled.View`
  margin-top: 10px;
  justify-content: space-around;
  flex-direction: row;
`;

export const AddToCartButton = styled.TouchableOpacity`
  width: 98%;
  height: 52px;
  border-color: #27c383;
  border-width: 1px;
  border-radius: 10px;
  background-color: #27c383;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
