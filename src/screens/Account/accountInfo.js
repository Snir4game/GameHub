import { View, Text,StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import React, { useState,useEffect } from 'react'
import { auth,signOut } from '../../utilis/Firebase-Config';
import { getAuth } from 'firebase/auth';



const Account =(props) =>{
  
  const[errMessage,setErrMessage]=useState(null);
  
  
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

  return(
<View style={styles.container}>
  <View name='avater' style={styles.Base}>
    <View style={styles.avatar}>
    <Avatar.Image size={100} source={require('../../../Pics/istockphoto-1290933921-612x612.jpg')}/> 
    <Text>{auth.currentUser.email}</Text>
  <Button style={styles.logOutBtn} onPress={LogOutBtn}>Sigh Out</Button>

    </View>
  </View>
</View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',

  },
  Base:{
    flex:1,
    borderRadius:2,
    width:'90%',
    height:'90%',
    justifyContent:'flex-start'
  },
  avatar:{
    width:'100%',
    height:'80%',
  },
  logOutBtn:{
    width:100,
    height:40,
    backgroundColor:'#000000'
  }
})
export default Account;