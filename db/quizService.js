import * as firebase from "firebase"
import quizRecords from "../components/data/quizRecords"
require("firebase/firestore")

const getRandomQuiz = () => {
    const quizLength = quizRecords.length
    console.log("Quiz length: ", quizLength)
    const quizIdx = Math.floor(Math.random() * Math.floor(quizLength))
    const quizObj = quizRecords[quizIdx]
    return {
        ...quizObj,
        quizIdx,
    }
}

const validateQuiz = (quizIdx, answerIdx) => {
    // Retrieve the quiz records based on quiz index
    const { correctAnswerIdx } = quizRecords[quizIdx]
    console.log(`Compare answer`)
    console.log(`${correctAnswerIdx} vs ${answerIdx}`)
    if (correctAnswerIdx === answerIdx) {
        // Answer is incorrect
        return true
    }
    // Answer is correct
    return false
}

export { getRandomQuiz, validateQuiz }
