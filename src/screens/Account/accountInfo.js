import { View, Text,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import React from 'react'
import { auth } from '../../utilis/Firebase-Config';


const Account =(props) =>{
  return(
<View style={styles.container}>
  <View name='avater' style={styles.Base}>
    <View style={styles.avatar}>
    <Avatar.Image size={100} source={require('../../../Pics/istockphoto-1290933921-612x612.jpg')}/> 
    <Text>{auth.currentUser.email}</Text>
    </View>
  </View>
  <View style={styles.container}></View>
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
  }
})
export default Account;