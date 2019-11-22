import React, { Component } from "react"
import { initUserRecordsIfNotExists } from "../db/authService"
import {
    setName,
    getName,
    setAge,
    getAge,
    setGender,
    getGender,
    setSignUpStatus,
    getSignUpStatus,
} from "../db/storage"
import * as firebase from "firebase"

import { withNavigation } from "react-navigation"

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
                if (getSignUpStatus() == true) {
                    await this.props.navigation.navigate("SignIn")
                    await setSignUpStatus(false)
                } else {
                    this.props.navigation.navigate("AdminVoucher")
                }
            } else {
                this.props.navigation.navigate("SignIn")
            }
        })
    }
    render() {
        return null
    }
}

export default withNavigation(AuthLoadingScreen)
