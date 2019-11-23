import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
} from "react-native"
import { Icon } from "native-base"
import bgImage from "../assets/images/gradient.png"
import logo from "../assets/images/logo.png"
import * as firebase from "firebase"

const { width: WIDTH } = Dimensions.get("window")

const SignInScreen = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigationOptions = {
        title: "Sign in",
    }

    const goToSignUpPage = async () => {
        await setErrorMessage(null)
        await navigation.navigate("SignUp")
    }

    const signIn = async () => {
        try {
            console.log("Signing in")
            const signInStatus = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("Sign in status: ", signInStatus)
            await setEmail("")
            await setPassword("")
            await setErrorMessage(null)
            await navigation.navigate("Home")
        } catch (err) {
            console.log("Failed to signin: ", err)
            setErrorMessage(err.message)
        }
    }

    ;<View style={styles.inputContainer}>
        <Icon
            name="ios-person"
            size={28}
            color={"rgba(255, 255, 255, 0.7)"}
            style={styles.inputIcon}
        />
        <TextInput
            style={styles.input}
            placeholder={"Email"}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={email => setEmail(email)}
            value={email}
        />
    </View>

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <SafeAreaView style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon
                            name="ios-person"
                            size={28}
                            color={"rgba(255, 255, 255, 0.7)"}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"Email"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            underlineColorAndroid="transparent"
                            onChangeText={email => setEmail(email)}
                            value={email}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon
                            name="ios-lock"
                            size={28}
                            color={"rgba(255, 255, 255, 0.7)"}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder={"Password"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            underlineColorAndroid="transparent"
                            onChangeText={password => setPassword(password)}
                            value={password}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.btnLogin} onPress={() => signIn()}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.smallText}>
                            {"\n"}Don't have an account?
                            <Text
                                style={styles.boldText}
                                onPress={() => goToSignUpPage()}
                            >
                                {" "}
                                Sign up
                            </Text>
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
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 50,
    },
    logo: {
        width: 220,
        height: 220,
    },
    logoText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        opacity: 0.5,
    },
    inputContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        color: "rgba(255, 255, 255, 0.7)",
        marginHorizontal: 25,
    },
    inputIcon: {
        position: "absolute",
        top: 8,
        left: 37,
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#e66e12",
        justifyContent: "center",
        marginTop: 20,
    },
    text: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 18,
        textAlign: "center",
    },
    smallText: {
        fontSize: 16,
        color: "#000",
        textAlign: "center",
    },
    boldText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
})

export default SignInScreen
