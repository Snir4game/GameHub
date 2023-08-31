import { View, Text,StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Avatar, Button,IconButton} from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import {database, auth,doc,updateDoc, collection, query, where, getDocs } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDownloadURL, getStorage, ref, uploadBytes,} from 'firebase/storage';

const Account =(props) =>{
  
  const [errMessage,setErrMessage]=useState(null);
  const [avatar,setAvatar] = useState("");
  const [uploading,setUploading] = useState(false);
  const [uid,setUid] = useState("")
  const [myAccount, setMyAccount] = useState(null);
  
 // פונציה זו מראה את הנתונים של המשתמש 
  const getMyAccount = async () => {
    try {
      const accountsRef = collection(database, "UserInfo");
      const q = query(accountsRef, where("id", "==", auth.currentUser.uid));
      const qsnapshot = await getDocs(q);
      let arr = qsnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMyAccount(arr[0]);
    } catch (error) {
      Alert.alert("Something is wrong ")
    }
  }
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
    getMyAccount();
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
// פונקצית המשך להעלת התמונה שתשמר בתוך המבנה נתונים 
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
<LinearGradient style={{width:'100%',height:'100%'}} 
colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
<View style={styles.container}>
    <View style={{alignItems:'center'}}>
      <Avatar.Image 
      style={{borderColor:'#000000',borderWidth:4,justifyContent:'center',alignItems:'center'}} 
      size={120} 
      source={myAccount?.Picture ? {uri: myAccount.Picture} : require('../../../Pics/istockphoto-1290933921-612x612.jpg')} />
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
          <View style={styles.TextInfo}>
        <Text style={{fontWeight:'bold',fontSize:20}}>User Name :<Text style={{fontSize:17}}>{auth.currentUser.email}</Text> </Text>
        <Text style={{fontWeight:'bold',fontSize:20}}>Name : <Text style={{fontSize:17}}>{myAccount?.FirstName}</Text></Text>
        <Text style={{fontWeight:'bold',fontSize:20}}>Last Name : <Text style={{fontSize:17}}>{myAccount?.LastName}</Text></Text>
        <Text style={{fontWeight:'bold',fontSize:20}}>Age : <Text style={{fontSize:17}}>{myAccount?.Age}</Text></Text>
        <Text style={{fontWeight:'bold',fontSize:20}}>Phone : <Text style={{fontSize:17}}>{myAccount?.Phone}</Text></Text>
            <View style={styles.btnView}>
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
    padding:10,
    flexDirection:'column',
  },

  TextInfo:{
    width:'100%',
    height:'65%',
    borderColor:'#000000',
    borderRadius:2,
    borderWidth:2,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  logOutBtn:{
    width:100,
    height:40,
    backgroundColor:'#ffffff',
    borderColor:'#000000',
    borderWidth:1
  },
  btnView:{
  alignItems:'flex-end'
  }
})
export default Account;