import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button,IconButton} from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import { auth,signOut } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import FirstName from '../Login/login';

const Account =(props) =>{
  
  const [errMessage,setErrMessage]=useState(null);
  const [avatar,setAvatar] = useState(null);
  
  const LogOutBtn = async() => {
  try {
    const user= getAuth();
    user.signOut(user);
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
<View style={styles.container}>
  
      <View style={{height:100,width:100,justifyContent:'center',alignItems:'center',paddingBottom:50}}>
    <Avatar.Image size={100} source={{uri:avatar}} />
    <TouchableOpacity>
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
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
    <Text>User Name:</Text>
  <Button style={styles.logOutBtn} onPress={LogOutBtn}>Sigh Out</Button>
    </View>
  </View>
</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
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