import { ButtonContainer } from "./styles";
import { TextBoldItalic } from "@textComponents";
import IGame from "shared/interfaces/IGame";

const GameButton: React.FC<{ game: IGame; active: boolean }> = (props) => {
  const { game, active } = props;
  return (
    <ButtonContainer active={active} game={game} activeOpacity={0.6}>
      <TextBoldItalic size={14} color={active ? "#FFF" : game.color}>
        {game.type}
      </TextBoldItalic>
    </ButtonContainer>
  );
};

export default GameButton;
