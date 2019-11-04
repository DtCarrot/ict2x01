import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { JourneyContext } from "./JourneyContext"
import { View, Modal, StyleSheet } from "react-native"
import { Text, Button, H1, H3 } from "native-base"
import { withNavigation } from "react-navigation"

const styles = StyleSheet.create({
    title: {
        fontFamily: "Roboto",
        color: "#fff",
        paddingTop: 30,
        fontSize: 26,
    },
    subtitle: {
        marginTop: 15,
        fontFamily: "Roboto",
        fontSize: 19,
    },
})

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
                transparent={false}
                visible={endJourneyDialogOpen}
            >
                <View
                    style={{
                        zIndex: 9999,
                        flex: 1,
                        // flexDirection: "column",
                        alignItems: "center",
                        // justifyContent: "center",
                        // width: 300,
                        width: "90%",
                        height: "80%",
                        marginTop: "10%",
                        marginBottom: "10%",
                        marginLeft: "5%",
                        marginRight: "5%",
                        height: 400,
                        // marginLeft: 50,
                        backgroundColor: "#966FD6",
                        // width: "100%",
                        // height: "100%",
                    }}
                >
                    <H3 style={styles.title}>End your journey?</H3>
                    <Text style={styles.subtitle}>Have you reached your destination?</Text>
                    <View>
                        <Button onPress={() => closeDialog()}>
                            <Text>No</Text>
                        </Button>
                        <Button onPress={() => goToFinishedScreen()}>
                            <Text>Yes</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default withNavigation(EndJourneyPromptDialog)
