import React, { useState, useEffect } from "react"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, Content, H1, View, Button, Icon } from "native-base"
import "firebase/firestore"
import * as firebase from "firebase"
import { getUsersDetails, getuserScoreAndPosition, getTop10Users } from "../db/leaderboardService"

const LeaderboardScreen = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState([])
    const [top10Details, setTop10Details] = useState([])
    const B = props => <Text style={{ fontWeight: "bold", color: "white" }}>{props.children}</Text>
    var db = firebase.firestore()

    const navigationOptions = {
        title: "Leaderboard",
    }

    navigateToScreen = route => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        })
        this.props.navigation.dispatch(navigateAction)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    useEffect(() => {
        const init = async () => {
            const usersDetails = await getUsersDetails()
            const userDetails = await getuserScoreAndPosition(usersDetails)
            setUserDetails(userDetails)
            const top10Users = await getTop10Users(usersDetails)
            console.log("Top 10 users: ", top10Users)
            setTop10Details(top10Users)
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
            <View style={styles.container}>
                <H1 style={styles.title}>Leaderboard</H1>
                <Text style={{ color: "white" }}>
                    <B style={{ fontSize: 40 }}>User Score: </B>
                    {userDetails.Points}
                </Text>
                <Text style={{ color: "white" }}>
                    <B style={{ fontSize: 40 }}>User Position: </B>
                    {userDetails.Position}
                </Text>
                {top10Details.map(top10Details => {
                    return (
                        <View
                            style={{
                                marginTop: 10,
                                borderRadius: 10,
                                height: 36,
                                flexDirection: "row",
                                width: "90%",
                                backgroundColor: "#fff",
                                alignContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 23,
                                    height: 23,
                                    backgroundColor: "#966FD6",
                                    borderRadius: 30,
                                    marginLeft: 10,
                                    marginTop: 8,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "Roboto",
                                        color: "#fff",
                                    }}
                                >
                                    {top10Details.Position}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 7,
                                    marginLeft: 30,
                                    width: 150,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontWeight: "bold" }}>{top10Details.UserName}</Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 7,
                                    marginLeft: 100,
                                }}
                            >
                                <Text
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                    }}
                                >
                                    {top10Details.Points}
                                </Text>
                            </View>
                        </View>
                    )
                })}
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
    title: {
        color: "#fff",
        fontFamily: "Roboto",
        paddingTop: 20,
        marginBottom: 36,
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
