import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { H3, Icon, Badge } from "native-base"
import { JourneyContext } from "./JourneyContext"

const JourneyHeader = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const { currentAvailChance } = state
    const closeDialog = () => {
        dispatch({
            type: "toggleGameDialog",
            open: false,
        })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.left}>
                <H3
                    style={{
                        color: "#373737",
                        textAlign: "center",
                        fontSize: 20,
                        marginBottom: 0,
                    }}
                >
                    {currentAvailChance} games left
                </H3>
            </View>
            <View style={styles.center}></View>
            <View style={styles.right}>
                <Icon
                    onPress={closeDialog}
                    style={{
                        fontSize: 30,
                        color: "#fff",
                    }}
                    name="ios-close"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        top: 0,
        flex: 1,
        flexDirection: "row",
        // alignItems: "center",
        // width: "90%",
        width: "100%",
        position: "absolute",
        // marginLeft: "5%",
        marginTop: 20,
        marginBottom: 0,
        height: 40,
    },
    left: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 30,
        width: 150,
        height: 40,
    },
    center: {
        alignItems: "stretch",
    },
    right: {
        backgroundColor: "#c22259",
        borderRadius: 20,
        marginRight: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
})

export default JourneyHeader
