import CustomColors from "@constants/CustomColors";
import { Text, TextBoldItalic, TextItalic } from "@textComponents";
import {
  ScrollView,
  SafeAreaView,
  View,
  Platform,
  Dimensions,
} from "react-native";
import {
  ActionButton,
  ActionButtonsView,
  AddToCartButton,
  BoardView,
  CartButtonView,
  TitleView,
} from "./styles";
import { useState, useEffect } from "react";
import { IGame } from "@interfaces";
import { BoardButton, Cart, CustomModal, GameButton } from "@components";
import { Games } from "@services/index";
import { useDispatch } from "react-redux";
import { gamesActions } from "@store/slices/games-slice";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useAppSelector } from "@hooks/custom-useSelector";
import { cartActions } from "@store/slices/cart-slice";
import { StackScreenProps } from "@react-navigation/stack";

const NewBet: React.FC<StackScreenProps<{}>> = (props) => {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [activeGame, setActiveGame] = useState<IGame | null>(null);
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();
  const isCartOpened = useAppSelector((state) => state.cart.opened);

  const handlerGameSelection = (game: IGame) => {
    setActiveGame(game);
    setActiveButtons([]);
  };

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const { listGames } = Games();
    try {
      const res = await listGames();
      dispatch(
        gamesActions.setGames({
          min_cart_value: res.min_cart_value,
          types: res.types,
        })
      );
      setGames(res.types);
      if (res.types.length > 0) {
        handlerGameSelection(res.types[0]);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const setModalVisible = () => {
    setShowModal((prevState) => !prevState);
  };

  const drawBoard = () => {
    const buttons = [];
    for (let index = 1; activeGame && index <= activeGame.range; index++) {
      buttons.push(
        <BoardButton
          key={index}
          active={activeButtons.indexOf(index) !== -1}
          buttonNumber={index}
          onPress={() => {
            handleBoardButtonClick(index);
          }}
          activeColor={activeGame.color}
        />
      );
    }
    return buttons;
  };

  const handleBoardButtonClick = (button: number) => {
    if (
      activeButtons.indexOf(button) === -1 &&
      activeButtons.length === activeGame?.max_number
    ) {
      setModalText(
        "You have already selected the maximum numbers for this game"
      );
      setModalVisible();
    } else {
      setActiveButtons((prevState) => {
        let tempArray;
        if (prevState.includes(button)) {
          tempArray = prevState.filter((value) => {
            return value !== button;
          });
        } else {
          tempArray = prevState.concat(button);
        }
        return tempArray;
      });
    }
  };

  const handlerCompleteGame = () => {
    const numbersToFill = activeGame!.max_number - activeButtons.length;
    if (numbersToFill === 0) {
      setModalText("This game already has all the number to place a bet");
      setModalVisible();
      return;
    }
    const tempNumbers = [...activeButtons];
    for (let i = 0; i < numbersToFill; i++) {
      const buttonToPress = Math.floor(Math.random() * activeGame!.range + 1);
      if (tempNumbers.indexOf(buttonToPress) === -1) {
        handleBoardButtonClick(buttonToPress);
        tempNumbers.push(buttonToPress);
      } else {
        i--;
      }
    }
  };

  const handlerClearGame = () => {
    setActiveButtons([]);
  };

  const handlerAddToCart = () => {
    const numbersToFill = activeGame!.max_number - activeButtons.length;
    if (numbersToFill !== 0) {
      setModalText(
        "You need to select " +
          numbersToFill +
          " more numbers to complete this bet."
      );
      setModalVisible();
      return;
    }
    const bet = {
      numbers: [...activeButtons].sort(function (a: number, b: number) {
        return a - b;
      }),
      type: activeGame!.type,
      color: activeGame!.color,
      price: activeGame!.price,
      game_id: activeGame!.id,
      created_at: "" + new Date(),
    };
    dispatch(cartActions.addItemToCart({ bet: bet }));
    setActiveButtons([]);
    setModalText("Game added to your cart");
    setModalVisible();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <TitleView>
          <TextBoldItalic size={20} color={CustomColors.secondary}>
            NEW BET
          </TextBoldItalic>
          <TextItalic size={20} color={CustomColors.secondary}>
            {" "}
            FOR {activeGame?.type.toUpperCase()}
          </TextItalic>
        </TitleView>
        <View>
          <TextBoldItalic
            color={CustomColors.secondary}
            style={{ marginBottom: 10 }}
          >
            Choose a game
          </TextBoldItalic>
          <ScrollView contentContainerStyle={{ marginBottom: 10 }} horizontal>
            {games?.map((game) => {
              return (
                <GameButton
                  key={game.id}
                  game={game}
                  active={activeGame?.id === game.id}
                  onPress={() => handlerGameSelection(game)}
                />
              );
            })}
          </ScrollView>
          <TextBoldItalic
            color={CustomColors.secondary}
            style={{ marginTop: 5 }}
          >
            Fill your bet
          </TextBoldItalic>
          <TextItalic color={CustomColors.secondary}>
            {activeGame?.description}
          </TextItalic>
        </View>
        <BoardView>{drawBoard()}</BoardView>
        <ActionButtonsView>
          <ActionButton activeOpacity={0.6} onPress={handlerCompleteGame}>
            <Text color="#27c383">Complete Game</Text>
          </ActionButton>
          <ActionButton activeOpacity={0.6} onPress={handlerClearGame}>
            <Text color="#27c383">Clear Game</Text>
          </ActionButton>
        </ActionButtonsView>
        <CartButtonView>
          <AddToCartButton activeOpacity={0.6} onPress={handlerAddToCart}>
            <Ionicons
              name={Platform.select({
                ios: "ios-cart",
                android: "md-cart",
              })}
              color="#FFF"
              size={23}
              style={{ marginRight: 5 }}
            />
            <Text color="#FFF" style={{ marginLeft: 5 }}>
              Add to cart
            </Text>
          </AddToCartButton>
        </CartButtonView>
        <CustomModal
          isVisible={showModal}
          text={modalText}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
      <Modal
        isVisible={isCartOpened}
        onBackdropPress={() => dispatch(cartActions.toggleCart())}
        onSwipeComplete={() => dispatch(cartActions.toggleCart())}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        swipeDirection="right"
        useNativeDriver
        hideModalContentWhileAnimating
        propagateSwipe
        style={{
          marginTop: 0,
          marginBottom: 0,
          marginLeft: Dimensions.get("window").width * 0.25,
          width: Dimensions.get("window").width * 0.75,
        }}
      >
        <Cart navigation={props.navigation} route={props.route} />
      </Modal>
    </SafeAreaView>
  );
};

export default NewBet;
