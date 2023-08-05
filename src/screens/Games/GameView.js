import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import {  database,doc,deleteDoc,updateDoc} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { IconButton} from 'react-native-paper';
import { Rating } from '@rneui/themed';
const GameView =(props)=> {
      
      const [favoriteGame,setFavoriteGame]= useState(false);
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
        
        const UpdateRef =doc(database,"GameSearch",props.GameName.id);
        if(favoriteGame==false){
          await updateDoc(UpdateRef,{
            favoriteGame:true
          });
          setFavoriteGame(true);
        }
        else{
          await updateDoc(UpdateRef,{
            favoriteGame:false
          });
          setFavoriteGame(false);
        }
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
      <View style={styles.buttons}>
      <IconButton style={styles.FavBtn} icon={"heart"} onPress={() =>{AddToFavorite(!favoriteGame)}} iconColor={favoriteGame?"#E0115F":"#000000"}/>
      <IconButton style={styles.deleteBtn} icon={"archive-cancel-outline"} onPress={DeleteGame} iconColor='#000000'/>
      </View>
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
    },
    gameImage:{
      height:150,
      width:100
    },
    deleteBtn:{
      width:40,
      height:40,
      top:-20
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