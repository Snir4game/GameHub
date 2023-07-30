import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Searchbar } from "react-native-paper";
import {
  database,
  doc,
  getDocs,
  collection,
} from "../../utilis/Firebase-Config";
import GameView from "./GameView";

const GameList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameList, setGameList] = useState([]);

  const [filteredGameList, setFilteredGameList] = useState([]);

  //search function
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const filterdData = gameList.filter((item) => {
      const GameName = item.GameName.toLowerCase().includes(query.toLowerCase());
      const Ganre = item.Genre.toLowerCase().includes(query.toLowerCase());
      const Console = item.Console.toLowerCase().includes(query.toLowerCase());
      const Developer = item.Developer.toLowerCase().includes(query.toLowerCase());
      return GameName || Ganre || Console || Developer;
    });
    setFilteredGameList(filterdData);
  };

  //Read all Data from FireBase
  const getGameList = async (query) => {
    try {
      const query = await getDocs(collection(database, "GameSearch"));
      const queryRes = query.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGameList(queryRes); // original
      setFilteredGameList(queryRes); // filter
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    getGameList();
  }, []);

  return (
    <View style={styles.main}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: "#ffffff",
        }}
      />
      <View style={styles.list}>
        {gameList.length > 0 ? (
          <FlatList
            data={filteredGameList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameView
                onPress={() => {
                  props.navigation.navigate("Game Info", { game: item });
                }}
                GameName={item}
                reload={getGameList}
              />
            )}
          />
        ) : (
          <Text>No Data</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list: { width: "100%", height: "90%" },
  main:{
    flex:1,
    width:"100%",
    height:"100%"
  }
});

export default GameList;
