import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc } from "firebase/firestore";

const GameList = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameList, setGameList] = useState([]);
  const [uid,setUid] = useState("")
  const [userDoc,setUserDoc] = useState({})
  const fetchUserDetails = async () => {
    const uid = await AsyncStorage.getItem("user")
    setUid(uid);
    const userDoc = doc(database,"UserInfo", uid);
    const userData = (await getDoc(userDoc))?.data();
    setUserDoc(userData)
  }
  const [filteredGameList, setFilteredGameList] = useState([]);

  //search function
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const filteredData = gameList.filter((item) => {
      const GameName = item.GameName.toLowerCase().includes(query.toLowerCase());
      const Genre = item.Genre.toLowerCase().includes(query.toLowerCase());
      const Console = item.Console.toLowerCase().includes(query.toLowerCase());
      const Developer = item.Developer.toLowerCase().includes(query.toLowerCase());
      return GameName || Genre || Console || Developer;
    });
    setFilteredGameList(filteredData);
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
    fetchUserDetails();
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
          style={styles.main}
            data={filteredGameList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameView
              uid={uid}
              setUserDetails={setUserDoc}
              userDetails={userDoc}
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
  list: { width: "100%", height: "83%" },
  main:{
    width:"100%",
    height:"100%",
    margin:2,
  }
});

export default GameList;
