import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@hooks/custom-useSelector";
import { cartActions } from "@store/slices/cart-slice";
import { TextBoldItalic, TextItalic } from "@textComponents";
import CartItem from "components/CartItem";
import { View, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { SaveButton, SaveButtonView, TotalView } from "./styles";
import { bet } from "@store/slices/cart-slice";
import formatMoney from "@utils/format-money";
import { INewBetRequest } from "@interfaces";
import { Bets } from "@services/index";
import CustomModal from "components/CustomModal";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

const Cart: React.FC<StackScreenProps<{}>> = (props) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalText, setDeleteModalText] = useState(
    "Are you sure? You won't be able to revert this!"
  );
  const [betToRemove, setBetToRemove] = useState<bet>();

  const { navigation } = props;
  const deleteHandler = (bet: bet) => {
    const index = cart.bets.find((value) => {
      value.created_at === bet.created_at;
    });
    dispatch(
      cartActions.removeItemFromCart({ index: index, price: bet.price })
    );
  };
  const saveHandler = async () => {
    if (cart.bets.length === 0) {
      setModalText("You don't have items on your cart");
      setModalVisible();
      return;
    }
    let req: INewBetRequest = { games: [] };
    cart.bets.forEach((value) => {
      req.games.push({
        game_id: value.game_id,
        numbers: value.numbers,
      });
    });
    const { newBet } = Bets();
    try {
      await newBet(req);
      setBetPlaced(true);
      dispatch(cartActions.clearCart());
      setModalText("Bets placed sucessfully! Good Luck!");
      setModalVisible();
    } catch (error: any) {
      if (error.data.message) {
        setModalText(error.data.message);
        setModalVisible();
      } else {
        setModalText("Something went wrong, try again");
        setModalVisible();
      }
      console.log(error);
    }
  };
  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };
  const setDeleteModalVisible = () => {
    setShowDeleteModal((prevState) => !prevState);
  };

  const navigateAfterCloseModal = () => {
    if (betPlaced) {
      dispatch(cartActions.toggleCart());
      navigation.navigate("Home" as never, {} as never);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <View style={{ marginLeft: 10, marginTop: 16 }}>
          <TextBoldItalic color="#707070" size={20}>
            CART
          </TextBoldItalic>
        </View>
        <ScrollView style={{ flex: 1, marginLeft: 10 }}>
          {cart.bets.length === 0 && (
            <TextBoldItalic
              size={22}
              style={{ marginTop: 100, textAlign: "center", padding: 20 }}
            >
              There is no items on your cart, place a bet to add it here
            </TextBoldItalic>
          )}
          {cart.bets.map((value) => {
            return (
              <CartItem
                color={value.color}
                numbers={value.numbers}
                price={value.price}
                type={value.type}
                key={value.game_id + "-" + value.numbers.toString()}
                deleteHandler={() => {
                  setBetToRemove(value);
                  setDeleteModalVisible();
                }}
              />
            );
          })}
        </ScrollView>
        <TotalView>
          <TextBoldItalic color="#707070" size={20}>
            CART
          </TextBoldItalic>
          <TextItalic color="#707070" size={20}>
            {" "}
            TOTAL: R$ {formatMoney(cart.total)}
          </TextItalic>
        </TotalView>
        <SaveButtonView>
          <SaveButton onPress={saveHandler}>
            <TextBoldItalic color="#27C383" size={30}>
              Save
            </TextBoldItalic>
            <Ionicons name="arrow-forward" color="#27C383" size={30} />
          </SaveButton>
        </SaveButtonView>
      </View>
      <CustomModal
        isVisible={showModal}
        text={modalText}
        setModalVisible={setModalVisible}
        onModalHideHandler={navigateAfterCloseModal}
      />
      <CustomModal
        isVisible={showDeleteModal}
        text={deleteModalText}
        setModalVisible={setDeleteModalVisible}
        firstButtonText="Cancel"
        secondButton={{
          title: "Delete",
          color: "#FF3030",
          buttonHandler: () => {
            if (betToRemove) {
              deleteHandler(betToRemove);
              setDeleteModalVisible();
            }
          },
        }}
      />
    </SafeAreaView>
  );
};

export default Cart;
