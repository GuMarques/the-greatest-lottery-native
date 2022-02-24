import IGame from "shared/interfaces/IGame";
import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity<{
  game: IGame;
  active: boolean;
}>`
  width: 100px;
  height: 30px;
  border-radius: 100px;
  border-color: ${({ game }) => game.color};
  border-width: 1px;
  align-items: center;
  justify-content: center;
  background-color: ${({ game, active }) => (active ? game.color : "#FFF")};
  margin-bottom: 5px;
  margin-left: 5px;
`;
