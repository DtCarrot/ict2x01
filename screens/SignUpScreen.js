import React, { useState } from "react"
import { registerUser } from "../db/authService"
import { setName, getName, setAge, getAge, setGender, getGender, setSignUpStatus, getSignUpStatus } from '../db/storage'
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button'
import bgImage from '../assets/images/gradient.png'
import logo from '../assets/images/logo.png'
import * as firebase from "firebase"

const { width: WIDTH } = Dimensions.get('window')

const SignUpScreen = ({ navigation }) => {

  var radio_props = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const [errorMessage, setErrorMessage] = useState(null)
  const [name, setScreenName] = useState("")
  const [age, setScreenAge] = useState("")
  const [gender, getScreenGender] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [RadioProps, setRadioProps] = useState(radio_props)

  const navigationOptions = {
    title: "Sign Up",
  }
  const signUp = async () => {
    try {

      //Validation for user fields
      console.log("Signing up")
      if (name.trim() == 0) {
        setErrorMessage("Name is required!")
        return
      } else if (isNaN(name) != true) {
        setErrorMessage("Name cannot contain numeric!")
        return
      } else if (age.trim().match('^\\d+$') == null) {
        setErrorMessage("Age is required!")
        return
      } else if (age < 0) {
        setErrorMessage("Please insert only numbers for age!")
        return
      } else if (gender == '') {
        setErrorMessage("Gender is required!")
        return
      } else {
        await setName(name)
        await setAge(age)
        await setGender(gender)

        await registerUser(email, password)
        await firebase.auth().signOut();

        // After the user creation is successful - we need to redirect them to the login screen.
        await navigation.navigate("SignIn")
      }
    } catch (err) {
      console.log("Error signing up", err)
      setErrorMessage(err.message)
    }
  }


  return (

    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.header}>SIGN UP</Text>
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Name'}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={name => setScreenName(name)}
              value={name}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Age'}
              keyboardType='numeric'
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={age => setScreenAge(age)}
              value={age}
            />
          </View>

          <View style={styles.inputContainer}>
            <RadioForm
              radio_props={RadioProps}
              initial={-1}
              formHorizontal={true}
              borderWidth={1}
              buttonSize={20}
              buttonOuterSize={30}
              buttonColor={'rgba(0, 0, 0, 0.35)'}
              selectedButtonColor={'rgba(0, 0, 0, 0.35)'}
              radioStyle={{ paddingRight: 30 }}
              onPress={(value) => getScreenGender(value)}
            />
          </View>

          <View style={styles.inputContainer}>
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
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder={'Password'}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.btnLogin} onPress={() => signUp()}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.smallText}>{"\n"}Already have an account?
          <Text style={styles.boldText} onPress={() => navigation.navigate("SignIn")}> Login</Text>
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    marginBottom: 30
  },
  logo: {
    width: 220,
    height: 220
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center'
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
    fontSize: 18,
    textAlign: 'center'
  },
  smallText: {
    fontSize: 16,
    color: "#000",
    textAlign: 'center'
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000",
    textAlign: 'center'
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.35)',
    textAlign: 'center',
  },
  headerContainer: {
    alignItems: 'center'
  }
});

export default SignUpScreen
