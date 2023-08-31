import { Text, View ,StyleSheet,Alert, FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import {collection,database,getDocs,doc,auth, query, where,getDoc} from '../../utilis/Firebase-Config';
import FavoriteGameList from './FavoriteGameList';
import { LinearGradient } from 'expo-linear-gradient'
const FavoriteGame =(props)=> {


  const [favoriteGame,setFavoriteGame] = useState([]);
// הפונקציה מחפשת על פי בסיס הנתונים של אותו משתמש איזה משחקים הוא שם כמועדף
//הפונצקיה מוסיפה את המשחק אל המסך של המועדפים 
//ומציגה אותו 
  const getMyFavoriteGames = async () => {
    try {
      const userRef = doc(database, 'UserInfo', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const favoriteGameIds = userDoc.data().FavoriteGames || [];
        const favoriteGameDocs = [];
        for (const gameId of favoriteGameIds) {
          const gameRef = doc(database, 'GameSearch', gameId);
          const gameDoc = await getDoc(gameRef);
          if (gameDoc.exists()) {
            favoriteGameDocs.push(gameDoc.data());
          }
        }
        setFavoriteGame(favoriteGameDocs);
      }
    } catch (error) {
      console.error("Error fetching favorite games:", error);
    }
  };


useEffect(() =>{
getMyFavoriteGames();
},[])

    return (
      <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
        <View style={styles.container}>
          { 
          favoriteGame.length > 0 ? (
            <FlatList 
            style={styles.FgameList}
            data={favoriteGame}
            keyExtractor={(item) => item.id}
            key={(item)=> item.id}
            renderItem={({item}) => (
              <FavoriteGameList 
                id={item.id}
                navigator={props.navigation.navigate}
                favoriteGame={item}
                reload = {getMyFavoriteGames}
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
justifyContent:'center',
alignItems:'center'
  },
  FgameList:{
    width:'90%'
  }
})
export default FavoriteGame;
