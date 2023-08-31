import { StyleSheet, Text, View,Alert,FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React,{useState,useEffect} from 'react';
import {collection,database,getDocs,auth,query,where,addDoc, doc} from '../../utilis/Firebase-Config';
import { TextInput,Button } from 'react-native-paper';
import AppNews from './AppNews';

const GameNews = () => {

  const [isAdmin,setIsAdmin] = useState(false)
  const [UpdateText,setUpdateText] = useState("");
  const [pushSaved,setPushSaved] = useState(false);
  const [newsList,setNewsList] = useState([]);



// פונקציה ששומרת את ההודעה ומכניסה אותה למבנה נתונים 
  const SaveNews = async() =>{
  try {
    const appNews = await addDoc(collection(database,"App News"),{
      Update:UpdateText,
    });
    setPushSaved(true);
    getAppNewsList()
    Alert.alert("News was push successfully")
    setPushSaved(false);
    setUpdateText("")
    } catch (error) {  
      Alert.alert("The update of the news wasn't push "+error.message);
    }
  }
// הצגה של המודעות שנרשמו ונמצאות בתוך המבנה נתונים
  const getAppNewsList = async() =>{
    try {
      const query = await getDocs(collection(database,'App News'))
      const queryRes = query.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id,
      }));
      setNewsList(queryRes);
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  
  //check his admin status
  //1. As soon as user logs in, grab the user's doc id.
  //2. Test his admin status.
  //3. Populate the admin state accordingly.
  const adminTest = async () => {
    
    const userRef = collection(database, "UserInfo");
    const q = query(userRef, where("id", "==", auth.currentUser.uid));
    const user = await getDocs(q)
    const userDoc = user.docs.map((x) => x.data());
    setIsAdmin(userDoc[0].isAdmin)

  }

  useEffect(() =>{
    getAppNewsList();
    adminTest();
  },[])

  return (
    <LinearGradient style={{width:'100%',height:'100%'}} colors={["#D0DB97","#69B578","#3A7D44","#69B578"]}>
    <View style={styles.container}>
      {
        isAdmin?(
          <View style={styles.txtInputView}>
          <TextInput 
          keyboardType='default'
          autoCapitalize='none'
          style={styles.inputTxt}
          value={UpdateText}
          onChangeText={(text) => setUpdateText(text)}
          placeholder='Add New Update on the App'
          />
          <Button style={styles.pushBtn} onPress={SaveNews}>Push to Update news</Button>
            <View style={styles.Newslist}>
              {
                newsList.length > 0 ? (
                <FlatList 
                style={styles.NewsFlatList}
                data={newsList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <AppNews 
                  id={item.id}
                  Update={item.Update}
                  getAppNewsList ={getAppNewsList}
                  />
                )}
                />
                ):(
                  <Text>No Data</Text>
                )
              }
            </View>
          </View>
        ):(
          <View style={styles.Newslist}>
          {
            newsList.length > 0 ? (
            <FlatList 
            style={styles.NewsFlatList}
            data={newsList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <AppNews 
              Update={item.Update}
              reload ={getAppNewsList}
              />
            )}
            />
            ):(
              <Text>No Data</Text>
            )
          }
          </View>
        )
      }
    </View>
    </LinearGradient>
  )
}

export default GameNews

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  inputTxt:{
    backgroundColor: "#ffffff",
    width: "90%",
    height: 50,
    margin: 10,
    borderTopRightRadius: 24,
    justifyContent:'flex-start',
  },
  txtInputView:{
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  pushBtn:{
    borderWidth:1,
    borderColor:'#181D27',
    backgroundColor:'#69B578',
    color:'#000000',
    width:'60%',
  },
  Newslist:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:25,
    width:'90%',
    height:'100%'
  },
  NewsFlatList:{
    width:'100%',
    height:'100%'
  }
})