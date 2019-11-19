const testLoginUser = async (email, password) => {
    try {
        const signInStatus = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
        console.log("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
            msg: err.message,
        }
    }
    return {
        err: null,
    }
}