import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'

const GameNews = () => {
  return (
    <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
    <View>
      <Text>App News</Text>
    </View>
    </LinearGradient>
  )
}

export default GameNews

const styles = StyleSheet.create({})