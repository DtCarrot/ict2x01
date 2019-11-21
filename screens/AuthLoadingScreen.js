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
<<<<<<< HEAD
                //this.props.navigation.navigate("Journey")
                //this.props.navigation.navigate("FinishedJourney")
                this.props.navigation.navigate("Home")
=======
                this.props.navigation.navigate("Journey")
                // this.props.navigation.navigate("Leaderboard")
                // this.props.navigation.navigate("Home")
>>>>>>> c0bc4811cddd69eb64b937b8a2f43bf0fce1e622
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
