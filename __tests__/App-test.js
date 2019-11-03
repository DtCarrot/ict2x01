import React from "react"
import NavigationTestUtils from "react-navigation/NavigationTestUtils"
import renderer from "react-test-renderer"
import * as admin from "firebase-admin"
const adminConfig = {
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
    credential: admin.credential.applicationDefault(),
}

admin.initializeApp()

import App from "../App"

// jest.mock('expo', () => ({
//   AppLoading: 'AppLoading',
// }));

// jest.mock('../navigation/AppNavigator', () => 'AppNavigator');

// describe('App', () => {
//   jest.useFakeTimers();

//   beforeEach(() => {
//     NavigationTestUtils.resetInternalState();
//   });

//   it(`renders the loading screen`, () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });

//   it(`renders the root without loading screen`, () => {
//     const tree = renderer.create(<App skipLoadingScreen />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

import * as firebase from "firebase"
import { exportAllDeclaration, jsxText, jsxEmptyExpression } from "@babel/types"
import { registerUser } from "../db/authService"

const testRegisterUser = async (email, password) => {
    try {
        // Register for an account
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
    } catch (err) {
        console.error("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
        }
    }
    return {
        err: null,
    }
}

const testLoginUser = async (email, password) => {
    try {
        const signInStatus = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
        console.log("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
        }
    }
    return {
        err: null,
    }
}

const defaultEmail  "default.ict2x01@gmail.com"
const defaultPassword = "abc123"
const stubRegisterEmail = "create.ict2x01@gmail.com"
const testEmails = [defaultEmail, stubRegisterEmail]

describe("Authentication test", () => {
    beforeAll(async () => {
        console.log("Stubbing database here")
        let i = 0
        for (i = 0; i < testEmails.length; i++) {
            console.log("At test email: ", testEmails[i])
            const deleteEmail = testEmails[i]
            try {
                const { uid: deleteUid } = await admin.auth().getUserByEmail(deleteEmail)
                console.log("Deleting user with id ", deleteUid, deleteEmail)
                await admin.auth().deleteUser(deleteUid)
            } catch (err) {
                console.log("Failed to delete user")
            }
        }

        console.log("Starting to create user")

        try {
            const userResult = await admin.auth().createUser({
                email: defaultEmail,
                emailVerified: true,
                password: defaultPassword,
            })
        } catch (err) {
            console.log("Error in creating stub user: ", err.code)
        }
    }, 20000)

    test("User shall login with valid email and password combination", 
    async () => {

        const defaultEmail = "default.ict2x01@gmail.com"
        const defaultPassword = "abc123"
        // Create the user if it does not exists.
        await registerUser(defaultEmail, defaultPassword)

        const res = await testLoginUser(defaultEmail, defaultPassword)
        
        // Check if there is any error in response
        expect(res.err).toBe(null) // True

        // Sanity test to check if the user id is currently stored
        // in the firebase local auth storage
        const user = firebase.auth().currentUser
        const { uid } = user
        expect(uid).not.toBe(null) 

    }, 10000)

    test("User shall login with correct email and invalid password", 
    async () => {

        const defaultEmail = "default.ict2x01@gmail.com"
        const defaultPassword = "abc123"
        const badPassword = "badpw"
        // Create the user if it does not exists.
        await registerUser(defaultEmail, defaultPassword)

        // Run the function that shall be tested
        const res = await testLoginUser(defaultEmail, badPassword) 
        expect(res.err).toBe("auth/wrong-password")

    }, 10000)

    test("User shall login with incorrect email and password", async () => {

        const defaultEmail = "default.ict2x01@gmail.com"
        const defaultPassword = "abc123"
        const badEmail = "ict2102@gmail.com"
        const badPassword = "badpw"

        // Create the user if it does not exist before running the actual test
        await registerUser(defaultEmail, defaultPassword)

        // Run the function that shall be tested
        const res = await testLoginUser(badEmail, badPassword)
        console.log("Res: ", res)
        expect(res.err).toBe("auth/user-not-found")

    }, 10000)

    test("User shall register with email that already exists in the database", 
    async () => {

        // Define email address and password
        const emailAddress = "create.ict2x01@gmail.com"
        const password = "abc123"

        // Simulate adding of user records to firestore before
        // running the actual test function.
        // Note: adminAddUserToDatabase() is an admin function
        // and will not be exposed on the real client side
        // as it uses admin level firebase keys 
        await adminAddUserToDatabase(emailAddress, password)

        // After adding a user, we try to run testRegisterUser()
        // to simulate error registering with email that already
        // exists in db
        const res = await testRegisterUser(emailAddress, password)
        console.log("Res: ", res)

        // The expected result should be that email is already in use
        expect(res.err).toBe("auth/email-already-in-use")

    })

    test("User shall register with a valid email", async () => {

        // Define email address and password
        const emailAddress = "create.ict2x01@gmail.com"
        const password = "abc123"
        
        // Remove any user records consisting of email address 
        // "create.ict2x01@gmail.com"
        await removeUserByEmail(emailAddress)
        
        // Invoke function we will like to test
        const res = await testRegisterUser(emailAddress, password)
        console.log("Res: ", res)

        expect(res.err).toBe(null)

    })
})

afterAll(async () => {
    testEmails.forEach(async deleteEmail => {
        const { uid: deleteUid } = await admin.auth().getUserByEmail(deleteEmail)
        console.log("Deleting user with id ", deleteUid)
        await admin.auth().deleteUser(deleteUid)
    })
})
