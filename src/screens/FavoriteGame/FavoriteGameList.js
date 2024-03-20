import React from 'react';
import { StyleSheet} from 'react-native';
import { Card,Text } from 'react-native-paper';

const FavoriteGameList = (props) => {

const fGame = props.favoriteGame
const nav = props.navigator

  return (
  <Card onPress={() => {
    nav("Game Info",{game:fGame})
  }} style={style.Col}>
    <Card.Cover source={{uri:fGame.GameImage}} />
    <Text style={style.subText}>{fGame.GameName}</Text>
  </Card>
  )
}
const style =StyleSheet.create({
  subText:{
    fontSize:23,fontWeight:"600"
  },
  Col:{
    margin:10,
padding:10,
  }
})

export default FavoriteGameList