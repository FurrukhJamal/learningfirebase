import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './screens'
// import {decode, encode} from 'base-64'
// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }
import "./firebase/config";
import { createContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const TestContext = createContext()

{/* <Stack.Screen name = "Home">
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen> */}

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  

  useEffect(()=>{
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // console.log("uid:", uid)
          
          async function test(id){
            console.log("Function called")
            let querySnapshot = await getDocs(collection(db , "users"))
            let userData;  
            querySnapshot.forEach(doc=> {
              let data = doc.data()
              if(data.id === id)
              {
                userData = data
                
              }
            })
            return userData
          }
          (async()=> {
            let userData = await test(uid)
            setUser(userData)
            setLoading(false)
            console.log("uid", uid)
            console.log("userData:", userData)
          })()
          
         
        } else {
          // User is signed out
          console.log("inside else")
          setLoading(false)
        } 
      })
    
    
    // (async()=>{
    //   await checkAuth()
    // })()

  }, [])

  if(loading)
  {
    return (<View style = {{justifyContent : "center", alignItems : "center"}}><Text>Loading...</Text></View>)
  }
  
  return (
      
    <TestContext.Provider value = {{setUser, user}}>
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
              <Stack.Screen name = "Home" component = {HomeScreen}/>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen}  />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TestContext.Provider>
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
