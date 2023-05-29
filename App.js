import { StyleSheet, Text, View } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import Login from './src/screens/Login/login';
import React,{useState,useEffect} from 'react';
import GameListView from './src/screens/Games/GameList'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './src/utilis/Firebase-Config'
import {AppTab} from './src/screens/navigetor';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {

  const [appView,setAppView]=useState(false);
  const [user, setUser] = useState(null);


  const [UserAdmin,setUserAdmin] =useState(false);


  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user)
      } else {
        setUser(null)
      }
    });
    return subscribe;
  },[])


  return (
    <NavigationContainer>
       {
        user ? (<AppTab />) : (<Login/>)
       }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
