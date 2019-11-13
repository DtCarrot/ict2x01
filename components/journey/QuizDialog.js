import React, { Fragment, useState, useContext, useEffect } from "react"
import { View, Text, Button } from "native-base"
import { getRandomQuiz, validateQuiz } from "../../db/quizService"
import { JourneyContext } from "./JourneyContext"
import { StyleSheet } from "react-native"
import NextGameButton from "./buttons/NextGameButton"
import ContinueNavigateButton from "./buttons/ContinueNavigateButton"
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
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [quizObj, setQuizObj] = useState(null)
    const { currentAvailChance, totalChance, finished } = state
    // Call everytime a new game is created
    useEffect(() => {
        if (!state.finished) {
            const quiz = getRandomQuiz()
            console.log("Quiz obj: ", quiz)
            setQuizObj(quiz)
        }
    }, [state.gameDialogOpen, state.finished])
    const answerQuiz = answerIdx => {
        // If the answer is correct
        if (validateQuiz(quizObj.quizIdx, answerIdx)) {
            console.log("Correct answer")
        } else {
            console.log("Wrong answer")
        }
        dispatch({
            type: "endGame",
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
    if (finished) {
        return (
            <Fragment>
                <View
                    style={{
                        zIndex: 300,
                        width: 270,
                        height: 270,
                        marginBottom: 30,
                    }}
                >
                    <Text>You have answered correctly</Text>
                </View>
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
                    // marginLeft: "5%",
                    backgroundColor: "#966fd6",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        // alignItems: "stretch",
                        display: "flex",
                    }}
                >
                    {quizObj.questions.map((question, idx) => {
                        return (
                            <View
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
                                    borderWidth: idx === selectedIdx ? 5 : 0,
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
                                    }}
                                >
                                    {question}
                                </Text>
                            </View>
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
