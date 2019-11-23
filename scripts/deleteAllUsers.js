var admin = require("firebase-admin")

var serviceAccount = require("../firebase-admin-key.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ict2101-22ad5.firebaseio.com",
})

function deleteUser(uid) {
    admin
        .auth()
        .deleteUser(uid)
        .then(function() {
            console.log("Successfully deleted user", uid)
        })
        .catch(function(error) {
            console.log("Error deleting user:", error)
        })
}

function getAllUsers(nextPageToken) {
    admin
        .auth()
        .listUsers(100, nextPageToken)
        .then(function(listUsersResult) {
            listUsersResult.users.forEach(function(userRecord) {
                uid = userRecord.toJSON().uid
                deleteUser(uid)
            })
            if (listUsersResult.pageToken) {
                getAllUsers(listUsersResult.pageToken)
            }
        })
        .catch(function(error) {
            console.log("Error listing users:", error)
        })
}

getAllUsers()
