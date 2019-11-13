import React, { Fragment, useState, useContext, useEffect } from "react"
import { View, Text, Button } from "native-base"
import { getRandomQuiz, validateQuiz } from "../../db/quizService"
import { JourneyContext } from "./JourneyContext"
import { TouchableOpacity, StyleSheet } from "react-native"
import NextGameButton from "./buttons/NextGameButton"
import ContinueNavigateButton from "./buttons/ContinueNavigateButton"
import AnswerResult from "./quiz/AnswerResult"
const styles = StyleSheet.create({
    title: {
        color: "#C22259",
        fontSize: 56,
        marginTop: 60,
        fontFamily: "Roboto_medium",
    },
})

const QuizDialog = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const [selectedIdx, setSelectedIdx] = useState(0)
    const [quizObj, setQuizObj] = useState(null)
    const { quizAnswered, currentAvailChance, totalChance, finished } = state

    // Call everytime a new game is created
    useEffect(() => {
        dispatch({
            action: "resetQuestion",
        })
        if (!state.finished) {
            const quiz = getRandomQuiz()
            console.log("Quiz obj: ", quiz)
            setQuizObj(quiz)
        }
    }, [state.gameDialogOpen, state.finished])

    console.log("Selected Idx: ", selectedIdx)

    const answerQuiz = answerIdx => {
        // If the answer is correct
        let correct = true
        if (validateQuiz(quizObj.quizIdx, answerIdx)) {
            console.log("Correct answer")
            correct = true
        } else {
            console.log("Wrong answer")
            correct = false
        }
        dispatch({
            type: "answerQuestion",
            quizCorrect: correct,
        })
        dispatch({
            type: "updateRewardChance",
            currentAvailChance: currentAvailChance - 1,
            totalChance: totalChance - 1,
        })
    }
    if (quizObj === null) {
        return null
    }
    if (quizAnswered) {
        return (
            <Fragment
                style={{
                    alignItems: "center",
                    display: "flex",
                    backgroundColor: "#fff",
                    zIndex: 99999,
                }}
            >
                <AnswerResult />
            </Fragment>
        )
    }
    return (
        <Fragment
            style={{
                alignItems: "center",
                display: "flex",
                backgroundColor: "#fff",
                zIndex: 99999,
            }}
        >
            <Text style={styles.title}>{"< LUCKY >"}</Text>
            <Text
                style={{
                    fontSize: 30,
                    color: "#0D0D0D",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                }}
            >
                Question
            </Text>
            <Text
                style={{
                    display: "flex",
                    alignSelf: "center",
                    width: 250,
                    color: "#363636",
                    fontFamily: "Roboto",
                    fontWeight: "200",
                    fontSize: 21,
                }}
            >
                {quizObj.title}
            </Text>
            <View
                style={{
                    display: "flex",
                    zIndex: 9200,
                    marginTop: 40,
                    flexGrow: 1,
                    width: "90%",
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginBottom: 15,
                    alignItems: "stretch",
                    backgroundColor: "#966fd6",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                    }}
                >
                    {quizObj.questions.map((question, idx) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Setting selected idx")
                                    setSelectedIdx(idx)
                                }}
                                style={{
                                    marginTop: 15,
                                    borderRadius: 30,
                                    height: 50,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    alignContent: "center",
                                    borderWidth: 1,
                                    borderColor: idx === selectedIdx ? "#000" : "none",
                                }}
                            >
                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: "#966FD6",
                                        borderRadius: 30,
                                        marginLeft: 10,
                                        marginTop: 10,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 21,
                                            fontFamily: "Roboto",
                                            color: "#fff",
                                        }}
                                    >
                                        {idx}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        fontSize: 20,
                                        color: "#030303",
                                        fontFamily: "Roboto",
                                        fontWeight: idx === selectedIdx ? "400" : "200",
                                    }}
                                >
                                    {question}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <Button
                    onPress={answerQuiz}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        marginTop: 10,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#c22259",
                            fontSize: 20,
                        }}
                    >
                        Submit Answer
                    </Text>
                </Button>
            </View>
        </Fragment>
    )
}

export default QuizDialog
