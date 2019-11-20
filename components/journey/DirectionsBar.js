import React, { useEffect, useContext, useState } from "react"
import { View, StyleSheet } from "react-native"
import { JourneyContext } from "../../components/journey/JourneyContext"
import { LinearGradient } from "expo-linear-gradient"
import { Button, Text } from "native-base"
import { computeTimeAndDistanceLeft } from "./distanceCalculator"
import addSeconds from "date-fns/addSeconds"
import format from "date-fns/format"

const DirectionsBar = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const [text, setText] = useState(null)
    const [distanceText, setDistanceText] = useState("")
    const { journeyDetails } = state
    // Called on every state change
    useEffect(() => {
        // Calculate the time taken from current position to the final destination
        const calculateTimeTaken = () => {
            if (state.journeyDetails !== null) {
                const { distanceLeft, durationLeft } = computeTimeAndDistanceLeft(journeyDetails)
                const updatedDate = addSeconds(new Date(), durationLeft)
                const formattedDate = format(updatedDate, "HH:mm")
                setDistanceText(
                    `${Math.round(durationLeft / 60)} mins | ${distanceLeft /
                        1000} km | ${formattedDate}`
                )
            }
        }

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
        calculateTimeTaken()
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
                    {distanceText}
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
        width: 290,
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
