import React, { useState, useEffect } from "react"
// import { Input } from "react-native-ui-kitten"
import { TextInput, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from "react-native"
import { Text, Button, Item, Input, Content, H1, View } from "native-base"
import 'firebase/firestore'
import AuthLoadingScreen from "../screens/AuthLoadingScreen"

import * as firebase from "firebase"

const LeaderboardScreen = ({ navigation }) => {
    const [userPoint, setUserPoint] = useState(0);
    const [userPosition, setUserPosition] = useState(0);
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    const navigationOptions = {
        title: "Leaderboard",
    }

    const getuserScoreAndPosition = async () => {
        var db = firebase.firestore()
        var userId = firebase.auth().currentUser.uid
        var userPoint = null
        try {
            const userData = await db.collection("user").doc(userId).get()
            if (userData.exists) {
                setUserPoint(userData.data().points)
                userPoint = userData.data().points
            }
            else {
                db.collection("user").doc(userId).set({ points: 0 })
            }
        } catch (err) {
            console.log("Failed to signin: ", err)
        }
        const snapshot = await firebase.firestore().collection('user').get()
        const uniquePoints =  Array.from(new Set(snapshot.docs.map(doc => doc.data().points)))
        const descendingUniquePoints = uniquePoints.sort(function(a, b){return b-a})
        const userPosition = descendingUniquePoints.indexOf(userPoint) + 1
        setUserPosition(userPosition)
        const userDate = snapshot.docs.map(doc => Date.parse(doc.data().pointsUpdatedDate))
        var newArr = _.sortBy(userDate, 'pointsUpdatedDate', function(n) {
            return n;
          });          
        console.log(newArr)
    }

    useEffect(() => {
        getuserScoreAndPosition()
    })

    return (
        <Content style={styles.content}>
            <View style={styles.container}>
                <H1 style={styles.title}>Leaderboard</H1>
                <Text><B>User Score:</B> {userPoint}</Text>
                <Text><B>User Position:</B> {userPosition}</Text>
            </View>
        </Content>
    );
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
    title: {
        color: "#fff",
        fontFamily: "Roboto",
        paddingTop: 80,
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

export default LeaderboardScreen
