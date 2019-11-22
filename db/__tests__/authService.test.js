import React from "react"
import NavigationTestUtils from "react-navigation/NavigationTestUtils"
import renderer from "react-test-renderer"
import * as admin from "firebase-admin"

const adminConfig = {
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
    credential: admin.credential.applicationDefault(),
}

admin.initializeApp()
import App from "../../App"

import * as firebase from "firebase"
import { addPoints } from "../pointsService"
import { addMinutes } from "date-fns"
import { it } from "date-fns/locale"

describe("Add points", () => {
    const testEmail = "ict2x01.test@gmail.com"
    const testPassword = "abc123"
    const db = firebase.firestore()
    let uid = null
    beforeEach(async () => {
        console.log("Starting")
        try {
            const { uid, deleteUid } = await admin.auth().getUserByEmail(testEmail)
            console.log(uid)
            await admin.auth().deleteUser(uid)
            await db
                .collection("user")
                .doc(uid)
                .delete()
        } catch (e) {
            console.log(e)
        }

        console.log("Before creating")
        let result = await admin.auth().createUser({
            email: testEmail,
            emailVerified: true,
            password: testPassword,
        })
        await firebase.auth().signInWithEmailAndPassword(testEmail, testPassword)
        uid = result.uid
        try {
            await db
                .collection("user")
                .doc(uid)
                .set({
                    points: 0,
                })
        } catch (e) {
            console.log(e)
        }
    }, 20000)
    test("Add points", async () => {
        const result = await db
            .collection("user")
            .doc(uid)
            .get()
        const { points } = result.data()
        expect(points).toBe(0)
        // Test and add 30 points
        await addPoints(30)
        const insertResult = await db
            .collection("user")
            .doc(uid)
            .get()
        const { points: updatedPoints } = insertResult.data()
        expect(updatedPoints).toBe(30)
    })
})
