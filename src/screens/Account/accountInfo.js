import { View, Text,StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Avatar, Button,IconButton} from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import {database, auth,doc,updateDoc } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage , ref } from 'firebase/storage';

const Account =(props) =>{
  
  const [errMessage,setErrMessage]=useState(null);
  const [avatar,setAvatar] = useState("");
  const [image,setImage] = useState = (null);
  const [uploading,setUploading] = useState(false);

  //pick Image for new Avatar
  const pickImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    });

    const source = {uri: result.uri};
    console.log(source);
    setImage(source);
  };

  const uploadImage = async() =>{
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = getStorage()
  }

  //Log Out Button 
  const LogOutBtn = async() => {
    try {
      const user= getAuth();
      user.signOut(user);
      AsyncStorage.removeItem("User");
    } catch (error) {
      setErrMessage(error.message);
    }
  }
  useEffect(()=>{
    if(errMessage!=null)
    Alert.alert(errMessage);
  },[errMessage])
  
  //Avatar Select
//   const selectNewAvatar = async() =>{
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes:ImagePicker.MediaTypeOptions.Images,
//       allowsEditing:true,
//       aspect:[4,3],
//       quality:1
//     });
//     if(!result.canceled){
//       try {
//         const updatePicById = doc(database,"UserInfo",props.Picture.id);
//         await updateDoc(updatePicById,{Picture:result.assets[0].uri})
//       setAvatar(result.assets[0].uri);
//     } catch (error) {
//       Alert.alert("Avatar has not update " + error.message);
//     }
//   }
// }


  return(
<LinearGradient style={{width:'100%',height:'100%'}} colors={["#ffffff","#B0B0B0",'#DEDEDE','#C7C7C7','#C7C7C7']}>
  <View style={styles.container}
  contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
  showsVerticalScrollIndicator={false}
  >
<View style={styles.container}>
    <View style={{flex:1 ,alignItems:'center'}}>
    <Avatar.Image size={100} source={require('../../../Pics/istockphoto-1290933921-612x612.jpg')} />
    <TouchableOpacity>
        <IconButton icon='camera' size={25} style={{
          opacity:1,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:1,
          borderColor:'#ffffff',
          borderRadius:15,
          top:-20,
          left:30
        }}
        onPress={selectNewAvatar}
        />
      </TouchableOpacity>
      <View style={styles.TextInfo}>
    <Text style={{fontSize:17}}>User Name: {auth.currentUser.email} </Text>
  <Button style={styles.logOutBtn} textColor='#000000' onPress={LogOutBtn}>Sign Out</Button>
    </View>
        </View> 
      </View>
    </View>
</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center',
  },

  TextInfo:{
    width:'100%',
    height:'50%',
    borderColor:'#000000',
    borderRadius:2,
    borderWidth:2,
    flexDirection:'column',
  },
  logOutBtn:{
    width:100,
    height:40,
    backgroundColor:'#ffffff',
    borderColor:'#000000',
    borderWidth:1
  }
})
export default Account;