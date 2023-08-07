import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Card,Text } from 'react-native-paper';
const FavoriteGameList = (props) => {

const fGame = props.favoriteGame
const nav = props.navigator

  return (
  <Card onPress={() => {
    nav("Game Info",{game:fGame})
  }} style={style.Col}>
    <Card.Cover source={{uri:fGame.GameImage}} />
    <TouchableOpacity>
    <Text style={style.subText}>{fGame.GameName}</Text>
    </TouchableOpacity>
  </Card>
  )
}
const style =StyleSheet.create({
  subText:{
    fontSize:23,fontWeight:"600"
  },
  Col:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'baseline',
  }
})

export default FavoriteGameList