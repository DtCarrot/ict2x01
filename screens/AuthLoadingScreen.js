import React, { Component } from "react"
import { initUserRecordsIfNotExists } from "../db/authService"
import * as firebase from "firebase"

class AuthLoadingScreen extends Component {
    componentDidMount() {
        this._checkAuth()
    }
    _checkAuth = async () => {
        // Listen for authentication state to change.
        firebase.auth().onAuthStateChanged(async user => {
            console.log("User onAuthStateChanged: ", user)
            if (user != null) {
                const { uid: userId } = user
                const success = await initUserRecordsIfNotExists(userId)
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
