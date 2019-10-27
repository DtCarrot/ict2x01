import React from "react"
import { StyleSheet } from "react-native"
import { Text, View, Button, Icon } from "native-base"
import { LinearGradient } from "expo-linear-gradient"

const BottomJourneyBar = () => {
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
                <Button
                    transparent
                    onPress={() => {
                        console.log("Toggle drawer")
                        NavigationService.toggleDrawer()
                    }}
                >
                    <Icon
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 25,
                            fontSize: 30,
                            marginTop: 10,
                        }}
                        name="menu"
                    />
                </Button>
            </View>
            <View style={styles.center}></View>
            <View style={styles.right}>
                <Button transparent>
                    <Text>Cancel</Text>
                </Button>
            </View>
            {/* </View> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 40,
        position: "absolute",
        display: "flex",
        // justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 990,
        backgroundColor: "#000",
        width: "96%",
        left: "2%",
        // marginLeft: 30,
        // marginRight: 30,
        marginBottom: 15,
        height: 60,
        bottom: 0,
    },
    left: {
        // flex: "0 0 auto",
        width: 80,
        height: 60,
        borderRightWidth: 1,
        borderColor: "#000",
    },
    center: {
        // flex: "1 1 auto",
        alignItems: "stretch",
    },
    right: {
        // flex: "0 0 auto",
        width: 80,
        height: 60,
        borderLeftWidth: 1,
        borderColor: "#000",
    },
})

export default BottomJourneyBar
