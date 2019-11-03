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

test("Add points to a user with invalid input", async () => {

    // Define an points defined as string
    const invalidPoints = "a112"
    const result = await addPoints(invalidPoints)
    // err key should be true as we have added an integer
    expect(result.err).toBe(true)


})

test("Add points to a user with valid input", async () => {

    const beforeTest = () => {
        // Initialize value before the test
        const db = firebase.firestore()
        const user = firebase.auth().currentUser
        const { uid: userId } = user
        
        // code function to set the user points to 30.
        await setUserPoints(userId, 30)
    }

    beforeTest()

    // we will start running the actual test code to increase
    // the number of points from 30 to 60.
    const incrementPoints = 30
    const result = await addPoints(incrementPoints)
    // err key should be true as we have added an integer
    expect(result.err).toBe(false)

    // After this, 
    // we start to query the user record in firestore 
    // to ensure that the points have been increased 
    // to 60 points from the initial 30 points.

    // In order to confirm that the points have been increased, 
    // we run an expect case to confirm the increment
    const { uid: userId } = user
    const doc = await db.collection("user").doc(userId)
    const { points } = doc

    expect(points).toBe(60)

})
