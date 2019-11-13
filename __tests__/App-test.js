import React from "react"
import NavigationTestUtils from "react-navigation/NavigationTestUtils"
import renderer from "react-test-renderer"

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
import { exportAllDeclaration } from "@babel/types"
import { registerUser } from "../db/authService"

describe("Authentication test", () => {
    // beforeAll(() => {
    // Initialize Firebase
    // const firebaseConfig = {
    //     apiKey: "AIzaSyCHAJmBB6hMn8dnxDO3lMZkWlvazk3wFGI",
    //     projectId: "ict2101-22ad5",
    //     authDomain: "ict2101-22ad5.firebaseapp.com",
    //     databaseURL: "https://ict2101-22ad5.firebaseio.com",
    //     storageBucket: "ict2101-22ad5.appspot.com",
    // }

    // firebase.initializeApp(firebaseConfig)
    // })
    it("User shall login with valid email and password combination", async () => {
        const signInStatus = await firebase
            .auth()
            .signInWithEmailAndPassword("darrenng53@gmail.com", "imsims")
        // except(signInStatus).to
    })
    it("User shall login with invalid email and password combination", async () => {
        try {
            const signInStatus = await firebase
                .auth()
                .signInWithEmailAndPassword("darrenng@gmail.com", "imsims")
        } catch (err) {
            console.log(err.code)
        }
        // except(signInStatus).to
    })
    it("User shall register with valid email and password combination", async () => {
        console.log("Valid email and password combination")
        await registerUser("dtcarrot@gmail.com", "imsims")
    })
    it("User shall be unable to register with duplicate email", async () => {
        console.log("Unable to register with duplicate email")
    })
})
