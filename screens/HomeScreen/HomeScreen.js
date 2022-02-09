import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
//import styles from './styles';
import { app, db } from '../../firebase/config'
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore"; 
import {TestContext} from "../../App"


export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const {user} = useContext(TestContext)
    //const entityRef = firebase.firestore().collection('entities')
    
    //const userID = props.extraData.id

    useEffect(() => {
    //     entityRef
    //         .where("authorID", "==", userID)
    //         .orderBy('createdAt', 'desc')
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const newEntities = []
    //                 querySnapshot.forEach(doc => {
    //                     const entity = doc.data()
    //                     entity.id = doc.id
    //                     newEntities.push(entity)
    //                 });
    //                 setEntities(newEntities)
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    //console.log("userId:", user.id)
    (async()=>{
       console.log("async function in useEffect") 
        const querySnapshot = await getDocs(collection(db, "entities"))
        //console.log(querySnapshot[0])
        //console.log("length of querysnapshot:", querySnapshot.length)
        let updatedEntity = []    
        querySnapshot.forEach(doc=> {
        let data = doc.data()
        console.log("DATA:", data)
        
        //console.log("data in anonymas:", data)
        // ((test)=>{
        //     (console.log("TEST:", test)) 
        // })(data)
        
        // to avoid closure problem and not have entitites array with same last value of data
        let entity = ((data, userid)=>{
            if(data.userId === userid)
        {
            //console.log("data in forEach:", data)
            console.log("Entities in forEach:", entities)
            //let test = entities
            //setEntities([...entities, data])
            return data
            
        }
        })(data,user.id)

        console.log("test from async:", test)
        //setEntities([...entities, test])
        updatedEntity.push(entity)
        
        // if(data.userId === user.id)
        // {
        //     //console.log("data in forEach:", data)
        //     console.log("Entities in forEach:", entities)
        //     //let test = entities
        //     //setEntities([...entities, data])
        //     //testEntity.push(data)
            
        // }
               
      })
      setEntities(testEntity)
    })()
    //console.log("EnTITIES RETURNED", entities)
    
}, [])

    useEffect(()=>{
      console.log("Entities are", entities)
    },[entities])

    const onAddButtonPress = () => {
        //console.log("button pressed")  
      // if (entityText && entityText.length > 0) {
        //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        //     const data = {
        //         text: entityText,
        //         authorID: userID,
        //         createdAt: timestamp,
        //     };
        //     entityRef
        //         .add(data)
        //         .then(_doc => {
        //             setEntityText('')
        //             Keyboard.dismiss()
        //         })
        //         .catch((error) => {
        //             alert(error)
        //         });
        // }
        (async()=>{
          const data = {
            userId : user.id,
            entity : entityText
          }
          try {
            const docRef = await addDoc(collection(db, "entities"), data )
            //console.log("docRef:", docRef)
          }
          catch(error)
          {
            alert(error.message)
          }
          
           
        })()

        // let entityRef = doc(db, "entities", {})
        //console.log("entityRef:", entityRef)

    }

    const renderEntity = ({item, index}) => {
        return (
            <View key = {index} style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.entity}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item, index) => index.toString()}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
},
formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
},
input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5
},
button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: "center",
    justifyContent: 'center'
},
buttonText: {
    color: 'white',
    fontSize: 16
},
listContainer: {
    marginTop: 20,
    padding: 20,
},
entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16
},
entityText: {
    fontSize: 20,
    color: '#333333'
}
});
