import { Ionicons } from "@expo/vector-icons";
import { bet } from "@store/slices/cart-slice";
import { Text, TextBoldItalic } from "@textComponents";
import formatMoney from "@utils/format-money";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Bar, BetContainer, GameView, InfoContainer } from "./styles";

const CartItem: React.FC<{
  color: string;
  type: string;
  numbers: [number];
  price: number;
  deleteHandler: (bet: bet) => void;
}> = (props) => {
  const { color, type, numbers, price, deleteHandler } = props;
  const pNumbers = numbers.map((number, index, array) => {
    let response = "";
    if (index !== 0) {
      response += ", ";
    }
    if (number <= 9) {
      response += "0";
    }
    response += "" + number;
    if (index + 1 === array.length) {
      response += ".";
    }
    return response;
  });
  return (
    <BetContainer>
      <TouchableOpacity onPress={deleteHandler} activeOpacity={0.6}>
        <Ionicons name="md-trash-outline" size={23} color="#888888" />
      </TouchableOpacity>
      <Bar color={color} />
      <InfoContainer>
        <TextBoldItalic size={18} color={"#868686"} style={{ marginRight: 30 }}>
          {pNumbers}
        </TextBoldItalic>
        <GameView>
          <TextBoldItalic size={18} color={color}>
            {type}
          </TextBoldItalic>
          <Text size={18} color={"#868686"} style={{ marginLeft: 5 }}>
            R$ {formatMoney(price)}
          </Text>
        </GameView>
      </InfoContainer>
    </BetContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartItem;
