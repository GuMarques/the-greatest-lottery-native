import { ScrollView, SafeAreaView, Button } from "react-native";
import { GameButton, RecentGame } from "@components";
import IGame from "shared/interfaces/IGame";
import { TextItalic } from "@textComponents";
import { ScreenView, FiltersView } from "./styles";
import { IBet } from "shared/interfaces/IBet";
import { useAppSelector } from "@hooks/custom-useSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLogoutTimer, userActions } from "@store/slices/user-slice";

const Home: React.FC<{}> = (props) => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token.expires_at) {
      const timeout =
        new Date(token.expires_at).getTime() - new Date().getTime();
      if (timeout < 3600000) {
        dispatch(autoLogoutTimer(timeout));
      }
    } else {
      dispatch(userActions.logout());
    }
  }, []);
  const dummyGame: IGame = {
    id: 1,
    type: "Lotofácil",
    description:
      "Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!",
    range: 25,
    price: 2.5,
    max_number: 15,
    color: "#7F3992",
  };
  const dummyBet: IBet = {
    id: 34,
    user_id: 20,
    game_id: 3,
    choosen_numbers: "1,2,3,4,5",
    price: 2,
    created_at: new Date("2022-02-08T11:44:49.000-03:00"),
    type: {
      id: 3,
      type: "Quina",
    },
  };

  return (
    <SafeAreaView>
      <ScreenView>
        <TextItalic style={{ marginBottom: 10 }}>Filters</TextItalic>
        <FiltersView>
          <ScrollView contentContainerStyle={{ marginBottom: 10 }} horizontal>
            <GameButton game={dummyGame} active={false} />
            <GameButton game={dummyGame} active={false} />
            <GameButton game={dummyGame} active={false} />
            <GameButton game={dummyGame} active={false} />
          </ScrollView>
        </FiltersView>
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
          <RecentGame bet={dummyBet} />
        </ScrollView>
      </ScreenView>
    </SafeAreaView>
  );
};

export default Home;
