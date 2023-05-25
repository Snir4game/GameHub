import { View, Text,StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import React from 'react'

const Account =() =>{
  return(
<View style={styles.container}>
  <View name='avater' style={styles.avatar}>
    <Avatar.Image size={100} source={require('../../../Pics/istockphoto-1290933921-612x612.jpg')}/>
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
    alignItems:'center'
  },
  avatar:{
    flex:1,

  }
})
export default Account;