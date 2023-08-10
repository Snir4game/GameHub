import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import {  database,doc,deleteDoc,updateDoc} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GameView =(props)=> {
      
  const [favoriteGame,setFavoriteGame]= useState(false);
  const userDetails = props.userDetails;
  const uid = props.uid

  
  //Delete Game
  // מחיקת משחק מהרשימה מיועד לאדמין בלבד 
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
// הוספה של משחק לדף המועדפים שיש בנביגיטור שנבנה לאפליקציה 
      const AddToFavorite = async()=>{
        const UpdateRef =doc(database,"UserInfo",uid);
        let arrayGames = []
        if(userDetails.FavoriteGames.includes(props.GameName.id))
        {
          arrayGames = userDetails.FavoriteGames.filter((game) => game !== props.GameName.id)
          setFavoriteGame(false)
        }
        else
        {
          arrayGames = [...userDetails.FavoriteGames, props.GameName.id]
          setFavoriteGame(true)
        }
        props.setUserDetails({...userDetails, FavoriteGames: arrayGames})
        await updateDoc(UpdateRef,{
          FavoriteGames:arrayGames
        }); 
      }

      useEffect(() => {
        console.log(props.userDetails);
        if(props.userDetails && props.userDetails.FavoriteGames && props.userDetails.FavoriteGames.includes(props.GameName.id))
          setFavoriteGame(true)
      },[])

  return (
    <View style={styles.Row}>
      <View style={styles.ColGameInfo}>
        <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
      </TouchableOpacity>
      <Text style={styles.littletxt}>Release Date: {props.GameName.GameRelease} </Text>
      <Text style={styles.littletxt}>Price: {props.GameName.price}</Text>
      <Text style={styles.littletxt}>Genre: {props.GameName.Genre}</Text>

      <IconButton style={styles.FavBtn} icon={"heart"} onPress={() =>{AddToFavorite()}}  iconColor={favoriteGame ?"#E0115F":"#000000"}/>
      {
        userDetails.isAdmin &&
        <IconButton style={styles.deleteBtn} icon={"archive-cancel-outline"} onPress={DeleteGame} iconColor='#000000'/>
      }
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
      left:330,
      bottom:100
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