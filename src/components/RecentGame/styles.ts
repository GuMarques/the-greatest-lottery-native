import styled from "styled-components/native";

export const BetContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Bar = styled.View<{ color: string }>`
  width: 6px;
  height: 94px;
  border-radius: 100px;
  background-color: ${({ color }) => color};
`;

export const InfoContainer = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-around;
`;
