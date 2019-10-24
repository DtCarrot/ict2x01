import React, { useEffect, useContext, useState } from "react"
import { StyleSheet } from "react-native"
import { View, Text } from "native-base"
import { JourneyContext } from "../../components/journey/JourneyContext"
import { statement } from "@babel/template"

const DirectionsBar = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const [text, setText] = useState(null)
    // Called on every state change
    useEffect(() => {
        const renderDirections = () => {
            // Check if the state is not null
            if (state.journeyDetails !== null) {
                const { gpsPosition, journeyDetails, journeyStepIdx, journeyStepSubIdx } = state
                const nextTarget =
                    journeyDetails.legs[0].steps[journeyStepIdx].steps[journeyStepSubIdx]

                console.log("DirectionsBar JourneyDetails: ", nextTarget)

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
                    }}
                >
                    {text}
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
