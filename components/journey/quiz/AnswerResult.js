import React, { Fragment, useState, useContext, useEffect } from "react"
import { StyleSheet } from "react-native"
import NextGameButton from "../buttons/NextGameButton"
import ContinueNavigateButton from "../buttons/ContinueNavigateButton"
import { JourneyContext } from "../JourneyContext"
import { H2, Icon, View, Text, Button } from "native-base"
import FireworkWrapper from "../FireworkWrapper"
import { addPoints } from "../../../db/pointsService"
import { generateQuizReward } from "../../../utils/gameCreator"

const styles = StyleSheet.create({
    resultText: {
        fontSize: 24,
        fontWeight: "400",
        fontFamily: "Roboto",
        color: "#1d1d1d",
        width: 300,
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
    },
    resultScore: {
        fontSize: 21,
        fontWeight: "200",
        fontFamily: "Roboto",
    },
})

const AnswerResult = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const { currentAvailChance, totalChance, quizAnswered, quizCorrect, finished } = state
    const [reward, setReward] = useState("")
    const ResultText = ({ children }) => <Text style={styles.resultText}>{children}</Text>
    useEffect(() => {
        if (quizAnswered && quizCorrect) {
            const { value } = generateQuizReward()
            setReward(`${value} points`)
            addPoints(value)
        }
    }, [quizAnswered, quizCorrect])
    const renderAnswerResult = () => {
        return (
            <View
                style={{
                    alignItems: "center",
                    zIndex: 3000,
                    marginBottom: 30,
                    marginTop: 200,
                }}
            >
                {quizCorrect && <Text style={styles.resultText}>You have answered correctly</Text>}
                {!quizCorrect && (
                    <Text style={styles.resultText}>You have answered incorrectly.</Text>
                )}
            </View>
        )
    }
    if (!quizAnswered) {
        return false
    }
    return (
        <Fragment>
            {renderAnswerResult()}
            <View
                style={{
                    zIndex: 3000,
                    width: 186,
                    height: 186,
                    marginBottom: 30,
                }}
            >
                <FireworkWrapper position="top-right" />
                <FireworkWrapper position="top-left" />
                <Button
                    icon
                    style={{
                        width: 186,
                        height: 186,
                        backgroundColor: quizCorrect ? "#77DD77" : "#c22259",
                        borderRadius: 93,
                        position: "relative",
                        borderColor: "#fff",
                        zIndex: 310,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        style={{
                            fontSize: 150,
                        }}
                        name={quizCorrect ? "ios-checkmark" : "ios-close"}
                    />
                </Button>
            </View>
            {quizCorrect && <Text style={styles.resultScore}>{`You have earned ${reward}`}</Text>}
            <View
                style={{
                    marginBottom: 50,
                }}
            >
                {currentAvailChance > 0 && <NextGameButton />}
                {currentAvailChance <= 0 && <ContinueNavigateButton />}
            </View>
        </Fragment>
    )
}

export default AnswerResult
