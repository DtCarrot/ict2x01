import React from "react"
import NavigationTestUtils from "react-navigation/NavigationTestUtils"
import renderer from "react-test-renderer"
import * as admin from "firebase-admin"
import * as firebase from "firebase"
import App from "../App"
const adminConfig = {
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
    credential: admin.credential.applicationDefault(),
}

admin.initializeApp()

const stubEmailAddress = "point.ict2x01@gmail.com"
const stubPassword = "abc123"

// Check Journey
const checkJourney = () => {
    const endPointLat = "1.29"
    const endPointLng = "120.00"
    let finished = false
    let distanceTravelled = 0
    do {
        const distanceDiff = getDistanceTravelledBetweenLastPoint()
    } while (!finished)
}

const checkPointCount = async () => {
    const user = firebase.auth().currentUser
    const { uid: userId } = user
    const docRef = await db.collection("user").doc(userId)
    try {
        const result = await docRef.get()
    } catch (err) {
        console.log("Error in adding data: ", err)
        return false
    }
}

const initUserRecordsIfNotExists = async userId => {
    const db = firebase.firestore()
    console.log("User id: ", userId)
    try {
        // Get the document record
        const exists = await isUserPointRecordExists()
        if (exists) {
            console.log("Found data")
            return true
        } else {
            const result = await db
                .collection("user")
                .doc(userId)
                .set({
                    points: 0,
                })
            console.log("Added to collection")
            return true
        }
    } catch (err) {
        console.log("Error in adding data: ", err)
        return false
    }
}

const isUserPointRecordExists = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser
    // console.log("User: ", user)
    const { uid: userId } = user
    try {
        // Get the document record
        const doc = await db
            .collection("user")
            .doc(userId)
            .get()
        if (doc.exists) {
            console.log("Found data")
            return true
        }
        return false
    } catch (err) {
        console.log("Error in getting user record: ", err.code)
    }
}

// const initPoint = () => {
//     const user = firebase.auth().currentUser
// }

describe("Point test", () => {
    beforeAll(async () => {
        console.log("Stubbing database")
        try {
            const { uid: deleteUid } = await admin.auth().getUserByEmail(stubEmailAddress)
            console.log("Deleting user with id ", deleteUid, stubEmailAddress)
            await admin.auth().deleteUser(deleteUid)
        } catch (err) {
            console.log("Failed to delete user")
        }
        // Login automatically after creating new user
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(stubEmailAddress, stubPassword)

        // try {
        //     const signInStatus = await firebase
        //         .auth()
        //         .signInWithEmailAndPassword(stubEmailAddress, stubPassword)
        //     // console.log("Login status: ", signInStatus)
        // } catch (err) {
        //     console.log("Error in signing in: ", err.code, err.message)
        //     return {
        //         err: err.code,
        //         msg: err.message,
        //     }
        // }
    }, 20000)
    test("User shall have no records in database", async () => {
        const recordExists = await isUserPointRecordExists()
        expect(recordExists).toBe(false)
    })
    test("Add points to a user record", async () => {
        const user = firebase.auth().currentUser
        const { uid } = user
        const result = await initUserRecordsIfNotExists(uid)
        // Should be successful
        expect(result).toBe(true)
        // After that we should check the point count
    })
    afterAll(async () => {
        testEmails.forEach(async deleteEmail => {
            const { uid: deleteUid } = await admin.auth().getUserByEmail(deleteEmail)
            console.log("Deleting user with id ", deleteUid)
            await admin.auth().deleteUser(deleteUid)
        })
    })
})
