import { getUsersDetails } from "../../db/leaderboardService"
import App from "../../App"

it("Check whether the top 10 score is accurate", async () => {
    var leaderboardScoreArr = await getUsersDetails()
    var isTop10 = true
    let prevScore = -1
    for (var i = 0; i < leaderboardScoreArr.length - 10; i++) {
        if (leaderboardScoreArr[i].Points > prevScore && prevScore != -1) {
            isTop10 = false
            break
        } else {
            prevScore = leaderboardScoreArr[i].Points
        }
    }
    expect(isTop10).toBe(true)
})
