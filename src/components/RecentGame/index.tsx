import { Text, TextBoldItalic } from "@textComponents";
import { IBet } from "@interfaces";
import { Bar, BetContainer, InfoContainer } from "./styles";
import formatDate from "@utils/format-date";
import formatMoney from "@utils/format-money";
import { useAppSelector } from "@hooks/custom-useSelector";

const RecentGame: React.FC<{ bet: IBet }> = (props) => {
  const { bet } = props;
  const game = useAppSelector((state) =>
    state.games.types.find((game) => {
      return game.id === bet.type.id;
    })
  );
  const color = game?.color || "#000";
  return (
    <BetContainer>
      <Bar color={color} />
      <InfoContainer>
        <TextBoldItalic size={18} color={"#868686"}>
          {bet.choosen_numbers.replace(/,/g, ", ")}.
        </TextBoldItalic>
        <Text size={15} color={"#868686"}>
          {formatDate(bet.created_at)} - (R$ {formatMoney(bet.price)})
        </Text>
        <TextBoldItalic size={18} color={color}>
          {bet.type.type}
        </TextBoldItalic>
      </InfoContainer>
    </BetContainer>
  );
};

export default RecentGame;
