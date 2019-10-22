import React from "react"
import { StyleSheet } from "react-native"
import { View, Text } from "native-base"

const DirectionsBar = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.center}>
                <Text
                    style={{
                        paddingTop: 30,
                    }}
                >
                    Turn Left
                </Text>
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
        zIndex: 990,
        backgroundColor: "#fff",
        width: "100%",
        height: 100,
        top: 0,
    },
    center: {
        // flex: "1 1 auto",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
export default DirectionsBar
