import React, { Fragment, useState, useContext, useEffect } from "react"
import NextGameButton from "../buttons/NextGameButton"
import ContinueNavigateButton from "../buttons/ContinueNavigateButton"
import { JourneyContext } from "../JourneyContext"
import { View, Text, Button } from "native-base"

const AnswerResult = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const { currentAvailChance, totalChance, quizAnswered, quizCorrect, finished } = state
    const renderAnswerResult = () => {
        return (
            <View
                style={{
                    zIndex: 300,
                    width: 270,
                    height: 270,
                    marginBottom: 30,
                }}
            >
                {quizCorrect && <Text>You have answered correctly.</Text>}
                {!quizCorrect && <Text>You have answered correctly.</Text>}
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
