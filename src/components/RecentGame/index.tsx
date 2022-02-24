import { Text, TextBoldItalic } from "@textComponents";
import { View, StyleSheet } from "react-native";
import { IBet } from "shared/interfaces/IBet";
import { Bar, BetContainer, InfoContainer } from "./styles";
import formatDate from "@utils/format-date";
import formatMoney from "@utils/format-money";

const RecentGame: React.FC<{ bet: IBet }> = (props) => {
  const { bet } = props;
  const color = "#000";
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
        <TextBoldItalic size={18} color={color}>{bet.type.type}</TextBoldItalic>
      </InfoContainer>
    </BetContainer>
  );
};

export default RecentGame;
