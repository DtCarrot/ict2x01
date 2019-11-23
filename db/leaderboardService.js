import "firebase/firestore"
import * as firebase from "firebase"

const getUsersDetails = async () => {
    var db = firebase.firestore()
    try {
        const usersDetailsSnapshot = await db.collection("user").get()
        let userDetailsCollection = []
        usersDetailsSnapshot.docs.map(doc => {
            userDetailsCollection.push({
                Name: doc.data().name,
                Points: doc.data().points,
                UpdatedDate: Date.parse(doc.data().pointsUpdatedDate),
            })
        })
        userDetailsCollection = userDetailsCollection.sort((a, b) => {
            return b.Points - a.Points
        })
        for (let i = 0; i < userDetailsCollection.length - 1; i++) {
            if (userDetailsCollection[i].Points === userDetailsCollection[i + 1].Points) {
                if (
                    userDetailsCollection[i].UpdatedDate > userDetailsCollection[i + 1].UpdatedDate
                ) {
                    let tmp = userDetailsCollection[i]
                    userDetailsCollection[i] = userDetailsCollection[i + 1]
                    userDetailsCollection[i + 1] = tmp
                }
            }
        }
        console.log("Users Details")
        console.log(userDetailsCollection)
        return userDetailsCollection
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }
}

const getuserScoreAndPosition = async usersDetails => {
    var db = firebase.firestore()
    var userId = firebase.auth().currentUser.uid
    const usersInformation = await usersDetails
    try {
        const userData = await db
            .collection("user")
            .doc(userId)
            .get()
        if (userData.exists) {
            const userPosition = usersInformation.findIndex(
                x =>
                    x.Points === userData.data().points &&
                    x.UpdatedDate === Date.parse(userData.data().pointsUpdatedDate)
            )
            const userDetails = { Position: userPosition, Points: userData.data().points }
            return userDetails
            // setUserDetails({ Position: userPosition, Points: userData.data().points })
        } else {
            db.collection("user")
                .doc(userId)
                .set({ points: 0 })
        }
    } catch (err) {
        console.log("Failed to retrieve data", err)
    }
}

const getTop10Users = async usersDetails => {
    var db = firebase.firestore()
    let top10UsersDetails = []
    const usersInformation = await usersDetails
    let length = usersInformation.length >= 10 ? 10 : usersInformation.length
    for (let i = 0; i < length; i++) {
        top10UsersDetails.push({
            UserName: usersInformation[i].Name,
            Points: usersInformation[i].Points,
            Position: i + 1,
        })
    }
    return top10UsersDetails
    //setTop10Details(top10UsersDetails)
}

export { getUsersDetails, getuserScoreAndPosition, getTop10Users }
