import React, { useEffect, useContext, useState } from "react"
import { View, StyleSheet } from "react-native"
import { JourneyContext } from "../../components/journey/JourneyContext"
import { LinearGradient } from "expo-linear-gradient"
import { Button, Text } from "native-base"

const DirectionsBar = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const [text, setText] = useState(null)
    // Called on every state change
    useEffect(() => {
        const renderDirections = () => {
            // Check if the state is not null
            if (state.journeyDetails !== null) {
                const { journeyDetails, journeyStepIdx, journeyStepSubIdx } = state
                let nextTarget = journeyDetails.legs[0].steps[journeyStepIdx]
                // Check if there is any substeps in the navigation
                if ("steps" in nextTarget) {
                    // Get the substep
                    nextTarget = nextTarget.steps[journeyStepSubIdx]
                }

                const regex = /(<([^>]+)>)/gi
                // Strip the html tags that is returned from google directions api
                const directionsText = nextTarget.html_instructions.replace(regex, "")
                // Set the text direction
                setText(directionsText)
            }
        }
        renderDirections()
    }, [state.journeyDetails, state.journeyStepIdx, state.journeyStepSubIdx])
    return (
        <View style={styles.wrapper}>
            <View style={styles.center}>
                <Text
                    style={{
                        paddingTop: 30,
                        fontSize: 18,
                        fontFamily: "Roboto",
                        color: "#966fd6",
                    }}
                >
                    {text}
                </Text>
            </View>
            {/* <View style={styles.timeBtn}> */}
            {/* <View> */}
            <LinearGradient
                colors={["#966FD6", "#6B3BB9"]}
                start={[0, 0]}
                end={[1, 1]}
                location={[-0.1, 0.8251]}
                style={styles.timeBtn}
            >
                {/* <Button style={styles.timeBtn}> */}
                <Text
                    style={{
                        lineHeight: 22,
                        fontSize: 19,
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        textAlign: "center",
                        justifyContent: "center",
                        color: "#fff",
                    }}
                >
                    17 min | 10 km | 09:51
                </Text>
                {/* </Button> */}
            </LinearGradient>
            {/* </View> */}
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    timeBtn: {
        width: 240,
        borderRadius: 20,
        height: 38,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
    },
    wrapper: {
        position: "absolute",
        width: "100%",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        zIndex: 990,
    },
    center: {
        // flex: "1 1 auto",
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 100,
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: "#966FD6",
    },
})
export default DirectionsBar
