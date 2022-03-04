import styled from "styled-components/native";

export const Button = styled.TouchableOpacity<{
  active: boolean;
  activeColor: string;
}>`
  width: 60px;
  height: 60px;
  background-color: ${({ active, activeColor }) =>
    active ? activeColor : "#adc0c4"};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
