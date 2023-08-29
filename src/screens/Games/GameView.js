import { View, Text,StyleSheet,TouchableOpacity,Alert,Platform } from 'react-native';
import {  database,doc,deleteDoc,updateDoc} from '../../utilis/Firebase-Config';
import React,{useState,useEffect} from 'react';
import { IconButton} from 'react-native-paper';
const GameView =(props)=> {
      
  const [favoriteGame,setFavoriteGame]= useState(false);
  const userDetails = props.userDetails;
  const uid = props.uid;

  
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
        props.getGameList()
      }

      useEffect(() => {
        //console.log(props.userDetails);
        if(props.userDetails && props.userDetails.FavoriteGames && props.userDetails.FavoriteGames.includes(props.GameName.id))
          setFavoriteGame(true)
      },[])

// props.favgames.forEach(y => {console.log('FAV: ' + y)})

      let color = '#ffcc00';
      const isExist = props.favgames.filter(x => x == props.GameName.id);

      if(isExist.length > 0){
        color = '#69B578'
      } else {
        color = '#000000'
      }

  return (
    <View style={styles.Row}>

      <View style={styles.ColGameInfo}>

        <View style={{width:'80%'}}>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.GameInfo}>{props.GameName.GameName}</Text>
          </TouchableOpacity>

          <Text style={styles.littletxt}>Release Date: {props.GameName.GameRelease} </Text>
          <Text style={styles.littletxt}>Price: {props.GameName.price}</Text>
          <Text style={styles.littletxt}>Genre: {props.GameName.Genre}</Text>
        </View>


      <View style={{width:'30%',justifyContent:'space-between'}}>
      <IconButton style={styles.FavBtn} icon={"heart"} onPress={() =>{AddToFavorite()}}  iconColor={color}/>
      {
        userDetails.isAdmin &&
        <IconButton style={styles.deleteBtn} icon={"archive-cancel-outline"} onPress={DeleteGame} iconColor='#000000'/>
      }
      </View>

      
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    Row:{
      flex:1,
        flexDirection:'row',
        padding:12,
        width:'100%',
        height:160,
        backgroundColor:"#F8E16C",
        marginBottom:12,
        borderRadius:12,
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:5,
    },
    GameInfo:{
        fontSize:23,
        fontWeight:600

    },
    littletxt:{
      fontSize:14,
    },
    ColGameInfo:{
      justifyContent:'space-between',
      height:'100%',
      flexDirection:'row'
    },
    FavBtn:{
      width:40,
      height:40,
    },
    deleteBtn:{
      width:40,
      height:40,
    },
})
export default GameView;