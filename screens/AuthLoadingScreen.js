import React, { Component } from "react"
import * as firebase from "firebase"
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHAJmBB6hMn8dnxDO3lMZkWlvazk3wFGI",
    authDomain: "ict2101-22ad5.firebaseapp.com",
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
    storageBucket: "ict2101-22ad5.appspot.com",
    projectId:"ict2101-22ad5",
}

firebase.initializeApp(firebaseConfig)

class AuthLoadingScreen extends Component {
    componentDidMount() {
        this._checkAuth()
    }
    _checkAuth = async () => {
        // Listen for authentication state to change.
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log("We are authenticated now!")
                this.props.navigation.navigate("Home")
                return
            }
            this.props.navigation.navigate("SignIn")
        })
    }
    render() {
        return null
    }
}

export default AuthLoadingScreen
