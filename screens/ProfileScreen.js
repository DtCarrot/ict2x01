import React, { useState, useEffect } from "react"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import {
    TextInput,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native"
import {
    ListItem,
    Text,
    Button,
    Item,
    Input,
    Content,
    H2,
    View,
    Icon,
    RadioForm,
    Right,
    Left,
} from "native-base"
import "firebase/firestore"
import * as firebase from "firebase"
import { set } from "date-fns"
import dpImage from '../assets/images/boy.png'

const ProfileScreen = ({ navigation }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [pts, setPts] = useState("")

    const getUserDetails = async () => {
        var db = firebase.firestore()
        var userId = await firebase.auth().currentUser.uid
        try {
            const userData = await db
                .collection("user")
                .doc("pqjXhIdLU6kGSY9oPCGN")
                .get()
            setPts(userData.data().pts)
            setName(userData.data().name)
            setAge(String(userData.data().age))
        } catch (err) {
            console.log("Failed to retrieve data", err)
        }
    }

    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        })
        this.props.navigation.dispatch(navigateAction)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    const saveChanges = async () => {
        var ageInt = parseInt(age, 10);
        if (name === "") {
            setErrorMessage("Please enter name")
        } 
        else if (!Number.isInteger(ageInt)) {
             setErrorMessage("Please only enter numbers")
        }  
        else {
            try {
                var db = firebase.firestore()
                var userId = await firebase.auth().currentUser.uid
                db.collection("user")
                    .doc("pqjXhIdLU6kGSY9oPCGN")
                    .update({
                        name: name,
                        age: age,
                    })
                setErrorMessage(null)
                navigation.navigate("Home")
            } catch (err) {
                console.log(err.message)
                console.log("Error occured", err)
                setErrorMessage("Unable to save changes")
            }
        }
    }

    useEffect(() => {
        const init = async () => {
            await getUserDetails()
        }
        init()
    }, [])

    return (
        <Content style={styles.content}>
            <Button
                transparent
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate("Home")}
            >
                <Icon name="arrow-back" style={{ color: "white" }} />
            </Button>
            <Image source={dpImage} style={{
                    marginTop: 60,
                    marginBottom: 20,
                    borderRadius: 126,
                    width: 126,
                    height: 126,
                    backgroundColor: "#fff",
                    alignSelf: "center",
            }}/>
            <H2
                style={{
                    marginBottom: 20,
                    color: "#FFF",
                    fontSize: 25,
                    fontFamily: "Roboto",
                    fontWeight: "200",
                    marginLeft: 10,
                    alignSelf: "center",
                }}
            >
                {pts} Points
            </H2>
            <View style={styles.container}>
            {errorMessage && <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>}
                <Item regular style={styles.item}>
                    <Input
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Name"
                        onChangeText={name => setName(name)}
                        value={name}
                    />
                </Item>
                <Item regular style={styles.item}>
                    <Input
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Age"
                        onChangeText={age => setAge(age)}
                        value={age}
                    />
                </Item>
                <Button style={styles.button} title="SaveChanges" onPress={saveChanges}>
                    <Text style={styles.text}>Save changes</Text>
                </Button>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    picker: {
        width: "80%",
        backgroundColor: "#fff",
        height: 60,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        height: 60,
        width: "80%",
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
    title: {
        color: "#fff",
        fontFamily: "Roboto",
        paddingTop: 20,
        marginBottom: 36,
    },
    button: {
        width: "60%",
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    smallText: {
        fontSize: 15,
        color: "#000",
    },
})

export default ProfileScreen
