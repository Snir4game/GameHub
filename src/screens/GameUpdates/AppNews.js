import { View,StyleSheet,Alert,Text, ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import {collection,database,getDocs,auth,query,where, doc,deleteDoc} from '../../utilis/Firebase-Config';
import {IconButton } from "react-native-paper";

const AppNews = (props) =>{

    const update=props.Update;
    const [isAdmin,setIsAdmin] = useState(false)

// פונקציה המוחקת את ההודעה 
    const DeleteNews = async() =>{
        try {
            await deleteDoc(doc(database,'App News',props.id))
            Alert.alert("News has been Deleted!");
            props.getAppNewsList()
        } catch (error) {
            Alert.alert("News wasn't Deleted!");
        }
    }
// בדיקה האם המשתמש הוא אדמין
    const adminTest = async () => {
        const userRef = collection(database, "UserInfo");
        const q = query(userRef, where("id", "==", auth.currentUser.uid));
        const user = await getDocs(q)
        const userDoc = user.docs.map((x) => x.data());
        setIsAdmin(userDoc[0].isAdmin)
        }
    
    useEffect(() =>{
        adminTest();
    },[])
return(
<ScrollView>
<View style={styles.container}>
<View style={styles.ColAppNews}>
    <Text>{update}</Text>
    </View>
    {
        isAdmin &&
        <View style={styles.deleteBtnView}>
        <IconButton style={styles.deleteBtn} icon={"archive-cancel-outline"} onPress={DeleteNews} iconColor='#000000'/>
        </View>
    }
</View>
</ScrollView>
    )
}

export default AppNews;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:12,
        width:'100%',
        height:130,
        backgroundColor:"#ffffff",
        marginBottom:12,
        borderRadius:12,
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:4,
        elevation:5,
    },
    ColAppNews:{
        justifyContent:'space-between',
        height:'90%',
        flexDirection:'row',
        width:'90%'
    },
    deleteBtn:{
        width:40,
        height:40,
    },
    deleteBtnView:{
        width:'10%',justifyContent:'space-between',bottom:20
    }
})