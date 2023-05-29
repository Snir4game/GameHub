import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Title,TextInput } from 'react-native-paper';
import {  database,collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,} from '../../utilis/Firebase-Config';

const AddGame = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.list}></View>
      <View style={styles.input}></View>
    </View>
  )
}

export default AddGame

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#386FA4',

  },
  header:{width:'100%', height:'15%',backgroundColor:'#2A2D34'},
  list:{width:'100%', height:'70%'},
  input:{width:'100%', height:'15%',backgroundColor:'#ebebeb'}
})