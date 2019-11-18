import React, { useState, useEffect, Fragment } from "react"
import { Modal } from "react-native"
import { View, Text, H1, Button } from "native-base"
import { withNavigation } from "react-navigation"
import { endJourney } from "../db/journeyService"
import FeedbackForm from "../components/feedback/FeedbackForm"

const FinishedJourney = ({ navigation }) => {
    // Control whether the feedback dialog should be opened
    const [feedbackOpen, setFeedbackOpen] = useState(false)

    // useEffect(() => {
    //     endJourney()
    // }, [])

    const provideFeedback = () => {
        console.log("Setting provide feed")
        // Open the feedback screen
        setFeedbackOpen(true)
    }

    const onBackButtonPress = () => setFeedbackOpen(false)
    const onFormComplete = () => setFeedbackOpen(false)

    const backToHome = () => {
        console.log("Navigation: ", navigation)
        console.log("Route name: ", navigation.state.routeName)
        navigation.navigate("Home")
    }
    return (
        <Fragment>
            <Modal
                onRequestClose={() => onBackButtonPress()}
                animationType="slide"
                transparent={true}
                visible={feedbackOpen}
            >
                <FeedbackForm onComplete={onFormComplete} />
            </Modal>

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <H1>Congratulations!</H1>
                <Text>You have completed your journey</Text>
                <Button
                    style={{
                        marginTop: 20,
                    }}
                    onPress={() => provideFeedback()}
                >
                    <Text>Provide Feedback</Text>
                </Button>
                <Button
                    style={{
                        marginTop: 20,
                    }}
                    onPress={() => backToHome()}
                >
                    <Text>Back to Home</Text>
                </Button>
            </View>
        </Fragment>
    )
}

export default withNavigation(FinishedJourney)
