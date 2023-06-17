import { View, Text,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button,IconButton} from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import {signOut,database } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import FirstName from '../Login/login';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account =(props) =>{
  
  const [errMessage,setErrMessage]=useState(null);
  const [avatar,setAvatar] = useState(null);
  const userData=AsyncStorage.getItem('User');
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


const selectNewAvatar = async() =>{

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
  });
  if(!result.canceled){
    setAvatar(result.assets[0].uri);
  }
}



  return(
<LinearGradient style={{width:'100%',height:'100%'}} colors={["#ffffff","#B0B0B0",'#DEDEDE','#C7C7C7','#C7C7C7']}>
  <ScrollView style={styles.container}
  contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
  showsVerticalScrollIndicator={false}
  >
<View style={styles.container}>
    <TouchableOpacity>
    <View style={{flex:1,justifyContent:"center",alignItems:'center',paddingTop:40}}>
    <Avatar.Image size={100} source={require('../../../Pics/istockphoto-1290933921-612x612.jpg')} />
        <IconButton icon='camera' size={25} style={{
          opacity:1,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:1,
          borderColor:'#ffffff',
          borderRadius:15
        }}
        onPress={selectNewAvatar}
        />
        </View>
      </TouchableOpacity>
      </View> 
    <View style={styles.avatar}>
    <Text>Name: </Text>
  <Button style={styles.logOutBtn} onPress={LogOutBtn}>Sign Out</Button>
    </View>
  </ScrollView>
</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
    // alignItems:'center',
    // justifyContent:'center',
  },

  avatar:{
    width:'90%',
    height:'80%',
    borderColor:'#000000',
    borderRadius:2,
    borderWidth:2,
    flexDirection:'column'
  },
  logOutBtn:{
    width:100,
    height:40,
  }
})
export default Account;