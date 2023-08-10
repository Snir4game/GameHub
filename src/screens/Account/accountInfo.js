import { View, Text,StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Avatar, Button,IconButton} from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import {database, auth,doc,updateDoc } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDownloadURL, getStorage, ref, uploadBytes,} from 'firebase/storage';
import { setDoc } from 'firebase/firestore';

const Account =(props) =>{
  
  const [errMessage,setErrMessage]=useState(null);
  const [avatar,setAvatar] = useState("");
  const [image,setImage] = useState (null);
  const [uploading,setUploading] = useState(false);
  const [uid,setUid] = useState("")
 

  //Log Out Button 
  const LogOutBtn = async() => {
    try {
      const user= getAuth();
      user.signOut(user);
      await AsyncStorage.removeItem("User");
    } catch (error) {
      setErrMessage(error.message);
    }
  }
  useEffect(()=>{
    if(errMessage!=null)
    Alert.alert(errMessage);
  },[errMessage])

  useEffect(() => {
    const getUid = async () => {
      const id = await AsyncStorage.getItem("user");
      if(id)
        setUid(id);
    }
    getUid();
  },[])
  
  //Avatar Select
  const selectNewAvatar = async() =>{
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    });
    
    if(!result.canceled){

      try {
        
        const url = await uploadImage(result.assets[0]);
        const updatePicById = doc(database,`UserInfo/${uid}`);
        await updateDoc(updatePicById,{Picture:url})
      setAvatar(url);
    } catch (error) {
      Alert.alert("Avatar has not update " + error.message);
    }
  }
}

const uploadImage = async(image) =>{
  setUploading(true);
  const response = await fetch(image.uri);
  const blob = await response.blob();
  const StorageRef = ref(getStorage(),'Account Images/'+uid);
  const uploadTask=await uploadBytes(StorageRef,blob, {contentType: blob.type})
  const url = await getDownloadURL(uploadTask.ref);
  return url;

}


  return(
<LinearGradient style={{width:'100%',height:'100%'}} colors={["#ffffff","#B0B0B0",'#DEDEDE','#C7C7C7','#C7C7C7']}>
  <View style={styles.container}
  contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
  showsVerticalScrollIndicator={false}
  >
<View style={styles.container}>
    <View style={{flex:1 ,alignItems:'center'}}>
    <Avatar.Image size={100} source={avatar ? {uri: avatar} : require('../../../Pics/istockphoto-1290933921-612x612.jpg')} />
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