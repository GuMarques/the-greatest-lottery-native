import CustomColors from "@constants/CustomColors";
import { Text, TextBoldItalic, TextItalic } from "@textComponents";
import { ScrollView, SafeAreaView, View } from "react-native";
import { BoardView, TitleView } from "./styles";
import { useState, useEffect } from "react";
import { IGame } from "@interfaces";
import { BoardButton, CustomModal, GameButton } from "@components";
import { Games } from "@services/index";
import { useDispatch } from "react-redux";
import { gamesActions } from "@store/slices/games-slice";
import { RotateInDownLeft } from "react-native-reanimated";

const NewBet: React.FC<{}> = (props) => {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [activeGame, setActiveGame] = useState<IGame | null>(null);
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();

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
          <TextBoldItalic color={CustomColors.secondary}>
            Fill your bet
          </TextBoldItalic>
          <TextItalic color={CustomColors.secondary}>
            {activeGame?.description}
          </TextItalic>
        </View>
        <BoardView>{drawBoard()}</BoardView>
        <CustomModal
          isVisible={showModal}
          text={modalText}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewBet;
