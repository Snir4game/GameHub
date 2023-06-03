import { Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const FavoriteGame =()=> {
    return (
      <LinearGradient style={{width:'100%',height:'100%'}} colors={["#ffffff","#386FA4","#ffffff"]}>
        <View>
          <Text>FavoriteGame</Text>
        </View>
      </LinearGradient>
    )
}
export default FavoriteGame;
