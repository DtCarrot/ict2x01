import * as firebase from "firebase"
import { AsyncStorage } from "react-native"
require("firebase/firestore")
import format from "date-fns/format"
const JOURNEY_ID = "@Store:JourneyId"

const startJourney = async () => {
    // Remove the local storage information
    try {
        await AsyncStorage.removeItem(JOURNEY_ID)
    } catch (err) {
        console.error("Unable to start journey - Cannot remove item!")
        return {
            err: "Error in initializing journey",
        }
    }

    const db = firebase.firestore()
    const user = firebase.auth().currentUser
    const { uid: userId } = user
    const startDate = format(new Date(), "MM/dd/yyyy HH:mm:ss")
    let journeyRef = null
    try {
        journeyRef = await db.collection("journey").add({
            userId,
            startDate,
        })
    } catch (e) {
        console.error("Unable to start journey - Cannot add a journey")
        return {
            err: "Error in intializing journey!",
        }
    }

    console.log("Journey Ref: ", journeyRef)
    const { id: journeyId } = journeyRef
    try {
        await AsyncStorage.setItem(JOURNEY_ID, journeyId)
    } catch (err) {
        console.error("Unable to start journey - Cannot set journey id in local storage")
        return {
            err: "Error in intializing journey!",
        }
    }
    return {
        err: null,
    }
}

const endJourney = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser
    const { uid: userId } = user
    const endDate = format(new Date(), "MM/dd/yyyy HH:mm:ss")
    let journeyId = null
    try {
        journeyId = await AsyncStorage.getItem(JOURNEY_ID)
    } catch (e) {
        console.error("Unable to end journey - Cannot retrieve id from storage")
        return {
            err: "Error in ending journey!",
        }
    }
    try {
        const journeyRef = db.collection("journey").doc(journeyId)
        await journeyRef.update({
            endDate,
        })
    } catch (e) {
        console.error("Unable to end journey - Cannot add a journey", e)
        return {
            err: "Error in intializing journey!",
        }
    }
}

/*
 * addFeedback() method
 *
 * {
 * overallScore, safetyScore, speedScore, enjoyFeedback,
 * otherComments
 * }
 *
 *
 *
 */
const addFeedback = async (feedbackObj, journeyId) => {
    const db = firebase.firestore()
    const journeyRef = db.collection("journey").doc(journeyId)
    console.log("JourneyId: ", journeyId)
    await journeyRef.update({
        feedbackObj: {
            ...feedbackObj,
        },
    })
}

export { startJourney, endJourney, addFeedback }
