import styled from "styled-components/native";

export const BetContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const Bar = styled.View<{ color: string }>`
  width: 6px;
  height: 94px;
  border-radius: 100px;
  margin-left: 5px;
  background-color: ${({ color }) => color};
`;

export const InfoContainer = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`;

export const GameView = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
