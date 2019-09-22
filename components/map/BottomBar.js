import React from "react"
import { StyleSheet } from "react-native"
import NavigationService from "../../navigation/NavigationService"
import { Text, View, Left, Right, Body, Title, Button, Icon } from "native-base"
const BottomBar = () => {
    return (
        <View style={styles.wrapper}>
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
            <View style={styles.center}>
                {/* <Title>Header</Title> */}
                <Text>Header</Text>
            </View>
            <View style={styles.right}>
                <Button transparent>
                    <Text>Cancel</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 9999,
        backgroundColor: "#fff",
        width: "100%",
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
export default BottomBar
