import React, { useContext, useState, useEffect } from "react"
import { JourneyContext, JourneyProvider } from "../journey/JourneyContext"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "native-base"

const convertHtmlToText = text => {
    const regex = /(<([^>]+)>)/gi
    // Strip the html tags that is returned from google directions api
    const directionsText = text.replace(regex, "")
    return directionsText
}

const DirectionsOverlay = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const { journeyDetails, navigationToggleOpen } = state
    const [directions, setDirections] = useState(null)
    const renderDirections = directions => {
        return directions.map((direction, idx) => {
            return (
                <Text
                    key={idx}
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#000",
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                >
                    {convertHtmlToText(direction)}
                </Text>
            )
        })
    }
    useEffect(() => {
        if (!navigationToggleOpen) {
            setDirections(null)
            return
        }
        const textArr = []
        journeyDetails.legs[0].steps.forEach((obj, idx) => {
            if ("steps" in obj) {
                // If there is a key
                const innerSteps = obj.steps
                innerSteps.forEach((innerStep, innerStepIdx) => {
                    const { html_instructions } = innerStep
                    // textArr.push(renderText(html_instructions))
                    textArr.push(html_instructions)
                })
            } else {
                const { html_instructions } = obj
                textArr.push(html_instructions)
            }
        })
        setDirections(textArr)
    }, [state.navigationToggleOpen])

    if (directions === null) {
        return null
    }
    return (
        <View style={styles.container}>
            <ScrollView
                style={{
                    backgroundColor: "#ececec",
                }}
            >
                {journeyDetails !== null && renderDirections(directions)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9999,
        backgroundColor: "#ececec",
        padding: 10,
        position: "absolute",
        left: 30,
        bottom: 100,
        width: 300,
        height: 400,
    },
})

export default DirectionsOverlay
