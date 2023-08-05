import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Card,Text } from 'react-native-paper';
const FavoriteGameList = (props) => {

const fGame = props.route.params.favGame;
console.log(fGame);
  return (
  <Card style={style.Col}>
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