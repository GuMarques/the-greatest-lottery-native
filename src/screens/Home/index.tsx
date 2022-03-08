import {
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { GameButton, RecentGame } from "@components";
import { TextBoldItalic, TextItalic } from "@textComponents";
import { ScreenView, FiltersView } from "./styles";
import { IBet, IGame } from "@interfaces";
import { useAppSelector } from "@hooks/custom-useSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLogoutTimer, userActions } from "@store/slices/user-slice";
import { Games, Bets } from "@services/index";
import { useState } from "react";
import { gamesActions } from "@store/slices/games-slice";
import CustomColors from "@constants/CustomColors";
import { DrawerScreenProps } from "@react-navigation/drawer";

const Home: React.FC<DrawerScreenProps<{}>> = (props) => {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [bets, setBets] = useState<IBet[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      getGames();
      getBets();
    });

    return unsubscribe;
  }, [navigation]);

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

  useEffect(() => {
    getGames();
    getBets();
  }, [filters]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getGames();
    await getBets();
    setRefreshing(false);
  };

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
    } catch (error: any) {
      console.log(error);
    }
  };

  const getBets = async () => {
    const { listBet } = Bets();
    try {
      const res = await listBet(filters);
      setBets(
        res.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlerFilterClick = async (game: IGame) => {
    setFilters((prevState) => {
      let tempArray;
      if (prevState.includes(game.type)) {
        tempArray = prevState.filter((value) => {
          return value !== game.type;
        });
      } else {
        tempArray = prevState.concat(game.type);
      }
      return tempArray;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenView>
        <TextItalic style={{ marginBottom: 10 }}>Filters</TextItalic>
        <FiltersView>
          <ScrollView contentContainerStyle={{ marginBottom: 10 }} horizontal>
            {games?.map((game) => {
              return (
                <GameButton
                  key={game.id}
                  game={game}
                  active={filters.indexOf(game.type) !== -1}
                  onPress={() => handlerFilterClick(game)}
                />
              );
            })}
          </ScrollView>
        </FiltersView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading && (
            <ActivityIndicator
              style={{ flex: 1, marginTop: 50 }}
              size="large"
              color={CustomColors.primary}
            />
          )}
          {!isLoading && bets?.length === 0 && (
            <TextBoldItalic
              size={22}
              style={{ textAlign: "center", marginTop: 50 }}
            >
              You don't have any games in this cofiguration, make a bet!
            </TextBoldItalic>
          )}
          {!isLoading &&
            bets?.length! >= 0 &&
            bets?.map((bet) => {
              return <RecentGame key={bet.id} bet={bet} />;
            })}
        </ScrollView>
      </ScreenView>
    </SafeAreaView>
  );
};

export default Home;
