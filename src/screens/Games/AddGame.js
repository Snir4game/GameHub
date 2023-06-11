import { StyleSheet, View,Alert,TextInput,FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Title,Text } from 'react-native-paper';
import {  database,collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,} from '../../utilis/Firebase-Config';
import GameView from './GameView';

const AddGame = () => {

  const [game,setGame] = useState('');
  const [gameList,setGameList] = useState([]);
  // const [gameImage,setGameImage] = useEffect('');
//Create new Game
  const saveGame = async() => {
    try {
      const gameListRef = await addDoc(collection(database,"GameSearch"),{
        GameName:game
      });
      Alert.alert('Saved');
      setGame("");
    } catch (error) {
      Alert.alert("saveGame ==>"+error.message);
    }
    getGameList();
  }

  //Read Game
const getGameList = async() =>{
  try {
    const query = await getDocs(collection(database,'GameSearch'));
    
    setGameList(
      query.docs.map((doc) =>({
        ...doc.data(),
        id: doc.id
      }))
    )
  } catch (error) {
    Alert.alert("ListGame ==>"+error);
  }
}

useEffect(()=> {
  getGameList();
},[]);
  //Update Game


  //Delete Game

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.list}>
        {
          gameList.length > 0 && <FlatList 
          data={gameList}
          keyExtractor={item =>item.id}
          renderItem={({item}) => <GameView />}
          
          />
        }
      </View>
      <View style={styles.input}>

        <TextInput style={styles.inputText}
            placeholder='Enter your Game'
            keyboardType='default'
            onChangeText={(text) => setGame(text)}
            onSubmitEditing={saveGame}
            value={game}
        />
      </View>
      
    </View>
  )
}

export default AddGame

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#386FA4',
    paddingBottom:70

  },
  header:{width:'100%', height:'15%',backgroundColor:'#2A2D34'},
  list:{width:'100%', height:'70%'},
  input:{width:'100%', height:'15%',backgroundColor:'#ebebeb',padding:10},
  inputText:{width:"100%",height:60,backgroundColor:'#ffffff',fontSize:22,paddingHorizontal:1}
})