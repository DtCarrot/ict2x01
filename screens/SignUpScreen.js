import React, { useState } from "react"
import { TextInput, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from "react-native"
import { Text, Button, Item, Input, Content, H1, View } from "native-base"
import * as firebase from "firebase"

const SignUpScreen = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigationOptions = {
        title: "Sign Up",
    }
    const signUp = async () => {
        try {
            console.log("Signing up")
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log("Result: ", result)
            // After the user creation is successful - we need to redirect them to the login screen.
            navigation.navigate("SignIn")
        } catch (err) {
            console.log(err.message)
            console.log("Error signing up", err)
            setErrorMessage(err.message)
        }
    }
    return (
        <Content style={styles.content}>
            <View style={styles.container}>
                <H1 style={styles.logo}>Register</H1>
                {errorMessage && <Text style={{ color: "#fff" }}>{errorMessage}</Text>}
                <Item regular style={styles.item}>
                    <Input
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                </Item>
                <Item regular style={styles.item}>
                    <Input
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </Item>
                <Button style={styles.button} title="Login" onPress={() => signUp()}>
                    <Text style={styles.text}>Sign up</Text>
                </Button>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 60,
        width: "90%",
        borderColor: "white",
        backgroundColor: "#fff",
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

export default SignUpScreen
