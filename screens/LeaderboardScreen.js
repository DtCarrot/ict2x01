import React, { useState, useEffect } from "react"
import { NavigationActions } from "react-navigation"
import { DrawerActions } from "react-navigation"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, Content, H1, View, Button, Icon,} from "native-base"
import 'firebase/firestore'
import * as firebase from "firebase"

const LeaderboardScreen = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState([])
    const [usersDetails, setUsersDetails] = useState([])
    const [top10Details, setTop10Details] = useState([])
    const B = (props) => <Text style={{ fontWeight: 'bold', color:"white" }}>{props.children}</Text>
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

    const getUsersDetails = async () => {
        try {
            const usersDetailsSnapshot = await db.collection('user').get()
            let userDetailsCollection = []
            usersDetailsSnapshot.docs.map((doc) => {
                userDetailsCollection.push({ Name: doc.data().name, Points: doc.data().points, UpdatedDate: Date.parse(doc.data().pointsUpdatedDate) })
            })
            userDetailsCollection = userDetailsCollection.sort((a, b) => {
                return a.Points < b.Points
            });
            for (let i = 0; i < userDetailsCollection.length - 1; i++) {
                if (userDetailsCollection[i].Points === userDetailsCollection[i + 1].Points) {
                    if (userDetailsCollection[i].UpdatedDate > userDetailsCollection[i + 1].UpdatedDate) {
                        let tmp = userDetailsCollection[i];
                        userDetailsCollection[i] = userDetailsCollection[i + 1];
                        userDetailsCollection[i + 1] = tmp;
                    }
                }
            }
            setUsersDetails(userDetailsCollection)
            return userDetailsCollection
        } catch (err) {
            console.log("Failed to retrieve data", err)
        }
    }

    const getuserScoreAndPosition = async (usersDetails) => {
        var userId = firebase.auth().currentUser.uid
        const usersInformation = await usersDetails
        try {
            const userData = await db.collection("user").doc(userId).get()
            if (userData.exists) {
                const userPosition = usersInformation.findIndex(x => x.Points === userData.data().points && x.UpdatedDate === Date.parse(userData.data().pointsUpdatedDate))
                setUserDetails({ Position: userPosition, Points: userData.data().points })
            }
            else {
                db.collection("user").doc(userId).set({ points: 0 })
            }
        } catch (err) {
            console.log("Failed to retrieve data", err)
        }
    }

    const getTop10Users = async (usersDetails) => {
        let top10UsersDetails = []
        const usersInformation = await usersDetails
        for (let i = 0; i < 10; i++) {
            top10UsersDetails.push({ UserName: usersInformation[i].Name, Points: usersInformation[i].Points, Position: i + 1 })
        }
        setTop10Details(top10UsersDetails)
    }

    useEffect(() => {
        const usersDetails = getUsersDetails()
        getuserScoreAndPosition(usersDetails)
        getTop10Users(usersDetails)
    }, [])

    return (
        <Content style={styles.content}>
            <Button transparent style={{marginTop:20}} onPress={() => navigation.navigate('Home')}>
              <Icon name="arrow-back" style={{color:"white"}} />
            </Button>
            <View style={styles.container}>
                <H1 style={styles.title}>Leaderboard</H1>
                <Text style={{color:"white"}}><B style={{ fontSize: 40}}>User Score:  </B>{userDetails.Points}</Text>
                <Text style={{color:"white"}}><B style={{ fontSize: 40}}>User Position:  </B>{userDetails.Position}</Text>
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
                                    width: 80,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{fontWeight:"bold"}}>
                                    {top10Details.UserName}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 7,
                                    marginLeft: 160,
                                }}
                            >
                                <Text
                                    style={{
                                        position: 'absolute',
                                        right: 0
                                    }}>
                                    {top10Details.Points}
                                </Text>
                            </View>
                        </View>
                    )
                })}
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