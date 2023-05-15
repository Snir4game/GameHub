import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {database,auth} from './src/utilis/Firebase-Config';
import { collection, addDoc } from 'firebase/firestore';
import Login from './src/screens/Login/login';


export default function App() {

  return (
<Login>

</Login>
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
