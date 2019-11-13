import React, { useState } from "react"
<<<<<<< HEAD
// import { Input } from "react-native-ui-kitten"
import { TextInput, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from "react-native"
import { Text, Button, Item, Input, Content, H1, View } from "native-base"
import 'firebase/firestore';
=======
// // import { Input } from "react-native-ui-kitten"
// import { TextInput, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from "react-native"
// import { Text, Button, Item, Input, Content, H1, View } from "native-base"

import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';
//import {Icon,Button} from 'native-base';
import { Icon } from 'native-base'

import bgImage from '../assets/images/gradient.png'
import logo from '../assets/images/logo.png'
>>>>>>> 0ec4477a9f798ef3f06ecde31fc6d479e5c9bbf8

import * as firebase from "firebase"

const { width: WIDTH } = Dimensions.get('window')

const SignInScreen = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigationOptions = {
        title: "Sign in",
    }
    const signIn = async () => {
        try {
            console.log("Signing in")
            const signInStatus = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("Sign in status: ", signInStatus)
            navigation.navigate("Home")
        } catch (err) {
            console.log("Failed to signin: ", err)
        }
    }


    return (
        // <Content style={styles.content}>
        //     <View style={styles.container}>
        //         <H1 style={styles.logo}>Login</H1>
        //         {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        //         <Item regular style={styles.item}>
        //             <Input
        //                 style={styles.textInput}
        //                 placeholder="Email"
        //                 onChangeText={email => setEmail(email)}
        //                 value={email}
        //             />
        //         </Item>
        //         <Item regular style={styles.item}>
        //             <Input
        //                 style={styles.textInput}
        //                 secureTextEntry
        //                 placeholder="Password"
        //                 onChangeText={password => setPassword(password)}
        //                 value={password}
        //             />
        //         </Item>
        //         <Button style={styles.button} title="Login" onPress={() => signIn()}>
        //             <Text style={styles.text}>Login</Text>
        //         </Button>
        //         <Text style={styles.smallText} onPress={() => navigation.navigate("SignUp")}>
        //             Don't have an account? Sign up
        //         </Text>
        //     </View>
        // </Content>

        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        </View>

        <View style={styles.inputContainer}>
            <Icon name="ios-person" size={28} color={'rgba(255, 255, 255, 0.7)'}  
              style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder={'Email'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'
                onChangeText={email => setEmail(email)}
                value={email}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon name="ios-lock" size={28} color={'rgba(255, 255, 255, 0.7)'}
              style={styles.inputIcon}/>
            <TextInput 
                style={styles.input}
                placeholder={'Password'}
                //secureTextEntry={this.state.showPass}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'
                onChangeText={password => setPassword(password)}
                value={password}
            />     
        </View>

            <TouchableOpacity style={styles.btnLogin} onPress={() => signIn()}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.smallText} onPress={() => navigation.navigate("SignUp")}>
                Don't have an account? Sign up
            </Text>
   
    </ImageBackground>

    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50
    },
    logo: {
      width: 220,
      height: 220
    },
    logoText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      opacity: 0.5
    },
    inputContainer: {
      marginTop: 10
    },
    input: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.7)',
      marginHorizontal: 25
    },
    inputIcon: {
      position: 'absolute',
      top: 8,
      left: 37
    },
    btnEye: {
      position: 'absolute',
      top: 8,
      right: 37
    },
    btnLogin: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#e66e12',
      justifyContent: 'center',
      marginTop: 20
    },
    text: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      textAlign: 'center'
    },
    smallText: {
        fontSize: 15,
        color: "#000",
    }
  });

export default SignInScreen
