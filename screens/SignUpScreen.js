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
            console.log("Error signing up", err)
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
            <Button title="Sign up" onPress={() => signUp()} />
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

export default SignUpScreen
