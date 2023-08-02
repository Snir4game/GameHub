import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card,Text } from 'react-native-paper';
const FavoriteGameList = (props) => {

const favGame = props.route.params.favGame

  return (
  <Card>
    <Card.Cover source={{uri:favGame.GameImage}} />
    <Text style={style.subText}>{favGame.GameName}</Text>
  </Card>
  )
}
const style =StyleSheet.create({
  subText:{
    fontSize:23,fontWeight:"600"
  }
})

export default FavoriteGameList