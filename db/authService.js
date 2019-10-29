import * as firebase from "firebase"
require("firebase/firestore")
/*
 * Method used to register user after they clicked register button
 * @param
 * email - Email of the user
 * password - Plain text password of user - Note, this will be the last
 * time a plain text password will be sent as it will be hashed in firebase
 *
 * @return
 * Authentication information of user
 *
 *
 */
const registerUser = async (email, password) => {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const {
        user: { uid: userId },
    } = result
    console.log("Result", result)

    return result
}

/*
 *
 * Method to initialize the user information in Google firestore
 *
 * 1. This method will check whether the record with document
 * matching userId is found in the firestore.
 * 2. If does not exist, we need to initialize a default set of values.
 *
 * @param
 * userId - id of user
 *
 * @return
 * boolean indicating if the initialization was successful
 *
 *
 */
const initUserRecordsIfNotExists = async userId => {
    const db = firebase.firestore()
    console.log("User id: ", userId)
    try {
        // Get the document record
        const doc = await db
            .collection("user")
            .doc(userId)
            .get()
        if (doc.exists) {
            console.log("Found data")
            return true
        } else {
            await db
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

export { registerUser, initUserRecordsIfNotExists }
