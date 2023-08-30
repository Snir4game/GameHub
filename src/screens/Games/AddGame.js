import { StyleSheet, View,Alert,TextInput,FlatList,Image, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Title,Text, Button,ActivityIndicator,MD2Colors,IconButton } from 'react-native-paper';
import {  
  database,
  collection,
  addDoc,
  ref,
  getDownloadURL,
  uploadBytes,
  Storage} from '../../utilis/Firebase-Config';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';


// עמוד שמוגדר נטו לאדמין רק לאדמין יכול לראות את העמוד הזה באפליקציה 
const AddGame = () => {

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
  const [uploading,setUploading] = useState(false);

//Create new Game
// Added game to the list of games in firebase database with a function AddDoc
  const saveGame = async() => {
    try {
      setIsSaved(true);
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
        price:price,
      });
      Alert.alert('Saved');  
      setIsSaved(false);
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


  // selectGameImage function:
  // This function uses the ImagePicker module from Expo to launch the image library on the device.
  //The selected media type is set to images.
  // The user is allowed to edit the selected image.
  // The image quality is set to 1 (highest quality).
  // If the user doesn't cancel the image selection, the function proceeds to upload the selected image.
  const selectGameImage = async() =>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[30,20],
      quality:1
    });
    
    if(!result.canceled){
      try { 
        const imageName = Date.now();
        const url = await uploadImage(result.assets[0],imageName);
        setGameImage(url)
    } catch (error) {
      Alert.alert("Game image wasn't updated " + error.message);
      }
    }
  }
  //uploadImage function:
  // This function takes an image and a name as parameters.
  // It sets up the uploading process by setting the uploading state to true.
  // It fetches the image data using the image's URI (Uniform Resource Identifier).
  // It converts the image data into a blob.
  // It creates a reference to the Firebase Storage location where the image will be stored, using the specified name.
  // It uploads the blob to the specified Storage reference using the uploadBytes function.
  // Once the upload is complete, it retrieves the download URL of the uploaded image using the getDownloadURL function and returns it.
  // פונקציה המשמשת להעלת תמונה של משחק שיוכנס לתוך המחסן של פיירביס  
  
  const uploadImage = async(image,name) =>{
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const StorageRef = ref(Storage,'Game Images/'+name);
    const uploadTask=await uploadBytes(StorageRef,blob, {contentType: blob.type})
    const url = await getDownloadURL(uploadTask.ref);
    return url;
  
  }
  return (
<LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
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
    </LinearGradient>
  )
}

export default AddGame;

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%'
  },
  input:{width:'100%',
   height:'100%',
   padding:10,
   flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
},
  inputText:{width:"100%",
  height:55,
  backgroundColor:'#ffffff',
  fontSize:22,
  paddingHorizontal:1,
  margin:2,
  borderRadius:25,
  borderTopRightRadius:0
},
  SaveBtn:{
    height:40,
    width:120,
    backgroundColor:'#57B265'
  }

})