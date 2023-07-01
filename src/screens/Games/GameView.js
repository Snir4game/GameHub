import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import {  database,
    updateDoc,
    doc,
    deleteDoc,} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { Button, IconButton} from 'react-native-paper';

    
    const GameView =(props)=> {
      
      const [favoriteGame,setFavoriteGame]= useState(false);
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
        <TouchableOpacity>
      <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
      {/* <Image style={styles.gameImage}>{props.GameImage.GameImage}</Image> */}
      </TouchableOpacity>
      <Text style={styles.littletxt}>Release Date: {props.releaseDate.GameRelease} </Text>
      <Text style={styles.littletxt}>Genre: {props.Genre.Genre}</Text>
      <Text style={styles.littletxt}>Developer: {props.Developer.Developer}</Text>
      <Text style={styles.littletxt}></Text>
      <IconButton style={styles.FavBtn} icon={"heart"} onPress={AddToFavorite} iconColor={favoriteGame?"#FF50D8":"#000000"}/>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    Row:{
        flexDirection:'row',
        padding:10,
        width:'100%',
        height:150,
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
        fontSize:40,
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
      top:-5,
      right:-330,
    },
    gameImage:{
      height:150,
      width:100
    }
})
export default GameView;