import {LogBox,I18nManager } from 'react-native';
import Login from './src/screens/Login/login';
import React,{useState,useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './src/utilis/Firebase-Config'
import {AppTab} from './src/screens/navigetor';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
LogBox.ignoreAllLogs();
export default function App() {

  const [user, setUser] = useState(null);
  //  הפונקציה מיועדת להשגחה של שינויים במצב האימות של המשתמש ולניהול נתוני המשתמש באסיינטק סטורג 
  // בסביבה בא נכתב האפליקציה (גאווא סקריטפ)
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if(user){
        setUser(user)
        await AsyncStorage.setItem("user", user.uid);

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

