import React, { useState } from "react"
// import { Input } from "react-native-ui-kitten"
import { TextInput, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from "react-native"
import { Text, Button, Item, Input, Content, H1, View } from "native-base"

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
            navigation.navigate("Home")
        } catch (err) {
            console.log("Failed to signin: ", err)
        }
    }
    return (
        <Content style={styles.content}>
            <View style={styles.container}>
                <H1 style={styles.logo}>Login</H1>
                {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                <Item regular style={styles.item}>
                    <Input
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                </Item>
                <Item regular style={styles.item}>
                    <Input
                        style={styles.textInput}
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </Item>
                <Button style={styles.button} title="Login" onPress={() => signIn()}>
                    <Text style={styles.text}>Login</Text>
                </Button>
                <Text style={styles.smallText} onPress={() => navigation.navigate("SignUp")}>
                    Don't have an account? Sign up
                </Text>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 60,
        width: "90%",
        borderColor: "white",
        // borderWidth: 2,
        backgroundColor: "#fff",
        // marginTop: 20,
    },
    content: {
        backgroundColor: "#446CB3",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        textTransform: "uppercase",
    },
    item: {
        width: "80%",
    },
    logo: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 45,
        paddingTop: 150,
        marginBottom: 50,
    },
    button: {
        width: "70%",
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    smallText: {
        fontSize: 15,
        color: "#000",
    },
})

export default SignInScreen
