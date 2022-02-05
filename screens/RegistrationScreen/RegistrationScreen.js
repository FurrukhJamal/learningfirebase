import React, { useContext, useState } from 'react'
import {StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import styles from './styles';
//import { firebase } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { TestContext } from '../../App';



export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {setUser} = useContext(TestContext)

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async() => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        
        const auth = getAuth();
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         console.log("Response From Server:", userCredential) 
        //         const user = userCredential.user;
        //         }) //...
        //         .then((async()=>{
        //             try 
        //             {
        //                 const data = {
        //                     id: user.uid,
        //                     fullname: fullName,
        //                     email: email,
        //                 }
        //             console.log("Data is:", data)    
        //                 const docRef = await addDoc(collection(db, "users"), data );
        //                 console.log("Document written with ID: ", docRef.id);

        //                 navigation.navigate("Home");
        //             } 
        //             catch (e)
        //             {
        //                 console.error("Error adding document: ", e);
        //             }
        //         })())
        //     //})
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log("Error Message :", errorMessage)
        //         // ..
        //     });
        try 
        {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log("userCredentials:", userCredential)
            const data = {
                id: userCredential.user.uid,
                fullname: fullName,
                email: email,
            }

            let docRef = await addDoc(collection(db, "users"), data)
            console.log("Document written is id:", docRef.id)
            //console.log("initial Params : ", props.initialParams)
            setUser(data)
            //navigation.navigate("Home", {user : data})
        }
        catch(error)
        {
            console.log("Error Message:", error.message)
        }
        

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //width : "100%"
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    } 
})