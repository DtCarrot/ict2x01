import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { JourneyContext } from "./JourneyContext"
import { View, Modal } from "react-native"
import { Text, Button } from "native-base"
import { withNavigation } from "react-navigation"

const EndJourneyPromptDialog = ({ navigation }) => {
    const { state, dispatch } = useContext(JourneyContext)
    const { endJourneyDialogOpen } = state
    const closeDialog = () => {
        // Close navigation
        dispatch({
            type: "toggleEndJourney",
            open: false,
        })
    }
    const goToFinishedScreen = () => {
        // Navigate to the finish screen
        navigation.navigate("FinishedJourney")
    }

    return (
        <View>
            <Modal
                onRequestClose={closeDialog}
                animationType="slide"
                transparent={true}
                visible={endJourneyDialogOpen}
            >
                <Text>Hello World</Text>
                <Button onPress={() => closeDialog()}>
                    <Text>Back</Text>
                </Button>
                <Button onPress={() => goToFinishedScreen()}>
                    <Text>Finish!</Text>
                </Button>
            </Modal>
        </View>
    )
}

export default withNavigation(EndJourneyPromptDialog)
