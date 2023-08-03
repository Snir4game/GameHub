import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Card,Text } from 'react-native-paper';
const FavoriteGameList = (props) => {

const favGame = props.route.params.favoriteGame

  return (
  <Card style={style.Col}>
    <Card.Cover source={{uri:favGame.GameImage}} />
    <TouchableOpacity>
    <Text style={style.subText}>{favGame.GameName}</Text>
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