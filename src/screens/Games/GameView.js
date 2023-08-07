import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import {  database,doc,deleteDoc,updateDoc} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { IconButton} from 'react-native-paper';
import { Rating } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteGame from './../FavoriteGame/FavoriteGame';
const GameView =(props)=> {
      
  const [favoriteGame,setFavoriteGame]= useState(false);
  const userDetails = props.userDetails;
  const uid = props.uid
  //Delete Game

  const DeleteGame = async()=>{
    try {
      await deleteDoc(doc(database,"GameSearch",props.GameName.id));
      Alert.alert("Game has been Delete")
      props.reload();
    } catch (error) {
      Alert.alert(error.message)
    }
      }
    
// favorite game function 
      const AddToFavorite = async()=>{
        //1. Have the relative user's account doc id
        //2. Insert the game doc's id into the user's favourite game array

        console.log(props.GameName);

        const UpdateRef =doc(database,"UserInfo",uid);
        let arrayGames = []
        if(userDetails.FavoriteGames.includes(props.GameName.id))
        {
          arrayGames = userDetails.FavoriteGames.filter((game) => game !== props.GameName.id)
        
        }
        else
        {
          userDetails.FavoriteGames.push(props.GameName.id);
          arrayGames = userDetails.FavoriteGames
          
        }
        await updateDoc(UpdateRef,{
          FavoriteGames:arrayGames
        });
        
      }

  const isGameFavourite = () => {
    return userDetails.FavoriteGames.includes(props.GameName.id);
  }

  return (
    <View style={styles.Row}>
      <View style={styles.ColGameInfo}>
        <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
      </TouchableOpacity>
      <Text style={styles.littletxt}>Release Date: {props.GameName.GameRelease} </Text>
      <Text style={styles.littletxt}>Price: {props.GameName.price}</Text>
      <Text style={styles.littletxt}>Genre: {props.GameName.Genre}</Text>
      <IconButton style={styles.FavBtn} icon={"heart"} onPress={() =>{AddToFavorite()}} iconColor={isGameFavourite() ?"#E0115F":"#000000"}/>
      <IconButton style={styles.deleteBtn} icon={"archive-cancel-outline"} onPress={DeleteGame} iconColor='#000000'/>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    Row:{
        flexDirection:'row',
        padding:10,
        width:'100%',
        height:180,
        backgroundColor:"#fff",
        marginBottom:12,
        borderRadius:12,
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:5
    },
    GameInfo:{
        fontSize:25,
        fontWeight:500

    },
    littletxt:{
      fontSize:14,
    },
    ColGameInfo:{
      flexDirection:'column',
      height:'100%',
      width:'100%'
    },
    FavBtn:{
      width:40,
      height:40,
      top:-280,
      left:330
    },
    gameImage:{
      height:150,
      width:100
    },
    deleteBtn:{
      width:40,
      height:40,
      top:-20,
      left:330
    },
    rate:{
      height:100,
      width:100,
    },
    buttons:{
      flexDirection:'column',
      flexWrap:'wrap-reverse',
      left:15
    }
})
export default GameView;