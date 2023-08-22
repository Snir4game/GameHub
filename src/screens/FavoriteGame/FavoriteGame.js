import { Text, View ,StyleSheet,Alert, FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import {collection,database,getDocs,doc} from '../../utilis/Firebase-Config';
import FavoriteGameList from './FavoriteGameList';
import { LinearGradient } from 'expo-linear-gradient'
const FavoriteGame =(props)=> {


  const [favoriteGame,setFavoriteGame] = useState([]);

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
      Alert.alert("Something is wrong ")
    }
  }


//Get the games that you like from the list and add it to the tab Favorite Game
const getFavoriteGameList = async() => {
  try {
    const query = await getDocs(collection(database,'GameInfo'))
    const queryRes = query.docs.map((doc) =>({
      ...doc.data(),
      id:doc.id,
      FavoriteGame:doc.data().FavoriteGame,
    }));
    setFavoriteGame(queryRes);
  } catch (error) {
    Alert.alert(error.message);
  }
}

useEffect(() =>{
  getFavoriteGameList()
},[])

    return (
      <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
        <View style={styles.container}>
          { favoriteGame.length > 0 ? (
            <FlatList 
            data={favoriteGame}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <FavoriteGameList 
                navigator={props.navigation.navigate}
                favoriteGame={item}
                reload = {getFavoriteGameList}
              />
            )}
            />
          ) : (
            <View style={styles.container}>
              <Text>Add Some of your Favorite Games </Text>
            </View>
          )
          }
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:"100%",
    width:'100%',

  }
})
export default FavoriteGame;
