import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Badge, Text, View, Button, Icon } from "native-base"
import { LinearGradient } from "expo-linear-gradient"
import NavigationService from "../../navigation/NavigationService"
import { JourneyContext } from "./JourneyContext"

const BottomJourneyBar = ({ onUserFocus }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const endJourneyDialog = () => {
        dispatch({
            type: "toggleEndJourney",
            open: true,
        })
    }
    return (
        <LinearGradient
            colors={["#966FD6", "#6B3BB9"]}
            start={[0, 0]}
            end={[1, 1]}
            location={[-0.1, 0.8251]}
            style={styles.wrapper}
        >
            {/* <View style={styles.container}> */}
            <View style={styles.left}>
                <Badge
                    style={{
                        marginTop: 10,
                        marginLeft: 10,
                        width: 40,
                        height: 40,
                        backgroundColor: "transparent",
                        borderRadius: 40,
                        borderColor: "#fff",
                        borderWidth: 1,
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        // transparent
                        onPress={() => {
                            console.log("Toggle drawer")
                            NavigationService.toggleDrawer()
                        }}
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 26,
                            color: "#fff",
                        }}
                        name="ios-menu"
                    />
                </Badge>

                <Badge
                    style={{
                        marginTop: 10,
                        marginLeft: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        borderColor: "#fff",
                        borderWidth: 1,
                        backgroundColor: "#fff",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                    }}
                    // transparent
                >
                    <Icon
                        onPress={() => {
                            console.log("User focus")
                            onUserFocus()
                        }}
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            // marginLeft: 25
                            fontSize: 27,
                            marginBottom: 3,
                            // marginTop: 10,
                            color: "#966FD6",
                            // width: 40,
                            // height: 40,
                        }}
                        name="navigate"
                    />
                </Badge>
            </View>
            <View style={styles.center}></View>
            <View style={styles.right}>
                <Button
                    style={{
                        marginTop: 10,
                        marginRight: 10,
                        width: 100,
                        height: 40,
                        borderRadius: 40,
                        borderColor: "#fff",
                        borderWidth: 1,
                        backgroundColor: "#fff",
                        alignSelf: "flex-end",
                        display: "flex",
                    }}
                    onPress={() => endJourneyDialog()}
                >
                    <Text
                        style={{
                            color: "#C22259",
                            fontSize: 19,
                            fontFamily: "Roboto",
                            fontWeight: "400",
                        }}
                    >
                        FINISH
                    </Text>
                </Button>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 40,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 990,
        backgroundColor: "#000",
        width: "96%",
        left: "2%",
        right: "2%",
        marginBottom: 15,
        height: 60,
        bottom: 0,
    },
    left: {
        width: 200,
        height: 60,
        flexDirection: "row",
        display: "flex",
    },
    right: {
        display: "flex",
        width: 120,
        height: 60,
    },
})

export default BottomJourneyBar
