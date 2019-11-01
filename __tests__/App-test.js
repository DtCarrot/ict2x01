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
        const result = await firebase.auth().
        createUserWithEmailAndPassword(email, password)
        const {
            user: { uid: userId },
        } = result
        return {
            err: null,
        }
    } catch (err) {
        console.log("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
            msg: err.message,
        }
    }
}

const testLoginUser = async (email, password) => {
    try {
        const signInStatus = await firebase.auth().signInWithEmailAndPassword(email, password)
        return {
            err: null,
        }
    } catch (err) {
        console.log("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
            msg: err.message,
        }
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
        const res = await testLoginUser(defaultEmail, defaultPassword)
        expect(res.err).toBe(null) // True
    }, 10000)

    test("User shall login with correct email and invalid password", 
    async () => {
        const res = await testLoginUser(defaultEmail, "badpw")
        expect(res.err).toBe("auth/wrong-password")
    }, 10000)

    test("User shall login with incorrect email and password", async () => {
        const res = await testLoginUser("ict2102@gmail.com", "asd123")
        console.log("Res: ", res)
        expect(res.err).toBe("auth/user-not-found")
    }, 10000)

    test("User shall register with email that already exists in the database", 
    async () => {
        const emailAddress = "darrenong53@gmail.com"
        const password = "test123"
        const res = await testRegisterUser(defaultEmail, password)
        console.log("Res: ", res)
        expect(res.err).toBe("auth/email-already-in-use")
    })

    test("User shall register with a valid email", async () => {
        const emailAddress = stubRegisterEmail
        const password = "abc123"
        const res = await testRegisterUser(stubRegisterEmail, password)
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
