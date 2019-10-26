import * as firebase from "firebase"

const getUserProfile = async () => {
    const currentUser = firebase.auth().currentUser
    const jsonData = await currentUser.toJSON()
    return jsonData
}

export { getUserProfile }
