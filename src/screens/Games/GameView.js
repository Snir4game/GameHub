import { View, Text,StyleSheet,Image,TouchableOpacity,Alert } from 'react-native';
import {  database,
    doc,
    deleteDoc,} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { IconButton} from 'react-native-paper';
    
    const GameView =(props)=> {
      
      const [favoriteGame,setFavoriteGame]= useState(false);




  //Delete Game

  const DeleteGame = async()=>{
    try {
      await deleteDoc(doc(database,"GameSearch",props.GameName.id));
      props.reload();
    } catch (error) {
      Alert.alert(error.message)
    }
      }
    
// favorite game function 
      const AddToFavorite = async()=>{
        if(favoriteGame==false){
          props.favoriteGame=true;
          setFavoriteGame(true);
        }
          else{
            setFavoriteGame(false);
          }
      }
  return (
    <View style={styles.Row}>
      <View style={styles.ColGameInfo}>
        <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
      {/* <Image style={styles.gameImage}>{props.GameImage.GameImage}</Image> */}
      </TouchableOpacity>
      <Text style={styles.littletxt}>Release Date: {props.GameName.GameRelease} </Text>
      <Text style={styles.littletxt}>Price: {props.GameName.price}</Text>
      <Text style={styles.littletxt}>Genre: {props.GameName.Genre}</Text>
      <IconButton style={styles.FavBtn} icon={"heart"} onPress={AddToFavorite} iconColor={favoriteGame?"#E0115F":"#000000"}/>
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
        height:160,
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
        fontSize:30,
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
      right:-330,
    },
    gameImage:{
      height:150,
      width:100
    },
    deleteBtn:{
      width:40,
      height:40,
      top:-160,
      right:-330,
    }
})
export default GameView;