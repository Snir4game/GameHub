import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import {
  database,
  doc,auth,
  getDocs,
  query,where,
  collection,getDoc
} from "../../utilis/Firebase-Config";
import GameView from "./GameView";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameList = (props) => {

  const [myAccount, setMyAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [gameList, setGameList] = useState([]);
  const [uid,setUid] = useState("")
  const [userDoc,setUserDoc] = useState({})
  const [filteredGameList, setFilteredGameList] = useState([]);


  const fetchUserDetails = async () => {
    const uid = await AsyncStorage.getItem("user")
    setUid(uid);
    const userDoc = doc(database,"UserInfo", uid);
    const userData = (await getDoc(userDoc))?.data();
    setUserDoc(userData)
  }

  const getMyAccount = async () => {
    try {
      const accountsRef = collection(database, "UserInfo");
      const q = query(accountsRef, where("id", "==", auth.currentUser.uid));
      const qsnapshot = await getDocs(q);
      let arr = qsnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMyAccount(arr[0]);
    } catch (error) {
      console.log(error)
    }
  }

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
  const getGameList = async () => {
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
    getMyAccount();
    getGameList();
    fetchUserDetails();
  }, []);



  return (
    <View style={styles.main}>
      <View style={styles.list}>
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
        {gameList.length > 0 ? (
          <FlatList
          style={styles.main}
            data={filteredGameList}
            keyExtractor={(item , index) => item.id || index.toString()}
            renderItem={({ item }) => (
              <GameView
                uid={uid}
                setUserDetails={setUserDoc}
                favgames={myAccount?.FavoriteGames}
                userDetails={userDoc}
                onPress={() => {
                  props.navigation.navigate("Game Info", { game: item });
                }}
                id={item.id}
                GameName={item}
                getGameList={getGameList}
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
  list: { width: "100%", height: "100%" },
  main:{
    width:"100%",
    height:"100%",
    backgroundColor:'#69B578',
    padding:6
    
  }
});

export default GameList;
