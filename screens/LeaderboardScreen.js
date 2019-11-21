import React, { useState, useEffect } from "react"
import { NavigationActions, ScrollView } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, TouchableOpacity, Image } from "react-native"
import { Text, Content, H1, View, Button, Icon } from "native-base"
import "firebase/firestore"
import * as firebase from "firebase"
import { getUsersDetails, getuserScoreAndPosition, getTop10Users } from "../db/leaderboardService"

const LeaderboardScreen = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState([])
    const [top10Details, setTop10Details] = useState([])
    const B = props => <Text style={{ fontSize: 19, color: "white" }}>{props.children}</Text>
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

    renderMedalColor = idx => {
        switch (idx) {
            case 0:
                return "#FFD700"
            case 1:
                return "#6C7A86"
            case 2:
                return "#B08D57"
            default:
                return "#EFAA40"
        }
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
            <LinearGradient
                colors={["#966FD6", "#6B3BB9"]}
                start={[0, 0]}
                end={[1, 1]}
                location={[-0.1, 0.8251]}
                style={styles.timeBtn}
            >
                <View
                    style={{
                        paddingTop: 25,
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                    }}
                >
                    <View>
                        <Button
                            transparent
                            style={{ marginTop: 10 }}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Icon name="arrow-back" style={{ color: "white" }} />
                        </Button>
                    </View>
                    <View style={styles.center}>
                        <H1 style={styles.title}>Leaderboard</H1>
                    </View>
                    <View style={styles.right}></View>
                </View>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#ececec",
                            width: 80,
                            height: 80,
                            marginLeft: 10,
                            borderRadius: 64,
                            marginBottom: 20,
                        }}
                    >
                        <Image
                            style={{
                                marginTop: 16,
                                marginLeft: 16,
                                alignItems: "center",
                                width: 48,
                                height: 48,
                            }}
                            source={require("../assets/images/boy.png")}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 20,
                            marginTop: 10,
                            display: "flex",
                            flex: 1,
                            height: 60,
                        }}
                    >
                        <Text style={{ color: "white" }}>
                            <B style={{ fontSize: 40 }}>User Score: </B>
                        </Text>
                        <Text style={{ color: "white" }}>
                            <B style={{ fontSize: 40 }}>{userDetails.Points}</B>
                        </Text>
                    </View>
                    <View
                        style={{
                            borderRadius: 10,
                            height: 60,
                            // marginRight: 20,
                            width: 140,
                            alignItems: "center",
                            marginTop: 5,
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                backgroundColor: "#fff",
                                fontSize: 25,
                                flex: 1,
                                justifyContent: "center",
                                fontFamily: "Roboto",
                                color: "#1e1e1e",
                                alignItems: "center",
                            }}
                        >
                            #{userDetails.Position + 1}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <ScrollView contentContainerStyle={styles.container}>
                {top10Details.map((top10Details, topIdx) => {
                    return (
                        <View
                            style={{
                                marginTop: 10,
                                borderRadius: 10,
                                flexDirection: "row",
                                width: "90%",
                                borderWidth: 1,
                                borderColor: "#966FD6",
                                backgroundColor: "#fff",
                                alignContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: renderMedalColor(topIdx),
                                    borderRadius: 30,
                                    marginLeft: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {topIdx <= 2 && (
                                    <Icon
                                        style={{
                                            color: "#fff",
                                            marginTop: 12,
                                            fontSize: 36,
                                        }}
                                        name="ios-trophy"
                                    />
                                )}
                                {topIdx > 2 && (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: "#fff",
                                            fontFamily: "Roboto",
                                            marginTop: 15,
                                        }}
                                    >
                                        #{topIdx + 1}
                                    </Text>
                                )}
                            </View>
                            <View
                                style={{
                                    marginLeft: 30,
                                    marginTop: 12,
                                    width: 150,
                                    display: "flex",
                                }}
                            >
                                <Text style={{ fontSize: 17, fontFamily: "Roboto" }}>
                                    {top10Details.UserName}
                                </Text>
                                <Text style={{ fontSize: 22, fontFamily: "Roboto" }}>
                                    {top10Details.Points}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </Content>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    textInput: {
        height: 60,
        width: "90%",
        borderColor: "white",
        backgroundColor: "#fff",
    },
    content: {
        backgroundColor: "#fff",
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
        fontSize: 25,
        alignItems: "center",
        textTransform: "uppercase",
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
    left: {
        width: 100,
        height: 60,
        flex: 1,
    },
    center: {
        alignItems: "center",
        flexGrow: 2,
        justifyContent: "center",
        flex: 1,
    },
    right: {
        width: 100,
        height: 60,
        flex: 1,
    },
})

export default LeaderboardScreen
