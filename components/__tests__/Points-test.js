const addPoints = async value => {
    if (isNaN(value)) {
        try {
            const db = firebase.firestore()
            const user = firebase.auth().currentUser
            const { uid: userId } = user
            const doc = await db.collection("user").doc(userId)
            await doc.update("points", firebase.firestore.FieldValue.increment(value))
            return {
                err: false,
                data: value,
            }
        } catch (err) {
            return {
                err: true,
                data: null,
            }
        }
    } else {
        return {
            err: true,
            data: null,
        }
    }
}
