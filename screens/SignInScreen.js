import React, { useState } from "react"
import {
    TextInput,
    Button,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native"

import * as firebase from "firebase"

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
            navigation.navigate("Main")
        } catch (err) {
            console.log("Failed to signin: ", err)
        }
    }
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button title="Login" onPress={() => signIn()} />
            <Button
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate("SignUp")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
    },
})

export default SignInScreen
