import { Text, View ,StyleSheet,Alert, FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import {collection,database,getDocs,doc} from '../../utilis/Firebase-Config';
import FavoriteGameList from './FavoriteGameList';
const FavoriteGame =(props)=> {


  const [favoriteGame,setFavoriteGame] = useState([]);

//Get the games that you like from the list and add it to the tab Favorite Game
const getFavoriteGameList = async() => {
  try {
    const query = await getDocs(collection(database,'GameSearch'))
    const queryRes = query.docs.map((doc) =>({
      ...doc.data(),
      id:doc.id,
      favoriteGame:doc.data().favoriteGame,
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
        <View style={styles.container}>
          { favoriteGame.length > 0 ? (
            <FlatList 
            data={favoriteGame}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <FavoriteGameList 
                onPress = {() => {
                  props.navigation.navigate("Favorite Game",{favGame : item})
                }}
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
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:"90%",
    width:'100%',
    justifyContent:"center",
    alignItems:'center'
  }
})
export default FavoriteGame;
