import { ButtonContainer } from "./styles";
import { TextBoldItalic } from "@textComponents";
import IGame from "shared/interfaces/IGame";

const GameButton: React.FC<{
  game: IGame;
  active: boolean;
  onPress: () => void;
}> = (props) => {
  const { game, active, onPress } = props;
  return (
    <ButtonContainer
      active={active}
      game={game}
      activeOpacity={0.3}
      onPress={onPress}
    >
      <TextBoldItalic size={14} color={active ? "#FFF" : game.color}>
        {game.type}
      </TextBoldItalic>
    </ButtonContainer>
  );
};

export default GameButton;
