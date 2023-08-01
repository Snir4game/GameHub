import { StyleSheet, View,Alert,TextInput,FlatList,Image, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Title,Text, Button,ActivityIndicator,MD2Colors,IconButton } from 'react-native-paper';
import {  
  database,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  getStorage} from '../../utilis/Firebase-Config';
import GameView from './GameView';
import * as ImagePicker from 'expo-image-picker';

const AddGame = (props) => {

  const [game,setGame] = useState('');
  const [releaseDate,setReleaseDate] = useState('');
  const [Genre,setGenre] = useState('');
  const [Console,setConsole] = useState('');
  const [Developer,setDeveloper] = useState('');
  const [Player,setPlayer] = useState('');
  const [Summary,setSummary] = useState('');
  const [gameImage,setGameImage] = useState('');
  const [price,setPrice] = useState('');
  const [favoriteGame,setFavoriteGame]= useState(false);
  const [isSaved,setIsSaved] = useState(false);
  // const [gameImage,setGameImage] = useEffect('');
//Create new Game
  const saveGame = async() => {
    try {
      const gameListRef = await addDoc(collection(database,"GameSearch"),{
        GameName:game,
        GameRelease:releaseDate,
        Genre:Genre,
        Developer:Developer,
        Console:Console,
        Players:Player,
        Summary:Summary,
        GameImage:gameImage,
        favoriteGame:favoriteGame,
        price:price
      });
      await setIsSaved(true);
      Alert.alert('Saved');
      await setIsSaved(false);
      setGame("");
      setReleaseDate("");
      setGenre("");
      setConsole("");
      setDeveloper("");
      setPlayer("");
      setSummary("");
      setGameImage("");
      setPrice("");
    } catch (error) {
      Alert.alert("The Game was not Saved "+error.message);
    }
  }

  const selectGameImage = async() =>{

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      
    });
    if(!result.canceled){
      setGameImage(result.assets[0].uri);
    }
  }
  // const selectGameImage = async() =>{
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing:true,
  //     aspect:[4,3],
  //     quality:1,
      
  //   });
  //   const source = {uri:result.uri};
  //     setGameImage(source);
  //   }

  // const uploadGameImage = async ()=>{
  //   setUploadImage(true);
  //   const response = await fetch(gameImage.uri);
  //   const blob = await response.blob();
  //   const filename = gameImage.uri.substring(gameImage.uri.lastIndexOf('/')+1);
  //   var ref = getStorage().ref().child(filename).put(blob);
  //try{
  //await ref;
  //} catch(error){
  // Alert.alert(error.message);
  // }
  //setUpload
  //}

  return (
    <ScrollView >
    <View style={styles.container}>
            <View style={styles.input}>

<TextInput style={styles.inputText}
    placeholder='Game Name'
    keyboardType='default'
    onChangeText={(text) => setGame(text)}
    value={game}
/>
<TextInput style={styles.inputText}
    placeholder='Release Date'
    keyboardType='default'
    onChangeText={(text) => setReleaseDate(text)}
    value={releaseDate}
/>
<TextInput style={styles.inputText}
    placeholder='Price'
    keyboardType='default'
    onChangeText={(text) => setPrice(text)}
    value={price}
/>
<TextInput style={styles.inputText}
    placeholder='Genre'
    keyboardType='default'
    onChangeText={(text) => setGenre(text)}
    value={Genre}
/>
<TextInput style={styles.inputText}
    placeholder='Console'
    keyboardType='default'
    onChangeText={(text) => setConsole(text)}
    value={Console}
/>
<TextInput style={styles.inputText}
    placeholder='Developer'
    keyboardType='default'
    onChangeText={(text) => setDeveloper(text)}
    value={Developer}
/>
<TextInput style={styles.inputText}
    placeholder='Number of Players'
    keyboardType='number-pad'
    onChangeText={(text) => setPlayer(text)}
    value={Player}
/>
<TextInput style={styles.inputText}
    placeholder='Summary'
    keyboardType='default'
    onChangeText={(text) => setSummary(text)}
    value={Summary}
/>
<Image  style={{width:66,height:66,borderRadius:1,borderColor:'#000000'}}/>
<IconButton icon='camera' size={25} style={{
          opacity:1,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:1,
          borderColor:'#ffffff',
          borderRadius:10
        }}
        onPress={selectGameImage}
        />

{
  isSaved?(<ActivityIndicator size='large' color={MD2Colors.blueA100} />):(
    <Button 
    style={styles.SaveBtn}
    onPress={saveGame}
    icon='content-save-edit'
    textColor='#000000'
    >Save Game</Button>
  )
}

      </View>
    </View>
  </ScrollView>
  )
}

export default AddGame;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ebebeb',
    paddingBottom:70,

  },

  list:{width:'100%', height:'20%',
},
  input:{width:'100%', height:'100%',backgroundColor:'#ebebeb',padding:10,flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'},
  inputText:{width:"100%",height:55,backgroundColor:'#ffffff',fontSize:22,paddingHorizontal:1,margin:1},
  SaveBtn:{
    height:40,width:120,backgroundColor:'#88ff88'
  }

})