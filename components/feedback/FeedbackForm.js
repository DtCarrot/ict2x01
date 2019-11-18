import React, { useState } from "react"
import { StyleSheet, AsyncStorage } from "react-native"
import { Button, Icon, View, Content, Text, Item, H1, Input } from "native-base"
import { addFeedback } from "../../db/journeyService"
const JOURNEY_ID = "@Store:JourneyId"

const NUMBER_OF_STARS = 5
const FeedbackForm = ({ onComplete }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const onSubmitForm = async () => {
        if (overallScore === 0) {
            setErrorMessage("Please set the overall score")
            return
        }
        if (safetyFeedback === 0) {
            setErrorMessage("Please set the safety rating")
            return
        }
        if (speedFeedback === 0) {
            setErrorMessage("Please set the speed rating")
            return
        }
        if (enjoyFeedback === 0) {
            setErrorMessage("Please set the score rating")
            return
        }
        console.log("Preparing to submit form ")
        const journeyId = await AsyncStorage.getItem(JOURNEY_ID)
        const feedbackObj = {
            overallScore,
            safetyScore: safetyFeedback,
            speedScore: speedFeedback,
            enjoyScore: enjoyFeedback,
            otherComments: otherComments,
        }
        await addFeedback(feedbackObj, journeyId)
        onComplete()
    }
    const [overallScore, setOverallScore] = useState(0)
    const [safetyFeedback, setSafetyFeedback] = useState(0)
    const [speedFeedback, setSpeedFeedback] = useState(0)
    const [enjoyFeedback, setEnjoyFeedback] = useState(0)
    const [otherComments, setOtherComments] = useState("")
    const StarIcon = ({ score, filled, onPress }) => (
        <Icon
            style={styles.star}
            onPress={() => onPress(score)}
            name={filled ? "star" : "star-outline"}
        />
    )
    const renderOverallFeedbackStar = (setStar, overallScore) => {
        console.log("Render overall feedback")
        let i = 0
        let renderStars = []
        for (i = 0; i < NUMBER_OF_STARS; i++) {
            let current = i + 1
            console.log("Score ", overallScore, current)
            let filled = overallScore >= current
            const singleStarRender = (
                <StarIcon
                    score={i + 1}
                    onPress={score => {
                        setStar(score)
                    }}
                    filled={filled}
                />
            )
            renderStars.push(singleStarRender)
        }
        return renderStars
    }
    const FeedbackHeader = ({ name }) => (
        <Text
            style={{
                fontSize: 18,
                marginTop: 10,
                color: "#fff",
            }}
        >
            {name}
        </Text>
    )
    return (
        <Content style={styles.content}>
            <View style={styles.topContainer}>
                <H1 style={styles.logo}>Feedback Form</H1>
                <Text
                    style={{
                        alignItems: "center",
                        width: "80%",
                        color: "#fff",
                        fontFamily: "Roboto",
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                >
                    You have successfully completed the journey. Please review about your route
                    experience
                </Text>
            </View>
            {errorMessage && (
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            width: "60%",
                            backgroundColor: "#fff",
                            color: "#000",
                            padding: 10,
                        }}
                    >
                        {errorMessage}
                    </Text>
                </View>
            )}
            <View style={styles.container}>
                <FeedbackHeader name="Overall Rating" />
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                    }}
                >
                    {renderOverallFeedbackStar(setOverallScore, overallScore)}
                </View>
                <FeedbackHeader name="Safety Rating" />
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                    }}
                >
                    {renderOverallFeedbackStar(setSafetyFeedback, safetyFeedback)}
                </View>
                <FeedbackHeader name="Speed Rating" />
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                    }}
                >
                    {renderOverallFeedbackStar(setSpeedFeedback, speedFeedback)}
                </View>
                <FeedbackHeader name="Enjoyment Rating" />
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                    }}
                >
                    {renderOverallFeedbackStar(setEnjoyFeedback, enjoyFeedback)}
                </View>
                <Item>
                    <Input
                        placeholderTextColor="#fff"
                        style={{ color: "#fff", maxWidth: 200 }}
                        onChangeText={comment => setOtherComments(comment)}
                        value={otherComments}
                        placeholder="Other comments"
                    />
                </Item>
                <Button style={{ marginTop: 20 }} onPress={() => onSubmitForm()}>
                    <Text>Submit Feedback</Text>
                </Button>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    topContainer: {
        backgroundColor: "#966FD6",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginTop: 40,
        color: "#fff",
    },
    content: {
        backgroundColor: "#446CB3",
    },
    star: {
        fontSize: 35,
        marginLeft: 5,
    },
})

export default FeedbackForm
