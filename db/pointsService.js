import * as firebase from "firebase"
import { getUserProfile } from "../utils/userProfile"
require("firebase/firestore")

// Function to update the user points
const addPoints = async value => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser
    const { uid: userId } = user
    const doc = await db.collection("user").doc(userId)
    doc.update("points", firebase.firestore.FieldValue.increment(value))
}

// Function to initialize the point information
const initPoints = async () => {}

export { addPoints, initPoints }
