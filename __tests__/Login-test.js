const testRegisterUser = async (email, password) => {
    try {
        // Register for an account
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (err) {
        console.error("Error in signing in: ", err.code, err.message)
        return {
            err: err.code,
        }
    }
    return {
        err: null,
    }
}
