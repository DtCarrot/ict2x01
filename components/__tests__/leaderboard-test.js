const getTop10LeaderboardScore = async () => {
    const db = firebase.firestore()
    const usersScoreCollectionArr = []
    const usersCollectionData = null
    try {
        usersCollectionData = await db.collection("user").doc().get()
    } catch (err) {
        console.log("Failed to retrieve data", err.code, err.message)
        return {
            err: err.code,
            msg: err.message
        }
    }
    const usersCollectionLength = usersCollectionData.length
    var i = 0
    while (i < usersCollectionLength) {
        usersScoreCollectionArr.push(usersCollectionData[i].points)
        i ++
    }
    var top10ScoresArray = usersScoreCollectionArr.sort((a, b) => b - a).slice(0, 10)
    return top10ScoresArray
}

test('Check whether top 10 leaderboard score is in descending order'), async () => {
    var leaderboardScoreArr = await getTop10LeaderboardScore()
    var isSorted = true
    for (var i = 0; i < leaderboardScoreArr.length - 1; i++) {
        if (leaderboardScoreArr[i] < leaderboardScoreArr[i + 1]) {
            isSorted = false
            break
        }
    }
    expect(isSorted).toBe(true)
    console.log("Leaderboard top 10 score is in descending order")
}

test('Check whether the top 10 score is accurate'), async () => {
    var leaderboardScoreArr = await getTop10LeaderboardScore();
    var smallestTop10ScoreResult = leaderboardScoreArr[0];
    var isTop10 = true;
    for (var i = 0; i < allScoreResults.length - 10; i++) {
        if (smallestTop10ScoreResult < allScoreResults[i]) {
            isTop10 = false;
            break;
        }
    }
    expect(isTop10).toBe(true);
}

test('Invoke getTopLeaderboardScore() with error retrieving data from firebase',
() => {

})
