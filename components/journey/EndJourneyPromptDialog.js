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
        width: "80%",
        alignSelf: "center",
        color: "#fff",
        marginTop: 15,
        fontFamily: "Roboto",
        textAlign: "center",
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
        console.log("Going to finish screen")
        dispatch({
            type: "toggleEndJourney",
            open: false,
        })
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
                        height: "50%",
                        marginTop: "25%",
                        marginBottom: "25%",
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
                    <View
                        style={{
                            display: "flex",
                            marginTop: 30,
                            flexDirection: "row",
                        }}
                    >
                        <Button style={{ marginRight: 15 }} onPress={() => closeDialog()}>
                            <Text>No</Text>
                        </Button>
                        <Button style={{ marginLeft: 15 }} onPress={() => goToFinishedScreen()}>
                            <Text>Yes</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default withNavigation(EndJourneyPromptDialog)
