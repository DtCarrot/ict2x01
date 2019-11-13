const chooseGame = () => {
    QUIZ_BOX_CHANCE = 1
    const randomVal = Math.random()
    if (randomVal >= QUIZ_BOX_CHANCE) {
        return {
            type: "quiz",
        }
    } else {
        return {
            type: "treasurebox",
        }
    }
}

const generateLuckyDrawReward = () => {
    const rewards = [
        {
            type: "point",
            value: 100,
        },
        {
            type: "point",
            value: 300,
        },
    ]
    return rewards[0]
}

export { chooseGame, generateLuckyDrawReward }
